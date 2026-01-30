'use client'

import { useEffect, useState } from 'react'
import { TaskHeader } from '@/components/TaskHeader'
import { TaskInput } from '@/components/TaskInput'
import { TaskList } from '@/components/TaskList'
import { supabase } from '@/utils/supabaseClient'
import { format } from 'date-fns'

const SAMPLE_TASKS: Task[] = [
  {
    id: '1',
    title: 'Finalize Marketing Strategy',
    tags: [
      'WORK',
      'URGENT'
    ],
    startTime: '10:00:00',
    endTime: '12:00:00',
    date: "2026-01-30",
  },
  {
    id: '2',
    title: 'Update Website Footer',
    tags: ['DESIGN'],
    startTime: '10:00:00',
    endTime: '12:00:00',
    date: "2026-01-30",
  },
  {
    id: '3',
    title: 'Review Weekly Analytics',
    tags: ['REPORTING'],
    startTime: '10:00:00',
    endTime: '12:00:00',
    date: "2026-01-30",
    completed: true,
  },
  {
    id: '4',
    title: 'Quarterly Budget Planning',
    tags: [
      'FINANCE',
      'WORK'
    ],
    startTime: '10:00:00',
    endTime: '12:00:00',
    date: "2026-01-30",
  },
]

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [userId, setUserId] = useState<string>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async() => {
      const {data: {user}} = await supabase.auth.getUser()
      setUserId(user?.id)

      // Fetch Tasks
      const {data, error} = await supabase.from('Tasks').select('*').eq('user', user?.id).order('date').limit(5)

      if (!error) {
        setTasks(data)
        setLoading(false)
      } else {
        console.log(error);
        
      }
    })()
  }, [])

  const handleAddTask = async(title: string, date: Date, startTime: string, endTime: string, tags: string[], done: () => void) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      tags,
      date: format(date, 'yyyy-MM-dd'), startTime, endTime
    }
    
    const {error} = await supabase.from('Tasks').insert({
      title, date, endTime, startTime, tags, user: userId
    })
    
    if (!error) {
      done()
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
      {loading ?
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          <b>Loading ...</b>
        </div>
      :
        <TaskList
          tasks={tasks}
          pendingCount={pendingCount}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
        />
      }
    </div>
  )
}
