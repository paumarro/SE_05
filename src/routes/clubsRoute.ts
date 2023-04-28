import { Router } from "express";
import {
  createClubController,
  deleteClubController,
  getAllClubsController,
  getClubController,
  searchAllClubsController,
  updateClubController,
} from "../controllers/clubsController";
import { validateClub } from "../middlewares/validations";
import { isAuthenticated } from "../middlewares/session";

const clubsRoute: Router = Router();

clubsRoute.get("/search", isAuthenticated, searchAllClubsController);
clubsRoute.get("/", isAuthenticated, getAllClubsController);
clubsRoute.get("/:id", isAuthenticated, getClubController);
clubsRoute.post("/", isAuthenticated, validateClub, createClubController);
clubsRoute.delete("/:id", isAuthenticated, deleteClubController);
clubsRoute.put("/:id", isAuthenticated, validateClub, updateClubController);

export default clubsRoute;
