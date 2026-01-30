'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock2Icon, LoaderIcon, Plus, PlusCircleIcon, XIcon } from "lucide-react"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import { format } from "date-fns"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Badge } from "./ui/badge"

interface TaskInputProps {
  onAddTask: (task: string, date: Date, startTime: string, endTime: string, tags: string[], done: () => void) => void
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const [value, setValue] = useState("")
  const [date, setDate] = useState<Date>()
  const [startTime, setStartTime] = useState('10:00:00')
  const [endTime, setEndTime] = useState('12:30:00')
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      setLoading(true)
      onAddTask(value, date!, startTime, endTime, tags, () => {
        setDate(undefined)
        setValue("")
        setTags([])
        setLoading(false)
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value

    if (input[input.length-1] != ' ') {
      return setValue(input)
    }
    const regex = /#(\w+)/g
    const matches = [...input.matchAll(regex)]

    if (matches.length) {
      const newTags = matches.map(m => m[1])

      setTags(prev => [
        ...prev,
        ...newTags.filter(t => !prev.includes(t)),
      ])

      // remove hashtags from text
      const cleaned = input.replace(regex, "").replace(/\s{2,}/g, " ")
      setValue(cleaned)
    } else {
      setValue(input)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Focus on your day</h1>
        <p className="text-gray-600">Add a task and get things moving.</p>
      </div>

      <Field orientation="horizontal" className="relative">
        <InputGroup>
          <InputGroupInput
            type="text"
            placeholder="Add a new task and press Enter..."
            value={value}
            onChange={handleChange}
            className="flex-1"
            disabled={loading}
          />
          <InputGroupAddon>
            {loading ? 
              <LoaderIcon className="animate-spin" />
              :
              <PlusCircleIcon />
            }
          </InputGroupAddon>
        </InputGroup>
        <CalendarField
          date={date}
          setDate={setDate}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          classname="absolute right-13"
        />

        <Button
          type="submit"
          size="icon"
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </Field>
      <FieldDescription className="pt-1 flex">
        {date ? <span>{format(date, "PPP")}</span> : <span>Pick a date</span>}
        {'  '}
        <span className="ml-2 flex flex-wrap gap-2">
          {tags.map((t) =>
            <Badge key={t} variant="default">
              {t}
              <span
                className="cursor-pointer"
                onClick={() => {
                  setTags(prev => prev.filter(tag => tag != t))
                }}
              ><XIcon size={10} /></span>
            </Badge>
          )}
        </span>
      </FieldDescription>
    </form>
  )
}


const CalendarField = ({date, setDate, startTime, setStartTime, endTime, setEndTime, classname}: {
  date?: Date
  setDate: (date?: Date) => void
  startTime: string
  setStartTime: (time: string) => void
  endTime: string
  setEndTime: (time: string) => void
  classname: string
}) => {
  return (
    <Popover modal={false}>
      <PopoverTrigger asChild className={classname}>
        <Button
          variant="outline"
          id="date-picker-simple"
          className="justify-start font-normal"
          size='sm'
        >
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" onInteractOutside={(e) => e.preventDefault()}>
        <Card className="mx-auto w-fit">
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="p-0"
            />
          </CardContent>
          <CardFooter className="bg-card border-t">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="time-from">Start Time</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="time-from"
                    type="time"
                    step="1"
                    className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                  />
                  <InputGroupAddon>
                    <Clock2Icon className="text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel htmlFor="time-to">End Time</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="time-to"
                    type="time"
                    step="1"
                    className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                  />
                  <InputGroupAddon>
                    <Clock2Icon className="text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </FieldGroup>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  )
}