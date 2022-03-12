const { getAllUsers, getUser, deleteUser, updateUser, sign_in, signup } = require("../controller/user.controller");
const validateRequest = require("../../../common/middelware/validateRequest");
const isAuthoraized = require("../../../common/middelware/isAuthoraized")
const { addUserSchema, signinSchema } = require("../joi/user.Validation");
const { GET_ALL_USERS } = require("../endpoints");
const router = require("express").Router();

router.get("/users",isAuthoraized(GET_ALL_USERS), getAllUsers);
router.get("/user/:id",getUser)
router.post("/signup",validateRequest(addUserSchema), signup);
router.post("/signin", validateRequest(signinSchema), sign_in);
router.delete("/deleteUser/:id",deleteUser)
router.patch("/updateUser/:id",updateUser)

module.exports = router;
