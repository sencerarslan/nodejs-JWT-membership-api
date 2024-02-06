const router = require("express").Router();
const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const moment = require("moment");

const APIError = require("../utils/errors");
const Response = require("../utils/response");
const sendEmail = require("../utils/sendMail");
const { createToken, createTemporaryToken, decodedTemporaryToken } = require("../middlewares/auth");

// Kullanıcı girişini kontrol eder ve JWT oluşturur
const login = async (req, res) => {
  const { email, password } = req.body;
  const userInfo = await user.findOne({ email }).collation({ locale: "en", strength: 2 });
  if (!userInfo) {
    throw new APIError("Email ya da Şifre hatalı", 401);
  }

  const comparePassword = await bcrypt.compare(password, userInfo.password);
  if (!comparePassword) {
    throw new APIError("Email ya da Şifre hatalı", 401);
  }

  createToken(userInfo, res);
};

// Yeni bir kullanıcı kaydeder
const register = async (req, res) => {
  const { email, password } = req.body;
  const userInfo = await user.findOne({ email }).collation({ locale: "en", strength: 2 });

  if (userInfo) {
    throw new APIError("Kullanıcı zaten var", 401);
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);

  const userSave = new user(req.body);
  await userSave
    .save()
    .then((result) => {
      return new Response(result, "Kayıt başarılı").created(res);
    })
    .catch((err) => {
      throw new APIError("Kayıt başarısız!", 400);
    });
};

// Mevcut kullanıcı bilgilerini döndürür
const me = async (req, res) => {
  return new Response(req.user).created(res);
};

// Tüm kullanıcıları getirir
const getAllUsers = async (req, res) => {
  const users = await user
    .find({})
    .collation({ locale: "en", strength: 2 })
    .select("_id name lastname email createdAt");
  console.log(users);
  return new Response(users).created(res);
};

// Şifre sıfırlama işlemi için e-posta gönderir ve veritabanında sıfırlama kodunu günceller
const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const userInfo = await user.findOne({ email }).collation({ locale: "en", strength: 2 }).select("name lastname email");

  if (!userInfo) {
    throw new APIError("Böyle bir kullanıcı yok", 401);
  }

  const resetCode = crypto.randomBytes(3).toString("hex");

  await sendEmail({
    from: process.env.EMAIL_USER,
    to: userInfo.email,
    subject: "Şifre Sıfırlama",
    html: `
    <html>
      <body>
        <h2>Şifre Sıfırlama</h2>
        <p>Merhaba,</p>
        <p>Şifrenizi sıfırlamak için aşağıdaki kodu kullanabilirsiniz:</p>
        <p>Kod: <b>${resetCode}</b></p>
        <p>İyi günler dileriz.</p>
      </body>
    </html>
  `,
  });

  await user
    .updateOne(
      { email },
      {
        reset: {
          code: resetCode,
          time: moment(new Date()).add(15, "minute").format("YYYY-MM-DD HH:mm:ss"),
        },
      }
    )
    .collation({ locale: "en", strength: 2 });
  return new Response(true, "Lütfen mail kutunuzu kontrol ediniz.").success(res);
};

// Şifre sıfırlama kodunu kontrol eder ve geçerli bir geçici JWT oluşturur
const resetCodeCheck = async (req, res) => {
  const { email, code } = req.body;
  const userInfo = await user
    .findOne({ email })
    .collation({ locale: "en", strength: 2 })
    .select("_id name lastname email reset");

  if (!userInfo) throw new APIError("Geçersiz kod", 401);

  const dbTime = moment(userInfo.reset.time);
  const nowTime = moment(new Date());
  const timeDiff = dbTime.diff(nowTime, "minutes");

  if (timeDiff <= 0 || userInfo.reset.code !== code) throw new APIError("Süresi geçmiş kod", 401);

  const temporaryToken = await createTemporaryToken(userInfo._id, userInfo.email);

  return new Response({ temporaryToken }, "3 dakika içerisinde şifre sıfırlama yapılabilir").success(res);
};

// Kullanıcının şifresini sıfırlar
const resetPassword = async (req, res) => {
  const { password, temporaryToken } = req.body;

  const decodedTokenInfo = await decodedTemporaryToken(temporaryToken);

  const hashPassword = await bcrypt.hash(password, 10);

  await user
    .findByIdAndUpdate(
      { _id: decodedTokenInfo._id },
      {
        reset: {
          code: null,
          time: null,
        },
        password: hashPassword,
      }
    )
    .collation({ locale: "en", strength: 2 })
    .select("_id name lastname email");

  return new Response({ decodedTokenInfo }, "Şifre sıfırlama başarılı").success(res);
};

module.exports = { login, register, me, getAllUsers, forgetPassword, resetCodeCheck, resetPassword };
