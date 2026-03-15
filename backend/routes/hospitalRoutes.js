const router = require("express").Router()

const upload = require("../middleware/upload")
const auth = require("../middleware/authMiddleware")

const {
    uploadHospitalReport,
    getPendingDoctors,
    verifyDoctor,
    rejectDoctor,
    getHospitalReports,
    deleteHospitalReport,
    getHospitalProfile,
    updateHospitalProfile
} = require("../controllers/hospitalController")

// Hospital auth middleware
const hospitalAuth = (req, res, next) => {
    auth(req, res, () => {
        if (req.user.role !== 'hospital') {
            return res.status(403).json({ error: "Hospital access denied" });
        }
        next();
    });
};

router.post("/upload", hospitalAuth, upload.single("file"), uploadHospitalReport)
router.get("/pending-doctors", hospitalAuth, getPendingDoctors)
router.put("/verify-doctor", hospitalAuth, verifyDoctor)
router.delete("/reject-doctor", hospitalAuth, rejectDoctor)
router.get("/my-reports", hospitalAuth, getHospitalReports)
router.delete("/report/:id", hospitalAuth, deleteHospitalReport)
router.get("/profile", hospitalAuth, getHospitalProfile)
router.put("/profile", hospitalAuth, updateHospitalProfile)

module.exports = router