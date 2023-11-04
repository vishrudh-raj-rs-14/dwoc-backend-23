import asyncHandler from "express-async-handler";
import Organisation from "../../models/organization.model";
import Project from "../../models/project.model";
import mongoose from "mongoose";
import User from "../../models/user.model";

const restrictToOwner = asyncHandler(async (req: any, res: any, next: any) => {
  const organisation = await Organisation.findOne({ orgOwner: req.user._id });
  if (!organisation) {
    res.status(404);
    return next(new Error("You dont own any organisation"));
  }
  // if (String(organisation.orgOwner) != req.user.id) {
  //   res.status(401);
  //   return next(new Error("You are not authorized to perform this action"));
  // }
  req.organisation = organisation;
  next();
});

const createOrganisation = asyncHandler(async (req: any, res: any) => {
  if (req.user.isOrg) {
    res.status(400);
    throw new Error("You already own an organisation");
  }

  if (
    !req.body.name ||
    !req.body.githubUrl ||
    !req.body.description ||
    !req.body.miniDescription ||
    !req.body.orgType
  ) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const newOrganisation = await Organisation.create({
    name: req.body.name,
    orgOwner: req.user._id,
    githubUrl: req.body.githubUrl,
    description: req.body.description,
    miniDescription: req.body.miniDescription,
    orgType: req.body.orgType,
  });
  const organisation = await newOrganisation.save();
  const user = await User.findByIdAndUpdate(
    String(req.user._id),
    { isOrg: true },
    { new: true }
  );
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
    if (req.organisation.isAccepted !== "ACCEPTED") {
      res.status(401);
      return next(
        new Error(
          "You are not authorized to perform this action as your organization is not yet verified"
        )
      );
    }
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

export {
  createOrganisation,
  getAllOrganisations,
  getOrganisation,
  getOrganisationProjects,
  createOrganisationProject,
  restrictToOwner,
};
