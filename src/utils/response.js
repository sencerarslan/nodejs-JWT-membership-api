class Response {
  constructor(data = null, message = null, status) {
    this.data = data;
    this.message = message;
    this.status = status;
  }

  // Başarılı cevap gönderme
  success(res) {
    return res.status(200).json({
      success: true,
      data: this.data,
      message: this.message ?? "işlem başarılı",
    });
  }

  // Yaratılan (created) cevap gönderme
  created(res) {
    return res.status(201).json({
      success: true,
      data: this.data,
      message: this.message ?? "işlem başarılı",
    });
  }

  // 500 (Internal Server Error) hatası
  error500(res) {
    return res.status(500).json({
      success: false,
      data: this.data,
      message: this.message ?? "işlem başarısız",
    });
  }

  // 400 (Bad Request) hatası
  error400(res) {
    return res.status(400).json({
      success: false,
      data: this.data,
      message: this.message ?? "işlem başarısız",
    });
  }

  // 401 (Unauthorized) hatası
  error401(res) {
    return res.status(401).json({
      success: false,
      data: this.data,
      message: this.message ?? "Lütfen oturum açın",
    });
  }

  // 404 (Not Found) hatası
  error404(res) {
    return res.status(404).json({
      success: false,
      data: this.data,
      message: this.message ?? "İşlem başarısız",
    });
  }

  // 429 (Too Many Requests) hatası
  error429(res) {
    return res.status(429).json({
      success: false,
      data: this.data,
      message: this.message ?? "Çok fazla istek alındı",
    });
  }
}

module.exports = Response;
