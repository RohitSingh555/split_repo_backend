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
} from "../../controller/user/experienceData.js";
import { protect } from "../../middleware/auth.js";
const router = Router();

//Routes file

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/save-user", saveUser);
router
  .post("/userExperience", userExperience)
  .put("/userExperienceUpdate", userExperienceUpdate);
router.post("/userExperienceForm", protect, experience);
router.delete("/delete/experience/:id", deleteExperience);
router.get("/experience/:id", getExperienceById);

export default router;
