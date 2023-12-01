import jwt from "jsonwebtoken";

export const authentication = (req, res, next) => {
  let token;
  if (!req.headers["authorization"]) {
    return res
      .status(401)
      .json({ message: "Authorization header is required" });
  }
  token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, process.env.JSON_SIGN_SECRET, function (err, decoded) {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Invalid token" });
    } else {
      req.user = decoded;
      next();
    }
  });
};
