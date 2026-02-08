"use client"

import { useState } from "react"
import { Star, BarChart, Activity } from "lucide-react"

import { FeatureCriticismRadar } from "@/components/dashboard/charts/feature-critcism"
import { TrendingTopicsRadar } from "@/components/dashboard/charts/feature-trends"
import { RatingChart } from "@/components/dashboard/charts/rating-chart"
import { SentimentDistribution } from "@/components/dashboard/charts/sentiment-distribution"

const DashboardPage = () => {
  const [activeRadarTab, setActiveRadarTab] = useState<
    "trending" | "criticism"
  >("trending")

  return (
    <div className="min-h-screen w-full bg-[#E8EDEE] pt-16">
      
      <div className="px-4 sm:px-8 py-6 space-y-1">
        <h1 className="text-xl sm:text-2xl font-semibold">
          Good evening, Kartik Pokhriyal! 👋
        </h1>
        <p className="text-sm text-[#585555]">
          Welcome back to your Auric dashboard
        </p>
      </div>

      
      <div className="px-4 sm:px-8 pb-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="rounded-2xl p-4 shadow-lg bg-gradient-to-r from-orange-100 to-orange-50 border-l-4 border-orange-500 hover:shadow-xl transition">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-orange-800">
                  Total Feedbacks
                </span>
                <BarChart className="h-6 w-6 text-orange-600" />
              </div>
              <div className="mt-3 text-3xl font-bold text-orange-900">
                240
              </div>
            </div>

            
            <div className="rounded-2xl p-4 shadow-lg bg-gradient-to-r from-yellow-100 to-yellow-50 border-l-4 border-yellow-400 hover:shadow-xl transition">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-yellow-800">
                  Average Rating
                </span>
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="mt-3 text-3xl font-bold text-yellow-900 flex items-center gap-1">
                4.3 <span className="text-yellow-500">⭐</span>
              </div>
            </div>

            
            <div className="rounded-2xl p-4 shadow-lg bg-gradient-to-r from-green-100 to-green-50 border-l-4 border-green-500 hover:shadow-xl transition">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-800">
                  Auric Score
                </span>
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div className="mt-3 text-3xl font-bold text-green-900">
                87%
              </div>
            </div>
          </div>

          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md">
              <SentimentDistribution />
            </div>

            
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md">
              
              <div className="flex gap-2 rounded-full bg-gray-100 p-1 mb-4">
                <button
                  onClick={() => setActiveRadarTab("trending")}
                  className={`flex-1 text-sm font-medium py-2 rounded-full transition ${
                    activeRadarTab === "trending"
                      ? "bg-gradient-to-r from-cyan-400 to-teal-400 text-white"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Trending Features
                </button>

                <button
                  onClick={() => setActiveRadarTab("criticism")}
                  className={`flex-1 text-sm font-medium py-2 rounded-full transition ${
                    activeRadarTab === "criticism"
                      ? "bg-gradient-to-r from-red-400 to-red-600 text-white"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Feature Criticism
                </button>
              </div>

              
              <div className="w-full overflow-x-auto">
                {activeRadarTab === "trending" && (
                  <TrendingTopicsRadar />
                )}
                {activeRadarTab === "criticism" && (
                  <FeatureCriticismRadar />
                )}
              </div>
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md h-fit">
          <RatingChart />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
