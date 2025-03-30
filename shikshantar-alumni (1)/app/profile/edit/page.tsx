"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { updateUser } from "@/lib/db-service"

export default function EditProfile() {
  const { user, loading, login } = useAuth()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    batch: "",
    education: "",
    major: "",
    job: "",
    company: "",
    location: "",
    phone: "",
    linkedin: "",
    interests: "",
    committees: "",
    bio: "",
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        batch: user.batch,
        education: user.education,
        major: user.major,
        job: user.job,
        company: user.company || "",
        location: user.location || "",
        phone: user.phone || "",
        linkedin: user.linkedin || "",
        interests: user.interests.join(", "),
        committees: user.committees ? user.committees.join(", ") : "",
        bio: user.bio,
      })
    }
  }, [user, loading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    if (!user) {
      setError("You must be logged in to update your profile")
      setIsSubmitting(false)
      return
    }

    try {
      const interests = formData.interests
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean)
      const committees = formData.committees
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)

      const updatedUser = await updateUser(user.id, {
        name: formData.name,
        batch: formData.batch,
        education: formData.education,
        major: formData.major,
        job: formData.job,
        company: formData.company || undefined,
        location: formData.location || undefined,
        phone: formData.phone || undefined,
        linkedin: formData.linkedin || undefined,
        interests,
        committees,
        bio: formData.bio,
      })

      if (updatedUser) {
        login(updatedUser)
        setSuccess("Profile updated successfully")
        window.scrollTo(0, 0)
      } else {
        setError("Failed to update profile")
      }
    } catch (err) {
      console.error("Error updating profile:", err)
      setError("An error occurred while updating your profile")
    } finally {
      setIsSubmitting(false)
    }
  }

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
    <div className="container max-w-3xl py-10">
      <Card className="bg-white/90">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-shikshantar-black">Edit Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-6 bg-red-50 text-red-800 border-red-300">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-green-50 text-green-800 border-green-300">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" name="email" type="email" value={formData.email} disabled className="bg-gray-100" />
                <p className="text-xs text-gray-500">Email cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="batch">Graduation Batch *</Label>
                <Input id="batch" name="batch" value={formData.batch} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Education *</Label>
                <Input id="education" name="education" value={formData.education} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="major">Major/Specialization *</Label>
                <Input id="major" name="major" value={formData.major} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="job">Current Position *</Label>
                <Input id="job" name="job" value={formData.job} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company/Organization</Label>
                <Input id="company" name="company" value={formData.company} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={formData.location} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">Interests (comma-separated)</Label>
                <Input id="interests" name="interests" value={formData.interests} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="committees">Committees at Shikshantar (comma-separated)</Label>
                <Input id="committees" name="committees" value={formData.committees} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio *</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
                className="min-h-[150px]"
              />
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                className="border-shikshantar-black text-shikshantar-black hover:bg-shikshantar-black/10"
                onClick={() => router.push("/profile")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-shikshantar-yellow text-shikshantar-black hover:bg-shikshantar-yellow/80"
              >
                {isSubmitting ? "Saving Changes..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

