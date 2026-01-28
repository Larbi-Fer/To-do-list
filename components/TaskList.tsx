'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TaskItem } from "./TaskItem"
import { ChevronDown } from "lucide-react"

export function TaskList({
  tasks,
  pendingCount,
  onToggleTask,
  onDeleteTask,
}: TaskListProps) {
  const [showCompleted, setShowCompleted] = useState(false)

  const activeTasks = tasks.filter(t => !t.completed)
  const completedTasks = tasks.filter(t => t.completed)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Active Tasks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Active Tasks</h2>
          <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
            {pendingCount} Pending
          </span>
        </div>

        <div className="space-y-3">
          {activeTasks.length > 0 ? (
            activeTasks.map(task => (
                // @ts-ignore
              <TaskItem
                key={task.id}
                {...task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No active tasks. Add one to get started!</p>
            </div>
          )}
        </div>
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <Button
            variant="ghost"
            onClick={() => setShowCompleted(!showCompleted)}
            className="text-blue-600 hover:text-blue-700 p-0 h-auto"
          >
            <ChevronDown className={`w-4 h-4 mr-2 transition-transform ${
              showCompleted ? 'rotate-180' : ''
            }`} />
            Show completed tasks ({completedTasks.length})
          </Button>

          {showCompleted && (
            <div className="space-y-3 mt-4">
              {completedTasks.map(task => (
                // @ts-ignore
                <TaskItem
                  key={task.id}
                  {...task}
                  onToggle={onToggleTask}
                  onDelete={onDeleteTask}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
