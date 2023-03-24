import { FADE_IN_ANIMATION_SETTINGS } from '@/lib/constants'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useEffect } from 'react'
import useScroll from '@/lib/hooks/use-scroll'
import Meta from './meta'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { auth, signInWithGoogle, logout } from '@/firebase/clientApp'
import { Google } from '../shared/icons'

export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string
    description?: string
    image?: string
  }
  children: ReactNode
}) {
  const scrolled = useScroll(50)

  const router = useRouter()
  const [user, loading, error] = useAuthState(auth)

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return
    }

    if (router.asPath === '/login' && user) {
      router.push('/dashboard')
    }
    if (router.asPath === '/signup' && user) {
      router.push('/dashboard')
    }

    // redirect to login page if user is not logged in. If not logged in, only /login, /signup, and / are allowed
    if (!user && router.asPath !== '/') {
      router.push('/')
    }
  }, [user, loading, router])

  return (
    <div className="flex min-h-[100vh] flex-col justify-between">
      <Meta {...meta} />

      <div
        className={`fixed -z-10 h-screen w-full ${
          router.asPath.startsWith('/dashboard') ? 'bg-white' : 'bg-palette-100'
        } `}
      />

      <div className={`fixed top-0 w-full ${scrolled ? 'border-b border-gray-200 bg-white' : ''} z-30 transition-all`}>
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-title text-2xl font-bold">
            {/* <Image src="/logo.png" alt="Precedent logo" width="30" height="30" className="mr-2 rounded-sm"></Image> */}
            <p>Billow</p>
          </Link>
          <div className="flex items-center gap-8">
            {!user || router.asPath != '/dashboard' ? (
              <>
                <div>
                  <Link href="/#how-it-works">How it works</Link>
                </div>
                <div>
                  <Link href="/#features">Features</Link>
                </div>

                {user && (
                  <div>
                    <Link href="/dashboard">Dashboard</Link>
                  </div>
                )}
              </>
            ) : (
              <>
                {router.asPath.startsWith('/dashboard') && (
                  <>
                    <Link className="font-bold" href="/dashboard">
                      Overview
                    </Link>
                    <Link href="/dashboard/expenses">Expenses</Link>
                    <Link href="/dashboard/cashflow">Cash Flow</Link>
                    <Link href="/dashboard/networth">Net Worth</Link>
                    <Link href="/dashboard/optimize">Optimize</Link>
                  </>
                )}
              </>
            )}

            <AnimatePresence>
              {user ? (
                <button type="button" className="primary-btn" onClick={logout}>
                  Logout
                </button>
              ) : (
                <button type="button" className="primary-btn" onClick={signInWithGoogle}>
                  <Google className="mr-2 -ml-1 h-4 w-4" />
                  Login
                </button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <main className={`text-xl`}>{children}</main>

      {!router.asPath.startsWith('/dashboard') && (
        <div className="w-full border-t py-0 text-center">
          
        </div>
      )}
    </div>
  )
}
