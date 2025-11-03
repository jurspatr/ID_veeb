const express = require("express");
const router = express.Router();
const { visitRegister, visitRegisterPost, visitLog } = require("../controllers/visitsControllers");

router.route("/").get(visitRegister).post(visitRegisterPost);
router.route("/log").get(visitLog);

module.exports = router;