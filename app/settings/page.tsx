"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useTheme } from "next-themes"
import { Monitor, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
]

export default function SettingsPage() {
  const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [bio, setBio] = useState("")
useEffect(() => {
  loadProfile()
}, [])

async function loadProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (error) {
    console.error(error)
    return
  }

  if (data) {
    setName(data.full_name || "")
    setEmail(data.email || "")
    setBio(data.bio || "")
  }
}
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])
  const [notifications, setNotifications] = useState({ experiments: true, weekly: true, mentions: false })
  async function saveProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
  
    if (!user) {
      toast.error("Not logged in")
      return
    }
  
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: name,
        email,
        bio,
      })
      .eq("id", user.id)
  
    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Profile updated")
    }
  }
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your profile, workspace and preferences." />

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="bg-primary/10 text-lg font-medium text-primary">DR</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              Change avatar
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
  id="name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
  id="email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
  id="bio"
  value={bio}
  onChange={(e) => setBio(e.target.value)}
/>
          </div>
          <Button onClick={saveProfile}>
  Save changes
</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how the dashboard looks on your device.</CardDescription>
        </CardHeader>
        <CardContent>
  {mounted && (
    <div className="grid max-w-md grid-cols-3 gap-3">
            {themes.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTheme(t.value)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-lg border p-4 text-sm font-medium transition-colors",
                  theme === t.value ? "border-primary bg-primary/5 text-primary" : "hover:bg-accent",
                )}
              >
                <t.icon className="size-5" />
                {t.label}
              </button>
               ))}
               </div>
             )}
           </CardContent>
</Card>

<Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Choose what you want to be notified about.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          {[
            { key: "experiments" as const, label: "Experiment completions", desc: "When a logged experiment finishes." },
            { key: "weekly" as const, label: "Weekly summary", desc: "A digest of your research activity." },
            { key: "mentions" as const, label: "Team mentions", desc: "When a teammate mentions you." },
          ].map((n, i) => (
            <div key={n.key}>
              {i > 0 ? <Separator /> : null}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium">{n.label}</p>
                  <p className="text-xs text-muted-foreground">{n.desc}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications[n.key]}
                  aria-label={n.label}
                  onClick={() => setNotifications((s) => ({ ...s, [n.key]: !s[n.key] }))}
                  className={cn(
                    "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                    notifications[n.key] ? "bg-primary" : "bg-muted",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 size-5 rounded-full bg-background shadow transition-transform",
                      notifications[n.key] ? "translate-x-5" : "translate-x-0.5",
                    )}
                  />
                </button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
