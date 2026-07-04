// middleware/roleMiddleware.js

exports.role = (...roles) => {
  return (req, res, next) => {
    // req.user must come from auth middleware
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        message: "User role not found. Are you logged in?"
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role (${req.user.role}) is not allowed to access this resource`
      });
    }

    next(); // ✅ role allowed
  };
};