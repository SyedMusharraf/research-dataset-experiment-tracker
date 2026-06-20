"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function TestPage() {
  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      console.log("USER:", user)
    }

    checkUser()
  }, [])

  return <div>Check Console</div>
}