'use client'

import { useState } from 'react'
import { TaskHeader } from '@/components/TaskHeader'
import { TaskInput } from '@/components/TaskInput'
import { TaskList } from '@/components/TaskList'

const SAMPLE_TASKS: Task[] = [
  {
    id: '1',
    title: 'Finalize Marketing Strategy',
    tags: [
      { label: 'WORK', color: 'blue' },
      { label: 'URGENT', color: 'red' },
    ],
    startDate: new Date(2024, 9, 12),
    deadline: new Date(2024, 9, 15),
  },
  {
    id: '2',
    title: 'Update Website Footer',
    tags: [{ label: 'DESIGN', color: 'purple' }],
    startDate: new Date(2024, 9, 14),
    deadline: new Date(2024, 9, 16),
  },
  {
    id: '3',
    title: 'Review Weekly Analytics',
    tags: [{ label: 'REPORTING', color: 'gray' }],
    completed: true,
  },
  {
    id: '4',
    title: 'Quarterly Budget Planning',
    tags: [
      { label: 'FINANCE', color: 'purple' },
      { label: 'WORK', color: 'blue' },
    ],
    startDate: new Date(2024, 9, 18),
    deadline: new Date(2024, 9, 30),
  },
]

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(SAMPLE_TASKS)

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      tags: [],
    }
    setTasks([newTask, ...tasks])
  }

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const pendingCount = tasks.filter(t => !t.completed).length

  return (
    <div className="min-h-screen bg-gray-50">
      <TaskHeader />
      <TaskInput onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        pendingCount={pendingCount}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  )
}
