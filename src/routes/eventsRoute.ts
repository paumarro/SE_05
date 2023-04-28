import { Router } from "express";
import {
  addMemberToEventController,
  createEventController,
  deleteEventController,
  getAllEventsController,
  getEventController,
  getEventMembersController,
  updateEventController,
} from "../controllers/eventsController";
import { validateEvent } from "../middlewares/validations";
import { isAdmin, isAuthenticated } from "../middlewares/session";

const eventsRoute: Router = Router();

eventsRoute.get("/", isAuthenticated, getAllEventsController);

eventsRoute.get("/:id", isAuthenticated, getEventController);

eventsRoute.post("/", isAdmin, validateEvent, createEventController);

eventsRoute.delete("/:id", isAuthenticated, deleteEventController);

eventsRoute.put("/:id", isAdmin, validateEvent, updateEventController);

eventsRoute.get("/:id/members", isAuthenticated, getEventMembersController);

eventsRoute.post(
  "/:eventId/members/:memberId",
  isAuthenticated,
  addMemberToEventController
);

export default eventsRoute;
