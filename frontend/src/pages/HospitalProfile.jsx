import React from "react";
import ProfileView from "../components/ProfileView";
import { Building2, Mail, IdCard, BadgeCheck } from "lucide-react";

const hospitalInterface = {
    title: "Hospital Profile",
    sectionTitle: "Organization Details",
    badge: "Official Health Partner",
    accentColor: "blue",
    endpoints: {
        get: "/hospital/profile",
        update: "/hospital/profile"
    },
    dataMapper: (res) => res.hospital,
    updateMapper: (updatedFields) => updatedFields,
    userNameMapper: (data) => data.name,
    headerSubtexts: [
        (data) => `Reg No: ${data.registrationNumber || "N/A"}`,
        (data) => "Institutional Provider"
    ],
    fieldOrder: ["name", "hospitalId", "registrationNumber", "email"],
    editableKeys: ["name", "registrationNumber"],
    fields: {
        name: {
            label: "Hospital Name",
            icon: <Building2 className="h-4 w-4" />,
            type: "text",
            placeholder: "Enter hospital name"
        },
        hospitalId: {
            label: "Hospital ID",
            icon: <BadgeCheck className="h-4 w-4" />,
            mono: true,
            required: false
        },
        registrationNumber: {
            label: "Registration Number",
            icon: <IdCard className="h-4 w-4" />,
            type: "text",
            placeholder: "Enter registration number"
        },
        email: {
            label: "Email Address",
            icon: <Mail className="h-4 w-4" />,
            required: false
        }
    }
};

export default function HospitalProfile() {
    return <ProfileView role="hospital" config={hospitalInterface} />;
}
