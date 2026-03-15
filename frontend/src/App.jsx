import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PatientDashboard from "./pages/PatientDashboard"
import PatientProfile from "./pages/PatientProfile"
import DoctorDashboard from "./pages/DoctorDashboard"
import DoctorProfile from "./pages/DoctorProfile"
import HospitalUpload from "./pages/HospitalUpload"
import HospitalProfile from "./pages/HospitalProfile"
import UploadReport from "./pages/UploadReport"
import Notifications from "./pages/Notifications"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Patient Routes */}
        <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
            <Route path="/patient" element={<PatientDashboard />} />
            <Route path="/patient/profile" element={<PatientProfile />} />
            <Route path="/upload-report" element={<UploadReport />} />
            <Route path="/notifications" element={<Notifications />} />
        </Route>

        {/* Doctor Routes */}
        <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/doctor/profile" element={<DoctorProfile />} />
        </Route>

        {/* Hospital Routes */}
        <Route element={<ProtectedRoute allowedRoles={['hospital']} />}>
            <Route path="/hospital" element={<HospitalUpload />} />
            <Route path="/hospital/profile" element={<HospitalProfile />} />
        </Route>

        {/* Admin Routes */}
        {/* Admin panel removed */}

      </Routes>

    </BrowserRouter>

  )

}

export default App