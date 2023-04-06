import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import LoginLayout from '../layout/loginLayout'
import Link from 'next/link'
import styles from '../styles/Login.module.css'
import { Formik } from 'formik'
import { XCircleIcon } from '@heroicons/react/24/solid'

import { UserIcon, AtSymbolIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import { errors } from 'jose'
import { register_validate, register_validate_yup } from '@/lib/validate'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  return (
    <LoginLayout>
      <Head>
        <title>Register</title>
      </Head>
      <section className='w-3/4 mx-auto flex flex-col gap-2'>
        <XCircleIcon className='w-7 h-7 ml-auto mb-2 text-gray-500' role='button' onClick={() => router.push('/')} />
        <div className='title py-4'>
          <h1 className='text-gray-800 font-bold text-4xl py-4'>Register</h1>
          <p className='w-3/4 mx-auto text-gray-500'>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
          </p>
        </div>

        <Formik
            initialValues={{
                username: '',
                email:'',
                password: '',
                cpassword: ''
            }}
            // validate={register_validate}
            validationSchema={register_validate_yup}
            onSubmit={ async (values, actions) => {
                const options = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(values)
                }
                await fetch('http://localhost:3000/api/auth/signup',options)
                    .then(res => res.json())
                    .then(data => {
                        if(data) router.push('http://localhost:3000/login')
                    })
            }}
        >
            {props =>(
                <form className='flex flex-col gap-5' onSubmit={props.handleSubmit}>
                    <div className={styles.input_group}>
                        <input
                            className={styles.input_text + ' dark:bg-white dark:text-gray-900'}
                            id='username'
                            type='text'
                            name='username'
                            placeholder='username'
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.username}
                        />
                        <span className='icon flex items-center px-4 text-[#cbd5e1]'>
                            <UserIcon className='w-7 h-7' role='button' />
                        </span>
                    </div>

                    {
                        props.errors.username && props.touched.username && 
                            <div id="feedback" className={styles.invalid_tips}>
                                {props.errors.username}
                            </div>
                    }

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
                        props.errors.email && props.touched.password && 
                            <div id="feedback" className={styles.invalid_tips}>
                                {props.errors.email}
                            </div>
                    }

                    <div className={styles.input_group}>
                        <input 
                            className={styles.input_text + ' dark:bg-white dark:text-gray-900'} 
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

                    <div className={styles.input_group}>
                        <input 
                            className={styles.input_text + ' dark:bg-white dark:text-gray-900'} 
                            type={ showPassword? 'text' : 'password' }
                            id='cpassword'
                            name='cpassword' 
                            placeholder='confirm password'
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.cpassword}
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
                        props.errors.cpassword && props.touched.cpassword && 
                            <div id="feedback" className={styles.invalid_tips}>
                                {props.errors.cpassword}
                            </div>
                    }
                    

                    <div className='input-button'>
                        <button className={styles.button} type='submit'>Login</button>
                    </div>
                </form>        
            )}
        </Formik>

        

        <p className='text-center text-gray-500 mt-8'>
            Have a account? &nbsp;
            <Link href={'/login'} className='text-blue-600'>Sign In</Link>
        </p>
      </section>
      
    </LoginLayout>
  )
}

export default Register