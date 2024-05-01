import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/userRoutes/userRoutes.js";
import passport from "passport";
import session from "express-session";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(morgan("common"));

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, {})
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

// Initialize express-session middleware
app.use(
  session({
    secret: "d4e9edc309c76bf53617012d5e0365b9", // Change this to your actual secret
    resave: false,
    saveUninitialized: false,
  })
);

// app.use(
//   passport.session({
//     secret: "key",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false,
//     },
//   })
// );

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", userRoutes);

// Configure Facebook strategy
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: "439849725302529",
//       clientSecret: "d4e9edc309c76bf53617012d5e0365b9",
//       callbackURL: "http://localhost:3000/auth/facebook/callback",
//       profileFields: ["id", "displayName", "emails"],
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       // You can customize what to do with the user profile here
//       const email =
//         profile.emails && profile.emails.length > 0
//           ? profile.emails[0].value
//           : null;
//       return cb(null, { profile, email });
//     }
//   )
// );

// Serialize and Deserialize user
// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (obj, done) {
//   done(null, obj);
// });

// Define routes for Facebook authentication
// app.get("/auth/facebook", passport.authenticate("facebook"));

// app.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", { failureRedirect: "/login" }),
//   async function (req, res) {
//     // Successful authentication, create user data
//     // const UserData = await userModel.create({
//     //   fullName: req.user.displayName,
//     //   email: req.user,
//     // });
//     console.log(req.user);
//     // Send JSON response
//     res.redirect("http://localhost:5173/authemail");
//   }
// );

// app.get("/logout", function (req, res) {
//   req.logout();
//   res.redirect("/");
// });

// Start the server
app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

export default app;
