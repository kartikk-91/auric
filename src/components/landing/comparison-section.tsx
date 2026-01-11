import Image from 'next/image';
import React from 'react'
import { Button } from '../ui/button';


export const comparison = {
  otherPlatforms: [
    "Limited Feedback Categorization",
    "Slow Insight Extraction",
    "Complex Dashboards",
    "Manual Data Entry Required",
    "Lack of Integrations",
    "No Bulk Analysis Support",
    "Scattered Feedback Management",
    "Limited Reporting & Analytics",
  ],
  auric: [
    "Everything in Free +",
    "Real-Time Feedback Insights",
    "Simple & Intuitive Dashboard",
    "Automated Feedback Processing",
    "Seamless Tool Integrations",
    "Bulk Import & Analysis Support",
    "Organized Feedback Repository",
    "Advanced Reporting & Trends",
  ],
};


const ComparisonSection = () => {
  return (
    <div className='mt-24 w-full flex justify-center items-center'>
      <div className='max-w-7xl h-fit w-full flex flex-col gap-8 items-center'>
        <div className='flex flex-col gap-4 text-center items-center'>
          <div className='w-fit h-fit px-4 py-2 bg-white rounded-4xl text-[15px] font-[500]'>
            Comparison
          </div>
          <div className='text-5xl font-semibold font-switzer leading-tight'>
            What Sets Auric Apart
          </div>
          <div className='text-[#3D3D3D] font-[500] max-w-xl'>
            Discover how Auric outperforms other platforms with superior features,
            better performance, and unmatched ease of use.
          </div>
        </div>
        <div className='w-full max-w-[950px] h-[70vh] flex gap-6 mt-12'>
          <div className='w-1/2 h-full bg-[#e8e4e2] rounded-2xl flex flex-col py-8 gap-6 items-center'>
            <div className='uppercase text-2xl font-semibold'>Other Platforms</div>
            <div className='h-[2px] w-full bg-[#efece7]'></div>
            <div className='flex flex-col gap-4 items-start w-full px-8'>
              {
                comparison.otherPlatforms.map((item, index) => {
                  return <span key={index} className='flex gap-2 text-[#4c4c4c] text-lg font-[500]'>
                    <Image src={'/icons/ng.svg'} alt="icon" width={20} height={20} />
                    {item}
                  </span>
                })
              }
            </div>
          </div>
          <div className='bg-black text-white rounded-4xl px-4 py-1 h-fit w-fit mt-8'>
            V/S
          </div>
          <div className='w-1/2 h-full p-[2px] rounded-2xl bg-[linear-gradient(180deg,#ff2f2f,#ef7b16_35.87832457397675%,#8a43e1_69.92196209587513%,#d511fd)]'>
            <div className='w-full h-full flex bg-[#ffffff] rounded-2xl  flex-col py-8 gap-6 items-center'>
              <div className='uppercase text-2xl font-semibold'>
                <Image
                  src={'/auric_lw.svg'}
                  alt='auric'
                  width={170}
                  height={200}
                />
              </div>
              <div className='h-[2px] w-full bg-[#efece7]'></div>
              <div className='flex flex-col gap-4 items-start w-full px-8'>
                {
                  comparison.auric.map((item, index) => {
                    return <span key={index} className='flex gap-2 text-[#4c4c4c] text-lg font-[500]'>
                      <Image src={'/icons/tick.svg'} alt="icon" width={20} height={20} />
                      {item}
                    </span>
                  })
                }
              </div>
            </div>
          </div>

        </div>
        <div>
          <Button className='text-lg py-7 px-6 cursor-pointer w-fit'>
            Start 7-day free trial
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ComparisonSection
