import React from 'react'
import styles from '../styles/layout.module.css'
import Navbar from '@/components/Navbar'

const MainLayout = ({ children }) => {
    return(
        <>
            <Navbar />
            <div>{children}</div>
        </>
    )
}

export default MainLayout