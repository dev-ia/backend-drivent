import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotels, getHotelsWithRooms } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/hoteis", getHotels)
  .get("/:hotelId", getHotelsWithRooms);

export { hotelsRouter };
