const jwt = require("jsonwebtoken");
const {
  ACCESS_TOKEN_EXPIRE_TIME,
  REFRESH_TOKEN_EXPIRE_TIME,
} = require("./constants");

const generateTokensAndSendResponse = (res, owner, message) => {
  const accessToken = jwt.sign(
    {
      userId: owner._id,
      role: owner.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
    },
  );

  const refreshToken = jwt.sign(
    {
      id: owner._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
    },
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
  });

  const { password, ...ownerData } = owner.toObject();

  return res.status(200).json({
    success: true,
    message,
    accessToken,
    data: ownerData,
  });
};

module.exports = generateTokensAndSendResponse;
