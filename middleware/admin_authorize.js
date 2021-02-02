const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = function (req, res, next) {
    // Get token from header
    const token_admin = req.header("jwt_token_admin");
  
    // Check if not token
    if (!token_admin) {
      return res.status(403).json({ msg: "authorization denied no admin" });
    }
  
    // Verify token
    try {
      //it is going to give use the user id (user:{id: user.id})
      const verify = jwt.verify(token_admin, process.env.jwtSecret);
  
      req.user = verify.user;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Admin Token is not valid" });
    }
  };