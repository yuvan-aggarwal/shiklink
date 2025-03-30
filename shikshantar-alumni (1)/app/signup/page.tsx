"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signUp } from "@/app/actions/auth-actions"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function SignUp() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await signUp(formData)

    if (result.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    if (result.success && result.user) {
      login(result.user)
      router.push("/profile")
    }
  }

  const nextStep = () => {
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  return (
    <div className="container max-w-3xl py-10">
      <Card className="bg-white/90">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-shikshantar-black">
            Join the Shikshantar Alumni Network
          </CardTitle>
          <CardDescription>
            Create your profile to connect with fellow Shikshu and stay updated with school events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-6 bg-red-50 text-red-800 border-red-300">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" name="name" required placeholder="Your full name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" name="email" type="email" required placeholder="your.email@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Create a secure password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="batch">Graduation Batch *</Label>
                  <Input id="batch" name="batch" required placeholder="e.g., 2010" />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-shikshantar-yellow text-shikshantar-black hover:bg-shikshantar-yellow/80"
                  >
                    Next: Education & Career
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="education">Education *</Label>
                  <Input
                    id="education"
                    name="education"
                    required
                    placeholder="e.g., B.Tech, Computer Science, IIT Delhi"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="major">Major/Specialization *</Label>
                  <Input id="major" name="major" required placeholder="e.g., Computer Science" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job">Current Position *</Label>
                  <Input id="job" name="job" required placeholder="e.g., Software Engineer" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input id="company" name="company" placeholder="e.g., Google" />
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className="border-shikshantar-black text-shikshantar-black hover:bg-shikshantar-black/10"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-shikshantar-yellow text-shikshantar-black hover:bg-shikshantar-yellow/80"
                  >
                    Next: Contact & Personal
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" placeholder="e.g., Delhi, India" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" placeholder="e.g., +91 9876543210" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input id="linkedin" name="linkedin" placeholder="e.g., linkedin.com/in/yourname" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests">Interests (comma-separated)</Label>
                  <Input id="interests" name="interests" placeholder="e.g., Technology, Photography, Travel" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="committees">Committees at Shikshantar (comma-separated)</Label>
                  <Input id="committees" name="committees" placeholder="e.g., Sports Committee, Cultural Committee" />
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className="border-shikshantar-black text-shikshantar-black hover:bg-shikshantar-black/10"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-shikshantar-yellow text-shikshantar-black hover:bg-shikshantar-yellow/80"
                  >
                    Next: Bio
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio *</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    required
                    placeholder="Tell us about your journey after Shikshantar, your achievements, and how your school years shaped your path."
                    className="min-h-[150px]"
                  />
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className="border-shikshantar-black text-shikshantar-black hover:bg-shikshantar-black/10"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-shikshantar-yellow text-shikshantar-black hover:bg-shikshantar-yellow/80"
                  >
                    {loading ? "Creating Account..." : "Complete Sign Up"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-shikshantar-black font-medium hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

