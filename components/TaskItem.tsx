'use client'

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Calendar, MoreVertical } from "lucide-react"
import { format } from "date-fns"
import { Badge } from "./ui/badge"

interface TaskItemProps {
  id: string
  title: string
  tags: string[]
  startTime:  string
  endTime: string
  date: string
  completed?: boolean
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskItem({
  id,
  title,
  tags,
  date,
  startTime, endTime,
  completed = false,
  onToggle,
  onDelete,
}: TaskItemProps) {
  const [showMenu, setShowMenu] = useState(false)
  
  return (
    <div className={`flex gap-4 p-4 rounded-lg border transition-colors ${
      completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:bg-gray-50'
    }`}>
      <Checkbox
        checked={completed}
        onCheckedChange={() => onToggle(id)}
        className="mt-1"
      />
      
      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold text-gray-900 ${
          completed ? 'line-through text-gray-500' : ''
        }`}>
          {title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, idx) => (
            <Badge key={idx} variant='outline' className="bg-[#ddd]">{tag}</Badge>
          ))}
        </div>

        <div className="flex gap-4 mt-3 text-sm text-gray-600">
          
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Date: {format(new Date(date), 'MMM dd')}{' '}
              <b>{startTime.slice(0, 5)}</b> TO <b>{endTime.slice(0, 5)}</b>
              </span>
          </div>

        </div>
      </div>

      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowMenu(!showMenu)}
          className="text-gray-400 hover:text-gray-600"
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
        
        {showMenu && (
          <div className="absolute right-0 top-full mt-2 bg-white border rounded-lg shadow-lg z-10">
            <button
              onClick={() => {
                onDelete(id)
                setShowMenu(false)
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 first:rounded-t-lg last:rounded-b-lg"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
