import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { Pencil, Check, X, Loader2, User } from "lucide-react";

/**
 * Common FieldCard for inline editing.
 * Works with the configuration provided in the "interface" object.
 */
function FieldCard({ fieldKey, value, cfg, isEditable, onSave, accentColor }) {
    const [editing, setEditing] = useState(false);
    const [tempVal, setTempVal] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const displayValue = cfg.format ? cfg.format(value) : (value || "Not specified");

    const startEdit = () => {
        let initial = value || "";
        if (cfg.stripOnEdit) initial = cfg.stripOnEdit(initial);
        setTempVal(initial);
        setError("");
        setEditing(true);
    };

    const cancel = () => {
        setEditing(false);
        setError("");
    };

    const save = async () => {
        if (cfg.validate && !cfg.validate(tempVal)) {
            setError(cfg.validationError || "Invalid value");
            return;
        }
        if (!tempVal.trim() && cfg.required !== false) {
            setError("Value cannot be empty");
            return;
        }
        setSaving(true);
        setError("");
        try {
            await onSave(fieldKey, tempVal);
            setEditing(false);
        } catch (err) {
            setError(err.message || "Failed to save");
        } finally {
            setSaving(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && cfg.type !== "select") save();
        if (e.key === "Escape") cancel();
    };

    const accentClasses = {
        teal: { bg: "bg-teal-600", text: "text-teal-600", lightBg: "bg-teal-50", ring: "focus:ring-teal-500" },
        indigo: { bg: "bg-indigo-600", text: "text-indigo-600", lightBg: "bg-indigo-50", ring: "focus:ring-indigo-500" },
        blue: { bg: "bg-blue-600", text: "text-blue-600", lightBg: "bg-blue-50", ring: "focus:ring-blue-500" },
    }[accentColor] || { bg: "bg-indigo-600", text: "text-indigo-600", lightBg: "bg-indigo-50", ring: "focus:ring-indigo-500" };

    return (
        <div className={`px-6 py-5 flex items-start gap-4 border-b border-slate-100 last:border-0 transition-colors ${editing ? "bg-slate-50/80" : ""}`}>
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${editing ? `${accentClasses.bg} text-white` : `${accentClasses.lightBg} ${accentClasses.text}`}`}>
                {cfg.icon}
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{cfg.label}</p>

                {editing ? (
                    <div className="space-y-2">
                        {cfg.type === "select" ? (
                            <select
                                autoFocus
                                value={tempVal}
                                onChange={e => setTempVal(e.target.value)}
                                className={`w-full max-w-xs px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 ${accentClasses.ring} bg-white text-slate-800`}
                            >
                                <option value="">Select...</option>
                                {cfg.options.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        ) : (
                            <input
                                autoFocus
                                type={cfg.type || "text"}
                                value={tempVal}
                                onChange={e => setTempVal(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={cfg.placeholder || ""}
                                className={`w-full max-w-xs px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 ${accentClasses.ring} bg-white text-slate-800`}
                            />
                        )}
                        {error && <p className="text-xs text-red-500">{error}</p>}
                        <div className="flex gap-2">
                            <button
                                onClick={save}
                                disabled={saving}
                                className={`flex items-center gap-1.5 px-3 py-1.5 ${accentClasses.bg} text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-colors disabled:opacity-60`}
                            >
                                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                                {saving ? "Saving..." : "Save"}
                            </button>
                            <button
                                onClick={cancel}
                                disabled={saving}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-600 border border-slate-200 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                <X className="h-3.5 w-3.5" />
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className={`text-slate-800 font-semibold ${cfg.mono ? `font-mono ${accentClasses.text}` : ""}`}>
                        {displayValue}
                    </p>
                )}
            </div>

            {isEditable && !editing && (
                <button
                    onClick={startEdit}
                    className={`shrink-0 p-2 rounded-lg ${accentClasses.lightBg} ${accentClasses.text} hover:opacity-80 transition-all mt-0.5`}
                    title={`Edit ${cfg.label}`}
                >
                    <Pencil className="h-3.5 w-3.5" />
                </button>
            )}
        </div>
    );
}

/**
 * Reusable ProfileView component.
 * @param {Object} props
 * @param {string} props.role - 'patient' or 'doctor'
 * @param {Object} props.config - The interface configuration object
 */
export default function ProfileView({ role, config }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const method = (config.endpoints.method || "GET").toLowerCase();
                const res = await API[method](config.endpoints.get, method === "post" ? (config.endpoints.getPayload || {}) : {});
                setData(config.dataMapper ? config.dataMapper(res.data) : res.data);
            } catch (err) {
                setError(config.errorMessage || "Failed to load profile.");
                if (err.response?.status === 401 || err.response?.status === 403) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate, config]);

    const handleSave = async (field, value) => {
        const res = await API.put(config.endpoints.update, { [field]: value });
        // Backends return different structures, so we merge or map based on config
        const updatedFields = config.updateMapper ? config.updateMapper(res.data) : res.data;
        setData(prev => ({ ...prev, ...updatedFields }));
    };

    const logout = () => { localStorage.clear(); navigate("/login"); };

    const accentClasses = {
        teal: { bg: "from-teal-500 to-teal-700", text: "text-teal-600" },
        indigo: { bg: "from-indigo-500 to-indigo-700", text: "text-indigo-600" },
        blue: { bg: "from-blue-500 to-blue-700", text: "text-blue-600" },
    }[config.accentColor] || { bg: "from-indigo-500 to-indigo-700", text: "text-indigo-600" };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className={`h-10 w-10 animate-spin ${accentClasses.text}`} />
                    <p className="text-slate-600 font-medium">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center space-y-4">
                    <p className="text-red-600">{error || "Something went wrong."}</p>
                    <button onClick={() => navigate("/login")} className={`px-6 py-2 rounded-xl text-white hover:opacity-90 transition ${accentClasses.bg.split(' ')[0].replace('from-', 'bg-')}`}>
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    const userName = config.userNameMapper ? config.userNameMapper(data) : data.name;

    return (
        <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
            <Sidebar role={role} userName={userName} activePage="profile" onLogout={logout} />

            <div className="flex-1 overflow-y-auto pt-14 lg:pt-0">
                <main className="max-w-4xl mx-auto px-4 sm:px-8 py-10">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900">{config.title || "My Profile"}</h1>
                        <p className="text-slate-500 mt-1">Click the <span className={`inline-flex items-center gap-1 ${accentClasses.text} font-medium`}><Pencil className="h-3 w-3" /> pencil icon</span> next to editable fields to update them.</p>
                    </div>

                    <div className={`bg-gradient-to-br ${accentClasses.bg} rounded-2xl p-8 mb-8 shadow-lg flex flex-col sm:flex-row items-center gap-6 text-white`}>
                        <div className="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold shrink-0">
                            {userName?.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-center sm:text-left">
                            <div className="inline-flex items-center gap-2 bg-white/20 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                                {config.badge || "Verified User"}
                            </div>
                            <h2 className="text-2xl font-bold">{userName}</h2>
                            {config.headerSubtexts && config.headerSubtexts.map((textFn, i) => (
                                <p key={i} className={`mt-1 ${i === 0 ? "opacity-90" : "opacity-75 text-sm"}`}>{textFn(data)}</p>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-2">
                            {config.sectionIcon || <User className={`h-5 w-5 ${accentClasses.text}`} />}
                            <h3 className="text-lg font-bold text-slate-800">{config.sectionTitle || "Personal Information"}</h3>
                        </div>
                        <div>
                            {config.fieldOrder.map(key => (
                                <FieldCard
                                    key={key}
                                    fieldKey={key}
                                    value={data[key]}
                                    cfg={config.fields[key]}
                                    isEditable={config.editableKeys.includes(key)}
                                    onSave={handleSave}
                                    accentColor={config.accentColor}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
