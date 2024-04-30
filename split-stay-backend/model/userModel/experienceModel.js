import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    coverImage: {
      type: String,
    },
    destination: {
      type: String,
    },
    description: {
      type: String,
    },
    capacity: {
      type: Number,
    },
    reservedAccomodation: {
      type: Boolean,
    },
    price: {
      type: Number,
    },
    privacy: {
      type: Boolean,
    },
    date: {
      type: String,
    },
    availableRooms: {
      type: Number,
    },
    availableBathrooms: {
      type: Number,
    },
    duration: {
      type: String,
    },
    createrAvator: {
      type: String,
    },
    accomodationUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const experienceModel = mongoose.model("UserExperienceData", experienceSchema);

export default experienceModel;
