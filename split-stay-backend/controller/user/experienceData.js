import experienceModel from "../../model/userModel/experienceModel.js";

export const experience = async (req, res) => {
  try {
    req.body.createdBy = req.id;
    const newExperience = await experienceModel.create(req.body);

    return res.status(201).json({
      message: "User Experience Data created successfully",
      success: true,
      status: "success",
      data: newExperience,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      status: "error",
      error: error,
    });
  }
};

// export const getAllFaq = async (req, res) => {
//   try {
//     const limit = req.query.limit || 20;
//     const page = req.query.page || 1;
//     const skip = (page - 1) * limit;
//     const faqs = await FAQs.find().skip(skip).limit(parseInt(limit));
//     if (!faqs) {
//       res.status(404).json({ notFound: "no faq in database" });
//     } else {
//       res.status(200).json({ data: faqs });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getAllExperiences = async (req, res) => {
  try {
    const experiences = await experienceModel.find();
    console.log(experiences);
    if (experiences) {
      res.status(200).json({ data: experiences });
    } else {
      res.status(404).json({ notFound: "experience not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExperienceById = async (req, res) => {
  try {
    const experience = await experienceModel.findById(req.params.id);
    if (experience) {
      res.status(200).json({ data: experience });
    } else {
      res.status(404).json({ notFound: "experience not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    // let id = req.params.id;
    const user = await experienceModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
