const router = require("express").Router();
const auth = require("./auth.routes");

// Auth rotalarını bu ana router'a ekleyerek kullanımını sağla
router.use(auth);

module.exports = router;
