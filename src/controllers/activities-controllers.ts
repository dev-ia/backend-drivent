import bookingActivitiesRepository from '@/repositories/bookingActivities-repository';
import activitiesService from '@/services/activities-service';
import authenticationService, { SignInParams } from '@/services/authentication-service';
import bookingActivitiesService from '@/services/bookingActivities-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
export async function getActivitiesByDate(req: Request, res: Response) {
  console.log('entra no controllers');
  const { date } = req.params;
  //return res.send(new Date(date));

  try {
    const result = await activitiesService.getActivities(date);
    //res.status(200).json(result);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function getBookingActivitiesById(req: Request, res: Response) {
  //const { id } = req.params;

  try {
    const result = await bookingActivitiesService.getBookingActivitiesById();
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
