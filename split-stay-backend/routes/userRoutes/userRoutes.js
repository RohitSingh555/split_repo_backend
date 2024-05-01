import express, { Router } from "express";
import {
  loginUser,
  registerUser,
  saveUser,
  userExperience,
  userExperienceUpdate,
} from "../../controller/user/userController.js";
import {
  experience,
  deleteExperience,
  getExperienceById,
  getAllExperiences,
} from "../../controller/user/experienceData.js";
import { protect } from "../../middleware/auth.js";
const router = Router();

//Routes Authorization

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/save-user", saveUser);

// Routes Experiences
router
  .post("/userExperience", userExperience)
  .put("/userExperienceUpdate", userExperienceUpdate);
router.post("/userExperienceForm", protect, experience);
router.delete("/delete/experience/:id", deleteExperience);
router.get("/experience/:id", getExperienceById);
router.get("/experiences", getAllExperiences);

export default router;
