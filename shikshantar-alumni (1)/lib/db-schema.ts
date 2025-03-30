export type UserProfile = {
  id: string
  name: string
  email: string
  batch: string
  image?: string
  education: string
  major: string
  job: string
  company?: string
  location?: string
  phone?: string
  linkedin?: string
  interests: string[]
  committees?: string[]
  bio: string
  createdAt: Date
  updatedAt: Date
}

export type UserAuth = {
  id: string
  email: string
  password: string // This will be hashed
  userId: string
}

