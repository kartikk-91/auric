import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

const AboutSection = () => {
  return (
    <div className='w-full h-fit flex justify-center'>
      <div className="flex mt-20 items-center max-w-7xl w-full h-[70vh] bg-white rounded-[20px]">
        <div className='w-1/2 h-full flex flex-col gap-4 p-12'>
          <div className='w-fit h-fit px-4 py-2 bg-[#f1f0ee] rounded-4xl text-[15px] font-[500]'>
            About Us
          </div>
          <div className='text-5xl font-semibold font-switzer leading-tight'>
            The Journey <br /> Behind Auric
          </div>
          <div className='text-[#3d3d3d] font-[500]'>
            At Auric, we believe in empowering businesses with AI-driven customer feedback analysis.
            Our platform is designed to transform raw feedback into actionable insights, uncover hidden trends, and drive smarter decisions.
            We help teams understand their customers better, improve experiences, and stay ahead, no matter their size or industry.
          </div>
          <div className='mt-4 flex gap-4'>
            <Button className='text-lg py-7 px-6 cursor-pointer w-fit'>
              Contact Us
            </Button>
            <div className='flex gap-2 items-center text-[16px]'>
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
              4.8 rating Average user rating
            </div>
          </div>
        </div>
        <div
          className="w-1/2 h-full p-4 rounded-2xl"
          style={{ backgroundImage: "url(/landing/about-bg.svg)" }}
        >

          <Image src={'/landing/about.png'} alt="icon" width={500} height={400} className='w-full h-full rounded-xl grayscale-75' />
        </div>
      </div>
    </div>
  )
}

export default AboutSection
