import React from "react";
import ProfileView from "../components/ProfileView";
import { User, Stethoscope, Building2, Phone, Mail, BadgeCheck, IdCard } from "lucide-react";

/**
 * Interface configuration for the Doctor role.
 * Handles the "Dr." prefix and specific institutional fields.
 */
const doctorInterface = {
    title: "Professional Profile",
    sectionTitle: "Professional Information",
    badge: "Verified Practitioner",
    accentColor: "indigo",
    endpoints: {
        get: "/doctor/dashboard",
        method: "POST",
        getPayload: { accessCode: "" }, // Required by the controller
        update: "/doctor/profile"
    },
    dataMapper: (res) => res.doctor,
    updateMapper: (updatedFields) => updatedFields,
    userNameMapper: (data) => {
        const name = data.name || "";
        return `Dr. ${name.replace(/^Dr\.\s*/i, "")}`;
    },
    headerSubtexts: [
        (data) => data.specialization || "General Practice",
        (data) => data.hospitalName || "Affiliated Hospital"
    ],
    fieldOrder: ["name", "doctorId", "specialization", "hospitalName", "licenseNumber", "gender", "phoneNumber", "email"],
    editableKeys: ["name", "gender", "phoneNumber"],
    fields: {
        name: {
            label: "Full Name",
            icon: <User className="h-4 w-4" />,
            format: (v) => v ? `Dr. ${v.replace(/^Dr\.\s*/i, "")}` : "Not specified",
            stripOnEdit: (v) => v ? v.replace(/^Dr\.\s*/i, "") : ""
        },
        doctorId: {
            label: "Doctor ID",
            icon: <BadgeCheck className="h-4 w-4" />,
            mono: true,
            required: false
        },
        specialization: {
            label: "Specialization",
            icon: <Stethoscope className="h-4 w-4" />,
            required: false
        },
        hospitalName: {
            label: "Hospital",
            icon: <Building2 className="h-4 w-4" />,
            required: false
        },
        licenseNumber: {
            label: "License Number",
            icon: <IdCard className="h-4 w-4" />,
            mono: true,
            required: false
        },
        gender: {
            label: "Gender",
            icon: <User className="h-4 w-4" />,
            type: "select",
            options: ["Male", "Female", "Other", "Prefer not to say"]
        },
        phoneNumber: {
            label: "Phone Number",
            icon: <Phone className="h-4 w-4" />,
            type: "tel",
            placeholder: "Enter phone number"
        },
        email: {
            label: "Email Address",
            icon: <Mail className="h-4 w-4" />,
            required: false
        }
    }
};

export default function DoctorProfile() {
    return <ProfileView role="doctor" config={doctorInterface} />;
}
