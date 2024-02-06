class APIError extends Error {
  // Constructor fonksiyon, hata mesajı ve durum kodu alır
  constructor(message, statusCode) {
    super(message);
    // Durum kodunu ayarla, eğer durum kodu belirtilmemişse varsayılan olarak 400 (Bad Request) kullanılır
    this.statusCode == statusCode || 400;
  }
}

module.exports = APIError;
