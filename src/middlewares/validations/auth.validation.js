const joi = require("joi");
const APIError = require("../../utils/errors");

class authValidation {
  // Giriş isteğini doğrulama
  static login = async (req, res, next) => {
    try {
      await joi
        .object({
          email: joi.string().email().trim().min(3).max(100).required().messages({
            "string.base": "Email metin olmalıdır",
            "string.empty": "Email boş bırakılamaz",
            "string.min": "Email en az 3 karakter olmalıdır",
            "string.max": "Email en fazla 100 karakter olmalıdır",
            "string.email": "Lütfen geçerli bir email giriniz",
            "string.required": "Email zorunludur",
          }),
          password: joi.string().trim().min(6).max(36).required().messages({
            "string.base": "Şifre metin olmalıdır",
            "string.empty": "Şifre boş bırakılamaz",
            "string.min": "Şifre en az 6 karakter olmalıdır",
            "string.max": "Şifre en fazla 36 karakter olmalıdır",
            "string.required": "Şifre zorunludur",
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      console.log(error?.details);
      const err = error?.details;
      if (err && err[0].message) throw new APIError(err[0].message, 400);
      else throw new APIError("Lütfen validasyon kurallarına uyun!", 400);
    }
    next();
  };
  // Kayıt isteğini doğrulama
  static register = async (req, res, next) => {
    try {
      await joi
        .object({
          name: joi.string().trim().min(3).max(100).required().messages({
            "string.base": "İsim metin olmalıdır",
            "string.empty": "İsim boş bırakılamaz",
            "string.min": "İsim en az 3 karakter olmalıdır",
            "string.max": "İsim en fazla 100 karakter olmalıdır",
            "string.required": "İsim zorunludur",
          }),
          lastname: joi.string().trim().min(3).max(100).required().messages({
            "string.base": "Soyisim metin olmalıdır",
            "string.empty": "Soyisim boş bırakılamaz",
            "string.min": "Soyisim en az 3 karakter olmalıdır",
            "string.max": "Soyisim en fazla 100 karakter olmalıdır",
            "string.required": "Soyisim zorunludur",
          }),
          email: joi.string().email().trim().min(3).max(100).required().messages({
            "string.base": "Email metin olmalıdır",
            "string.empty": "Email boş bırakılamaz",
            "string.min": "Email en az 3 karakter olmalıdır",
            "string.max": "Email en fazla 100 karakter olmalıdır",
            "string.email": "Lütfen geçerli bir email giriniz",
            "string.required": "Email zorunludur",
          }),
          password: joi.string().trim().min(6).max(36).required().messages({
            "string.base": "Şifre metin olmalıdır",
            "string.empty": "Şifre boş bırakılamaz",
            "string.min": "Şifre en az 6 karakter olmalıdır",
            "string.max": "Şifre en fazla 36 karakter olmalıdır",
            "string.required": "Şifre zorunludur",
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      console.log(error?.details);
      const err = error?.details;
      if (err && err[0].message) throw new APIError(err[0].message, 400);
      else throw new APIError("Lütfen validasyon kurallarına uyun!", 400);
    }
    next();
  };
}

module.exports = authValidation;
