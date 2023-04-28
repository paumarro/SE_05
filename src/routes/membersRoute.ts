import { Router } from "express";
import {
  createMemberController,
  deleteMemberController,
  getAllMembersController,
  getMemberController,
  getMemberEventsController,
  updateMemberController,
} from "../controllers/membersController";
import {
  validateMember,
  handleValidationError,
  validateUpdateMember,
} from "../middlewares/validations";
import { isAdmin, isAuthenticated } from "../middlewares/session";




const membersRoute: Router = Router();

membersRoute.get("/", isAuthenticated, getAllMembersController);

membersRoute.get("/:id", isAdmin, getMemberController);

membersRoute.delete("/:id", isAdmin, deleteMemberController);

membersRoute.get("/:id/events", isAuthenticated, getMemberEventsController);

membersRoute.post(
  "/",
  isAdmin,
  validateMember,
  handleValidationError,
  createMemberController
);

membersRoute.put(
  "/:id",
  isAdmin,
  validateUpdateMember,
  handleValidationError,
  updateMemberController
);
 
export default membersRoute;