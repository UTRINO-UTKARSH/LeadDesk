import { useState } from "react";
import { User, Mail, ArrowRight } from "lucide-react";

const API_BASE = import.meta.env.CLIENT_URL || "";
function Field({ num, label, children }) {

  return (
    <div className="relative pl-7 sm:pl-9">
      <span className="absolute -left-2.5 sm:-left-3 top-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1C1512] border border-[#E8722C] text-[#E8722C] text-[11px] sm:text-xs font-semibold flex items-center justify-center">
        {num}
      </span>
      <label className="block text-[13px] text-[#8B8FA3] mb-2">{label}</label>
      {children}
    </div>
  );
}
const BUDGET_RANGES = ["< $1k", "$1k - $5k", "$5k - $20k", "$20k+"];

export default function Form() {
  const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" });
  const [status, setStatus] = useState("idle");

  async function handleSubmit(ev) {
    ev.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch(`${API_BASE}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0D14] flex items-center justify-center px-4 sm:px-6 lg:px-8 font-['Inter',sans-serif]">
      <form
        onSubmit={handleSubmit}
        className="relative w-full bg-[#151824] border border-[#262B3A] rounded-2xl px-6 py-6 sm:px-12 sm:py-8 flex flex-col gap-5"
      >
        {/* Field 01 — Name */}
        <Field num="01" label="Name">
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5B6072]" size={17} />
            <input
              value={form.name}
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Jordan Lee"
              className="w-full bg-[#1C202E] border border-[#2C3142] rounded-lg pl-10 pr-4  py-2.5 sm:py-3 text-sm sm:text-[15px] text-[#E7E8EC] placeholder-[#5B6072] outline-none transition-colors focus:border-[#E8722C] focus:ring-1 focus:ring-[#E8722C]/30"
            />
          </div>
        </Field>

        {/* Field 02 — Email */}
        <Field num="02" label="Email">
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5B6072]" size={17} />
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="jordan@company.com"
              className="w-full bg-[#1C202E] border border-[#2C3142] rounded-lg pl-10 pr-4  py-2.5 sm:py-3 text-sm sm:text-[15px] text-[#E7E8EC] placeholder-[#5B6072] outline-none transition-colors focus:border-[#E8722C] focus:ring-1 focus:ring-[#E8722C]/30"
            />
          </div>
        </Field>

        {/* Field 03 — Budget range */}
        <Field  num="03" label="Budget range">
          <div aria-required className="grid grid-cols-2 sm:flex gap-2">
            {BUDGET_RANGES.map((b) => {
              const active = form.budget === b;
              return (
                <button
                  type="button"
                  key={b}
                  onClick={() => setForm({ ...form, budget: b })}
                  className={`w-full sm:w-auto px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-[13px] font-medium border transition-colors
                    ${active
                      ? "bg-[#E8722C]/15 border-[#E8722C] text-[#F0955A]"
                      : "bg-[#1C202E] border-[#2C3142] text-[#8B8FA3] hover:border-[#3A3F52]"}`}
                >
                  {b}
                </button> 
              );
            })}
          </div>
        </Field>

        {/* Field 04 — Message */}
        <Field num="04" label="What are you building?">
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="A sentence or two on the project..."
            rows={4}
            className="w-full bg-[#1C202E] border border-[#2C3142] rounded-lg px-4  py-2.5 sm:py-3 text-sm sm:text-[15px] text-[#E7E8EC] placeholder-[#5B6072] outline-none resize-y transition-colors focus:border-[#E8722C] focus:ring-1 focus:ring-[#E8722C]/30 min-h-28 sm:min-h-24"
          />
        </Field>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-2 w-full sm:w-auto sm:self-start inline-flex justify-center items-center gap-2 bg-linear-to-b from-[#F08A3C] to-[#E8722C] text-white px-6 py-3 rounded-lg font-semibold text-sm sm:text-[15px] shadow-[0_4px_14px_rgba(232,114,44,0.35)] hover:shadow-[0_6px_18px_rgba(232,114,44,0.45)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-wait"
        >
          {status === "submitting" ? "Sending..." : "Submit entry"}
          <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
}