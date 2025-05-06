'use client'

import { useState, useEffect } from 'react'
import { Todo } from '@/types/todo'
import Image from 'next/image'
import TrashIcon from '@/public/Trash.svg'
import { useSession, useUser } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'

export default function TodoApp() {
  const [todo, setTodo] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(true)
  const { user } = useUser()
  const { session } = useSession()

  function createClerkSupabaseClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        global: {
          fetch: async (url, options = {}) => {
            const token = await session?.getToken({ template: 'supabase-todo' })
            const headers = new Headers(options?.headers)
            headers.set('Authorization', `Bearer ${token}`)

            return fetch(url, {
              ...options,
              headers,
            })
          },
        },
      }
    )
  }

  const client = createClerkSupabaseClient()

  useEffect(() => {
    if (!user) return

    const fetchTodos = async () => {
      setLoading(true)
      const { data, error } = await client
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('id', { ascending: true })

      if (!error && data) {
        setTodo(data)
      }

      setLoading(false)
    }

    fetchTodos()
  }, [user])

  const addTodo = async () => {
    if (!newTodo.trim() || !user) return

    const newEntry = {
      title: newTodo.trim(),
      completed: false,
      user_id: user.id,
    }

    const { data, error } = await client.from('tasks').insert(newEntry).select().single()
    if (!error && data) {
      setTodo((prev) => [...prev, data])
      setNewTodo('')
    }
  }

  const toggleTodo = async (id: number, completed: boolean) => {
    const { data, error } = await client
      .from('tasks')
      .update({ completed: !completed })
      .eq('id', id)
      .select()
      .single()

    if (!error && data) {
      setTodo((prev) =>
        prev.map((item) => (item.id === id ? { ...item, completed: data.completed } : item))
      )
    }
  }

  const deleteTodo = async (id: number) => {
    const { error } = await client.from('tasks').delete().eq('id', id)
    if (!error) {
      setTodo((prev) => prev.filter((item) => item.id !== id))
    }
  }

  return (
    <main>
      <div>
        <div className='flex justify-center my-10 gap-4'>
          <input
            type="text"
            value={newTodo}
            className='border-2 border-[#501e92] rounded-md px-5 text-[#777777] w-[381px] h-[40px]'
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="New todo..."
          />
          <button onClick={addTodo} className='cursor-pointer text-amber-50 bg-[#9E78CF] w-[40px] rounded-md text-[22px] text-center align-middle'>
            +
          </button>
        </div>

        {loading ? (
          <p className='text-center text-white'>Loading...</p>
        ) : (
          <ul className='flex flex-col justify-center max-w-fit mx-auto gap-y-4'>
            {todo.map((task) => (
              <li
                key={task.id}
                className='w-[432px] h-[75px] bg-[#15101C] text-[#9E78CF] flex justify-between items-center px-4 rounded-md'
              >
                <span
                  onClick={() => toggleTodo(task.id, task.completed)}
                  className={`cursor-pointer ${task.completed ? 'line-through text-[#78CFB0]' : ''}`}
                >
                  {task.title}
                </span>
                <button onClick={() => deleteTodo(task.id)} className='cursor-pointer'>
                  <Image src={TrashIcon} alt='delete' />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}



