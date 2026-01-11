"use client"
import { FeatureCriticismRadar } from "@/components/dashboard/charts/feature-critcism"
import { TrendingTopicsRadar } from "@/components/dashboard/charts/feature-trends"
import { RatingChart } from "@/components/dashboard/charts/rating-chart"
import { SentimentDistribution } from "@/components/dashboard/charts/sentiment-distribution"
import { Star, BarChart, Activity } from "lucide-react"
import { useState } from "react"


const DashboardPage = () => {
  const [activeRadarTab, setActiveRadarTab] = useState<"trending" | "criticism">(
    "trending"
  )

  return (
    <div className="min-h-screen w-full pt-16 h-fit bg-[#E8EDEE]">
      <div className="p-8 space-y-2">
        <div className="text-2xl">
          Good evening, Kartik Pokhriyal! 👋
        </div>
        <div className="text-[#585555] text-sm">
          Welcome back to your auric dashboard
        </div>
      </div>
      <div className="flex w-full gap-6 px-8 h-fit mb-6">
        <div className="flex flex-col gap-6 w-2/3 h-fit">
          <div className="w-full flex gap-6">
            <div className="w-1/3 rounded-xl p-4 flex flex-col justify-between shadow-lg border-l-4 border-orange-500 bg-gradient-to-r from-orange-100 to-orange-50">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-orange-800">Total Feedbacks</div>
                <BarChart className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-orange-900 mt-2">240</div>
            </div>

            <div className="w-1/3 rounded-xl p-4 flex flex-col justify-between shadow-lg border-l-4 border-yellow-400 bg-gradient-to-r from-yellow-100 to-yellow-50">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-yellow-800">Average Rating</div>
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="text-3xl font-bold text-yellow-900 mt-2 flex items-center gap-1">
                4.3 <span className="text-yellow-500">⭐</span>
              </div>
            </div>

            <div className="w-1/3 rounded-xl p-4 flex flex-col justify-between shadow-lg border-l-4 border-green-500 bg-gradient-to-r from-green-100 to-green-50">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-green-800">Auric Score</div>
                <Activity className="h-6 w-6 text-green-600" />
              </div> 
              <div className="text-3xl font-bold text-green-900 mt-2">87%</div>
            </div>
          </div>

          <div className="w-full flex gap-6">
            <div className="bg-white w-1/2 px-6 h-fit rounded-xl">
              <SentimentDistribution />
            </div>
            <div className="bg-white w-1/2 h-fit px-6 py-2 rounded-xl">
              <div className="flex space-x-2  rounded-full bg-gray-100 p-1">
                <button
                  className={`flex-1 text-sm font-medium py-2 rounded-full transition ${
                    activeRadarTab === "trending"
                      ? "bg-gradient-to-r from-cyan-400 to-teal-400 text-white"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveRadarTab("trending")}
                >
                  Trending Features
                </button>
                <button
                  className={`flex-1 text-sm font-medium py-2 rounded-full transition ${
                    activeRadarTab === "criticism"
                      ? "bg-gradient-to-r from-red-400 to-red-600 text-white"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveRadarTab("criticism")}
                >
                  Feature Criticism
                </button>
              </div>

              <div>
                {activeRadarTab === "trending" && <TrendingTopicsRadar />}
                {activeRadarTab === "criticism" && <FeatureCriticismRadar />}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-1/3 h-fit rounded-xl px-4">
          <RatingChart />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

