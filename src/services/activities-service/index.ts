import { cannotBookingError, notFoundError } from '@/errors';
//import roomRepository from '@/repositories/room-repository';
//import bookingRepository from '@/repositories/booking-repository';
//import enrollmentRepository from '@/repositories/enrollment-repository';
//import tikectRepository from '@/repositories/ticket-repository';
//import authenticationService from '../authentication-service';
import activitiesRepository from '@/repositories/activities-repository';

async function getActivities(date: string) {
  const activities = await activitiesRepository.getActivitiesGroupByLocal(date);

  if (!activities) {
    throw { message: 'error geting activities' };
  }

  return activities;
}

const activitiesService = {
  getActivities,
};

export default activitiesService;
