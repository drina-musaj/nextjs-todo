'use client'

import { useState } from 'react';
import { Todo } from '@/app/types/todo';
import Image from 'next/image';
import TrashIcon from '@/public/Trash.svg'

export default function Home() {

  const [todo, setTodo] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [nextId, setNextId] = useState(1);


  const addTodo = () => {
    if (!newTodo.trim()) return;
    const newEntry: Todo = {
      id: nextId, 
      title: newTodo.trim(),
      completed: false,
    };

    setTodo([...todo, newEntry]);
    setNewTodo('');
    setNextId(prev => prev + 1);

  };

  const toggleTodo = (id: number) => {
    setTodo(todo.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id: number) => {
    setTodo(todo.filter(todo => todo.id !== id));
  };

  return (
    <main>
      <div>

        <div className='flex justify-center my-10 gap-4'>
          <input
            type="text"
            value={newTodo}
            className='border-2 border-[#3E1671] rounded-md px-5 text-[#777777] w-[381px] h-[40px]'
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="New todo..."
          />
          <button onClick={addTodo} className='cursor-pointer text-amber-50 bg-[#9E78CF] w-[40px] rounded-md text-[22px] text-center align-middle' >
            +
          </button>
        </div>

        <ul className='flex flex-col justify-center max-w-fit mx-auto gap-y-4'> 
          {todo.map(todo => (
            <li className='w-[432px] h-[75px] bg-[#15101C] text-[#9E78CF] flex justify-between items-center px-4 rounded-md'
              key={todo.id}
            >
              <span
                onClick={() => toggleTodo(todo.id)}
                className={`cursor-pointer ${todo.completed ? 'line-through text-[#78CFB0]' : ''}`}
              >
                {todo.title}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)} className='cursor-pointer'>
                
                <Image src={TrashIcon} alt='delete'/>
                
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
