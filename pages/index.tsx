import Layout from '@/components/layout'
import Balancer from 'react-wrap-balancer'
import { motion } from 'framer-motion'
import { DEPLOY_URL, FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/constants'
import { Google } from '@/components/shared/icons'
import WebVitals from '@/components/home/web-vitals'
import ComponentGrid from '@/components/home/component-grid'
import Image from 'next/image'
import Link from 'next/link'
import { auth, signInWithGoogle, logout } from '@/firebase/clientApp'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Home() {
  const [user, loading, error] = useAuthState(auth)

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return
    }
  }, [user, loading])

  return (
    <>
      <motion.div
        className="flex h-screen items-center justify-center px-5 py-16 xl:px-0"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="">
          <motion.h1
            className="font-title text-4xl tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[7.5rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            Managing Money,
            <p className="font-semibold text-palette-300">Made Simple</p>
          </motion.h1>

          <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="mt-8">
            {user ? (
              <Link className="primary-btn" href="/dashboard">
                Go to Dashboard
              </Link>
            ) : (
              <button type="button" className="primary-btn" onClick={() => signInWithGoogle()}>
                Get Started For Free
              </button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        id="how-it-works"
        className="mx-5 w-full max-w-screen-xl py-16 xl:mx-auto xl:px-0"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.h1
          className="font-title text-4xl tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          Track all of your spending,
          <p className="text-palette-300">in one place</p>
        </motion.h1>

        <Balancer>
          Billow streamlines the process of tracking your spending in one convenient location. With just a few clicks,
          you can effortlessly add all of your bills and expenses to our platform. Our state-of-the-art technology
          automatically categorizes your transactions and delivers a comprehensive breakdown of your spending habits,
          empowering you to optimize your expenses and take control of your finances.
        </Balancer>
      </motion.div>

      <motion.div
        id="features"
        className="mx-5 w-full max-w-screen-xl py-16 xl:mx-auto xl:px-0"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.h1
          className="font-title text-4xl tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          Set <span className="text-palette-300">Budgets</span> & <span className="text-palette-300">Goals</span>
        </motion.h1>

        <Balancer>
          With Billow, you can set budgets and financial goals to help you save money and achieve your financial
          objectives. Our platform provides personalized insights and recommendations to help you stay on track, and
          we&apos;ll send you alerts when you&apos;re approaching your budget limits.
        </Balancer>
      </motion.div>

      <motion.div
        className="mx-5 w-full max-w-screen-xl py-16 xl:mx-auto xl:px-0"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.h1
          className="font-title text-4xl tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          Try Billow <span className="text-palette-300">Today</span>
        </motion.h1>

        <Balancer>
          Ready to take control of your finances? Sign up for Billow today and start managing your money, made simple.
        </Balancer>

        <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="mt-8">
          {user ? (
            <Link className="primary-btn" href="/dashboard">
              Go to Dashboard
            </Link>
          ) : (
            <button type="button" className="primary-btn" onClick={() => signInWithGoogle()}>
              Get Started For Free
            </button>
          )}
        </motion.div>
      </motion.div>

      {/* here we are animating with Tailwind instead of Framer Motion because Framer Motion messes up the z-index for child components */}
    </>
  )
}
