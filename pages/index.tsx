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
import optimize from '@/lib/dashboard-utils'

export default function Home() {
  const [user, loading, error] = useAuthState(auth)

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return
    }
  }, [user, loading])

  optimize()

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
            className="ml-10 font-title text-6xl tracking-[-0.02em] drop-shadow-sm md:ml-0 lg:text-9xl lg:leading-[9.5rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            Managing Money,
            <p className="font-semibold text-palette-300">Made Simple</p>
          </motion.h1>

          <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="mt-8 ml-10 md:ml-0">
            {user ? (
              <Link className="big-btn" href="/dashboard">
                Go to Dashboard
              </Link>
            ) : (
              <button type="button" className="big-btn" onClick={() => signInWithGoogle()}>
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
          className="ml-0 font-title text-4xl tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem] lg:ml-24"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          Billow streamlines the process of <span className="font-semibold">tracking your finances</span> in one
          convenient location
        </motion.h1>

        <motion.h1
          className="mt-20 ml-0 font-title text-3xl font-semibold tracking-[-0.02em] text-palette-300 drop-shadow-sm md:text-5xl md:leading-[5rem] lg:ml-24"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          Record your expenses
        </motion.h1>

        <Balancer className="ml-0 lg:ml-24">
          With just a few clicks, you can effortlessly add all of your bills and expenses to our platform. Manage your
          invoices, bills, and purchases with Billow&apos;s efficient organization features to never miss a bill payment
          again. Upload photos of your receipts and Billow will automatically scan, record and analyze your purchases.
        </Balancer>

        <motion.h1
          className="mt-20 ml-0 font-title text-3xl font-semibold tracking-[-0.02em] text-palette-300 drop-shadow-sm md:text-5xl md:leading-[5rem] lg:ml-24"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          Receive tailored financial advice
        </motion.h1>

        <Balancer className="ml-0 lg:ml-24">
          Billow helps you stay on track by providing specialized insight on your spending habits. Our state-of-the-art
          technology automatically categorizes your transactions and delivers a comprehensive breakdown of your spending
          habits, empowering you to optimize your expenses and take control of your finances.
        </Balancer>

        <motion.h1
          className="mt-20 ml-0 font-title text-3xl font-semibold tracking-[-0.02em] text-palette-300 drop-shadow-sm md:text-5xl md:leading-[5rem] lg:ml-24"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          Analyze spending habits at a glance
        </motion.h1>

        <Balancer className="ml-0 lg:ml-24">
          Identify new ways you can save money and optimize your spending habits. Billow&apos;s intuitive interface
          makes it easy to track your spending habits and stay on top of your finances. Easily visualize your long and
          short term trends with dynamic charts.
        </Balancer>

        <motion.h1
          className="mt-20 ml-0 font-title text-3xl font-semibold tracking-[-0.02em] text-palette-300 drop-shadow-sm md:text-5xl md:leading-[5rem] lg:ml-24"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          Set Budgets & Goals
        </motion.h1>

        <Balancer className="ml-0 lg:ml-24">
          With Billow, you can set budgets and financial goals to help you save money and achieve your financial
          objectives. Our platform provides personalized insights and recommendations to help you stay on track, and
          we&apos;ll send you alerts when you&apos;re approaching your budget limits.
        </Balancer>

        <motion.h1
          className="ml-0 mt-32 font-title text-4xl tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[5rem] lg:ml-24"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          Try Billow <span className="text-palette-300">Today</span>
        </motion.h1>

        <Balancer className="ml-0 mt-10 text-4xl lg:ml-24">
          Ready to take control of your finances? Sign up for Billow today and start managing your money, made simple.
        </Balancer>
      </motion.div>

      <motion.div
        className="mx-5 w-full max-w-screen-xl py-5 xl:mx-auto xl:px-0"
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
        <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="ml-24 mb-24">
          {user ? (
            <Link className="big-btn" href="/dashboard">
              Go to Dashboard
            </Link>
          ) : (
            <button type="button" className="big-btn" onClick={() => signInWithGoogle()}>
              Get Started For Free
            </button>
          )}
        </motion.div>
      </motion.div>

      {/* here we are animating with Tailwind instead of Framer Motion because Framer Motion messes up the z-index for child components */}
    </>
  )
}
