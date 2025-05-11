import jwt from "jsonwebtoken";

const secretKey = "team66";

export function verifyToken(req, res, next) {
  const authHeader = req.get("Authorization");

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secretKey, (error, payload) => {
      if (error) {
        res.status(401).send({ message: "Token is invalid" });
      }

      //console.log(req.user)
      //console.log(req.userId)
      req.userId = payload.userId;
      next();
    });
  }
}
