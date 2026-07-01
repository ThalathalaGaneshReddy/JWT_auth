const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// routes
const authRoute = require("./routes/auth.routes");

const readFiles = require("../src/fileSystem/fileRead");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON format",
    });
  }

  next();
});

app.get("/", (req, res) => {
  res.send("Node Running...");
});

app.use("/auth", authRoute);

readFiles();

module.exports = app;
