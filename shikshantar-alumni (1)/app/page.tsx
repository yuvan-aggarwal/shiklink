"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, ChevronLeft, Bug, TreePine, Apple, LogIn } from "lucide-react"

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0)
  const slides = [
    {
      image: "/images/shikshu-2019.png",
      caption: "Shikshu 2019",
    },
    {
      image: "/images/shikshu-2017.png",
      caption: "Shikshu 2017",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  return (
    <div className="flex flex-col gap-16">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="image-carousel">
          {slides.map((slide, index) => (
            <div key={index} className={`carousel-slide ${index === activeSlide ? "active" : ""}`}>
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.caption}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-between px-4 z-20">
          <button
            onClick={prevSlide}
            className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Welcome to <span className="text-shikshantar-yellow">Shiklink</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 font-light">
              Reconnect with your roots, share your journey, and inspire the next generation of Shikshu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-shikshantar-yellow text-shikshantar-black hover:bg-shikshantar-yellow/80 rounded-full px-8 py-6 text-base font-medium">
                <Link href="/grove" className="flex items-center gap-2">
                  Find Alumni <ChevronRight size={16} />
                </Link>
              </Button>
              <Button className="bg-white text-shikshantar-black hover:bg-white/80 rounded-full px-8 py-6 text-base font-medium">
                <Link href="#" className="flex items-center gap-2">
                  Login <LogIn size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === activeSlide ? "bg-shikshantar-yellow" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="feature-card bg-white/90 p-8 rounded-2xl shadow-lg text-center">
          <div className="feature-icon">
            <Bug size={40} className="text-shikshantar-black" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-shikshantar-black">Buzzboard</h3>
          <p className="text-gray-700">
            Stay updated with school events, alumni meetups, and important announcements. Never miss an opportunity to
            reconnect.
          </p>
          <Link
            href="/buzzboard"
            className="inline-flex items-center mt-4 text-shikshantar-black font-medium hover:text-shikshantar-yellow transition-colors"
          >
            Explore <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="feature-card bg-white/90 p-8 rounded-2xl shadow-lg text-center">
          <div className="feature-icon">
            <TreePine size={40} className="text-shikshantar-black" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-shikshantar-black">The Grove</h3>
          <p className="text-gray-700">
            Connect with fellow Shikshu based on profession, graduation year, or interests. Build your network and find
            mentors.
          </p>
          <Link
            href="/grove"
            className="inline-flex items-center mt-4 text-shikshantar-black font-medium hover:text-shikshantar-yellow transition-colors"
          >
            Connect <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="feature-card bg-white/90 p-8 rounded-2xl shadow-lg text-center">
          <div className="feature-icon">
            <Apple size={40} className="text-shikshantar-black" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-shikshantar-black">Memory Tree</h3>
          <p className="text-gray-700">
            Revisit cherished moments through our gallery of photos and videos from over the years. Relive the memories.
          </p>
          <Link
            href="/memory-tree"
            className="inline-flex items-center mt-4 text-shikshantar-black font-medium hover:text-shikshantar-yellow transition-colors"
          >
            Reminisce <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </section>

      {/* Alumni Showcase Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-shikshantar-black leading-tight">
            Join Your <span className="text-shikshantar-yellow">Shikshantar</span> Family
          </h2>
          <p className="text-lg text-shikshantar-black/80 bg-white/70 p-6 rounded-xl shadow-md">
            Our alumni platform brings together Shikshu from all batches, creating a vibrant community of mentors,
            friends, and collaborators. Explore our features designed to help you stay connected with your alma mater.
          </p>

          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg animate-float">
            <Image src="/images/shikshu-2017.png" alt="Shikshu 2017" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <p className="text-white p-4 font-medium">Shikshu 2017 - Forever bonded by memories</p>
            </div>
          </div>
        </div>

        <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden shadow-xl">
          <Image src="/images/shikshu-2019.png" alt="Shikshu 2019" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6 w-full">
              <p className="text-white text-lg font-medium mb-2">Shikshu 2019 - Carrying forward the legacy</p>
              <p className="text-white/80 text-sm mb-4">
                Our alumni continue to make us proud with their achievements and contributions to society.
              </p>
              <Button className="bg-shikshantar-yellow text-shikshantar-black hover:bg-shikshantar-yellow/80 rounded-full">
                <Link href="/sharings">View Alumni Stories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white/80 rounded-2xl shadow-xl p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-shikshantar-black">Alumni Voices</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Hear what our alumni have to say about their Shikshantar journey and how it shaped their lives.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="testimonial-card">
            <p className="text-gray-700 mb-6 italic">
              "Shikshantar gave me the confidence to pursue my dreams. The values I learned here continue to guide me in
              my professional life."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                <Image src="/placeholder.svg?height=48&width=48" alt="Alumni" width={48} height={48} />
              </div>
              <div>
                <h4 className="font-semibold text-shikshantar-black">Arjun Sharma</h4>
                <p className="text-sm text-gray-600">Shikshu 2010</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="text-gray-700 mb-6 italic">
              "The holistic education at Shikshantar helped me discover my passion for environmental science. I'm
              grateful for the mentors who guided me."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                <Image src="/placeholder.svg?height=48&width=48" alt="Alumni" width={48} height={48} />
              </div>
              <div>
                <h4 className="font-semibold text-shikshantar-black">Priya Patel</h4>
                <p className="text-sm text-gray-600">Shikshu 2012</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="text-gray-700 mb-6 italic">
              "My years at Shikshantar were transformative. The emphasis on creativity and critical thinking prepared me
              well for the challenges of the real world."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                <Image src="/placeholder.svg?height=48&width=48" alt="Alumni" width={48} height={48} />
              </div>
              <div>
                <h4 className="font-semibold text-shikshantar-black">Vikram Malhotra</h4>
                <p className="text-sm text-gray-600">Shikshu 2008</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/sharings">
            <Button
              variant="outline"
              className="border-shikshantar-black text-shikshantar-black hover:bg-shikshantar-black/10 rounded-full px-8 py-5 font-medium"
            >
              Read More Stories
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

