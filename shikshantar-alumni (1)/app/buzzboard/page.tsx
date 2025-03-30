"use client"

import type React from "react"

import { useState } from "react"
import { Bug } from "lucide-react"

// Sample data for notices
const noticesData = [
  {
    id: 1,
    title: "Annual Alumni Meet 2024",
    date: "May 15, 2024",
    content:
      "Join us for the Annual Alumni Meet at Shikshantar campus. Connect with old friends and make new memories! Don't forget to RSVP by May 1st. We have exciting activities planned for everyone.",
    category: "Event",
    rotation: "-2deg",
    color: "#ffeb99",
    tapeRotation: "2deg",
    hasTape: true,
  },
  {
    id: 2,
    title: "Career Mentorship Program",
    date: "June 10, 2024",
    content:
      "Calling all Shikshu 2010-2015! We need mentors for our current students. Share your professional journey and guide the next generation. Sign up today to make a difference!",
    category: "Opportunity",
    rotation: "1.5deg",
    color: "#c2f0c2",
    tapeRotation: "-1deg",
    hasPushpin: true,
  },
  {
    id: 3,
    title: "School Foundation Day",
    date: "July 5, 2024",
    content:
      "Celebrate Shikshantar's Foundation Day with cultural performances and a special address by our founder. Join us for this special occasion as we honor our roots and celebrate our growth.",
    category: "Celebration",
    rotation: "-1.5deg",
    color: "#ffcccc",
    tapeRotation: "1.5deg",
    hasTape: true,
  },
  {
    id: 4,
    title: "Alumni Sports Tournament",
    date: "August 20, 2024",
    content:
      "Relive your school days with our annual sports tournament. Cricket, basketball, and more! Register your team now. Prizes to be won and memories to be made!",
    category: "Sports",
    rotation: "2deg",
    color: "#cce6ff",
    hasPushpin: true,
  },
  {
    id: 5,
    title: "Fundraising for New Library",
    date: "September 12, 2024",
    content:
      "We're expanding our library facilities. Contribute to help build a better learning environment for current Shikshu. Every donation, big or small, makes a difference in shaping young minds.",
    category: "Fundraising",
    rotation: "-3deg",
    color: "#e6ccff",
    tapeRotation: "-2deg",
    hasTape: true,
  },
  {
    id: 6,
    title: "Shikshantar Art Exhibition",
    date: "October 5, 2024",
    content:
      "Alumni artists are invited to showcase their work at our annual art exhibition. Submit your entries by September 15. Let's celebrate the creative spirit of Shikshantar together!",
    category: "Arts",
    rotation: "1deg",
    color: "#ffd9cc",
    hasPushpin: true,
  },
]

export default function Buzzboard() {
  const [notices, setNotices] = useState(noticesData)
  const [filter, setFilter] = useState("All")

  const categories = ["All", "Event", "Opportunity", "Celebration", "Sports", "Fundraising", "Arts"]

  const filteredNotices = filter === "All" ? notices : notices.filter((notice) => notice.category === filter)

  return (
    <div className="space-y-12">
      <div className="text-center space-y-6">
        <div className="flex justify-center items-center gap-3">
          <Bug size={40} className="text-shikshantar-yellow animate-bounce" />
          <h1 className="text-5xl font-bold text-shikshantar-black">Buzzboard</h1>
          <Bug size={40} className="text-shikshantar-yellow animate-bounce" />
        </div>
        <p className="text-lg text-shikshantar-black bg-white/70 p-6 rounded-xl shadow-md max-w-3xl mx-auto">
          Stay updated with the latest events, opportunities, and announcements from Shikshantar. The Buzzboard is your
          connection to what's happening at your alma mater.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-6 py-3 rounded-full text-base font-medium transition-all transform hover:scale-105 ${
              filter === category
                ? "bg-shikshantar-yellow text-shikshantar-black shadow-md"
                : "bg-white/80 text-shikshantar-black hover:bg-shikshantar-yellow/50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="bulletin-board rounded-lg p-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className="notice"
              style={
                {
                  "--rotation": notice.rotation,
                  backgroundColor: notice.color,
                  "--tape-rotation": notice.tapeRotation || "0deg",
                } as React.CSSProperties
              }
            >
              {notice.hasTape && <div className="tape tape-top"></div>}

              {notice.hasPushpin && <div className="pushpin pushpin-red"></div>}

              <h3 className="text-2xl font-bold text-shikshantar-black mb-3 mt-4">{notice.title}</h3>
              <div className="flex justify-between items-center mt-2 mb-4">
                <span className="text-sm font-medium text-gray-700">{notice.date}</span>
                <span className="text-xs px-3 py-1 bg-white/50 rounded-full text-shikshantar-black font-medium">
                  {notice.category}
                </span>
              </div>
              <p className="text-gray-800 leading-relaxed">{notice.content}</p>

              {!notice.hasTape && !notice.hasPushpin && <div className="pushpin pushpin-yellow"></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

