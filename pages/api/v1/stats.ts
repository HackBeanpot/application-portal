import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../server/mongoDB';
import { isAdmin, protect } from '../../../server/protect';
import { Document } from 'mongodb';
import { Workshop } from '../../../common/types';

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

  console.log('shirt data:', shirtData);

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

  const total = await userDataCollection.find().toArray();

  const workshops = [
    'Intro to Git',
    'Intro to Web Dev (HTML / CSS / JS)',
    'Intermediate Web Dev',
    'Intro to React',
    'Intro to APIs',
    'Intro to Game Dev',
    'HackBeanpot Panel',
    'Resumes and Internships',
    'Backend Workshop',
    'Intro to Mobile App Dev',
    'Intro to Machine Learning',
    'Intro to Docker',
    'Intro to Go',
    'How to Demo a Project for Judging',
    'Careers in Tech',
    'Diversity in Tech',
    'Tech for Social Good',
    'None',
  ];

  const mappedWorkshopData = workshops
    .map((workshop) => {
      let workshopCount = 0;
      total.forEach((user) => {
        if (user.applicationResponses?.interestedWorkshops?.includes(workshop as Workshop)) {
          workshopCount++;
        }
      });
      return {
        _id: `Interested in workshop: ${workshop}`,
        count: workshopCount,
      };
    })
    .filter((workshopData) => workshopData.count > 0);

  console.log(mappedWorkshopData);

  const resData = convertData(
    ['status', 'shirt', 'decisionStatus', 'workshops'],
    [statusDataWithEmpties, orderedShirtData, decisionStatusDataWithEmpties, mappedWorkshopData],
    {}
  );

  resData['Total applicants'] = total.length;

  return res.status(200).json(resData);
};

const convertData = (cat: string[], collections: Document[][], resData: Record<string, number>) => {
  cat.forEach((c, ind) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    collections[ind].forEach((category: { _id: string; count: number }) => {
      resData[category._id] = category.count;
    });
  });

  return resData;
};

export default protect(statsHandler);
