import React from 'react'

const Cta = () => {
    return (
        <div className='flex py-4 gap-20'>
            <button
                className="cursor-pointer group inline-flex items-center gap-2 rounded-2xl bg-linear-to-b from-[#FF9A4D] via-[#F57C3D] to-[#E96A1C] px-8 py-4 text-lg font-semibold text-white shadow-[0_8px_30px_rgba(245,124,61,0.35)] border border-[#FFB27A]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_50px_rgba(245,124,61,0.5)] hover:brightness-105 active:translate-y-0 "
            >
                Start your entry

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                </span>
            </button>
            <button className=' group flex items-center gap-3 text-zinc-300 font-medium hover:text-white transition-all duration-300'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10'>
                    ▶
                </div>See how it works
            </button>
        </div>
    )
}

export default Cta