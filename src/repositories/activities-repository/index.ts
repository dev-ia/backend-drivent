import { prisma } from '@/config';

async function getActivitiesGroupByLocal(date: string) {
  const activities = await prisma.activities.findMany({
    where: {
      data: new Date(date),
    },
    include: {
      local: true,
    },
  });
  //console.log('actitivities');
  //console.log(activities);

  const groupByLocal = activities.reduce((acc: Record<string, any>, curr) => {
    const { local, ...activity } = curr;
    const localId = local.id;
    if (!acc[localId]) {
      acc[localId] = { local, activities: [activity] };
    } else {
      acc[localId].activities.push(activity);
    }
    return acc;
  }, {});

  const result = Object.values(groupByLocal);
  //console.log(result);

  return result;
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

const activitiesRepository = {
  getActivitiesGroupByLocal,
};

export default activitiesRepository;
