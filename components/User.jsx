import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useSession, signOut } from "next-auth/react"
  
const User = () => {
    const { data: session } = useSession()
    const router = useRouter()

    const isLogined = session && session.user

    console.log('session:', session)

    const handleSignOut = () => {
        signOut()
    }
    const handleSignIn= () => {
        router.push('http://localhost:3000/login')
    }
    return (
        <div className='flex flex-row justify-center items-center gap-2 cursor-pointer'>
            <div className='w-[40px] h-[40px] rounded-full bg-white flex relative justify-center items-center'>
                <Image src={ isLogined ? session.user.image: '/assets/no-login.png'} alt='profile' object-fit="contain" fill={true}
                className='rounded-full' />
            </div>
            <div className='text-gray-800 dark:text-gray-200 cursor-pointer'>
                <p className='text-[16px] text-semibold'>{isLogined ?  session.user.name : 'Not login' }</p>
                <Link href='#'>
                    <p className='text-[13px] text-gray-600'>{ isLogined ? session.user.email : 'please sign in'}</p>
                </Link>
            </div>
            {
                isLogined
                ? <button 
                    className='bg-gradient-to-r from-blue-500 to-indigo-500 
                        py-1 px-4 ml-4 rounded-3xl text-white'
                    onClick={handleSignOut}
                  >
                    Logout
                </button>
                : <button 
                    className='bg-gradient-to-r from-blue-500 to-indigo-500 
                        py-1 px-4 ml-4 rounded-3xl text-white'
                    onClick={handleSignIn}
                  >
                    Login
                </button>
            }
            
        </div>
    )
}

export default User