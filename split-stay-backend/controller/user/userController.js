import userModel from "../../model/userModel/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userExperienceModel from "../../model/userModel/userModel/userExperience.js";
import AuthSchema from "../../model/userModel/authModel.js";

export const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const UserData = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const user = await AuthSchema.findOne({
      email: req.body.email,
    });
    if (user) {
      return res.status(404).json({
        message: "User already exists",
        success: true,
        status: "success",
        data: user,
      });
    }
    return res.status(200).json({
      message: "User created successfully",
      success: true,
      status: "success",
      data: UserData,
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

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const UserData = await userModel.findOne({ email: email });
    if (!UserData) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        status: "error",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, UserData.password);

    if (isPasswordValid) {
      // Generate token
      const token = jwt.sign(
        { userId: UserData._id, email: UserData.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "User logged in successfully",
        success: true,
        status: "success",
        token: token, // Send token in response
        data: UserData,
      });
    } else {
      return res.status(401).json({
        message: "Invalid Credentials",
        success: false,
        status: "failed",
      });
    }
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

export const userExperience = async (req, res) => {
  const { email, tags } = req.body;
  try {
    const userExp = await userExperienceModel.findOne({ email: email });
    if (userExp) {
      const UserData = await userExperienceModel.findOneAndUpdate(
        { email: email },
        { $set: { tags: tags } }, // Corrected query to update only the 'tags' field
        { new: true } // This option returns the updated document
      );
      return res.status(200).json({
        message: "User Experience Updated successfully",
        success: true,
        status: "success",
        data: UserData,
      });
    }
    const UserData = await userExperienceModel.create({
      email,
      tags,
    });
    return res.status(200).json({
      message: "User Experience Created successfully",
      success: true,
      status: "success",
      data: UserData,
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

export const userExperienceUpdate = async (req, res) => {
  const { email, tags, hostedTrips, priceRange, maximumPeople } = req.body;

  try {
    const UserData = await userExperienceModel.findOneAndUpdate(
      { email: email },
      {
        tags,
        hostedTrips,
        priceRange,
        maximumPeople,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "User Experience Created successfully",
      success: true,
      status: "success",
      data: UserData,
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

export const saveUser = async (req, res) => {
  try {
    const userData = req.body;

    const user = await AuthSchema.findOne({
      uid: req.body.uid,
    });
    if (user) {
      return res.status(200).json({
        message: "User already exists",
        success: true,
        status: "success",
        data: user,
      });
    }
    const newUser = await AuthSchema.create(userData);
    res.status(201).json({ message: "User saved successfully", user: newUser });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
