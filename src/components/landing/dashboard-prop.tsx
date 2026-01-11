import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion';

const DashboardProp = () => {
    const [scrollY, setScrollY] = useState(0);
    const controls = useAnimation();

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        }
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    useEffect(() => {
        if(scrollY<500){
            controls.start(
                {
                    scale: 1 + scrollY / 3000,
                    marginTop: `${20+scrollY/10}px`,
                    transition: {
                        duration: 0.4
                    }
                }
            )
        }
        else{
            controls.start(
                {
                    scale: 1.15,
                    transition: {
                        duration: 0.4
                    }
                }
            )
        }
    }, [scrollY, controls])

    return (
        <motion.div animate={controls} className='max-w-5xl overflow-hidden rounded-lg rounded-b-xl w-full h-fit mt-[20px] opacity-80 inset-0  p-1 z-[1]  flex-none bg-[linear-gradient(179deg,#ff2f2f,#ef7b16_35.87832457397675%,#8a43e1_69.92196209587513%,#d511fd)]'>
            <Image
                src={'/landing/dash-prop.png'}
                alt='dash'
                width={500}
                height={300}
                className='w-full h-[80vh] rounded-lg mb-1 object-center'
            />

        </motion.div>
    )
}

export default DashboardProp
