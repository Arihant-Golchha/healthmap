import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
    LayoutDashboard, User, LogOut, Menu, X,
    Activity, Hospital, Shield, Stethoscope
} from "lucide-react"
import logo from "../assets/logo.png"

const roleConfig = {
    patient: {
        label: "Patient Portal",
        dashboardPath: "/patient",
        profilePath: "/patient/profile",
        accentFrom: "from-teal-600",
        accentTo: "to-teal-800",
        accentText: "text-teal-600",
        accentBg: "bg-teal-50",
        accentBorder: "border-teal-200",
        accentHover: "hover:bg-teal-50 hover:text-teal-700",
        accentActive: "bg-teal-600 text-white shadow-md",
        icon: <Activity className="h-5 w-5" />,
    },
    doctor: {
        label: "Doctor Portal",
        dashboardPath: "/doctor",
        profilePath: "/doctor/profile",
        accentFrom: "from-indigo-600",
        accentTo: "to-indigo-800",
        accentText: "text-indigo-600",
        accentBg: "bg-indigo-50",
        accentBorder: "border-indigo-200",
        accentHover: "hover:bg-indigo-50 hover:text-indigo-700",
        accentActive: "bg-indigo-600 text-white shadow-md",
        icon: <Stethoscope className="h-5 w-5" />,
    },
    hospital: {
        label: "Hospital Portal",
        dashboardPath: "/hospital",
        profilePath: "/hospital/profile",
        accentFrom: "from-blue-600",
        accentTo: "to-blue-800",
        accentText: "text-blue-600",
        accentBg: "bg-blue-50",
        accentBorder: "border-blue-200",
        accentHover: "hover:bg-blue-50 hover:text-blue-700",
        accentActive: "bg-blue-600 text-white shadow-md",
        icon: <Hospital className="h-5 w-5" />,
    },
}

export default function Sidebar({ role, userName, activePage, onLogout }) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const cfg = roleConfig[role] || roleConfig.patient

    const navItems = [
        {
            id: "dashboard",
            label: "Dashboard",
            path: cfg.dashboardPath,
            icon: <LayoutDashboard className="h-5 w-5" />,
        },
        {
            id: "profile",
            label: "Profile",
            path: cfg.profilePath,
            icon: <User className="h-5 w-5" />,
        },
    ]

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo + Brand */}
            <div className={`bg-gradient-to-br ${cfg.accentFrom} ${cfg.accentTo} px-5 py-6`}>
                <Link
                    to="/"
                    className="flex items-center gap-3 hover:opacity-90 transition-opacity"
                    onClick={() => setMobileOpen(false)}
                >
                    <div className="h-9 w-9 bg-white/20 rounded-xl flex items-center justify-center">
                        <img src={logo} alt="HealthMap" className="h-6 w-6 object-contain brightness-0 invert" />
                    </div>
                    <div>
                        <p className="text-white font-bold text-base leading-tight tracking-wide">HEALTHMAP</p>
                        <p className="text-white/70 text-xs font-medium">{cfg.label}</p>
                    </div>
                </Link>

                {/* User chip */}
                {userName && (
                    <div className="mt-5 flex items-center gap-2.5 bg-white/10 rounded-xl px-3 py-2.5">
                        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm shrink-0">
                            {userName.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <p className="text-white font-semibold text-sm truncate">{userName}</p>
                            <p className="text-white/60 text-xs capitalize">{role}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Nav Items */}
            <nav className="flex-1 px-3 py-5 space-y-1 bg-white">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-3">Menu</p>
                {navItems.map((item) => {
                    const isActive = activePage === item.id
                    return (
                        <Link
                            key={item.id}
                            to={item.path}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                                isActive
                                    ? cfg.accentActive
                                    : `text-slate-600 ${cfg.accentHover}`
                            }`}
                        >
                            <span className={isActive ? "text-white" : cfg.accentText}>
                                {item.icon}
                            </span>
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            {/* Logout */}
            <div className="px-3 pb-5 bg-white border-t border-slate-100 pt-3">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-150 group"
                >
                    <LogOut className="h-5 w-5 text-slate-400 group-hover:text-red-500 transition-colors" />
                    Logout
                </button>
            </div>
        </div>
    )

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden lg:flex w-64 shrink-0 flex-col h-screen sticky top-0 shadow-lg border-r border-slate-200 z-20">
                <SidebarContent />
            </aside>

            {/* Mobile top bar */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-4 py-3">
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="HealthMap" className="h-7 w-7 object-contain" />
                    <span className={`text-base font-bold ${cfg.accentText}`}>HEALTHMAP</span>
                </Link>
                <button
                    onClick={() => setMobileOpen(true)}
                    className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
                    aria-label="Open menu"
                >
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            {/* Mobile drawer overlay */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile drawer */}
            <aside
                className={`lg:hidden fixed top-0 left-0 h-full w-72 z-50 shadow-2xl transition-transform duration-300 ease-in-out ${
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="absolute top-3 right-3 z-10">
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="p-1.5 bg-white/20 rounded-lg text-white hover:bg-white/30 transition"
                        aria-label="Close menu"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <SidebarContent />
            </aside>
        </>
    )
}
