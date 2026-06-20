"use client"
import Link from "next/link"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) alert(error.message)
    else alert("Account created!")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow">
        <h1 className="mb-2 text-3xl font-bold">
          Create Account
        </h1>
  
        <p className="mb-6 text-muted-foreground">
          Start managing your research datasets
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
            onClick={signUp}
            className="w-full rounded-md bg-primary p-3 text-primary-foreground"
          >
            Create Account
          </button>
        </div>
  
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}