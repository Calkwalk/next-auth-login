import React from 'react'
import ThemeSwitch from './ThemeSwitch'
import Link from 'next/link'
import Image from 'next/image'
import User from './User'
import styles from '@/styles/Navbar.module.css'

const Navbar = () => {
  return (
    
    <div className='w-full bg-gray-100 dark:bg-gray-800
      p-4 flex flex-row justify-center'
    >
      <div className={styles.main}>
        <div className='flex flex-row items-center gap-5 mx-5' >
            <Image src='/assets/logo.png' width={50} height={50} alt='Logo'/>
            <h3 className='text-[2.4rem] font-semibold text-gray-700 dark:text-gray-200'>CALKWALK</h3>
        </div>
        <div className='flex flex-row justify-center items-cener gap-10 mr-10'>
            <ThemeSwitch />
            <User />
        </div>
        
      </div>
    </div>
  )
}

export default Navbar