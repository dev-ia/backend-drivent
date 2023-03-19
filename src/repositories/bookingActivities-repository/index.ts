import { prisma } from '@/config';

async function getActivitiesGroupById() {
  const activityCounts = await prisma.bookingActivity.groupBy({
    by: ['activity_id'],
    _count: {
      _all: true,
    },
  });

  return activityCounts;
}

async function getNumberEnrollmentActivity(id: number) {
  const activityCounts = await prisma.bookingActivity.groupBy({
    by: ['activity_id'],
    where: {
      activity_id: id,
    },
    _count: {
      _all: true,
    },
  });
  //console.log( activityCounts[0]?._count._all);
  return activityCounts[0]?._count._all;
}

// app.get('/activities/:date', async (req, res) => {
//   const { date } = req.params;

//   try {
//     const activities = await prisma.activities.findMany({
//       where: {
//         data: new Date(date),
//       },
//       include: {
//         local: true,
//       },
//     });

//     const groupByLocal = activities.reduce((acc: Record<string, any>, curr) => {
//       const { local, ...activity } = curr;
//       const localId = local.id;
//       if (!acc[localId]) {
//         acc[localId] = { local, activities: [activity] };
//       } else {
//         acc[localId].activities.push(activity);
//       }
//       return acc;
//     }, {});

//     const result = Object.values(groupByLocal);

//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Could not retrieve activities' });
//   }
// });

const bookingActivitiesRepository = {
  getActivitiesGroupById,
  getNumberEnrollmentActivity,
};

export default bookingActivitiesRepository;
