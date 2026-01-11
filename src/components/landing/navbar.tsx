import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from "react";
import Link from 'next/link';


const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const controls = useAnimation()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  useEffect(() => {
    if (scrollY > 50) {
      controls.start({
        height: '75px',
        marginTop: '16px',
        backgroundColor: 'white',
        width: '70%',
        transition: {
          duration: 0.2
        }
      })
    }
    else {
      controls.start({
        marginTop: '10px',
        backgroundColor: 'transparent',
        width: '80%',
        transition: {
          duration: 0.2
        }
      })
    }
  })
  return (
    <div className='fixed w-full h-fit z-20 flex justify-center'>
      <motion.div animate={controls} className='w-[80%] mt-4 h-16 rounded-xl px-4 flex items-center justify-between '>
        <div>
          <Image
            src={'/auric_lw.svg'}
            alt='auric'
            width={130}
            height={130}
          />
        </div>
        <div>
          <ul className='flex gap-5'>
            {
              ['Home', 'Features', 'Pricing', 'About', 'Comparison'].map((item, index) => {
                return <li key={index} className='text-[17px] font-[500] h-fit rounded-md px-3 py-2 cursor-pointer hover:bg-[#fbf8f6] transition-all duration-300'>{item}</li>
              })
            }
          </ul>
        </div>
        <div className='flex gap-4'>
          <Button variant={'outline'} className='text-[17px] py-6 cursor-pointer'>
            Contact us
          </Button>
          <Link href={'/auth/signup'}>
            <Button className='text-[17px] py-6 cursor-pointer'>
              Get Started
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default Navbar
