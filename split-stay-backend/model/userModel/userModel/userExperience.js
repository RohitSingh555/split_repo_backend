import mongoose from "mongoose";

const userExperienceSchema = new mongoose.Schema(
  {
    // email: {
    //   type: String,
    // },
    tags: {
      type: [String],
    },
    hostedTrips: {
      type: Boolean,
    },
    priceRange: {
      type: String,
    },
    maximumPeople: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const userExperienceModel = mongoose.model(
  "SplitStayUserExperience",
  userExperienceSchema
);

export default userExperienceModel;
