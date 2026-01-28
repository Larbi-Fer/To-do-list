'use client'

import { Button } from "@/components/ui/button"
import { supabase } from "@/utils/supabaseClient"
import { CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function TaskHeader() {
  const router = useRouter()
  const signout = async() => {
    await supabase.auth.signOut()
    router.replace('/login')
  }
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">TaskFlow</span>
        </div>
        <Button variant="default" size="sm" className="cursor-pointer" onClick={signout}>
          Sign Out
        </Button>
      </div>
    </header>
  )
}
