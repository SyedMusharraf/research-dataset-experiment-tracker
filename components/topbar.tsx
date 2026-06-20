"use client"

import Link from "next/link"
import { Bell, Search, LogOut, User, Settings as SettingsIcon, CreditCard } from "lucide-react"
import { Input } from "@/components/ui/input"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const notifications = [
  { title: "XGBoost experiment finished", desc: "Fraud Detection · 98.1% accuracy", time: "12m ago" },
  { title: "Dataset ready for training", desc: "Telecom Customer Records processed", time: "1h ago" },
  { title: "New project created", desc: "Demand Forecasting", time: "3h ago" },
]

export function Topbar() {
  const router = useRouter()
const [search, setSearch] = useState("")
const [user, setUser] = useState<any>(null)
  useEffect(() => {
    loadProfile()
  }, [])
  
  async function loadProfile() {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()
  
    if (!authUser) {
      setUser(null)
      return
    }
  
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name,email")
      .eq("id", authUser.id)
      .single()
  
    if (profile) {
      setUser(profile)
    } else {
      setUser({
        full_name: authUser.email?.split("@")[0] || "User",
        email: authUser.email || "",
      })
    }
  }
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      <SidebarTrigger className="text-muted-foreground" />
      <Separator orientation="vertical" className="h-6" />

      <div className="relative hidden max-w-md flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      router.push(`/search?q=${encodeURIComponent(search)}`)
    }
  }}
  placeholder="Search datasets, projects, experiments..."
  className="h-9 border-transparent bg-muted pl-9 focus-visible:border-border focus-visible:bg-background"
/>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(buttonVariants({ variant: "ghost", size: "icon-lg" }), "relative")}
            aria-label="Notifications"
          >
            <Bell className="size-4.5" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-primary ring-2 ring-background" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
          <div className="flex items-center justify-between px-2 py-1.5">
  <span className="font-medium">
    Notifications
  </span>

  <Badge variant="secondary" className="text-xs">
    {notifications.length} new
  </Badge>
</div>
            <DropdownMenuSeparator />
            {notifications.map((n) => (
              <DropdownMenuItem key={n.title} className="flex flex-col items-start gap-0.5 py-2.5">
                <span className="text-sm font-medium">{n.title}</span>
                <span className="text-xs text-muted-foreground">{n.desc}</span>
                <span className="text-xs text-muted-foreground/70">{n.time}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {user ? (
  <DropdownMenu>
    <DropdownMenuTrigger
      className={cn(
        buttonVariants({ variant: "ghost", size: "lg" }),
        "ml-1 gap-2 px-1.5 pr-2.5"
      )}
    >
      <Avatar className="size-7">
        <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
          {user.full_name
            ?.split(" ")
            .map((n: string) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <span className="hidden text-sm font-medium md:inline">
        {user.full_name}
      </span>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" className="w-56">
      <div className="px-2 py-1.5">
        <p className="text-sm font-medium">
          {user.full_name}
        </p>

        <p className="text-xs text-muted-foreground">
          {user.email}
        </p>
      </div>

      <DropdownMenuSeparator />

      <DropdownMenuItem render={<Link href="/settings" />}>
        <SettingsIcon className="size-4" />
        Settings
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        variant="destructive"
        onClick={async () => {
          await supabase.auth.signOut()
          window.location.reload()
        }}
      >
        <LogOut className="size-4" />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
) : (
  <div className="flex gap-2">
    <Link
      href="/login"
      className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
    >
      Login
    </Link>

    <Link
      href="/signup"
      className={cn(buttonVariants({ size: "sm" }))}
    >
      Sign Up
    </Link>
  </div>
)}
      </div>
    </header>
  )
}
