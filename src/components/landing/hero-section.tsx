import React from 'react'
import HeroBackground from './hero-background'
import { Button } from '../ui/button'
import Image from 'next/image'
import DashboardProp from './dashboard-prop'
import Link from 'next/link'

const HeroSection = () => {
    return (
        <div className='w-full h-fit pt-28 bg-[#F4F2F1]'>
            <HeroBackground />
            <div className='w-full overflow-hidden h-fit relative z-10  flex flex-col items-center gap-4 py-10'>
                <div className='py-2 px-4 flex gap-2 font-[500] bg-[#fff3] rounded-4xl border border-[#DED8D3]'>
                    <div className="bg-[linear-gradient(90deg,_rgb(255,46,46)_0%,_rgb(238,123,22)_36.2773%,_rgb(138,67,225)_69.7515%,_rgb(213,16,252)_100%)] bg-clip-text text-transparent">
                        100K+
                    </div>

                    Feedbacks Analyzed Daily with Auric
                </div>
                <div className='text-6xl font-switzer font-semibold text-center leading-tight'>
                    Turn Customer Voices <br /> into Clear Insights
                </div>
                <div className='text-[#3D3D3D] font-[500]'>
                    Get actionable insights from customer feedback with Auric.
                </div>
                <div>
                    <Link href={'/auth/signup'}>
                        <Button className='text-lg px-6 py-7 mt-5 cursor-pointer'>
                            Get Started
                        </Button>
                    </Link>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='flex gap-[2px] items-center'>
                        <span className='text-lg font-[500]'>G</span>
                        {
                            [1, 2, 3, 4].map((items, index) => {
                                return <Image
                                    key={index}
                                    src={'/icons/star.svg'}
                                    alt='star'
                                    height={15}
                                    width={15}
                                />
                            })
                        }
                        <Image

                            src={'/icons/partial-star.svg'}
                            alt='star'
                            height={15}
                            width={15}
                        />
                    </div>
                    4.8 rating Based on 50k Users
                </div>
                <DashboardProp />
            </div>
        </div>
    )
}

export default HeroSection
