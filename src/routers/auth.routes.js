const router = require("express").Router();
const {
  login,
  register,
  me,
  getAllUsers,
  forgetPassword,
  resetCodeCheck,
  resetPassword,
} = require("../controllers/auth.controller");

// Auth validation middleware'inden giriş ve kayıt işlemleri için doğrulamayı al
const authValidation = require("../middlewares/validations/auth.validation");
// Auth middleware'inden token doğrulamasını al
const { tokenCheck } = require("../middlewares/auth");

// Rotaları tanımla
router.post("/login", authValidation.login, login);
router.post("/register", authValidation.register, register);
router.get("/me", tokenCheck, me);
router.get("/users", tokenCheck, getAllUsers);
router.post("/forget-password", forgetPassword);
router.post("/reset-code-check", resetCodeCheck);
router.post("/reset-password", resetPassword);

module.exports = router;
