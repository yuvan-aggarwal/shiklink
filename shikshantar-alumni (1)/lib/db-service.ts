import type { UserProfile, UserAuth } from "./db-schema"

// This is a mock database for demonstration
// In a real application, you would use a real database like MongoDB, PostgreSQL, etc.
let users: UserProfile[] = []
let auth: UserAuth[] = []

// Simple hash function for demonstration purposes
// In a real application, you would use a proper password hashing library
async function simpleHash(password: string): Promise<string> {
  // Convert string to ArrayBuffer
  const encoder = new TextEncoder()
  const data = encoder.encode(password)

  // Use the built-in crypto API to hash the password
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)

  // Convert ArrayBuffer to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

  return hashHex
}

// Simple password comparison
async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
  const hashedPlainPassword = await simpleHash(plainPassword)
  return hashedPlainPassword === hashedPassword
}

export async function createUser(
  userData: Omit<UserProfile, "id" | "createdAt" | "updatedAt">,
  password: string,
): Promise<UserProfile> {
  const id = `user_${Date.now()}`
  const hashedPassword = await simpleHash(password)

  const newUser: UserProfile = {
    id,
    ...userData,
    interests: userData.interests || [],
    committees: userData.committees || [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const newAuth: UserAuth = {
    id: `auth_${Date.now()}`,
    email: userData.email,
    password: hashedPassword,
    userId: id,
  }

  users.push(newUser)
  auth.push(newAuth)

  return newUser
}

export async function getUserByEmail(email: string): Promise<UserProfile | null> {
  return users.find((user) => user.email === email) || null
}

export async function getUserById(id: string): Promise<UserProfile | null> {
  return users.find((user) => user.id === id) || null
}

export async function validateUser(email: string, password: string): Promise<UserProfile | null> {
  const userAuth = auth.find((a) => a.email === email)

  if (!userAuth) {
    return null
  }

  const isValid = await comparePasswords(password, userAuth.password)

  if (!isValid) {
    return null
  }

  return getUserById(userAuth.userId)
}

export async function updateUser(id: string, userData: Partial<UserProfile>): Promise<UserProfile | null> {
  const userIndex = users.findIndex((user) => user.id === id)

  if (userIndex === -1) {
    return null
  }

  const updatedUser = {
    ...users[userIndex],
    ...userData,
    updatedAt: new Date(),
  }

  users[userIndex] = updatedUser

  return updatedUser
}

export async function getAllUsers(): Promise<UserProfile[]> {
  return users
}

// Seed some initial data for demonstration
export function seedInitialData() {
  if (users.length === 0) {
    users = [
      {
        id: "1",
        name: "Arjun Sharma",
        email: "arjun.s@example.com",
        batch: "2010",
        image: "/placeholder.svg?height=150&width=150",
        education: "B.Tech, Computer Science, IIT Delhi",
        major: "Computer Science",
        job: "Software Engineer at Google",
        location: "Bangalore, India",
        phone: "+91 9876543210",
        linkedin: "linkedin.com/in/arjunsharma",
        interests: ["Technology", "Mentorship", "Photography"],
        committees: ["Tech Committee", "Alumni Outreach"],
        bio: "After graduating from Shikshantar in 2010, I pursued computer science and now work at Google. I love mentoring young tech enthusiasts.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        name: "Priya Patel",
        email: "priya.p@example.com",
        batch: "2012",
        image: "/placeholder.svg?height=150&width=150",
        education: "MBBS, AIIMS Delhi",
        major: "Medicine",
        job: "Pediatrician at Apollo Hospitals",
        location: "Delhi, India",
        phone: "+91 9876543211",
        linkedin: "linkedin.com/in/priyapatel",
        interests: ["Healthcare", "Child Development", "Painting"],
        committees: ["Health Committee"],
        bio: "I'm a pediatrician passionate about child healthcare. My years at Shikshantar shaped my approach to understanding children's needs.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    // Create auth entries for the seeded users
    auth = [
      {
        id: "auth_1",
        email: "arjun.s@example.com",
        password: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", // password: "password"
        userId: "1",
      },
      {
        id: "auth_2",
        email: "priya.p@example.com",
        password: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", // password: "password"
        userId: "2",
      },
    ]
  }
}

// Call this function to initialize the database with sample data
seedInitialData()

