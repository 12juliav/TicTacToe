const express = require("express");
const router = express.Router();

const APIs = require('./apis');

router.post("/user/login", APIs.login);
router.post("/user/register", APIs.register);
router.post("/user/UpdateScore", APIs.UpdateScore);

module.exports = router;