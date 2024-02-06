const jwt = require("jsonwebtoken");
const user = require("../models/user.model");
const APIError = require("../utils/errors");

// Kullanıcıya JWT oluşturur ve yanıt olarak gönderir
const createToken = async (user, res) => {
  const payload = {
    sub: user._id,
    nam: user.name,
  };

  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return res.status(201).json({ success: true, token, message: "İşlem başarılı" });
};

// İsteğin üzerindeki tokenı kontrol eder ve kullanıcıyı doğrular
const tokenCheck = async (req, res, next) => {
  const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ");

  if (!headerToken) throw new APIError("Geçersiz oturum lütfen giriş yapınız.", 401);

  const token = req.headers.authorization.split(" ")[1];

  await jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) throw new APIError("Geçersiz token.", 401);
    const userInfo = await user
      .findById(decoded.sub)
      .collation({ locale: "en", strength: 2 })
      .select("_id name lastname email");

    if (!userInfo) throw new APIError("Geçersiz token.", 401);

    req.user = userInfo;
  });

  next();
};

// Geçici bir JWT oluşturur ve döndürür
const createTemporaryToken = async (userId, email) => {
  const payload = {
    sub: userId,
    nam: email,
  };

  const token = await jwt.sign(payload, process.env.JWT_TEMPORARY_SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: process.env.JWT_TEMPORARY_EXPIRES_IN,
  });

  return "Bearer " + token;
};

// Geçici JWT'yi çözerek kullanıcıyı döndürür
const decodedTemporaryToken = async (temporaryToken) => {
  const token = temporaryToken.split(" ")[1];

  let userInfo;

  await jwt.verify(token, process.env.JWT_TEMPORARY_SECRET_KEY, async (err, decoded) => {
    if (err) throw new APIError("Geçersiz token.", 401);
    userInfo = await user
      .findById(decoded.sub)
      .collation({ locale: "en", strength: 2 })
      .select("_id name lastname email");

    if (!userInfo) throw new APIError("Geçersiz token.", 401);
  });
  return userInfo;
};

module.exports = {
  createToken,
  tokenCheck,
  createTemporaryToken,
  decodedTemporaryToken,
};
