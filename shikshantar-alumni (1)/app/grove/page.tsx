"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { TreePine, Search, Mail, Phone, Linkedin, MapPin } from "lucide-react"
import Image from "next/image"
import { getAllUsers } from "@/lib/db-service"
import type { UserProfile } from "@/lib/db-schema"
import { useAuth } from "@/contexts/auth-context"

export default function Grove() {
  const [searchTerm, setSearchTerm] = useState("")
  const [batchFilter, setBatchFilter] = useState("")
  const [fieldFilter, setFieldFilter] = useState("")
  const [alumniData, setAlumniData] = useState<UserProfile[]>([])
  const [filteredAlumni, setFilteredAlumni] = useState<UserProfile[]>([])
  const [selectedAlumni, setSelectedAlumni] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const users = await getAllUsers()
        setAlumniData(users)
        setFilteredAlumni(users)
      } catch (error) {
        console.error("Error fetching alumni:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAlumni()
  }, [])

  const handleSearch = () => {
    let results = alumniData

    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (alumni) =>
          alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alumni.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alumni.education.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alumni.interests.some((interest) => interest.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by batch
    if (batchFilter && batchFilter !== "all") {
      results = results.filter((alumni) => alumni.batch === batchFilter)
    }

    // Filter by field
    if (fieldFilter && fieldFilter !== "all") {
      results = results.filter(
        (alumni) =>
          alumni.job.toLowerCase().includes(fieldFilter.toLowerCase()) ||
          alumni.education.toLowerCase().includes(fieldFilter.toLowerCase()) ||
          alumni.major.toLowerCase().includes(fieldFilter.toLowerCase()),
      )
    }

    setFilteredAlumni(results)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setBatchFilter("")
    setFieldFilter("")
    setFilteredAlumni(alumniData)
  }

  const openAlumniProfile = (alumni: UserProfile) => {
    setSelectedAlumni(alumni)
  }

  const closeAlumniProfile = () => {
    setSelectedAlumni(null)
  }

  // Get unique batches for the filter
  const batches = [...new Set(alumniData.map((alumni) => alumni.batch))].sort(
    (a, b) => Number.parseInt(b) - Number.parseInt(a),
  )

  // Get unique fields for the filter
  const fields = [...new Set(alumniData.flatMap((alumni) => [alumni.major, ...alumni.job.split(" at ")[0].split(",")]))]
    .filter(Boolean)
    .sort()

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-2">
          <TreePine size={32} className="text-shikshantar-yellow" />
          <h1 className="text-4xl font-bold text-shikshantar-black">The Grove</h1>
        </div>
        <p className="text-lg text-shikshantar-black bg-white/70 p-4 rounded-md max-w-2xl mx-auto">
          Connect with fellow Shikshu from across batches, fields, and locations. The Grove is your gateway to the
          Shikshantar alumni network.
        </p>
        {!user && (
          <div className="bg-shikshantar-yellow/20 p-4 rounded-md max-w-2xl mx-auto">
            <p className="text-shikshantar-black font-medium">
              Join the Shikshantar Alumni Network to connect with fellow Shikshu!
            </p>
            <div className="flex justify-center gap-4 mt-3">
              <Button
                className="bg-shikshantar-yellow text-shikshantar-black hover:bg-shikshantar-yellow/80"
                onClick={() => (window.location.href = "/signup")}
              >
                Sign Up
              </Button>
              <Button
                variant="outline"
                className="border-shikshantar-black text-shikshantar-black hover:bg-shikshantar-black/10"
                onClick={() => (window.location.href = "/login")}
              >
                Log In
              </Button>
            </div>
          </div>
        )}
      </div>

      <Card className="bg-white/90">
        <CardHeader>
          <CardTitle className="text-shikshantar-black">Find Alumni</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Name, job, education..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="batch">Batch</Label>
              <Select value={batchFilter} onValueChange={setBatchFilter}>
                <SelectTrigger id="batch">
                  <SelectValue placeholder="Select batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Batches</SelectItem>
                  {batches.map((batch) => (
                    <SelectItem key={batch} value={batch}>
                      Shikshu {batch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="field">Field</Label>
              <Select value={fieldFilter} onValueChange={setFieldFilter}>
                <SelectTrigger id="field">
                  <SelectValue placeholder="Select field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fields</SelectItem>
                  {fields.map((field) => (
                    <SelectItem key={field} value={field}>
                      {field}
                    </SelectItem>
                  ))}
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

      {loading ? (
        <div className="text-center py-12 bg-white/80 rounded-lg">
          <p className="text-lg text-gray-600">Loading alumni data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.length > 0 ? (
            filteredAlumni.map((alumni) => (
              <div key={alumni.id} className="grove-card cursor-pointer" onClick={() => openAlumniProfile(alumni)}>
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <Image
                      src={alumni.image || "/placeholder.svg?height=150&width=150"}
                      alt={alumni.name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-shikshantar-black">{alumni.name}</h3>
                  <p className="text-sm text-gray-600">Shikshu {alumni.batch}</p>
                  <div className="mt-4 space-y-1 text-left w-full">
                    <p className="text-gray-700">
                      <strong>Education:</strong> {alumni.education}
                    </p>
                    <p className="text-gray-700">
                      <strong>Current:</strong> {alumni.job}
                    </p>
                  </div>
                  <Button
                    className="mt-4 bg-shikshantar-yellow text-shikshantar-black hover:bg-shikshantar-yellow/80"
                    onClick={(e) => {
                      e.stopPropagation()
                      openAlumniProfile(alumni)
                    }}
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white/80 rounded-lg">
              <p className="text-lg text-gray-600">No alumni found matching your criteria.</p>
              <Button
                className="mt-4 bg-shikshantar-yellow text-shikshantar-black hover:bg-shikshantar-yellow/80"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      )}

      {selectedAlumni && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <Image
                      src={selectedAlumni.image || "/placeholder.svg?height=150&width=150"}
                      alt={selectedAlumni.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-shikshantar-black">{selectedAlumni.name}</h2>
                    <p className="text-gray-600">Shikshu {selectedAlumni.batch}</p>
                  </div>
                </div>
                <Button variant="ghost" className="text-gray-500 hover:text-gray-700" onClick={closeAlumniProfile}>
                  ✕
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-shikshantar-black mb-2">Bio</h3>
                  <p className="text-gray-700">{selectedAlumni.bio}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-shikshantar-black mb-2">Education</h3>
                  <p className="text-gray-700">{selectedAlumni.education}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-shikshantar-black mb-2">Current Position</h3>
                  <p className="text-gray-700">{selectedAlumni.job}</p>
                  {selectedAlumni.company && <p className="text-gray-600">{selectedAlumni.company}</p>}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-shikshantar-black mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAlumni.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-shikshantar-yellow/20 rounded-full text-shikshantar-black text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-shikshantar-black mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    {selectedAlumni.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-600" />
                        <span className="text-gray-700">{selectedAlumni.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-gray-600" />
                      <a href={`mailto:${selectedAlumni.email}`} className="text-blue-600 hover:underline">
                        {selectedAlumni.email}
                      </a>
                    </div>
                    {selectedAlumni.phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-600" />
                        <a href={`tel:${selectedAlumni.phone}`} className="text-blue-600 hover:underline">
                          {selectedAlumni.phone}
                        </a>
                      </div>
                    )}
                    {selectedAlumni.linkedin && (
                      <div className="flex items-center gap-2">
                        <Linkedin size={16} className="text-gray-600" />
                        <a
                          href={`https://${selectedAlumni.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {selectedAlumni.linkedin}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button
                    className="w-full bg-shikshantar-yellow text-shikshantar-black hover:bg-shikshantar-yellow/80"
                    disabled={!user}
                    onClick={() => {
                      if (!user) {
                        window.location.href = "/login"
                      }
                      // Handle mentorship connection logic here
                    }}
                  >
                    {user ? "Connect for Mentorship" : "Log in to Connect"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

