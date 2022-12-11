import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../server/mongoDB';
import { isAdmin, protect } from '../../../server/protect';
import { Document } from 'mongodb';
import { Race, Workshop } from '../../../common/types';

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

  const statusData = await userDataCollection
    .aggregate([{ $group: { _id: '$applicationStatus', count: { $sum: 1 } } }])
    .toArray();

  const statuses = ['Incomplete', 'Submitted'];
  const statusDataWithEmpties = statuses.map((status: string) => {
    return {
      _id: status,
      count: statusData.find((e) => e._id === status)?.count ?? 0,
    };
  });

  const shirtData = await userDataCollection
    .aggregate([
      {
        $group: {
          _id: '$applicationResponses.shirtSize',
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  const ABBV_SHIRT_SIZE = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Unknown'];
  const orderedShirtData = ABBV_SHIRT_SIZE.map((size: string) => {
    return {
      _id: `T-shirt ${size}`,
      count: shirtData.find((e) => e._id === (size === 'Unknown' ? null : size))?.count ?? 0,
    };
  });

  const decisionStatusData = await userDataCollection
    .aggregate([{ $group: { _id: '$decisionStatus', count: { $sum: 1 } } }])
    .toArray();

  const decisionStatuses = ['Admitted', 'Waitlisted', 'Declined', 'Undecided'];
  const decisionStatusDataWithEmpties = decisionStatuses.map((decisionStatus) => {
    return {
      _id: decisionStatus,
      count:
        decisionStatusData.find(
          (e) => e._id === (decisionStatus === 'Undecided' ? null : decisionStatus)
        )?.count ?? 0,
    };
  });

  const schoolData = await userDataCollection
    .aggregate([{ $group: { _id: '$applicationResponses.school', count: { $sum: 1 } } }])
    .toArray();

  const mappedSchoolData = schoolData
    .map((data) => {
      return {
        _id: `University: ${data._id}`,
        count: data.count,
      };
    })
    .filter((data) => data._id !== 'University: null');

  const educationData = await userDataCollection
    .aggregate([{ $group: { _id: '$applicationResponses.education', count: { $sum: 1 } } }])
    .toArray();

  const mappedEducationData = educationData.map((data) => {
    return {
      _id: `Education level: ${data._id}`,
      count: data.count,
    };
  });

  const hackathonsAttendedData = await userDataCollection
    .aggregate([
      { $group: { _id: '$applicationResponses.hackathonsAttended', count: { $sum: 1 } } },
    ])
    .toArray();

  const mappedHackathonsAttendedData = hackathonsAttendedData.map((data) => {
    return {
      _id: `Hackathons attended: ${data._id}`,
      count: data.count,
    };
  });

  const csClassesTakenData = await userDataCollection
    .aggregate([{ $group: { _id: '$applicationResponses.csClassesTaken', count: { $sum: 1 } } }])
    .toArray();

  const mappedCsClassesTakenData = csClassesTakenData.map((data) => {
    return {
      _id: `CS classes taken: ${data._id}`,
      count: data.count,
    };
  });

  const total = await userDataCollection.find().toArray();

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
      statusDataWithEmpties,
      orderedShirtData,
      decisionStatusDataWithEmpties,
      mappedSchoolData,
      mappedEducationData,
      mappedHackathonsAttendedData,
      mappedCsClassesTakenData,
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

export default protect(statsHandler);
