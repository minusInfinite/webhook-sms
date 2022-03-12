import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "shhhhhhhhhhhhhhhh";
const expiration = "2h";

const authMiddleware = ({ req }) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.error("Invalid token");
  }
  return req;
};

const signToken = ({ email, username, _id, isadmin }) => {
  const payload = { email, username, _id, isadmin };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

export { authMiddleware, signToken };
