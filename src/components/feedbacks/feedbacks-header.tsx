import { House } from 'lucide-react'
import React from 'react'

const FeedbackHeader = () => {
  return (
    <div className='w-full max-w-7xl flex items-center justify-between px-8 mx-auto h-16 mt-6 bg-white rounded-lg shadow-md'>
        <div className='text-lg font-[500]'>
            All Feedbacks
        </div>
        <div className='flex gap-2 items-center text-gray-500'>
            <House size={20}/>
            <span>{"/"}</span>
            <span className='text-sm text-[#fe4e00] border-[#fe4e0033] bg-[#fe4e001a] px-2 py-1 rounded-4xl'>
            Feedbacks
            </span>
        </div>
    </div>
  )
}

export default FeedbackHeader
