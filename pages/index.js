import Head from 'next/head'
import Link from 'next/link'
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'
import MainLayout from '@/layout/mainLayout'
import styles from '@/styles/Home.module.css'

export default function Home() {
  const { data: session } = useSession()
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        {
          session ? AuthorizedUser({session}) : Guest()
        }
      </MainLayout>
      
    </>
  )
}

// Guest
function Guest() {
  return (
    <main className={styles.main}>
      <h3 className="text-4xl font-bold text-gray-500">
        Guest Homepage.
      </h3>
    </main>
  )
}

// Authorized User
function AuthorizedUser({session}) {
  return (
    <main className={styles.main}>
      <h3 className="text-4xl font-bold">
        AuthorizedUser Homepage.
      </h3>
      
      <div className='mt-10'>
        Welcome
        <h5>{session?.user?.name}</h5>
        <h5>{session?.user?.email}</h5>
      </div>

    </main>
  )
}

// Export the `session` prop to use sessions with Server Side Rendering
// export async function getServerSideProps(context) {
//   const props = {
//     props: {
//       session: await getServerSession(context.req, context.res, authOptions),
//     },
//   }
//   console.log(props)

//   if(!props.session){
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false
//       }
//     }
//   }

//   return props
// }