import React from 'react'
import Stats from '../hero/Stats'
import HeroContent from '../hero/HeroContent'
import Form from './Form'
import { LockKeyhole, Send, Zap } from 'lucide-react'
const Second = () => {
    return (
        <div className="min-h-screen gap-4 bg-[#0B0F14]">
            <div className="flex p-9 mx-20 justify-between">
                <div className="flex flex-col gap-7">
                    <HeroContent showCta={false} showStats={false} title1="Log the details" head="No. 02 — YOUR ENTRY" />
                    <div className='w-fit flex gap-10 flex-col'>
                        <Stats icon={Send} value="One clean intake" label={`No messy threads. Just one place to \nsend your project.`} />
                        <Stats icon={Zap} value="Real humans,fast" label={`We review quickly and get back \n within a business day`}/>
                        <Stats icon={LockKeyhole} value="Secure & private" label={`Your details stay protected and \n never shared  `} />
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <Form />
                </div>
            </div>

        </div>
    )
}

export default Second