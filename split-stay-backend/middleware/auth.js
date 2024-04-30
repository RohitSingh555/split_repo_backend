import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../model/userModel/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  // get token //
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // decode the token //
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const id = decoded.userId;
      req.id = id;
      const user = await User.findById(id).select("-password");
      req.user = user;

      next();
    } catch (err) {
      res.status(401).json({
        sucess: false,
        massage: "Not Authorized, Token Failed",
      });
      throw new Error("Not Authorized, Token Failed");
    }
  }

  if (!token) {
    res.status(401).json({
      sucess: false,
      massage: "Not Authorized To Access This Route",
    });
    throw new Error("Not Authorized To Access This Route");
  }
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
