import React from 'react'
import ThemeSwitch from './ThemeSwitch'
import Link from 'next/link'
import Image from 'next/image'
import User from './User'

const Navbar = () => {
  return (
    <div className='w-full p-4 pr-8 bg-gray-100 flex justify-between items-center dark:bg-gray-800'>
        <div className='flex flex-row items-center gap-5' >
            <Image src='/assets/logo.png' width={50} height={50} alt='Logo'/>
            <h3 className='text-[2.4rem] font-semibold text-gray-700 dark:text-gray-200'>CALKWALK</h3>
        </div>
        <div className='flex flex-row justify-center items-cener gap-10'>
            <ThemeSwitch />
            <User />
        </div>
        
    </div>
  )
}

export default Navbar