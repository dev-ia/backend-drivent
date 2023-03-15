import { singInPost } from '@/controllers';
import { getActivitiesByDate } from '@/controllers/activities-controllers';
import { validateBody } from '@/middlewares';
import { signInSchema } from '@/schemas';
import { Router } from 'express';

const activitiesRouter = Router();
// authenticationRouter.get('/activities/:date', validateBody(signInSchema), singInPost);
activitiesRouter.get('/:date', getActivitiesByDate);

export { activitiesRouter };
