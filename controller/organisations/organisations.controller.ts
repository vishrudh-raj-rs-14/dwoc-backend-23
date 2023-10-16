import asyncHandler from "express-async-handler";
import Organisation from "../../models/organization.model";
import Project from "../../models/project.model";
import mongoose from "mongoose";
import User from "../../models/user.model";
import Invitation from "../../models/invitation.model";

const restrictToOwner = asyncHandler(async (req: any, res: any, next: any) => {
  const organisation = await Organisation.findById(req.params.id);
  if (!organisation) {
    res.status(404);
    return next(new Error("No such organisation found"));
  }
  if (String(organisation.orgOwner) != req.user.id) {
    res.status(401);
    return next(new Error("You are not authorized to perform this action"));
  }
  req.organisation = organisation;
  next();
});

const createOrganisation = asyncHandler(async (req: any, res: any) => {
  const newOrganisation = await Organisation.create({
    name: req.body.name,
    orgOwner: req.user._id,
    githubUrl: req.body.githubUrl,
    description: req.body.description,
    miniDescription: req.body.miniDescription,
    orgType: req.body.orgType,
  });
  const organisation = await newOrganisation.save();

  return res.status(201).json({
    status: "success",
    data: {
      organisation,
    },
  });
});

const getAllOrganisations = asyncHandler(async (req: any, res: any) => {
  const organisations = await Organisation.find({ isAccepted: "ACCEPTED" });

  return res.status(201).json({
    status: "success",
    data: {
      organisations,
    },
  });
});

const getOrganisation = asyncHandler(async (req: any, res: any, next: any) => {
  const organisation = await Organisation.findById(req.params.id);
  if (!organisation) {
    res.status(404);
    return next(new Error("No such organisation found"));
  }
  return res.status(201).json({
    status: "success",
    data: {
      organisation,
    },
  });
});

const getOrganisationProjects = asyncHandler(
  async (req: any, res: any, next: any) => {
    const organisation = await Organisation.findById(req.params.id);
    if (!organisation) {
      res.status(404);
      return next(new Error("No such organisation found"));
    }
    const organisations = await Project.find({
      organisation: new mongoose.Types.ObjectId(req.params.id),
    });

    return res.status(201).json({
      status: "success",
      data: {
        organisations,
      },
    });
  }
);

const createOrganisationProject = asyncHandler(
  async (req: any, res: any, next: any) => {
    const project = await Project.create({
      name: req.body.name,
      organisation: req.organisation._id,
      techStack: req.body.techStack,
      description: req.body.description,
      miniDescription: req.body.miniDescription,
      tags: req.body.tags,
      githubUrl: req.body.githubUrl,
    });
    return res.status(201).json({
      status: "success",
      data: {
        project,
      },
    });
  }
);

const addMentor = asyncHandler(async (req: any, res: any, next: any) => {
  const user = await User.findById(req.body.user);
  if (!user) {
    res.status(404);
    return next(new Error("No such User found"));
  }
  Invitation.create({
    organisation: req.organisation._id,
    mentor: user._id,
  });
  return res.status(201).json({
    status: "success",
    message: "Invitation Sent Successfully",
  });
});

const getMentor = asyncHandler(async (req: any, res: any, next: any) => {
  const organisation = await Organisation.findById(req.params.id).populate(
    "mentors"
  );
  console.log(organisation);
  if (!organisation) {
    res.status(404);
    return next(new Error("No such organisation found"));
  }
  return res.status(201).json({
    status: "success",
    mentors: organisation.mentors,
  });
});

export {
  createOrganisation,
  getAllOrganisations,
  getOrganisation,
  getOrganisationProjects,
  createOrganisationProject,
  addMentor,
  restrictToOwner,
  getMentor,
};
