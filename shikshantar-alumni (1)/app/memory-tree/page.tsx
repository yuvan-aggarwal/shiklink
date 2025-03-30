"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Apple, Play, Calendar, Tag, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

// Sample memory data
const memoriesData = [
  {
    id: 1,
    type: "image",
    title: "Annual Day 2019",
    description: "Students performing a classical dance during the Annual Day celebrations.",
    date: "December 15, 2019",
    category: "Events",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    type: "video",
    title: "Science Exhibition",
    description:
      "Innovative projects by students at the annual Science Exhibition showcasing their creativity and scientific thinking.",
    date: "February 20, 2020",
    category: "Academics",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    type: "image",
    title: "Sports Day",
    description: "Athletes in action during the inter-house athletics competition.",
    date: "November 5, 2018",
    category: "Sports",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    type: "image",
    title: "Art Workshop",
    description: "Students exploring their creativity during a special art workshop conducted by a visiting artist.",
    date: "March 10, 2021",
    category: "Arts",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    type: "video",
    title: "School Tour",
    description:
      "A virtual tour of our beautiful campus showcasing the learning spaces, playgrounds, and natural surroundings.",
    date: "July 1, 2022",
    category: "Campus",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    type: "image",
    title: "Graduation Day",
    description: "Proud moments as the batch of 2018 graduates and moves on to the next chapter of their lives.",
    date: "April 30, 2018",
    category: "Milestones",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 7,
    type: "image",
    title: "Nature Camp",
    description: "Students connecting with nature during the annual overnight camp in the Aravalli hills.",
    date: "October 12, 2019",
    category: "Excursions",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 8,
    type: "video",
    title: "Alumni Reunion",
    description: "Emotional reunions and joyful reminiscing at the first official alumni gathering.",
    date: "January 8, 2020",
    category: "Alumni",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function MemoryTree() {
  const [memories, setMemories] = useState(memoriesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [yearFilter, setYearFilter] = useState("")
  const [selectedMemory, setSelectedMemory] = useState(null)

  const handleSearch = () => {
    let results = memoriesData

    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (memory) =>
          memory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          memory.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (categoryFilter) {
      results = results.filter((memory) => memory.category === categoryFilter)
    }

    // Filter by year
    if (yearFilter) {
      results = results.filter((memory) => memory.date.includes(yearFilter))
    }

    setMemories(results)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setCategoryFilter("")
    setYearFilter("")
    setMemories(memoriesData)
  }

  const openMemory = (memory) => {
    setSelectedMemory(memory)
  }

  const closeMemory = () => {
    setSelectedMemory(null)
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-2">
          <Apple size={32} className="text-shikshantar-yellow" />
          <h1 className="text-4xl font-bold text-shikshantar-black">Memory Tree</h1>
        </div>
        <p className="text-lg text-shikshantar-black bg-white/70 p-4 rounded-md max-w-2xl mx-auto">
          Revisit cherished moments from Shikshantar's history through our collection of photos and videos. Each memory
          is a fruit of our collective journey.
        </p>
      </div>

      <Card className="bg-white/90">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search Memories</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by title or description..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Events">Events</SelectItem>
                  <SelectItem value="Academics">Academics</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                  <SelectItem value="Campus">Campus</SelectItem>
                  <SelectItem value="Milestones">Milestones</SelectItem>
                  <SelectItem value="Excursions">Excursions</SelectItem>
                  <SelectItem value="Alumni">Alumni</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                  <SelectItem value="2019">2019</SelectItem>
                  <SelectItem value="2018">2018</SelectItem>
                  <SelectItem value="2017">2017</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2">
              <Button
                className="bg-shikshantar-yellow text-shikshantar-black hover:bg-shikshantar-yellow/80"
                onClick={handleSearch}
              >
                Search
              </Button>
              <Button
                variant="outline"
                className="border-shikshantar-black text-shikshantar-black hover:bg-shikshantar-black/10"
                onClick={resetFilters}
              >
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="memory-gallery">
        {memories.length > 0 ? (
          memories.map((memory) => (
            <div key={memory.id} className="memory-item cursor-pointer" onClick={() => openMemory(memory)}>
              <div className="relative aspect-video">
                <Image src={memory.image || "/placeholder.svg"} alt={memory.title} fill className="object-cover" />
                {memory.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-shikshantar-black/50 rounded-full p-3">
                      <Play size={24} className="text-shikshantar-yellow" />
                    </div>
                  </div>
                )}
              </div>
              <div className="memory-content">
                <h3 className="text-lg font-bold text-shikshantar-black">{memory.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1 mb-2">
                  <Calendar size={14} />
                  <span>{memory.date}</span>
                  <Tag size={14} className="ml-2" />
                  <span>{memory.category}</span>
                </div>
                <p className="text-gray-700 line-clamp-2">{memory.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white/80 rounded-lg">
            <p className="text-lg text-gray-600">No memories found matching your criteria.</p>
            <Button
              className="mt-4 bg-shikshantar-yellow text-shikshantar-black hover:bg-shikshantar-yellow/80"
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {selectedMemory && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative aspect-video">
              <Image
                src={selectedMemory.image || "/placeholder.svg"}
                alt={selectedMemory.title}
                fill
                className="object-cover"
              />
              {selectedMemory.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-shikshantar-black/50 rounded-full p-6 cursor-pointer hover:bg-shikshantar-black/70 transition-colors">
                    <Play size={48} className="text-shikshantar-yellow" />
                  </div>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-shikshantar-black">{selectedMemory.title}</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <Calendar size={14} />
                    <span>{selectedMemory.date}</span>
                    <Tag size={14} className="ml-2" />
                    <span>{selectedMemory.category}</span>
                  </div>
                </div>
                <Button variant="ghost" className="text-gray-500 hover:text-gray-700" onClick={closeMemory}>
                  ✕
                </Button>
              </div>
              <p className="text-gray-700 mb-6">{selectedMemory.description}</p>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="border-shikshantar-black text-shikshantar-black hover:bg-shikshantar-black/10"
                  onClick={closeMemory}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

