const router = require("express").Router()
const auth = require("../middleware/authMiddleware")

const {
    verifyReport,
    getPatientByAccessCode,
    getDoctorDashboard,
    updateDoctorProfile
} = require("../controllers/doctorController")

router.post("/access", auth, getPatientByAccessCode)
router.post("/verify", auth, verifyReport)
router.post("/dashboard", auth, getDoctorDashboard)
router.put("/profile", auth, updateDoctorProfile)
module.exports = router