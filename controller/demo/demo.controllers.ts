import demoModel from "../../models/demo/demo.model";

const demoController = async (req: any, res: any) => {
  const newDemo = await demoModel.create({
    content: "asdfjdsjf",
  });
  await newDemo.save();

  return res.status(500).json({
    message: "This is a demo route :) ",
  });
};

export { demoController };
