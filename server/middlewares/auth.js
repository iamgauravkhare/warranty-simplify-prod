import jsonWebToken from "jsonwebtoken";

// middleware for user authentication
export const isAuthenticated = (req, res, next) => {
  try {
    const token =
      req.header("Authorization") &&
      req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found!",
      });
    }
    const tokenPayload = jsonWebToken.verify(token, process.env.JWT_SECRET_KEY);
    if (!tokenPayload) {
      return res.status(401).json({
        success: false,
        message: "Token expired!",
      });
    }
    req.user = tokenPayload;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// middleware for authorization to user for consumer services
export const isConsumer = (req, res, next) => {
  try {
    if (req.user.accountType !== "consumer") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access!",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// middleware for authorization to user for retailer services
export const isRetailer = (req, res, next) => {
  try {
    if (req.user.accountType !== "retailer") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access!",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// middleware for authorization to user for manufacturer services
export const isManufacturer = (req, res, next) => {
  try {
    if (req.user.accountType !== "manufacturer") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access! yahi haio",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};
