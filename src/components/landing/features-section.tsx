import React from 'react'
import { Feature } from '@/types/types';
import Image from 'next/image';

export const features: Feature[] = [
  {
    icon: "/icons/sentiment.svg",
    title: "Sentiment Analysis",
    description: "Detect emotions and tone behind every feedback."
  },
  {
    icon: "/icons/blue-star.svg",
    title: "Insight Dashboard",
    description: "Visualize key themes, trends, and pain points at a glance."
  },
  {
    icon: "/icons/collaboration.svg",
    title: "Collaboration",
    description: "Discuss findings with your team through shared reports and comments."
  },
  {
    icon: "/icons/ai.svg",
    title: "AI Summaries",
    description: "Get concise summaries of lengthy feedback for faster decisions."
  }
];

const FeaturesSection = () => {
  return (
    <div className='mt-24 w-full flex justify-center items-center'>
      <div className='max-w-7xl h-[80vh] w-full flex gap-6'>
        <div className='w-1/2 h-full flex flex-col gap-4'>
          <div className='w-fit h-fit px-4 py-2 bg-white rounded-4xl text-[15px] font-[500]'>
            Feedback Analysis
          </div>
          <div className='text-5xl font-semibold font-switzer leading-tight'>
            All Your Feedback, <br /> Analyzed Effortlessly
          </div>
          <div className="w-full grid grid-cols-2 gap-y-4">
            {features.map((item, index) => (
              <div
                key={index}
                className={`p-4 flex flex-col gap-1 ${index % 2 === 0 ? "border-r-1 border-[#ded8d3]" : ""
                  }`}
              >
                <div className="mb-2">
                  <Image src={item.icon} alt="icon" width={30} height={30} />
                </div>
                <div className="text-xl font-semibold">{item.title}</div>
                <div className="text-[#4c4c4c]">{item.description}</div>
              </div>
            ))}
          </div>

        </div>
        <div className="relative aspect-[1.0350877192982457/1] bg-[#ffffff] rounded-[20px] shadow-[0_1px_1px_#0000001a,0_3px_8px_#0000000d] flex-1 basis-0 gap-0 h-[var(--framer-aspect-ratio-supported,512px)] overflow-hidden w-[1px] will-change-[var(--framer-will-change-override,transform)]">
          <div>
            <Image src={'/landing/feature-prop-2.svg'} alt="icon" width={200} height={200} className='w-full h-full absolute left-10 top-8' />
          </div>
          <div>
            <Image src={'/landing/feature-prop-1.svg'} alt="icon" width={200} height={200} className='w-fit h-fit absolute left-6 bottom-4' />
          </div>
        </div>

      </div>
    </div>
  )
}

export default FeaturesSection
