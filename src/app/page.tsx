

import AddToDO from '@/Components/AddToDO'
import TodoList from '@/Components/TodoList'

export default function Home() {
  return (
   
      <main className="flex flex-col justify-center items-center gap-5 bg-[#494D5f] h-screen">
        <h2 className='text-[#d0bdf4] font-bold text-3xl'>TaskCart</h2>
        <AddToDO/>
        <TodoList/>
      </main>
   
  )
}
