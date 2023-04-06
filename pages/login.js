import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import LoginLayout from '../layout/loginLayout'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Login.module.css'
import { Formik } from 'formik'
import { XCircleIcon } from '@heroicons/react/24/solid'

import { AtSymbolIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'

import { signIn } from "next-auth/react"
import { login_validate, login_validate_yup } from '@/lib/validate'
import { userAgent } from 'next/server'


const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleGoogleSignin = async () => {
    signIn('google',{
        callbackUrl: 'http://localhost:3000'
    })
  }

  const handleGithubSignin = async () => {
    signIn('github',{
        callbackUrl: 'http://localhost:3000'
    })
  }

  const router = useRouter()
  const handleCredentialsSignin = async (values, actions) => {
    const result = await signIn('credentials', {
        redirect: false,
        email:values.email,
        name:'abcdefg',
        password: values.password,
        callbackUrl: '/'
    })

    if(result.ok) {
        router.push(result.url)
    }
  }

  return (
    <LoginLayout>
      <Head>
        <title>Login</title>
      </Head>
      
      <section className='w-3/4 mx-auto flex flex-col gap-2'>
        <XCircleIcon className='w-7 h-7 ml-auto mb-2 text-gray-500' role='button' onClick={() => router.push('/')} />
        <div className='title py-4'>
          <h1 className='text-gray-800 font-bold text-4xl py-4'>Calkwalk</h1>
          <p className='w-3/4 mx-auto text-gray-500'>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
          </p>
        </div>

        <Formik
            initialValues={{email:'calkwalk@163.com', password: ''}}
            validate={login_validate}
            // validationSchema={login_validate_yup}
            onSubmit={(values,actions) => handleCredentialsSignin(values,actions)}
        >
            {props =>(
                <form className='flex flex-col gap-5' onSubmit={props.handleSubmit}>
                    
                    <div className={styles.input_group}>          
                        <input 
                            className={styles.input_text + ' dark:bg-white dark:text-gray-900'}
                            id='email'
                            type='email' 
                            name='email' 
                            placeholder='email address'
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.email}
                        />
                        <span className='icon flex items-center px-4 text-[#cbd5e1]'>
                            <AtSymbolIcon className='w-7 h-7' role='button' />
                        </span>
                    </div>

                    {
                        props.errors.email && props.touched.email && 
                            <div id="feedback" className={styles.invalid_tips}>
                                {props.errors.email}
                            </div>
                    }


                    <div className={styles.input_group}>
                        <input
                            className={styles.input_text+ ' dark:bg-white dark:text-gray-900'}
                            type={ showPassword? 'text' : 'password' }
                            id='password'
                            name='password'
                            placeholder='password'
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.password}
                        />
                        <span className='icon flex items-center px-4 text-[#cbd5e1]'>
                            {
                                showPassword
                                ? <EyeSlashIcon className='w-7 h-7' role='button' onClick={()=>setShowPassword(!showPassword)} />
                                : <EyeIcon className='w-7 h-7' role='button' onClick={()=>setShowPassword(!showPassword)} />
                            }
                            
                        </span>
                    </div>

                    {
                        props.errors.password && props.touched.password && 
                            <div id="feedback" className={styles.invalid_tips}>
                                {props.errors.password}
                            </div>
                    }

                    <div className='input-button'>
                        <button className={styles.button} type='submit'>Login</button>
                    </div>

                    {/* Auth by Other Organizations */}
                    <div className='input-button'>
                        <button className={styles.button_custom} type='button' onClick={handleGoogleSignin}>
                            <Image src='/assets/google.svg' width={24} height={24} alt='Google'/>
                            Sign in with Google
                        </button>
                    </div>
                    <div className='input-button'>
                        <button className={styles.button_custom} type='button' disabled={props.isSubmitting}  onClick={handleGithubSignin}>
                            <Image src='/assets/github.svg' width={24} height={24} alt='Google'/>
                            Sign in with Github
                        </button>
                    </div>
                </form>    
            )}
            

        </Formik>

        <p className='text-center text-gray-500 mt-10'>
            Don&apos;t have a account? &nbsp;
            <Link href={'/register'} className='text-blue-600'>Sign Up</Link>
        </p>
      </section>
      
    </LoginLayout>
  )
}

export default Login