import express from "express";
import {
  createOrganisation,
  getAllOrganisations,
  getOrganisation,
  getOrganisationProjects,
  createOrganisationProject,
  addMentor,
  getMentor,
  restrictToOwner,
} from "../../controller/organisations/organisations.controller";
import { protect } from "../../controller/user/user.controller";
const orgRouter = express.Router();

orgRouter.get("/", getAllOrganisations);
orgRouter.get("/:id", getOrganisation);
orgRouter.get("/:id/projects", getOrganisationProjects);
orgRouter.get("/:id/mentors", getMentor);
orgRouter.post("/", protect, createOrganisation);
orgRouter.post(
  "/:id/projects",
  protect,
  restrictToOwner,
  createOrganisationProject
);
orgRouter.post("/:id/mentors", protect, restrictToOwner, addMentor);
export default orgRouter;
