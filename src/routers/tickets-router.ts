import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketTypes, getTickets, createTicket, postTicketType } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketTypes)
  .post("/types", postTicketType)
  .get("", getTickets)
  .post("", createTicket);

export { ticketsRouter };
