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
    <Layout>
      <motion.div
        className="flex h-screen items-center px-5 py-16 xl:px-0"
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
            className="font-title text-4xl tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
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
                Log in with Google
              </button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="px-5 xl:px-0"
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
          Keep Your Bills <span className="font-bold">Low</span>
        </motion.h1>
      </motion.div>

      {/* here we are animating with Tailwind instead of Framer Motion because Framer Motion messes up the z-index for child components */}
    </Layout>
  )
}

const features = [
  {
    title: 'Beautiful, reusable components',
    description:
      'Pre-built beautiful, a11y-first components, powered by [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), and [Framer Motion](https://framer.com/motion)',
    large: true,
  },
  {
    title: 'Performance first',
    description:
      'Built on [Next.js](https://nextjs.org/) primitives like `@next/font` and `next/image` for stellar performance.',
    demo: <WebVitals />,
  },
  {
    title: 'One-click Deploy',
    description: 'Jumpstart your next project by deploying Precedent to [Vercel](https://vercel.com/) in one click.',
    demo: (
      <a href={DEPLOY_URL}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://vercel.com/button" alt="Deploy with Vercel" width={120} />
      </a>
    ),
  },
  {
    title: 'Built-in Auth + Database',
    description:
      'Precedent comes with authentication and database via [Auth.js](https://authjs.dev/) + [Prisma](https://prisma.io/)',
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="Auth.js logo" src="/authjs.webp" width={50} height={50} />
        <Image alt="Prisma logo" src="/prisma.svg" width={50} height={50} />
      </div>
    ),
  },
  {
    title: 'Hooks, utilities, and more',
    description: 'Precedent offers a collection of hooks, utilities, and `@vercel/og`',
    demo: (
      <div className="grid grid-flow-col grid-rows-3 gap-10 p-10">
        <span className="font-mono font-semibold">useIntersectionObserver</span>
        <span className="font-mono font-semibold">useLocalStorage</span>
        <span className="font-mono font-semibold">useScroll</span>
        <span className="font-mono font-semibold">nFormatter</span>
        <span className="font-mono font-semibold">capitalize</span>
        <span className="font-mono font-semibold">truncate</span>
      </div>
    ),
  },
]
