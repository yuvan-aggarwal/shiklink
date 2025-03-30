"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bug, TreePine, Flower, Sprout, Apple, Menu, X, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-shikshantar-black text-shikshantar-white shadow-md" : "bg-transparent text-shikshantar-black"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <span className={scrolled ? "text-shikshantar-yellow" : "text-shikshantar-yellow"}>Shiklink</span>
          </Link>

          {/* Mobile menu button */}
          <button
            className={scrolled ? "md:hidden text-shikshantar-white" : "md:hidden text-shikshantar-black"}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/buzzboard"
              className={`flex items-center gap-1 transition-colors ${
                scrolled ? "hover:text-shikshantar-yellow" : "hover:text-shikshantar-yellow"
              }`}
            >
              <Bug size={20} /> Buzzboard
            </Link>
            <Link
              href="/grove"
              className={`flex items-center gap-1 transition-colors ${
                scrolled ? "hover:text-shikshantar-yellow" : "hover:text-shikshantar-yellow"
              }`}
            >
              <TreePine size={20} /> The Grove
            </Link>
            <Link
              href="/sharings"
              className={`flex items-center gap-1 transition-colors ${
                scrolled ? "hover:text-shikshantar-yellow" : "hover:text-shikshantar-yellow"
              }`}
            >
              <Flower size={20} /> Sharings
            </Link>
            <Link
              href="/our-roots"
              className={`flex items-center gap-1 transition-colors ${
                scrolled ? "hover:text-shikshantar-yellow" : "hover:text-shikshantar-yellow"
              }`}
            >
              <Sprout size={20} /> Our Roots
            </Link>
            <Link
              href="/memory-tree"
              className={`flex items-center gap-1 transition-colors ${
                scrolled ? "hover:text-shikshantar-yellow" : "hover:text-shikshantar-yellow"
              }`}
            >
              <Apple size={20} /> Memory Tree
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-shikshantar-yellow"
                  >
                    {user.image ? (
                      <Image src={user.image || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                    ) : (
                      <User className={scrolled ? "text-shikshantar-white" : "text-shikshantar-black"} />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-0.5 leading-none">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">Shikshu {user.batch}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/edit">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 cursor-pointer"
                    onClick={async () => {
                      await logout()
                      window.location.href = "/"
                    }}
                  >
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className={
                    scrolled
                      ? "border-shikshantar-yellow text-shikshantar-yellow hover:bg-shikshantar-yellow/10"
                      : "border-shikshantar-yellow text-shikshantar-yellow hover:bg-shikshantar-yellow/10"
                  }
                  asChild
                >
                  <Link href="/login">Log In</Link>
                </Button>
                <Button className="bg-shikshantar-yellow text-shikshantar-black hover:bg-shikshantar-yellow/80" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav
            className={`md:hidden py-4 space-y-4 ${scrolled ? "border-t border-gray-800" : "border-t border-gray-300"}`}
          >
            <Link
              href="/buzzboard"
              className={`block py-2 hover:text-shikshantar-yellow transition-colors flex items-center gap-2 ${
                scrolled ? "" : "text-shikshantar-black"
              }`}
            >
              <Bug size={20} /> Bees
            </Link>
            <Link
              href="/grove"
              className={`block py-2 hover:text-shikshantar-yellow transition-colors flex items-center gap-2 ${
                scrolled ? "" : "text-shikshantar-black"
              }`}
            >
              <TreePine size={20} /> The Grove
            </Link>
            <Link
              href="/sharings"
              className={`block py-2 hover:text-shikshantar-yellow transition-colors flex items-center gap-2 ${
                scrolled ? "" : "text-shikshantar-black"
              }`}
            >
              <Flower size={20} /> Sharings
            </Link>
            <Link
              href="/our-roots"
              className={`block py-2 hover:text-shikshantar-yellow transition-colors flex items-center gap-2 ${
                scrolled ? "" : "text-shikshantar-black"
              }`}
            >
              <Sprout size={20} /> Our Roots
            </Link>
            <Link
              href="/memory-tree"
              className={`block py-2 hover:text-shikshantar-yellow transition-colors flex items-center gap-2 ${
                scrolled ? "" : "text-shikshantar-black"
              }`}
            >
              <Apple size={20} /> Memory Tree
            </Link>

            {user ? (
              <>
                <div className="border-t pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-shikshantar-yellow">
                      {user.image ? (
                        <Image
                          src={user.image || "/placeholder.svg"}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-shikshantar-yellow/20">
                          <User size={20} className={scrolled ? "text-shikshantar-white" : "text-shikshantar-black"} />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className={`font-medium ${scrolled ? "text-shikshantar-white" : "text-shikshantar-black"}`}>
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">Shikshu {user.batch}</p>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className={`block py-2 hover:text-shikshantar-yellow transition-colors ${
                      scrolled ? "" : "text-shikshantar-black"
                    }`}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/profile/edit"
                    className={`block py-2 hover:text-shikshantar-yellow transition-colors ${
                      scrolled ? "" : "text-shikshantar-black"
                    }`}
                  >
                    Edit Profile
                  </Link>
                  <button
                    onClick={async () => {
                      await logout()
                      window.location.href = "/"
                    }}
                    className="w-full text-left py-2 text-red-500 hover:text-red-600 transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-3 pt-2">
                <Button
                  className="w-full bg-shikshantar-yellow text-shikshantar-black hover:bg-shikshantar-yellow/80"
                  asChild
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-shikshantar-black text-shikshantar-black hover:bg-shikshantar-black/10"
                  asChild
                >
                  <Link href="/login">Log In</Link>
                </Button>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}

