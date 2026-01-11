import React, { useState } from 'react'
import Toggle from './toggle'
import { PricingPlan } from '@/types/types';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';

const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    description: "Great for individuals and small teams.",
    price: {
      monthly: 0,
      yearly: 0
    },
    buttonText: "Get Started",
    features: [
      "Sentiment Analysis",
      "AI Summaries",
      "Basic Feedback Dashboard",
      "Smart Tags"
    ]
  },
  {
    name: "Pro",
    description: "Ideal for teams that need deeper insights.",
    price: {
      monthly: 25,
      yearly: 200
    },
    buttonText: "Start 7-day free trial",
    features: [
      "Everything in Free +",
      "Collaboration Tools",
      "Bulk Feedback Import",
      "Theme Detection",
      "Advanced Insights",
      "Customizable Dashboards",
      "Priority Support"
    ],
    highlighted: true
  },
  {
    name: "Enterprise",
    description: "Perfect for large organizations.",
    price: {
      monthly: 99,
      yearly: 900
    },
    buttonText: "Contact Sales",
    features: [
      "Everything in Pro +",
      "Dedicated Account Manager",
      "Custom Integrations",
      "Unlimited Feedback Data",
      "Advanced Security & Compliance",
      "Service Level Agreements (SLA)",
      "24/7 Premium Support"
    ]
  }
];



const PricingSection = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className='mt-24 w-full flex justify-center items-center'>
      <div className='max-w-7xl h-fit w-full flex flex-col gap-8 items-center'>
        <div className='flex flex-col gap-4 text-center items-center'>
          <div className='w-fit h-fit px-4 py-2 bg-white rounded-4xl text-[15px] font-[500]'>
            Pricing & Plans
          </div>
          <div className='text-5xl font-semibold font-switzer leading-tight'>
            Affordable Pricing Plans
          </div>
          <div className='text-[#3D3D3D] font-[500]'>
            Flexible, transparent pricing to support your team&apos;s productivity and growth at every stage.
          </div>
        </div>
        <div className='flex flex-col gap-4 text-center items-center'>
          <div className='flex gap-2 items-center'>
            <span className={`font-[500] ${checked ? 'text-[#808080]' : ''}`}>Billed monthly</span>
            <Toggle checked={checked} setChecked={setChecked} />
            <span className={`font-[500] ${checked ? '' : 'text-[#808080]'}`}>Billed yearly</span>
          </div>
          <div></div>
        </div>
        <div className='flex gap-12'>
          <div className='h-[95vh] w-90 bg-[#e8e4e2] rounded-[20px]'>
            <div className="bg-[#ffffff] w-full h-1/2 rounded-[16px] shadow-[0_1px_1px_0_rgba(0,0,0,0.2),0_3px_8px_0_rgba(0,0,0,0.05)] opacity-100 p-6">
              <div className='flex flex-col gap-6'>
                <Image src={'/icons/basic.svg'} alt="icon" width={50} height={50} />
                <div className='flex flex-col gap-1'>
                  <div className="text-xl font-semibold">{pricingPlans[0].name}</div>
                  <div>{pricingPlans[0].description}</div>
                </div>
                <div className='flex gap-2 items-end'>
                  <span className='text-5xl font-semibold font-switzer'>
                    ${!checked ? pricingPlans[0].price.monthly : pricingPlans[0].price.yearly}
                  </span>
                  <span className='text-lg mb-1'>{!checked ? 'per month' : 'per year'}</span>
                </div>
                <Link href={'/signup'}>
                  <Button className='text-xl py-7 cursor-pointer'>
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-[#e8e4e2] w-full h-fit rounded-b-[20px] opacity-100 p-6 flex flex-col gap-4">
              {
                pricingPlans[0].features.map((item, index) => {
                  return <div key={index} className='flex gap-2 '>
                    <Image src={'/icons/tick.svg'} alt="icon" width={15} height={15} />
                    <span>{item}</span>
                  </div>
                })
              }
            </div>
          </div>
          <div className='h-[95vh] w-90 bg-[#e8e4e2] rounded-[20px]'>
            <div className="bg-[#ffffff] w-full h-1/2 rounded-[16px] shadow-[0_1px_1px_0_rgba(0,0,0,0.2),0_3px_8px_0_rgba(0,0,0,0.05)] opacity-100 p-6">
              <div className='flex flex-col gap-6'>
                <Image src={'/icons/premium.svg'} alt="icon" width={50} height={50} />
                <div className='flex flex-col gap-1'>
                  <div className="text-xl font-semibold">{pricingPlans[1].name}</div>
                  <div>{pricingPlans[1].description}</div>
                </div>
                <div className='flex gap-2 items-end'>
                  <span className='text-5xl font-semibold font-switzer'>
                    ${!checked ? pricingPlans[1].price.monthly : pricingPlans[1].price.yearly}
                  </span>
                  <span className='text-lg mb-1'>{!checked ? 'per month' : 'per year'}</span>
                </div>
                <Button className='text-xl py-7 cursor-pointer'>
                  Start 7-day free trial
                </Button>
              </div>
            </div>
            <div className="bg-[#e8e4e2] w-full h-fit rounded-b-[20px] opacity-100 p-6 flex flex-col gap-4">
              {
                pricingPlans[1].features.map((item, index) => {
                  return <div key={index} className='flex gap-2 '>
                    <Image src={'/icons/tick.svg'} alt="icon" width={15} height={15} />
                    <span>{item}</span>
                  </div>
                })
              }
            </div>
          </div>
          <div className='h-[95vh] w-90 bg-[#e8e4e2] rounded-[20px]'>
            <div className="bg-[#ffffff] w-full h-1/2 rounded-[16px] shadow-[0_1px_1px_0_rgba(0,0,0,0.2),0_3px_8px_0_rgba(0,0,0,0.05)] opacity-100 p-6">
              <div className='flex flex-col gap-6'>
                <Image src={'/icons/enterprise.svg'} alt="icon" width={50} height={50} />
                <div className='flex flex-col gap-1'>
                  <div className="text-xl font-semibold">{pricingPlans[2].name}</div>
                  <div>{pricingPlans[2].description}</div>
                </div>
                <div className='flex gap-2 items-end'>
                  <span className='text-5xl font-semibold font-switzer'>
                    ${!checked ? pricingPlans[2].price.monthly : pricingPlans[2].price.yearly}
                  </span>
                  <span className='text-lg mb-1'>{!checked ? 'per month' : 'per year'}</span>
                </div>
                <Button className='text-xl py-7 cursor-pointer'>
                  Start 7-day free trial
                </Button>
              </div>
            </div>
            <div className="bg-[#e8e4e2] w-full h-fit rounded-b-[20px] opacity-100 p-6 flex flex-col gap-4">
              {
                pricingPlans[2].features.map((item, index) => {
                  return <div key={index} className='flex gap-2 '>
                    <Image src={'/icons/tick.svg'} alt="icon" width={15} height={15} />
                    <span>{item}</span>
                  </div>
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingSection
