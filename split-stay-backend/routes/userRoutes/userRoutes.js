import express, { Router } from "express";
import {
  loginUser,
  registerUser,
  saveUser,
  userExperience,
  userExperienceUpdate,
} from "../../controller/user/userController.js";

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/save-user", saveUser);
router
  .post("/userExperience", userExperience)
  .put("/userExperienceUpdate", userExperienceUpdate);

export default router;
