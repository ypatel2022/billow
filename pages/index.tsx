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
        className="flex flex-col items-center justify-center px-5 xl:px-0"
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
        <motion.div className="">
          <motion.h1
            className="mt-20 font-title text-4xl tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            Track all of your finances
          </motion.h1>

          <motion.h1
            className=" font-title text-4xl tracking-[-0.02em] text-palette-300 drop-shadow-sm md:text-7xl md:leading-[5rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            in one place
          </motion.h1>
        </motion.div>
      </motion.div>


      <motion.div className="mt-20 flex flex-col items-center justify-center px-5 xl:px-0">
        <motion.div className="">
          <div>
            <h2 className="flex-auto font-title text-3xl tracking-[-0.02em] drop-shadow-sm md:text-5xl md:leading-[5rem]">
              See all of your spending
            </h2>
            <p className="mr-20">
              asdlfjadsldfjklasjkl;dsfjsdljg;dsjla;sjfkjdsfhksndfklj sdljg dsfhg jkdsfg kldsjgh sdkjlgh sdkjlgh kljaht
              rasdfkljaskl;dfj oajflsajfdlasdjf ladsj fkasdfj ladsjflasjkdfqe
            </p>
          </div>
          <img src="/placeholderimage.jpg" alt="" className="h-90 w-80" />
        </motion.div>
      </motion.div>


      

      {/* here we are animating with Tailwind instead of Framer Motion because Framer Motion messes up the z-index for child components */}
    </>
  )
}
