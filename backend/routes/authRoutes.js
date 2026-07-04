//"/auth"
const Router = require("express");
const router = Router();

const { registerAdmin, loginUser } = require("../controllers/authController");

// register admin (only once / manually)
router.post("/register-admin", registerAdmin);

// login (for admin / teacher / student)
router.post("/login", loginUser);

// login (for admin / teacher / student)
router.post("/logout", (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out" });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;