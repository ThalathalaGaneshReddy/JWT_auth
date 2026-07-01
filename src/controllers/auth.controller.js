const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/auth.model");
const generateTokensAndSendResponse = require("../utils/generateTokens");
const { ACCESS_TOKEN_EXPIRE_TIME } = require("../utils/constants");

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exsitingUser = await userModel.findOne({ email });
    if (exsitingUser) {
      res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const owner = await userModel.create({
      name,
      email,
      phoneNumber,
      hostelName,
      hostelAddress,
      password: hashedPassword,
    });
    generateTokensAndSendResponse(res, owner, "User registered successfully");
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exsitingUser = await userModel.findOne({ email });
    if (exsitingUser) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        exsitingUser.password,
      );
      if (isPasswordCorrect) {
        generateTokensAndSendResponse(
          res,
          exsitingUser,
          "User logged in successfully",
        );
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const RefreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log("refreshtoken===", refreshToken);
  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  const accessToken = jwt.sign(
    { id: decoded.id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRE_TIME },
  );
  res.status(200).json({
    success: true,
    message: "Token generated",
    accessToken,
  });
};

module.exports = { Register, Login, RefreshToken };
