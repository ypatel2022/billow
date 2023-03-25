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

        <motion.div className="flex justify-center">
          <Image width={753} height={450} className="mt-28 mb-20 object-center " src="/laptop.png" alt="laptop" />
        </motion.div>

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

        <Balancer className="ml-0 mt-10 text-3xl lg:ml-24">
          Ready to take control of your finances? Sign up for Billow today and start managing your money.
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

      <footer className="bg-white">
        <div className="container mx-auto w-full p-6 sm:p-6">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <Link href="/" className="ml-20 mr-16 mt-5 flex items-center font-title text-5xl font-bold">
                {/* <Image src="/logo.png" alt="Precedent logo" width="30" height="30" className="mr-2 rounded-sm"></Image> */}
                <p>Billow</p>
              </Link>
            </div>

            <div className="mt-7 mr-24 flex gap-10">
              <Link href="/dashboard" className="hover:underline">
                Support
              </Link>
              <Link href="#how-it-works" className="hover:underline">
                How it works
              </Link>
              <Link href="#features" className="hover:underline">
                Features
              </Link>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </div>
          </div>

          <div className="flex flex-auto justify-center"></div>
          <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />

          <div className="gap-6 sm:flex sm:items-center sm:justify-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
              © 2023{' '}
              <Link href="/" className="hover:underline">
                Billow
              </Link>
            </span>

            <a
              href="https://github.com/ypatel2022/billow"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="sr-only">GitHub account</span>
            </a>
          </div>
        </div>
      </footer>

      {/* here we are animating with Tailwind instead of Framer Motion because Framer Motion messes up the z-index for child components */}
    </>
  )
}
