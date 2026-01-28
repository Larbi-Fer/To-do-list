'use client'

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Calendar, MoreVertical } from "lucide-react"
import { format } from "date-fns"

interface TaskItemProps {
  id: string
  title: string
  tags: { label: string; color: string }[]
  startDate?: Date
  deadline?: Date
  completed?: boolean
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskItem({
  id,
  title,
  tags,
  startDate,
  deadline,
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
            <span
              key={idx}
              className={`text-xs font-medium px-2 py-1 rounded uppercase tracking-wide ${
                tag.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                tag.color === 'red' ? 'bg-red-100 text-red-700' :
                tag.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                'bg-gray-100 text-gray-700'
              }`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-3 text-sm text-gray-600">
          {startDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Start: {format(startDate, 'MMM dd')}</span>
            </div>
          )}
          {deadline && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span className="text-red-600 font-medium">Deadline: {format(deadline, 'MMM dd')}</span>
            </div>
          )}
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
