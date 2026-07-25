import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#0B0D14] border-t border-[#262B3A] px-6 py-6 font-['Inter',sans-serif]">
      <p className="text-center text-[13px] text-white">
        Built for Digital Heroes Training Task ·{" "}
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E8722C] hover:text-[#F0955A] underline underline-offset-2 transition-colors"
        >
          digitalheroesco.com
        </a>
      </p>
    </footer>
  );
}

export default Footer