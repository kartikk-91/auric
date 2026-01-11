import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'

const FooterSection = () => {
  return (
    <div className='mt-20 pt-26 bg-[#111111] h-fit w-full text-white flex flex-col items-center gap-16'>
      <div className='w-full h-fit flex flex-col items-center gap-6'>
        <div className='font-switzer text-6xl font-semibold flex gap-2'>
          Start your 7-day
          <div className='bg-[linear-gradient(90deg,#ff2e2e_0%,#ee7b16_36.2773%,#8a43e1_69.7515%,#d510fc_100%)] inline-block bg-clip-text text-transparent'>
            <span>free trial</span>
          </div>
        </div>
        <div className='text-[#808080] text-lg'>
          Start your free trial now to experience seamless project management without any commitment!
        </div>
        <div className='w-fit h-14 bg-[#1e1e1e] rounded-lg flex gap-2 items-center pl-2 mt-4'>
          <Input placeholder='Enter your email' className='w-84 text-[16px]' />
          <Link href={'/signup'}>
            <Button variant={'white'} className='h-full text-lg'>
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      <div className='w-full max-w-7xl h-[1px] bg-[#3d3d3d]'></div>
      <div className='w-full max-w-6xl flex justify-between'>
        <div className=''>
          <Image
            src={'/auric.svg'}
            alt='auric'
            width={150}
            height={150}
          />
          <span className='text-2xl text-[#808080] font-semibold'>
            Simplifying Projects and <br /> Achieving Goals.
          </span>
        </div>
        <div className='flex flex-col gap-4'>
          <span className='font-semibold text-xl mb-2'>Home</span>
          {
            ['Features', 'Pricing', 'About', 'Comparison'].map((item, index) => {
              return <span key={index} className='text-[#808080] font-semibold text-[17px]'>{item}</span>
            })
          }
        </div>
        <div className='flex flex-col gap-4'>
          <span className='font-semibold text-xl mb-2'>Socials</span>
          {
            ['linkedin', 'x', 'instagram'].map((item, index) => {
              return <span key={index} className='text-[#808080] font-semibold text-[17px] capitalize flex gap-2 bg-[#1e1e1e] rounded-md px-2 py-2'>
                <Image
                  src={`/icons/${item}.svg`}
                  alt='whisper'
                  width={25}
                  height={25}
                />
                {item === 'x' ? 'twitter / X' : item}
              </span>
            })
          }
        </div>
      </div>
      <div className='w-full max-w-7xl h-[1px] bg-[#3d3d3d]'></div>
      <div className='w-full max-w-7xl h-12 flex items-center justify-center -mt-10 mb-10 text-[#808080] font-semibold'>
        <span> © 2025 Auric. All rights reserved.</span>
      </div>
    </div>
  )
}

export default FooterSection
