import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTicketTypes, getTickets, createTicket, postTicketType, getTicketsById } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketTypes)
  .post('/types', postTicketType)
  .get('', getTickets)
  .get('/:ticketId', getTicketsById)
  .post('', createTicket);

export { ticketsRouter };
