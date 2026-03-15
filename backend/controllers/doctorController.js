const Notification = require("../models/Notification")
const Doctor = require("../models/Doctor")
const Patient = require("../models/Patient")
const Report = require("../models/Report")

exports.verifyReport = async (req, res) => {

    const { reportId, doctorName } = req.body

    const report = await Report.findByIdAndUpdate(reportId, {
        verified: true,
        verifiedByDoctor: doctorName,
        verificationTimestamp: new Date()
    }, { new: true })

    if (report) {
        await Notification.create({
            patientId: report.patientId,
            message: `Your report (${report.reportType}) has been verified by Dr. ${doctorName}.`,
            type: 'VERIFICATION',
            reportId: report._id
        })
    }

    res.json(report)

}




exports.getPatientByAccessCode = async (req, res) => {
    try {

        const { code } = req.body

        const patient = await Patient.findOne({
            doctorAccessCode: code
        }).populate("reports")

        if (!patient) {
            return res.status(404).json({
                message: "Invalid access code"
            })
        }

        res.json(patient)

    } catch (error) {
        res.status(500).json(error)
    }
}


exports.getDoctorDashboard = async (req, res) => {
    try {
        const { accessCode } = req.body;
        const doctor = await Doctor.findById(req.user.id).populate("hospitalId", "name");

        if (!doctor) return res.status(404).json({ message: "Doctor not found" });

        const profileData = {
            name: doctor.name,
            doctorId: doctor.doctorId,
            email: doctor.email,
            specialization: doctor.specialization || "Not Specified",
            licenseNumber: doctor.licenseNumber || "Not Specified",
            phoneNumber: doctor.phoneNumber || "Not Specified",
            gender: doctor.gender || "Not Specified",
            hospitalName: doctor.hospitalId?.name || "Not Assigned"
        };

        if (!accessCode) {
            return res.json({ doctor: profileData });
        }

        const patient = await Patient.findOne({
            doctorAccessCode: accessCode
        }).populate("reports");

        if (!patient) {
            return res.status(404).json({
                doctor: profileData,
                message: "Invalid Access Code"
            });
        }

        res.json({
            doctor: profileData,
            patientName: patient.name,
            medicalId: patient.medicalId,
            reports: patient.reports
        });

    } catch (err) {
        res.status(500).json({ error: err.message || "Server Error" });
    }
};

exports.updateDoctorProfile = async (req, res) => {
    try {
        const ALLOWED = ["name", "gender", "phoneNumber"]
        const updates = {}
        for (const key of ALLOWED) {
            if (req.body[key] !== undefined) {
                updates[key] = req.body[key]
            }
        }
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: "No valid fields to update" })
        }
        const doctor = await Doctor.findByIdAndUpdate(
            req.user.id,
            { $set: updates },
            { new: true, runValidators: true }
        ).populate("hospitalId", "name")
        if (!doctor) return res.status(404).json({ error: "Doctor not found" })
        res.json({
            name: doctor.name,
            doctorId: doctor.doctorId,
            email: doctor.email,
            specialization: doctor.specialization || "Not Specified",
            licenseNumber: doctor.licenseNumber || "Not Specified",
            phoneNumber: doctor.phoneNumber || "Not Specified",
            gender: doctor.gender || "Not Specified",
            hospitalName: doctor.hospitalId?.name || "Not Assigned"
        })
    } catch (err) {
        res.status(500).json({ error: err.message || "Server Error" })
    }
}