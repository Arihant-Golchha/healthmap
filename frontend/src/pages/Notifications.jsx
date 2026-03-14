import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Bell, Check, CheckCheck, Trash2, ArrowLeft, Clock, FileText, CheckCircle2 } from "lucide-react"
import logo from "../assets/logo.png"
import API from "../services/api"

export default function Notifications() {
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchNotifications()
    }, [])

    const fetchNotifications = async () => {
        try {
            const res = await API.get("/patient/notifications", {
                headers: { Authorization: localStorage.getItem("token") }
            })
            const fetchedNotifications = res.data.notifications;
            setNotifications(fetchedNotifications)

            // Auto mark all as read if there are unread notifications
            if (fetchedNotifications.some(n => !n.isRead)) {
                await markAllAsRead();
            }
        } catch (err) {
            console.error("Failed to fetch notifications", err)
        } finally {
            setLoading(false)
        }
    }

    const markAsRead = async (id) => {
        try {
            await API.put(`/patient/notifications/${id}/read`, {}, {
                headers: { Authorization: localStorage.getItem("token") }
            })
            setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n))
        } catch (err) {
            console.error("Failed to mark as read", err)
        }
    }

    const markAllAsRead = async () => {
        try {
            await API.put("/patient/notifications/read-all", {}, {
                headers: { Authorization: localStorage.getItem("token") }
            })
            setNotifications(notifications.map(n => ({ ...n, isRead: true })))
        } catch (err) {
            console.error("Failed to mark all as read", err)
        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-4">
                            <Link to="/patient" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                <ArrowLeft className="h-5 w-5 text-slate-600" />
                            </Link>
                            <div className="flex items-center gap-2">
                                <img src={logo} alt="Logo" className="h-8 w-8" />
                                <span className="text-xl font-bold text-teal-900 hidden sm:block">HEALTHMAP</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={markAllAsRead}
                                className="text-sm font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1 bg-teal-50 px-3 py-1.5 rounded-lg transition-colors"
                            >
                                <CheckCheck className="h-4 w-4" />
                                Mark all as read
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-3xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <Bell className="h-6 w-6 text-teal-600" />
                            Notifications
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">Stay updated with your reports and records</p>
                    </div>
                    <span className="px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-xs font-bold">
                        {notifications.filter(n => !n.isRead).length} Unread
                    </span>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600"></div>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                        <Bell className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900">No notifications yet</h3>
                        <p className="text-slate-500 mt-2">We'll notify you when your reports are ready</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notifications.map((notification) => (
                            <div
                                key={notification._id}
                                className={`p-4 rounded-2xl border transition-all duration-200 ${notification.isRead
                                    ? "bg-white border-slate-200 opacity-80"
                                    : "bg-white border-teal-100 shadow-md ring-1 ring-teal-500/10"
                                    }`}
                            >
                                <div className="flex gap-4">
                                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${notification.type === 'VERIFICATION' ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                                        }`}>
                                        {notification.type === 'VERIFICATION' ? <CheckCircle2 className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className={`text-sm font-semibold ${notification.isRead ? "text-slate-700" : "text-slate-900"}`}>
                                                {notification.type === 'VERIFICATION' ? "Report Verified" : "New Report Uploaded"}
                                            </p>
                                            <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">
                                                {formatDate(notification.createdAt)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed mb-3">
                                            {notification.message}
                                        </p>
                                        <div className="flex items-center gap-3">
                                            {!notification.isRead && (
                                                <button
                                                    onClick={() => markAsRead(notification._id)}
                                                    className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 px-2 py-1 bg-teal-50 rounded-md transition-colors"
                                                >
                                                    <Check className="h-3 w-3" />
                                                    Mark as read
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
