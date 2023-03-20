import bookingActivitiesRepository from '@/repositories/bookingActivities-repository';

async function getBookingActivitiesById() {
  console.log('dentro dentro dentro');
  const bookingActivities = await bookingActivitiesRepository.getActivitiesGroupById();

  if (!bookingActivities) {
    throw { message: 'error geting booking activities' };
  }

  console.log('dentro do repositories');
  const bookingActivitiesWithEnrollments = bookingActivities?.map((e) => {
    return {
      activity_id: e.activity_id,
      enrollments: e._count._all,
    };
  });
  console.log(bookingActivitiesWithEnrollments);
  return bookingActivitiesWithEnrollments;
}

const bookingActivitiesService = {
  getBookingActivitiesById,
};

export default bookingActivitiesService;
