import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePic: {
      type: String,
    },
    uid: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const AuthSchema = mongoose.model("SplitStayAuthUser", authSchema);

export default AuthSchema;
