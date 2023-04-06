import React from 'react'
import styles from '../styles/layout.module.css'
import Navbar from '@/components/Navbar'

const MainLayout = ({ children }) => {
    return(
        <div className='w-full flex-col flex justify-center items-center'>
            <Navbar />
            <div>{children}</div>
        </div>
    )
}

export default MainLayout