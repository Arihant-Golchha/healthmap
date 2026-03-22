import { Link } from "react-router-dom"
import { Shield, Users, FileText, Lock, Clock, Stethoscope, Building2, ChevronRight, CheckCircle2, User, Hospital, ArrowRight } from "lucide-react"
import logo from "../assets/logo.png"

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25),#020617_60%)]">
            {/* Navbar */}
            <header className="sticky top-0 z-50 w-full bg-black">
                <nav className="flex flex-wrap items-center justify-between px-2 md:px-0 py-2 md:py-6 max-w-7xl mx-auto w-full transition-all gap-0">
                    <Link to="/" className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start hover:opacity-90 transition-opacity">
                        <img src={logo} alt="HealthMap Logo" className="h-10 w-10 object-contain" />
                        <span className="text-2xl font-bold font-inter tracking-tight text-white">
                            HEALTHMAP
                        </span>
                    </Link>
                    <div className="justify-center">
                        <Link to="/login" className="px-5 py-1 text-sm font-medium tracking-widest text-slate-400 hover:text-teal-700 transition-colors">
                            Services
                        </Link>
                        <Link to="/login" className="px-5 py-2.5 text-sm font-medium text-slate-400 tracking-widest hover:text-teal-700 transition-colors">
                            Providers
                        </Link>
                        <Link to="/login" className="px-5 py-2.5 text-sm font-medium tracking-widest font-inter text-slate-400 hover:text-teal-700 transition-colors">
                            Hospitals
                        </Link>
                        <Link to="/login" className="px-5 py-2.5 text-sm font-medium tracking-widest text-slate-400 hover:text-teal-700 transition-colors">
                            About
                        </Link>
                    </div>
                    <div className="flex gap-2 sm:gap-4 items-center w-full sm:w-auto justify-center sm:justify-end">
                        
                        <Link to="/login" className="px-6 py-2.5 text-sm font-medium bg-[#036bac] text-white rounded-xl shadow-sm hover:bg-teal-700 hover:shadow-md transition-all duration-300 align-text-top">
                            Login
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="grow">
                {/* Hero */}
                <section className="relative px-6 md:px-12 pt-20 pb-32 overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-teal-50/50 to-blue-50/50 -z-10" />
                    <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-green-800 text-green-400 text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 bg-green-600/40">
                            <Shield className="h-4 w-4" />
                            <span>Secure Healthcare Management</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold font-manrope tracking-tight text-white mb-8 max-w-4xl leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                            Your Medical History, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004A77] to-[#CEE5FF]">Unified & Accessible</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-200 font-inter mb-12 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                            HealthMap seamlessly connects patients, doctors, and hospitals. Manage your reports, grant secure access, and take control of your healthcare journey.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                            <Link to="/register?role=patient" className="px-8 py-4 text-lg font-medium bg-gradient-to-r from-green-600/60 to-green-900/30 text-white rounded-full shadow-lg hover:bg-teal-700 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group">
                                <Users className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                Get Started 
                                <ArrowRight/>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-24 bg-[#1c1c1d]">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-xl md:text-xl font-semibold text-green-400 mb-4">ACCESS YOUR PORTAL</h2>
                            <h1 className="text-white text-5xl font-bold ">Secure Gateway</h1>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 ">
                            {[
                                {
                                    icon: <User className="text-blue-400"/>,
                                    title: "Patient",
                                    desc: "Access your health records, schedule appointments, and track your medical power",
                                    bg: "bg-blue-500/10",
                                    button: "bg-blue-500/80 hover:bg-blue-500" 
                                },
                                {
                                    icon: <Stethoscope className="text-green-400"/>,
                                    title: "Doctor",
                                    desc: "Manage patient workflows, view real-time diagnostics, and streamline clinical decision-making",
                                    bg: "bg-green-500/10",
                                    
                                    button: "bg-green-500/80 hover:bg-green-500"
                                },
                                {
                                    icon: <Hospital className="text-orange-400"/>,
                                    title: "Hospital",
                                    desc: "Enterprise level administration, maintain patient records, update Patient's Health Information",
                                    
                                    bg: "bg-orange-500/10",
                                    button: "border-2 border-orange-500/80 text-orange-500"
                                }
                            ].map((feat, idx) => (
                                <div
                                key={idx}
                                    className="bg-[#292a2b] rounded-2xl p-8 border border-white/10 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center h-full"
>
                                    <div className={`h-14 w-14  rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feat.bg}`}>
                                        {feat.icon}
                                    </div>
                                    <h3 className="text-3xl font-semibold text-slate-200 mb-3">{feat.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
                                    <button className={`mt-6 w-full py-2 rounded-xl font-medium transition-all ${feat.button}`}>
                                        LOGIN AS {feat.title.toUpperCase()}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-slate-600/50 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-slate-600/50 blur-3xl"></div>

                    <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                        <div className="mb-16 md:w-full text-center">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">How HealthMap Works</h2>
                            <p className="text-slate-400 text-lg">A simple 3-step process to taking control of your medical journey.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 relative">
                            {/* Connecting Line */}
                            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-green-600/10 via-green-600 to-transparent -z-10 border-t-2 border-dashed border-green-600/10"></div>

                            {[
                                {
                                    step: "01",
                                    title: "Register & Get IDs",
                                    desc: "Sign up as a patient. You instantly receive a unique Medical ID and a secure Doctor Access Code."
                                },
                                {
                                    step: "02",
                                    title: "Upload or Visit",
                                    desc: "Upload your past reports, or give your Medical ID to a registered Hospital to upload them for you."
                                },
                                {
                                    step: "03",
                                    title: "Share with Doctors",
                                    desc: "When visiting a specialist, share your Doctor Access Code so they can view your full history."
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="relative flex flex-col items-center text-center">
                                    <div className="h-24 w-24 bg-slate-800 border-2 border-green-600 rounded-full flex items-center justify-center text-3xl font-bold text-green-600 mb-6 shadow-[0_0_30px_rgba(20,184,166,0.2)] hover:scale-110 transition-transform z-10">
                                        {item.step}
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <h3 className="text-2xl font-bold mb-4 text-white text-center">{item.title}</h3>
                                        <p className="text-slate-400 text-lg leading-relaxed max-w-[280px] text-center mx-auto">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                
            </main>

            {/* Footer */}
            <footer className="bg-black  py-4">
                <div className="max-w-7xl mx-auto px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="HealthMap Logo" className="h-8 w-8 object-contain" />
                        <span className="text-2xl font-manrope py-1
                        font-bold text-green-600 ">
HEALTHMAP
</span>
                    </div>
                    <div className="text-sm text-slate-500">
                        © {new Date().getFullYear()} HealthMap. All rights reserved.
                    </div>
                    </div>
                    <div className="flex gap-4 text-sm font-medium text-slate-600">
                        <Link to="/login" className="hover:text-teal-600 transition-colors">CONTACT US</Link>
                        <Link to="/login" className="hover:text-teal-600 transition-colors">PRIVACY POLICY</Link>
                        <Link to="/login" className="hover:text-teal-600 transition-colors">TERMS OF SERVICES</Link>
                        
                    </div>
                    
                </div>
            </footer>
        </div>
    )
}