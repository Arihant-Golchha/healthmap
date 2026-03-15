import { useState, useEffect } from "react"
import { Search, FileText, Calendar, User, CheckCircle } from "lucide-react"
import logo from "../assets/logo.png"
import API from "../services/api"
import Sidebar from "../components/Sidebar"

export default function DoctorDashboard() {
    const [accessCode, setAccessCode] = useState("")
    const [patientData, setPatientData] = useState(null)
    const [doctorProfile, setDoctorProfile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API.post("/doctor/dashboard", { accessCode: "" })
                setDoctorProfile(res.data.doctor)
            } catch (err) {
                console.error("Failed to fetch doctor profile")
            }
        }
        fetchProfile()
    }, [])

    const doctorName = doctorProfile?.name || localStorage.getItem("userName") || "Doctor"
    const displayName = doctorName.replace(/^Dr\.\s*/i, "")

    const logout = () => {
        localStorage.clear()
        window.location = "/login"
    }

    const fetchPatientData = async (e) => {
        e.preventDefault()
        if (!accessCode) return

        setLoading(true)
        setError("")
        setPatientData(null)

        try {
            const res = await API.post("/doctor/dashboard", { accessCode })
            setPatientData(res.data)
        } catch (err) {
            setError(err.response?.data?.message || "Invalid Access Code or network error")
        } finally {
            setLoading(false)
        }
    }

    const verifyReport = async (reportId) => {
        try {
            await API.post("/doctor/verify", {
                reportId,
                doctorName: doctorName
            })
            await fetchPatientData({ preventDefault: () => { } })
        } catch (err) {
            console.error(err)
            alert("Failed to verify report")
        }
    }

    return (
        <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
            <Sidebar
                role="doctor"
                userName={`Dr. ${displayName}`}
                activePage="dashboard"
                onLogout={logout}
            />

            <div className="flex-1 overflow-y-auto pt-14 lg:pt-0">
                <main className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
                    <div className="mb-10 max-w-2xl">
                        <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
                            Welcome, Dr. {displayName}
                        </h1>
                        <p className="text-slate-500">Enter a patient's access code below to view and verify their medical reports.</p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-xl mb-10 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                        <form onSubmit={fetchPatientData} className="p-2 flex">
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-11 pr-4 py-4 border-none text-slate-800 text-lg focus:ring-0 placeholder-slate-400 outline-none"
                                    placeholder="Enter Access Code (e.g., A5G2X9)"
                                    value={accessCode}
                                    onChange={e => setAccessCode(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading || !accessCode}
                                className="bg-indigo-600 text-white font-medium px-8 py-4 rounded-xl shadow-sm hover:bg-indigo-700 transition disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                            >
                                {loading ? "Searching..." : "Search Records"}
                            </button>
                        </form>
                    </div>

                    {error && (
                        <div className="max-w-2xl bg-red-50 text-red-700 p-4 rounded-xl text-center border border-red-200 mb-6 shadow-sm">
                            {error}
                        </div>
                    )}

                    {patientData && (
                        <div className="max-w-4xl animate-in slide-in-from-bottom-4 duration-500 opacity-100">
                            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                                <div className="bg-slate-50 px-6 py-5 border-b border-slate-200">
                                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                        <User className="h-5 w-5 text-indigo-600" />
                                        Patient Profile: {patientData.patientName}
                                    </h2>
                                    <p className="text-sm text-slate-500 mt-1 pl-7">Medical ID: <span className="font-mono font-medium text-slate-700">{patientData.medicalId}</span></p>
                                </div>

                                <div className="divide-y divide-slate-100">
                                    {patientData.reports && patientData.reports.length > 0 ? (
                                        patientData.reports.map((report, idx) => (
                                            <div key={idx} className="p-6 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                                <div className="flex items-center gap-4 w-full md:w-auto">
                                                    <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                                        <FileText className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-base font-semibold text-slate-800 flex flex-wrap items-center gap-2">
                                                            {report.reportType || "General Report"}
                                                            {report.verified && (
                                                                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                                                                    <CheckCircle className="h-3 w-3" /> Verified by Dr. {report.verifiedByDoctor.replace(/^Dr\.\s*/i, '')}
                                                                </span>
                                                            )}
                                                        </h4>
                                                        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-1 sm:gap-4 text-sm text-slate-500 mt-1">
                                                            <span className="flex items-center gap-1"><User className="h-3 w-3" /> {report.uploadedBy}</span>
                                                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(report.createdAt).toLocaleDateString()} {new Date(report.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex w-full md:w-auto mt-4 md:mt-0 gap-2">
                                                    <a href={report.fileUrl} target="_blank" rel="noreferrer" className="flex-1 md:flex-none px-4 py-2 border border-slate-200 bg-white text-slate-700 hover:text-indigo-700 hover:border-indigo-300 rounded-lg text-sm font-medium transition-all text-center">
                                                        View
                                                    </a>
                                                    {!report.verified && (
                                                        <button onClick={() => verifyReport(report._id)} className="flex-1 md:flex-none px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 rounded-lg text-sm font-medium transition-all text-center">
                                                            Verify
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center text-slate-500">
                                            No reports found for this patient.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}