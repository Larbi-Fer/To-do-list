interface Task {
  id: string
  title: string
  tags: string[]
  startTime:  string
  endTime: string
  date: string
  completed?: boolean
}

interface TaskListProps {
  tasks: Task[]
  pendingCount: number
  onToggleTask: (id: string) => void
  onDeleteTask: (id: string) => void
}