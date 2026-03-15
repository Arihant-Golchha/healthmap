import React from "react";
import ProfileView from "../components/ProfileView";
import { User, FileText, Key, Calendar, Phone, Mail, BadgeCheck } from "lucide-react";

const patientInterface = {
    title: "My Profile",
    sectionTitle: "Personal Information",
    accentColor: "teal",
    endpoints: {
        get: "/patient/dashboard",
        update: "/patient/profile"
    },
    // Map backend response to the structure data object needs
    dataMapper: (backendData) => ({
        ...backendData,
        reportCount: `${backendData.reports?.length || 0} reports`
    }),
    // How to update local state after a successful PUT
    updateMapper: (updatedFields) => updatedFields,
    userNameMapper: (data) => data.name,
    headerSubtexts: [
        (data) => data.gender || "Gender not specified",
        (data) => `ID: ${data.medicalId || "Not Assigned"}`
    ],
    fieldOrder: ["name", "gender", "medicalId", "doctorAccessCode", "dob", "phoneNumber", "email", "reportCount"],
    editableKeys: ["name", "gender", "phoneNumber", "email", "dob"],
    fields: {
        name: {
            label: "Full Name",
            icon: <User className="h-4 w-4" />,
            type: "text",
            placeholder: "Enter full name"
        },
        gender: {
            label: "Gender",
            icon: <User className="h-4 w-4" />,
            type: "select",
            options: ["Male", "Female", "Other", "Prefer not to say"]
        },
        medicalId: {
            label: "Medical ID",
            icon: <BadgeCheck className="h-4 w-4" />,
            mono: true,
            required: false // Read-only but keeps consistency
        },
        doctorAccessCode: {
            label: "Doctor Access Code",
            icon: <Key className="h-4 w-4" />,
            mono: true,
            required: false
        },
        dob: {
            label: "Date of Birth",
            icon: <Calendar className="h-4 w-4" />,
            type: "date",
            format: (v) => v ? new Date(v).toLocaleDateString() : "Not specified",
            stripOnEdit: (v) => v ? new Date(v).toISOString().split("T")[0] : ""
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
            type: "email",
            placeholder: "Enter email address"
        },
        reportCount: {
            label: "Total Reports",
            icon: <FileText className="h-4 w-4" />,
            required: false
        }
    }
};

export default function PatientProfile() {
    return <ProfileView role="patient" config={patientInterface} />;
}
