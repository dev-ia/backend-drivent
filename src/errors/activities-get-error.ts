import { ApplicationError } from '@/protocols';

export function activitiesGetError(): ApplicationError {
  return {
    name: 'activitiesGetError',
    message: 'activitiesGetError!',
  };
}
