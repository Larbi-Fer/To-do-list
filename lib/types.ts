interface Task {
  id: string
  title: string
  tags: { label: string; color: string }[]
  startDate?: Date | string
  deadline?: Date | string
  completed?: boolean
}

interface TaskListProps {
  tasks: Task[]
  pendingCount: number
  onToggleTask: (id: string) => void
  onDeleteTask: (id: string) => void
}