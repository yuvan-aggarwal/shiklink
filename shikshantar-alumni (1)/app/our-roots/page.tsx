import { Card, CardContent } from "@/components/ui/card"
import { Sprout } from "lucide-react"
import Image from "next/image"

export default function OurRoots() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-2">
          <Sprout size={32} className="text-shikshantar-yellow" />
          <h1 className="text-4xl font-bold text-shikshantar-black">Our Roots</h1>
        </div>
        <p className="text-lg text-shikshantar-black bg-white/70 p-4 rounded-md max-w-2xl mx-auto">
          Discover the philosophy, ethos, and practices that make Shikshantar unique. Our roots run deep, nurturing
          generations of learners.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-white/90">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-shikshantar-black mb-4">Our Philosophy</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                Shikshantar was founded on the belief that education should nurture the whole child - mind, body, and
                spirit. Our name, derived from Sanskrit, means "a place of learning" - not just academic learning, but
                learning about life itself.
              </p>
              <p className="text-gray-700">
                We believe in creating an environment where children can explore, question, and discover. Our approach
                is rooted in the understanding that each child is unique and learns differently.
              </p>
              <p className="text-gray-700">At Shikshantar, we emphasize:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  <strong>Holistic Development:</strong> Nurturing intellectual, emotional, physical, and spiritual
                  growth.
                </li>
                <li>
                  <strong>Experiential Learning:</strong> Learning by doing, experiencing, and reflecting.
                </li>
                <li>
                  <strong>Environmental Consciousness:</strong> Fostering a deep connection with nature and
                  responsibility towards our planet.
                </li>
                <li>
                  <strong>Cultural Rootedness:</strong> Celebrating our heritage while embracing global perspectives.
                </li>
                <li>
                  <strong>Community Building:</strong> Creating a sense of belonging and responsibility towards society.
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-shikshantar-black mb-4">Our Journey</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                Established in 1995, Shikshantar began as a small school with a big vision - to reimagine education in
                India. Over the years, we have grown in size but have remained true to our founding principles.
              </p>
              <p className="text-gray-700">
                Our journey has been marked by continuous evolution, always striving to create more meaningful learning
                experiences for our students. We have been pioneers in introducing progressive educational practices
                while staying rooted in Indian values and traditions.
              </p>
              <p className="text-gray-700">Key milestones in our journey:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  <strong>1995:</strong> Shikshantar was founded with 50 students and 10 teachers.
                </li>
                <li>
                  <strong>2000:</strong> Introduced our unique curriculum integrating arts and sciences.
                </li>
                <li>
                  <strong>2005:</strong> Established our environmental education program.
                </li>
                <li>
                  <strong>2010:</strong> Celebrated our first batch of graduates making their mark in various fields.
                </li>
                <li>
                  <strong>2015:</strong> Launched innovative learning spaces and maker labs.
                </li>
                <li>
                  <strong>2020:</strong> Adapted to digital learning while maintaining our core philosophy during the
                  pandemic.
                </li>
                <li>
                  <strong>Present:</strong> Continuing to evolve while staying true to our roots.
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/90">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-shikshantar-black mb-4">The Alumni Platform Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-gray-700">
                The Shikshantar Alumni Platform was born from the desire to maintain the strong bonds formed during
                school years and to create a supportive community that extends beyond graduation.
              </p>
              <p className="text-gray-700">Our vision for this platform is to:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  <strong>Connect Generations:</strong> Bridge the gap between different batches of Shikshu, creating a
                  network that spans decades.
                </li>
                <li>
                  <strong>Facilitate Mentorship:</strong> Enable experienced alumni to guide current students and recent
                  graduates in their academic and professional journeys.
                </li>
                <li>
                  <strong>Preserve Memories:</strong> Create a digital archive of Shikshantar's history through photos,
                  videos, and stories shared by alumni.
                </li>
                <li>
                  <strong>Foster Collaboration:</strong> Provide opportunities for alumni to collaborate on projects,
                  initiatives, and events that benefit the school and society.
                </li>
                <li>
                  <strong>Strengthen Community:</strong> Maintain the sense of belonging that is at the heart of the
                  Shikshantar experience.
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full h-64 md:h-full">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Alumni gathering"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/90">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-shikshantar-black mb-4">Our Values</h3>
            <div className="space-y-3">
              <p className="text-gray-700">
                <strong>Curiosity</strong> - The foundation of learning
              </p>
              <p className="text-gray-700">
                <strong>Compassion</strong> - Understanding and empathy for all
              </p>
              <p className="text-gray-700">
                <strong>Creativity</strong> - Finding new ways to express and solve
              </p>
              <p className="text-gray-700">
                <strong>Courage</strong> - To question, to try, to fail, and to rise
              </p>
              <p className="text-gray-700">
                <strong>Community</strong> - Growing together, supporting each other
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-shikshantar-black mb-4">Our Approach</h3>
            <div className="space-y-3">
              <p className="text-gray-700">
                <strong>Project-Based Learning</strong> - Learning through exploration and creation
              </p>
              <p className="text-gray-700">
                <strong>Integrated Curriculum</strong> - Breaking down subject barriers
              </p>
              <p className="text-gray-700">
                <strong>Reflective Practice</strong> - Thinking about thinking
              </p>
              <p className="text-gray-700">
                <strong>Collaborative Work</strong> - Learning with and from peers
              </p>
              <p className="text-gray-700">
                <strong>Authentic Assessment</strong> - Measuring what matters
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-shikshantar-black mb-4">Our Impact</h3>
            <div className="space-y-3">
              <p className="text-gray-700">
                <strong>1000+</strong> Shikshu graduates
              </p>
              <p className="text-gray-700">
                <strong>25+</strong> Years of innovative education
              </p>
              <p className="text-gray-700">
                <strong>30+</strong> Countries where our alumni work
              </p>
              <p className="text-gray-700">
                <strong>50+</strong> Social initiatives started by alumni
              </p>
              <p className="text-gray-700">
                <strong>Countless</strong> Lives touched and transformed
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

