const APIError = require("../utils/errors");

// Hata işleyici middleware fonksiyonu
const errorHandlerMiddleware = (err, req, res, next) => {
  // Eğer hata bir APIError ise
  if (err instanceof APIError) {
    // APIError'dan gelen statusCode (durum kodu) kullanılır veya varsayılan olarak 400 (Bad Request) atanır
    return res.status(err.statusCode || 400).json({
      success: false,
      message: err.message,
    });
  }

  // if(err.name === "CastError")

  // Diğer tüm hatalar için varsayılan olarak 500 (Internal Server Error) durum kodu kullanılır
  return res.status(500).json({
    success: false,
    message: "Bir hata ile karşılaşıldı!",
  });
};

module.exports = errorHandlerMiddleware;
