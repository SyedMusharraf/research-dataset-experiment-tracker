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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const notifications = [
  { title: "XGBoost experiment finished", desc: "Fraud Detection · 98.1% accuracy", time: "12m ago" },
  { title: "Dataset ready for training", desc: "Telecom Customer Records processed", time: "1h ago" },
  { title: "New project created", desc: "Demand Forecasting", time: "3h ago" },
]

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      <SidebarTrigger className="text-muted-foreground" />
      <Separator orientation="vertical" className="h-6" />

      <div className="relative hidden max-w-md flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
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
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Badge variant="secondary" className="text-xs">
                {notifications.length} new
              </Badge>
            </DropdownMenuLabel>
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

        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "ml-1 gap-2 px-1.5 pr-2.5")}
          >
            <Avatar className="size-7">
              <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">ER</AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium md:inline">Elena Reyes</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col">
              <span>Dr. Elena Reyes</span>
              <span className="text-xs font-normal text-muted-foreground">elena@research.lab</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="size-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/settings" />}>
              <SettingsIcon className="size-4" /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="size-4" /> Billing
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOut className="size-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
