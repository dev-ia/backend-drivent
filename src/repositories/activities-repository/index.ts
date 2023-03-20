import { prisma } from '@/config';
import bookingActivitiesRepository from '../bookingActivities-repository';

async function addEnrollmentOnActivities(result: any) {
  async function addEnrollmentInObjectActivity(j: any) {
    const numberEnrollment = await bookingActivitiesRepository.getNumberEnrollmentActivity(j.id);
    j.enrollment = numberEnrollment ? numberEnrollment : 0;
    return j;
  }

  const arrayActivities: any = [];

  for (let i = 0; i < result?.length; i++) {
    for (let j = 0; j < result[i].activities.length; j++) {
      const withEnroll = await addEnrollmentInObjectActivity(result[i].activities[j]);
      arrayActivities.push(withEnroll);
    }
  }
  return result;
}

async function getActivitiesGroupByLocal(date: string) {
  const activities = await prisma.activities.findMany({
    where: {
      data: new Date(date),
    },
    include: {
      local: true,
    },
  });

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

  const resultWithEnrollment = addEnrollmentOnActivities(result);
  return resultWithEnrollment;
}

const activitiesRepository = {
  getActivitiesGroupByLocal,
};

export default activitiesRepository;
