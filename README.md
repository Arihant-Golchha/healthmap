# HealthMap 🏥

HealthMap is a modern, secure, and intuitive Healthcare Management System built using the MERN stack. It streamlines the medical reporting process by connecting Patients, Doctors, and Hospitals in a unified ecosystem with real-time notifications and secure access control.

**Live Demo**: [https://frontend-yec4.onrender.com](https://frontend-yec4.onrender.com)

---

## 🚀 Features

### 👤 For Patients
- **Profile Management**: Secure inline editing of personal details (Name, DOB, Medical ID, etc.).
- **Report History**: View all medical reports uploaded by yourself or hospitals.
- **Access Control**: Generate and regenerate unique **Doctor Access Codes** to securely share records with practitioners.
- **Notifications**: Get notified instantly when a hospital uploads a report or a doctor verifies it.

### 🩺 For Doctors
- **Practitioner Dashboard**: Access patient records securely using an Access Code.
- **Report Verification**: Professionally verify patient reports to validate medical history.
- **Institutional Identity**: Linked to verified hospitals with specialized professional profiles.

### 🏦 For Hospitals
- **Instant Registration**: Auto-verified hospital accounts for immediate platform access.
- **Seamless Uploads**: Directly upload digitized reports to a patient's profile using their Medical ID.
- **Doctor Management**: Verify and manage practitioners affiliated with the institution.

---

## 🛠️ Technology Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide React (Icons), Axios.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Authentication**: JWT (JSON Web Tokens) with Secure Middleware.
- **Media**: Cloudinary (Secure Medical Image/PDF Storage).

---

## 🏃 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance.
- Cloudinary Account.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/healthmap.git
   cd healthmap
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   ```
   Start the backend:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend` folder:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   Start the frontend:
   ```bash
   npm run dev
   ```

---

## 🛡️ Security
- **RBAC**: Strict Role-Based Access Control for all endpoints.
- **Privacy**: Patient data is only accessible to doctors when an explicit Access Code is shared.
- **File Safety**: Reports are stored securely using Cloudinary.

---

## 📄 License
Distributed under the MIT License.
