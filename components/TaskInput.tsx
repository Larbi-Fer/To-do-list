'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

interface TaskInputProps {
  onAddTask: (task: string) => void
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const [value, setValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onAddTask(value)
      setValue("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Focus on your day</h1>
        <p className="text-gray-600">Add a task and get things moving.</p>
      </div>
      
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Add a new task and press Enter..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1"
        />
        <Button
          type="submit"
          size="icon"
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </form>
  )
}
