import { Moon, ArrowRight } from "lucide-react";
import { Link, Navigate } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50">
      <nav className="mx-auto flex h-20 max-w-full border-b-2 border-b-white/10 items-center justify-between  bg-[#0D1117]/80 px-8 backdrop-blur-xl">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F97316]/10 border border-[#F97316]/20">
            {/* Temporary Logo */}
            <div className="relative h-5 w-5 rotate-45">
              <div className="absolute h-3 w-3 rounded-sm bg-[#F97316]" />
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-sm border border-[#F97316]" />
            </div>
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            Lead<span className="text-[#F97316]">Desk</span>
          </h1>
        </div>
        <div className="flex gap-4 items-center justify-center">
          {/* set the isactive condition */}
          <span className={``}>Home</span>
          <span>Contact</span>
          <span>About Us</span>
        </div>
        <div className="flex items-center justify-center gap-4">

          <button className="text-sm font-medium text-zinc-400 transition hover:text-white">
            How it works
          </button>
          <Link to='/admin'>
            <button className="group flex items-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#FB923C] hover:shadow-lg hover:shadow-orange-500/20">
              Admin Login
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button></Link>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;