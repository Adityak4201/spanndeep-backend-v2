const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth");
const {
  RegisterValidator,
  RegisterAdminValidator,
  LoginValidator,
  GetUserProfileValidator,
} = require("../middleware/validators");
const auth = require("../middleware/auth");
router.get("/me", auth, AuthController.GetMyProfile);
router.post("/login", LoginValidator, AuthController.Login);
router.post("/register", RegisterValidator, AuthController.Register);
router.post("/profile", GetUserProfileValidator, AuthController.GetUserProfile);
router.post(
  "/register-admin",
  RegisterAdminValidator,
  AuthController.RegisterAdmin
);
module.exports = router;
