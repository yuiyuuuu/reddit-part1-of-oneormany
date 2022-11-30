const router = require("express").Router();

module.exports = router;

//all api routes
router.use("/posts", require("./posts"));
router.use("/users", require("./users"));
router.use("/communities", require("./communities"));
router.use("/authentication", require("./authentication"));
