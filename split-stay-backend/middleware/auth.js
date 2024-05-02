import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../model/userModel/userModel.js";
import AuthUser from "../model/userModel/authModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const id = decoded.userId;

      const user = await User.findById(id).select("-password");
      if (user) {
        req.user = user;
        return next();
      }
    } catch (err) {}
  }

  if (req.headers.authorization && req.headers.email) {
    const token = req.headers.authorization.split(" ")[1];
    const email = req.headers.email;
    const authUser = await AuthUser.findOne({ email });
    if (authUser) {
      req.user = authUser;
      return next();
    }
  }

  res.status(401).json({
    success: false,
    message: "Not Authorized, Token Missing or Invalid",
  });
});

export const authRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401);
      return res.send(
        ` ${req.user.role} Is Not Authorized To Access This Route`
      );
    }
    next();
  };
};
