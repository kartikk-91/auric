import React from 'react'
import { GradientBackground1, GradientBackground2 } from './gradient-background'

const HeroBackground = () => {
    return (
        <>
            <div className="bg-gradient-to-b from-[#f2f0ee] to-[#f2f0ee00] flex-none h-fit absolute left-0 right-0 top-0 z-1"></div>
            <GradientBackground1 />
            <GradientBackground2 />
            <div className="absolute inset-x-0 top-0 flex items-center content-center flex-row flex-nowrap gap-0 h-full justify-start overflow-visible p-0 flex-none z-1">
                {Array.from({ length: 24 }).map((_, i) => (
                    <div
                        key={i}
                        className="relative h-full w-px flex-[1_0_0] backdrop-blur-[25px] bg-gradient-to-l from-[#f2f0ee33] to-[#f2f0ee00] border-r border-[rgba(255,255,255,0.1)] border-solid vertical-block"
                    ></div>
                ))}
            </div>

            <div className="flex-none inset-0 mix-blend-overlay opacity-50 absolute">
                <div className="absolute rounded-[inherit] inset-0 bg-repeat bg-left-top bg-[length:128px_auto] bg-[url('/landing/overlay.png')] border-0">
                </div>
            </div>
        </>
    )
}

export default HeroBackground
