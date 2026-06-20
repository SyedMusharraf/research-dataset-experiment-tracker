"use client"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const login = async () => {
    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (error) {
      alert(error.message)
    } else {
      router.push("/")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow">
        <h1 className="mb-2 text-3xl font-bold">
          Login
        </h1>
  
        <p className="mb-6 text-muted-foreground">
          Access your research workspace
        </p>
  
        <div className="space-y-4">
          <input
            className="w-full rounded-md border p-3"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
  
          <input
            className="w-full rounded-md border p-3"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
  
          <button
            onClick={login}
            className="w-full rounded-md bg-primary p-3 text-primary-foreground"
          >
            Login
          </button>
        </div>
  
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}