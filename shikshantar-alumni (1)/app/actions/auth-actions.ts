"use server"

import { createUser, validateUser, getUserByEmail } from "@/lib/db-service"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function signUp(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const batch = formData.get("batch") as string
  const education = formData.get("education") as string
  const major = formData.get("major") as string
  const job = formData.get("job") as string
  const company = formData.get("company") as string
  const location = formData.get("location") as string
  const phone = formData.get("phone") as string
  const linkedin = formData.get("linkedin") as string
  const interests = ((formData.get("interests") as string) || "")
    .split(",")
    .map((i) => i.trim())
    .filter(Boolean)
  const committees = ((formData.get("committees") as string) || "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean)
  const bio = formData.get("bio") as string

  // Validation
  if (!name || !email || !password || !batch || !education || !major || !job || !bio) {
    return {
      error: "Please fill in all required fields",
    }
  }

  // Check if user already exists
  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return {
      error: "User with this email already exists",
    }
  }

  try {
    const user = await createUser(
      {
        name,
        email,
        batch,
        education,
        major,
        job,
        company,
        location,
        phone,
        linkedin,
        interests,
        committees,
        bio,
      },
      password,
    )

    // Set a session cookie
    cookies().set("userId", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return { success: true, user }
  } catch (error) {
    console.error("Sign up error:", error)
    return {
      error: "Failed to create account. Please try again.",
    }
  }
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return {
      error: "Please provide both email and password",
    }
  }

  try {
    const user = await validateUser(email, password)

    if (!user) {
      return {
        error: "Invalid email or password",
      }
    }

    // Set a session cookie
    cookies().set("userId", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return { success: true, user }
  } catch (error) {
    console.error("Login error:", error)
    return {
      error: "Failed to log in. Please try again.",
    }
  }
}

export async function logout() {
  cookies().delete("userId")
  redirect("/")
}

