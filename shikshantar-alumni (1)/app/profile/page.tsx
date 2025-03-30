"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { logout } from "@/app/actions/auth-actions"
import { Mail, Phone, Linkedin, MapPin, Briefcase, GraduationCap, Tag, Users } from "lucide-react"
import Image from "next/image"

export default function Profile() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="container py-10 flex justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Card className="bg-white/90 sticky top-24">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-shikshantar-yellow">
                  <Image
                    src={user.image || "/placeholder.svg?height=150&width=150"}
                    alt={user.name}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-shikshantar-black">{user.name}</h2>
                <p className="text-gray-600">Shikshu {user.batch}</p>
                <p className="text-gray-700 mt-2">{user.job}</p>

                <div className="mt-6 w-full">
                  <Button
                    variant="outline"
                    className="w-full border-shikshantar-black text-shikshantar-black hover:bg-shikshantar-black/10 mb-2"
                    onClick={() => router.push("/profile/edit")}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-red-500 text-red-500 hover:bg-red-50"
                    onClick={async () => {
                      await logout()
                    }}
                  >
                    Log Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white/90 mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="connections">Connections</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card className="bg-white/90">
                <CardHeader>
                  <CardTitle className="text-xl text-shikshantar-black">About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{user.bio}</p>
                </CardContent>
              </Card>

              <Card className="bg-white/90">
                <CardHeader>
                  <CardTitle className="text-xl text-shikshantar-black">Education & Career</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="text-shikshantar-yellow mt-1" />
                    <div>
                      <h3 className="font-semibold text-shikshantar-black">Education</h3>
                      <p className="text-gray-700">{user.education}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Briefcase className="text-shikshantar-yellow mt-1" />
                    <div>
                      <h3 className="font-semibold text-shikshantar-black">Current Position</h3>
                      <p className="text-gray-700">{user.job}</p>
                      {user.company && <p className="text-gray-600">{user.company}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90">
                <CardHeader>
                  <CardTitle className="text-xl text-shikshantar-black">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="text-shikshantar-yellow" />
                    <p className="text-gray-700">{user.email}</p>
                  </div>

                  {user.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="text-shikshantar-yellow" />
                      <p className="text-gray-700">{user.phone}</p>
                    </div>
                  )}

                  {user.linkedin && (
                    <div className="flex items-center gap-3">
                      <Linkedin className="text-shikshantar-yellow" />
                      <a
                        href={`https://${user.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {user.linkedin}
                      </a>
                    </div>
                  )}

                  {user.location && (
                    <div className="flex items-center gap-3">
                      <MapPin className="text-shikshantar-yellow" />
                      <p className="text-gray-700">{user.location}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/90">
                <CardHeader>
                  <CardTitle className="text-xl text-shikshantar-black">Interests & Committees</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Tag className="text-shikshantar-yellow mt-1" />
                    <div>
                      <h3 className="font-semibold text-shikshantar-black">Interests</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {user.interests.map((interest, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-shikshantar-yellow/20 rounded-full text-shikshantar-black text-sm"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {user.committees && user.committees.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Users className="text-shikshantar-yellow mt-1" />
                      <div>
                        <h3 className="font-semibold text-shikshantar-black">Committees at Shikshantar</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {user.committees.map((committee, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-shikshantar-yellow/20 rounded-full text-shikshantar-black text-sm"
                            >
                              {committee}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activities">
              <Card className="bg-white/90">
                <CardHeader>
                  <CardTitle className="text-xl text-shikshantar-black">Recent Activities</CardTitle>
                  <CardDescription>Your interactions with the Shikshantar community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-gray-600">No recent activities to show.</p>
                    <Button
                      className="mt-4 bg-shikshantar-yellow text-shikshantar-black hover:bg-shikshantar-yellow/80"
                      onClick={() => router.push("/buzzboard")}
                    >
                      Explore Buzzboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="connections">
              <Card className="bg-white/90">
                <CardHeader>
                  <CardTitle className="text-xl text-shikshantar-black">My Connections</CardTitle>
                  <CardDescription>Fellow Shikshu you've connected with</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-gray-600">You haven't connected with any alumni yet.</p>
                    <Button
                      className="mt-4 bg-shikshantar-yellow text-shikshantar-black hover:bg-shikshantar-yellow/80"
                      onClick={() => router.push("/grove")}
                    >
                      Find Alumni in The Grove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

