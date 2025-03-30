"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Flower, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Sample alumni data for the tree
const alumniData = [
  {
    id: 1,
    name: "Arjun Sharma",
    batch: "2010",
    image: "/placeholder.svg?height=150&width=150",
    position: { top: "30%", left: "20%" },
    testimonial:
      "Shikshantar taught me to think beyond textbooks. The project-based learning approach helped me develop problem-solving skills that I use every day as a software engineer.",
  },
  {
    id: 2,
    name: "Priya Patel",
    batch: "2012",
    image: "/placeholder.svg?height=150&width=150",
    position: { top: "15%", left: "40%" },
    testimonial:
      "The values instilled in me at Shikshantar guide my practice as a doctor. I learned empathy and patience, which are crucial when dealing with young patients.",
  },
  {
    id: 3,
    name: "Vikram Malhotra",
    batch: "2008",
    image: "/placeholder.svg?height=150&width=150",
    position: { top: "25%", left: "65%" },
    testimonial:
      "My analytical thinking was honed at Shikshantar. The teachers encouraged us to question everything, which is essential in the world of finance where I work now.",
  },
  {
    id: 4,
    name: "Neha Gupta",
    batch: "2015",
    image: "/placeholder.svg?height=150&width=150",
    position: { top: "50%", left: "30%" },
    testimonial:
      "The creative writing workshops at Shikshantar sparked my love for storytelling. Now, I help authors craft their narratives, and I owe it all to those formative years.",
  },
  {
    id: 5,
    name: "Rahul Verma",
    batch: "2005",
    image: "/placeholder.svg?height=150&width=150",
    position: { top: "60%", left: "55%" },
    testimonial:
      "Environmental consciousness was a core value at Shikshantar. The nature camps and sustainability projects inspired my career in environmental policy.",
  },
  {
    id: 6,
    name: "Ananya Reddy",
    batch: "2018",
    image: "/placeholder.svg?height=150&width=150",
    position: { top: "40%", left: "75%" },
    testimonial:
      "The freedom to express myself artistically at Shikshantar gave me the confidence to pursue fashion design. The school's emphasis on individuality shaped my design philosophy.",
  },
]

export default function Sharings() {
  const [selectedAlumni, setSelectedAlumni] = useState(null)

  const openTestimonial = (alumni) => {
    setSelectedAlumni(alumni)
  }

  const closeTestimonial = () => {
    setSelectedAlumni(null)
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-2">
          <Flower size={32} className="text-shikshantar-yellow" />
          <h1 className="text-4xl font-bold text-shikshantar-black">Sharings</h1>
        </div>
        <p className="text-lg text-shikshantar-black bg-white/70 p-4 rounded-md max-w-2xl mx-auto">
          Explore the journeys of our alumni through their testimonials. Each leaf on our Shikshantar tree represents a
          Shikshu who has grown and flourished.
        </p>
      </div>

      <div className="tree-container bg-white/80 rounded-lg p-8 relative">
        {/* Tree trunk */}
        <div className="tree-trunk"></div>

        {/* Tree branches */}
        <div
          className="tree-branch"
          style={{
            width: "120px",
            height: "10px",
            bottom: "300px",
            left: "calc(50% - 140px)",
            transform: "rotate(30deg)",
          }}
        ></div>
        <div
          className="tree-branch"
          style={{
            width: "150px",
            height: "10px",
            bottom: "250px",
            left: "calc(50% + 20px)",
            transform: "rotate(-20deg)",
          }}
        ></div>
        <div
          className="tree-branch"
          style={{
            width: "100px",
            height: "10px",
            bottom: "200px",
            left: "calc(50% - 120px)",
            transform: "rotate(15deg)",
          }}
        ></div>
        <div
          className="tree-branch"
          style={{
            width: "130px",
            height: "10px",
            bottom: "150px",
            left: "calc(50% + 10px)",
            transform: "rotate(-25deg)",
          }}
        ></div>

        {/* Alumni leaves */}
        {alumniData.map((alumni) => (
          <div
            key={alumni.id}
            className="tree-leaf"
            style={{
              top: alumni.position.top,
              left: alumni.position.left,
            }}
            onClick={() => openTestimonial(alumni)}
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                <Image
                  src={alumni.image || "/placeholder.svg"}
                  alt={alumni.name}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-semibold text-white mt-1">{alumni.name}</span>
            </div>
          </div>
        ))}

        <div className="absolute bottom-4 left-0 right-0 text-center">
          <Link href="/grove">
            <Button className="bg-shikshantar-yellow text-shikshantar-black hover:bg-shikshantar-yellow/80 inline-flex items-center gap-1">
              See More Alumni <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/90">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-shikshantar-black mb-4">Alumni Spotlight</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=150&width=150"
                    alt="Featured Alumni"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-shikshantar-black">Dr. Aditya Kapoor</h3>
                  <p className="text-sm text-gray-600">Shikshu 2000 | Neurosurgeon</p>
                </div>
              </div>
              <p className="text-gray-700">
                "My journey from Shikshantar to becoming a neurosurgeon has been incredible. The foundation of curiosity
                and perseverance that Shikshantar instilled in me has been the cornerstone of my success. I still
                remember our science teacher encouraging us to question everything and find answers through
                experimentation."
              </p>
              <Button
                variant="outline"
                className="border-shikshantar-black text-shikshantar-black hover:bg-shikshantar-black/10"
              >
                Read Full Story
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-shikshantar-black mb-4">Share Your Journey</h2>
            <p className="text-gray-700 mb-4">
              Every Shikshu has a unique story to tell. We invite you to share your journey after Shikshantar - your
              achievements, challenges, and how your school years shaped your path.
            </p>
            <p className="text-gray-700 mb-6">
              Your story could inspire current students and fellow alumni. It adds another beautiful leaf to our
              ever-growing Shikshantar tree.
            </p>
            <Button className="w-full bg-shikshantar-yellow text-shikshantar-black hover:bg-shikshantar-yellow/80">
              Submit Your Story
            </Button>
          </CardContent>
        </Card>
      </div>

      {selectedAlumni && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={selectedAlumni.image || "/placeholder.svg"}
                      alt={selectedAlumni.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-shikshantar-black">{selectedAlumni.name}</h2>
                    <p className="text-sm text-gray-600">Shikshu {selectedAlumni.batch}</p>
                  </div>
                </div>
                <Button variant="ghost" className="text-gray-500 hover:text-gray-700" onClick={closeTestimonial}>
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700">"{selectedAlumni.testimonial}"</p>
                <div className="pt-4 border-t flex justify-between">
                  <Button
                    variant="outline"
                    className="border-shikshantar-black text-shikshantar-black hover:bg-shikshantar-black/10"
                    onClick={closeTestimonial}
                  >
                    Close
                  </Button>
                  <Link href={`/grove?alumni=${selectedAlumni.id}`}>
                    <Button className="bg-shikshantar-yellow text-shikshantar-black hover:bg-shikshantar-yellow/80">
                      View Full Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

