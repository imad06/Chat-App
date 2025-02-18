import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours en millisecondes
    httpOnly: true, // Empêche les attaques XSS
    sameSite: "None", 
    secure: true, // Toujours utiliser HTTPS
  });

  return token;
};
