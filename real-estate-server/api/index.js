import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose
  .connect(
    "mongodb+srv://tkkundlas:tkkundlas@mern-estate.kn2mgyi.mongodb.net/mern-estate?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Conected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// middleware

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
