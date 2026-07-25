import { useState, useEffect, useCallback } from "react";
import { Search, LogOut, Lock, Mail, RefreshCw } from "lucide-react";

const STATUS_OPTIONS = ["new", "contacted", "closed"];

const STATUS_STYLES = {
  new: "bg-[#E8722C]/15 border-[#E8722C] text-[#F0955A]",
  contacted: "bg-[#2C6FE8]/15 border-[#2C6FE8] text-[#5B9BF0]",
  closed: "bg-[#3A3F52]/40 border-[#3A3F52] text-[#8B8FA3]",
};

export default function Admin() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fetchError, setFetchError] = useState("");

  // --- auth check on load ---
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/check", { credentials: "include" });
        setAuthed(res.ok);
      } catch {
        setAuthed(false);
      } finally {
        setAuthChecked(true);
      }
    })();
  }, []);

  // --- fetch leads whenever we're authed / filters change ---
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setFetchError("");
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter) params.set("status", statusFilter);

      const res = await fetch(`/api/leads?${params.toString()}`, {
        credentials: "include",
      });

      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      if (!res.ok) throw new Error("Failed to load leads");

      const data = await res.json();
      setLeads(data);
    } catch (err) {
      setFetchError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    if (authed) fetchLeads();
  }, [authed, fetchLeads]);

  // debounce search a little so we don't fire a request per keystroke
  useEffect(() => {
    if (!authed) return;
    const t = setTimeout(() => fetchLeads(), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, statusFilter]);

  async function handleLogin(ev) {
    ev.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      setAuthed(true);
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setAuthed(false);
    setLeads([]);
  }

  async function handleStatusChange(id, status) {
    // optimistic update
    setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status } : l)));
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
    } catch {
      // roll back on failure
      fetchLeads();
    }
  }

  // --- not logged in: show login form ---
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#0B0D14] flex items-center justify-center">
        <p className="text-[#8B8FA3] text-sm">Checking session...</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0B0D14] flex items-center justify-center font-['Inter',sans-serif]">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-[#151824] border border-[#262B3A] rounded-2xl px-8 py-8 flex flex-col gap-5"
        >
          <div>
            <h1 className="text-[#E7E8EC] text-xl font-semibold">Admin login</h1>
            <p className="text-[#8B8FA3] text-sm mt-1">Sign in to view submitted leads.</p>
          </div>

          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5B6072]" size={17} />
            <input
              type="email"
              required
              placeholder="admin@leaddesk.com"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              className="w-full bg-[#1C202E] border border-[#2C3142] rounded-lg pl-10 pr-4 py-2.5 text-[15px] text-[#E7E8EC] placeholder-[#5B6072] outline-none transition-colors focus:border-[#E8722C] focus:ring-1 focus:ring-[#E8722C]/30"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5B6072]" size={17} />
            <input
              type="password"
              required
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="w-full bg-[#1C202E] border border-[#2C3142] rounded-lg pl-10 pr-4 py-2.5 text-[15px] text-[#E7E8EC] placeholder-[#5B6072] outline-none transition-colors focus:border-[#E8722C] focus:ring-1 focus:ring-[#E8722C]/30"
            />
          </div>

          {loginError && <p className="text-red-400 text-sm">{loginError}</p>}

          <button
            type="submit"
            disabled={loggingIn}
            className="w-full inline-flex items-center justify-center gap-2 bg-linear-to-b from-[#F08A3C] to-[#E8722C] text-white px-6 py-2.5 rounded-lg font-semibold text-[15px] shadow-[0_4px_14px_rgba(232,114,44,0.35)] hover:shadow-[0_6px_18px_rgba(232,114,44,0.45)] transition-all disabled:opacity-70"
          >
            {loggingIn ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  // --- logged in: leads dashboard ---
  return (
    <div className="min-h-screen bg-[#0B0D14] font-['Inter',sans-serif] px-6 py-10 sm:px-12">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#E7E8EC] text-2xl font-semibold">Leads</h1>
            <p className="text-[#8B8FA3] text-sm mt-1">
              {leads.length} {leads.length === 1 ? "entry" : "entries"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-[#8B8FA3] hover:text-[#E7E8EC] text-sm border border-[#262B3A] rounded-lg px-4 py-2 transition-colors"
          >
            <LogOut size={15} />
            Log out
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5B6072]" size={17} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full bg-[#151824] border border-[#262B3A] rounded-lg pl-10 pr-4 py-2.5 text-[15px] text-[#E7E8EC] placeholder-[#5B6072] outline-none transition-colors focus:border-[#E8722C] focus:ring-1 focus:ring-[#E8722C]/30"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {["", ...STATUS_OPTIONS].map((s) => (
              <button
                key={s || "all"}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-2 rounded-lg text-[13px] font-medium border transition-colors whitespace-nowrap
                  ${
                    statusFilter === s
                      ? "bg-[#E8722C]/15 border-[#E8722C] text-[#F0955A]"
                      : "bg-[#151824] border-[#262B3A] text-[#8B8FA3] hover:border-[#3A3F52]"
                  }`}
              >
                {s ? s.charAt(0).toUpperCase() + s.slice(1) : "All"}
              </button>
            ))}
            <button
              onClick={fetchLeads}
              title="Refresh"
              className="px-3 py-2 rounded-lg border border-[#262B3A] text-[#8B8FA3] hover:border-[#3A3F52] transition-colors"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {fetchError && <p className="text-red-400 text-sm">{fetchError}</p>}

        {/* Table */}
        <div className="border border-[#262B3A] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="bg-[#151824] text-[#8B8FA3] text-[12px] uppercase tracking-wide">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Budget</th>
                  <th className="px-5 py-3 font-medium">Message</th>
                  <th className="px-5 py-3 font-medium">Received</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 && !loading && (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-[#5B6072]">
                      No leads found.
                    </td>
                  </tr>
                )}
                {leads.map((lead) => (
                  <tr key={lead._id} className="border-t border-[#262B3A] text-[#E7E8EC]">
                    <td className="px-5 py-3 whitespace-nowrap">{lead.name}</td>
                    <td className="px-5 py-3 whitespace-nowrap text-[#8B8FA3]">{lead.email}</td>
                    <td className="px-5 py-3 whitespace-nowrap text-[#8B8FA3]">{lead.budget || "—"}</td>
                    <td className="px-5 py-3 max-w-xs truncate text-[#8B8FA3]" title={lead.message}>
                      {lead.message || "—"}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-[#8B8FA3]">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        className={`text-[13px] font-medium border rounded-lg px-2.5 py-1.5 outline-none cursor-pointer ${STATUS_STYLES[lead.status]}`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s} className="bg-[#1C202E] text-[#E7E8EC]">
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}