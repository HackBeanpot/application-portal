import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../server/mongoDB';
import { isAdmin, protect } from '../../../server/protect';
import { Collection, Document } from 'mongodb';
import { Race, User, Workshop } from '../../../common/types';

const statsHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getStats(req, res);
      break;
    default:
      return res.status(405).setHeader('Allow', 'GET').send(undefined);
  }
};

const getStats: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const adminCheck = await isAdmin(req);
  if (!adminCheck) {
    return res.status(401).send({ message: 'User is not an admin' });
  }

  const { userDataCollection } = await connectToDatabase();

  const statuses = ['Incomplete', 'Submitted'];
  const statusData = await aggregateWithZeros(
    userDataCollection,
    '$applicationStatus',
    'Application status',
    statuses
  );

  const ABBV_SHIRT_SIZE = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Unknown'];
  const shirtData = await aggregateWithZeros(
    userDataCollection,
    '$applicationResponses.shirtSize',
    'Shirt size',
    ABBV_SHIRT_SIZE,
    'Unknown'
  );

  const decisionStatuses = ['Admitted', 'Waitlisted', 'Declined', 'Undecided'];
  const decisionStatusData = await aggregateWithZeros(
    userDataCollection,
    '$decisionStatus',
    'Decision status',
    decisionStatuses,
    'Undecided'
  );

  const schoolData = await aggregateData(
    userDataCollection,
    '$applicationResponses.school',
    'University'
  );

  const educationData = await aggregateData(
    userDataCollection,
    '$applicationResponses.education',
    'Education level'
  );

  const hackathonsAttendedData = await aggregateData(
    userDataCollection,
    '$applicationResponses.hackathonsAttended',
    'Hackathons attended'
  );

  const csClassesTakenData = await aggregateData(
    userDataCollection,
    '$applicationResponses.csClassesTaken',
    'CS classes taken'
  );

  const total = await userDataCollection.find().toArray();

  // Aggregations for multi-select questions
  const mappedRaceData = Object.values(Race).map((race) => {
    let raceCount = 0;
    total.forEach((user) => {
      if (user.applicationResponses?.races?.includes(race)) {
        raceCount++;
      }
    });
    return {
      _id: `Race: ${race}`,
      count: raceCount,
    };
  });

  const mappedWorkshopData = Object.values(Workshop)
    .map((workshop) => {
      let workshopCount = 0;
      total.forEach((user) => {
        if (user.applicationResponses?.interestedWorkshops?.includes(workshop)) {
          workshopCount++;
        }
      });
      return {
        _id: `Interested in workshop: ${workshop}`,
        count: workshopCount,
      };
    })
    .filter((workshopData) => workshopData.count > 0);

  const statsData: Record<string, number> = {};
  statsData['Total applicants'] = total.length;

  const resData = convertData(
    [
      statusData,
      shirtData,
      decisionStatusData,
      schoolData,
      educationData,
      hackathonsAttendedData,
      csClassesTakenData,
      mappedRaceData,
      mappedWorkshopData,
    ],
    statsData
  );

  return res.status(200).json(resData);
};

const convertData = (collections: Document[][], resData: Record<string, number>) => {
  collections.forEach((collection) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    collection.forEach((category: { _id: string; count: number }) => {
      resData[category._id] = category.count;
    });
  });

  return resData;
};

const aggregateData = async (
  userDataCollection: Collection<User>,
  column: string,
  labelPrefix: string
) => {
  const data = await getAggregatedData(userDataCollection, column);

  return data.map((data) => {
    return {
      _id: `${labelPrefix}: ${data._id}`,
      count: data.count,
    };
  });
};

const aggregateWithZeros = async (
  userDataCollection: Collection<User>,
  column: string,
  labelPrefix: string,
  options: string[],
  excludedOption?: string
) => {
  const data = await getAggregatedData(userDataCollection, column);

  return options.map((option) => {
    return {
      _id: `${labelPrefix}: ${option}`,
      count:
        data.find((e) => e._id === (excludedOption && option === excludedOption ? null : option))
          ?.count ?? 0,
    };
  });
};

const getAggregatedData = async (userDataCollection: Collection<User>, column: string) => {
  return userDataCollection.aggregate([{ $group: { _id: column, count: { $sum: 1 } } }]).toArray();
};

export default protect(statsHandler);
