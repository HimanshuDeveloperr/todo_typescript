"use client"

import Link from 'next/link'
import React from 'react'
import {useSearchParams} from 'next/navigation'

const Navbar = () => {
    const searchParams=useSearchParams()
    const todosFilter=searchParams.get('todos')


    console.log(todosFilter)

  return (
    <nav>
        <Link href='/' className='text-2xl text-[#00ddff52] mr-5 hover:text-[gray] transition-colors duration-300'>  All</Link>
        <Link href='/?todos=active'className='text-2xl text-[#00ddff52] mr-5 hover:text-[gray] transition-colors duration-300'>Active</Link>
        <Link href='/?todos=completed'className='text-2xl text-[#00ddff52] mr-5 hover:text-[gray] transition-colors duration-300'>Completed</Link>
    </nav>
  )
}

export default Navbar