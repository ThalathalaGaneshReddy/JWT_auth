const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("authHeader:", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      meassage: "Access denied",
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    console.log("decoded:", decoded);
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = auth;
