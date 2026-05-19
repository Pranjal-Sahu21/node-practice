import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const tokenHeader = req.headers["authorization"];
  if (!tokenHeader) return next();

  // Check if the authorization header is in the correct format
  if (!tokenHeader.startsWith("Bearer "))
    return res
      .status(401)
      .json({ error: "Invalid authorization header format!" });

  const token = tokenHeader.split(" ")[1];
  if (!token) return next();

  // Verify the token and extract user details
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token!" });
  }

  next();
};

export const ensureAuthenticated = async (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ error: "You must be authenticated to access this!" });
  }
  next();
};

export const restrictToRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role)
      return res
        .status(401)
        .json({ error: "You are not authorized to access this resource!" });

    return next();
  };
};
