import React from 'react'
import styles from '../styles/layout.module.css'

const LoginLayout = ({ children }) => {
  return (
    <div className='flex h-screen bg-gray-200 dark:bg-gray-700'>
        <div className='m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg: grid-cols-2'>
            <div className={styles.bg_image}>
                <div className={styles.cartoon_image}>
                <div className={styles.logo_image}></div>
                </div>
            </div>

            <div className='right flex flex-col justify-evenly'>
                <div className='text-center py-10'>
                    {children}
                </div>
            </div>
        </div>
        
    </div>
    
  )
}

export default LoginLayout