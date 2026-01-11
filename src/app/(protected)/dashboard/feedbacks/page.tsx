
import Feedbacks from '@/components/feedbacks/feedbacks'
import FeedbackHeader from '@/components/feedbacks/feedbacks-header'
import React from 'react'

const FeedbacksPage = () => {
  return (
    <div className="min-h-screen space-y-6 w-full pt-16 h-fit bg-[#E8EDEE]">
      <FeedbackHeader/>
      <Feedbacks/>
    </div>
  )
}

export default FeedbacksPage
