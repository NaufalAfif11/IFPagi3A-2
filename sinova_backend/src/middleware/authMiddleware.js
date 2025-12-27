import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // NORMALISASI USER
    req.user = {
      id: decoded.id || decoded.user_id || decoded.id_user,
      email: decoded.email,
      role: decoded.role
    };

    if (!req.user.id) {
      return res.status(401).json({
        message: "Token tidak valid (ID user tidak ditemukan)"
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Token expired atau tidak valid"
    });
  }
};

// ✅ WAJIB ADA (ini yang tadi hilang)
export const checkRole = (allowedRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== allowedRole) {
      return res.status(403).json({ message: "Akses ditolak" });
    }
    next();
  };
};
