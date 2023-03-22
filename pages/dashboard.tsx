import Layout from '@/components/layout'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import ExpenseItem from '@/components/ExpenseItem'
import { useRouter } from 'next/router'
import { auth } from '@/firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Dashboard() {
  const router = useRouter()

  const [user, loading, error] = useAuthState(auth)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/')
    } else {
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-700 opacity-75">
        <div className="loader mb-4 h-12 w-12 rounded-full border-4 border-t-4 border-gray-200 ease-linear"></div>
        <h2 className="text-center text-xl font-semibold text-white">Loading...</h2>
      </div>
    )
  }

  return (
    <>
      <div className="w-full pt-16">
        <div className="lg:flex">
          <aside
            className="fixed inset-0 z-20 hidden h-full w-72 flex-none lg:static lg:block lg:h-auto lg:w-72 lg:overflow-y-visible lg:pt-0"
            aria-labelledby="sidebar-label"
          >
            {/* <h4 id="sidebar-label" className="block">
              Browse docs
            </h4> */}

            <div className="scrolling-touch max-w-2xs top:24 z-20 h-full bg-white lg:sticky lg:top-24 lg:mr-0 lg:block lg:h-[calc(100vh-18rem)]">
              <div className="col-span-3 mt-8 bg-white">
                <div className="grid w-full grid-cols-1 items-center justify-between gap-2 p-2 lg:grid-cols-2">
                  <button className="secondary-btn" type="button">
                    Add new expense
                  </button>

                  <button className="secondary-btn" type="button">
                    Upload Photo
                  </button>
                </div>

                <div className="p-2">
                  <div>Filter</div>

                  <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      Sort by
                      <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="inline-flex w-full justify-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      Date
                      <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="inline-flex w-full justify-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      Price
                      <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="scrolling-touch max-w-2xs z-20 h-full overflow-y-auto bg-white lg:sticky lg:top-32 lg:mr-0 lg:block lg:h-[calc(100vh-18rem)]">
                <nav
                  id="nav"
                  className="sticky?lg:h-(screen-18) text-base font-normal lg:pl-0 lg:text-sm"
                  aria-label="Docs navigation"
                >
                  <ul className="mb-0">
                    {data.map((item) => (
                      <ExpenseItem key={item.id} data={item} />
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </aside>

          <main id="content-wrapper" className="w-full min-w-0 flex-auto lg:static lg:max-h-full lg:overflow-visible">
            <div className="flex w-full">
              <div className="pb:12 min-w-0 max-w-4xl flex-auto pt-6 lg:px-8 lg:pt-8 lg:pb-16 xl:pb-24">
                <div className="mb-8 border-b border-gray-200 pb-4 dark:border-gray-800">
                  <h1 className="mb-2 inline-block text-3xl font-extrabold tracking-tight " id="content">
                    Insights
                  </h1>
                  <p className="mb-4 text-lg text-palette-300">
                    Below are your spending statistics for the past 30 days
                  </p>
                </div>

                <div></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

const data = [
  {
    id: 1,
    location: 'Walmart',
    date: '2021-01-01',
    price: 100,
    type: 'groceries',
    status: 'paid',
  },
  {
    id: 2,
    location: 'Target',
    date: '2021-01-01',
    price: 14,
    type: 'groceries',
    status: 'paid',
  },
  {
    id: 3,
    location: 'Walmart',
    date: '2021-01-01',
    price: 100,
    type: 'groceries',
    status: 'paid',
  },
  {
    id: 4,
    location: 'Target',
    date: '2021-01-01',
    price: 14,
    type: 'groceries',
    status: 'paid',
  },
  {
    id: 5,
    location: 'Walmart',
    date: '2021-01-01',
    price: 100,
    type: 'groceries',
    status: 'paid',
  },
  {
    id: 6,
    location: 'Target',
    date: '2021-01-01',
    price: 14,
    type: 'groceries',
    status: 'paid',
  },
  {
    id: 7,
    location: 'Walmart',
    date: '2021-01-01',
    price: 100,
    type: 'groceries',
    status: 'paid',
  },
  {
    id: 8,
    location: 'Target',
    date: '2021-01-01',
    price: 14,
    type: 'groceries',
    status: 'paid',
  },
  {
    id: 9,
    location: 'Walmart',
    date: '2021-01-01',
    price: 100,
    type: 'groceries',
    status: 'paid',
  },
  {
    id: 10,
    location: 'Target',
    date: '2021-01-01',
    price: 14,
    type: 'groceries',
    status: 'paid',
  },
  {
    id: 11,
    location: 'Walmart',
    date: '2021-01-01',
    price: 100,
    type: 'groceries',
    status: 'paid',
  },
  {
    id: 12,
    location: 'Target',
    date: '2021-01-01',
    price: 14,
    type: 'groceries',
    status: 'paid',
  },
]
