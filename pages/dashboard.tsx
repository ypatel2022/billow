import Layout from '@/components/layout'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import ExpenseItem from '@/components/ExpenseItem'
import { useRouter } from 'next/router'
import { auth, getExpensesByUser, uploadExpense } from '@/firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Expense } from 'types'
import {
  Card,
  Grid,
  Tab,
  TabList,
  Text,
  Title,
  Flex,
  BadgeDelta,
  Metric,
  ProgressBar,
  AreaChart,
  Toggle,
  ToggleItem,
  Icon,
  DonutChart,
} from '@tremor/react'
import { InformationCircleIcon } from '@heroicons/react/outline'
import { valueFormatter, dollarFormatter, numberFormatter } from '@/lib/utils'

export default function Dashboard() {
  const router = useRouter()

  const [user, loading, error] = useAuthState(auth)
  const [isLoading, setIsLoading] = useState(true)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [breakdownByType, setBreakdownByType] = useState<any>([])
  const [showModal, setShowModal] = useState(false)

  const [render, setRender] = useState('')

  // for dashboard graphs
  const [selectedView, setSelectedView] = useState(1)
  const [selectedKpi, setSelectedKpi] = useState('price')
  // map formatters by selectedKpi
  const formatters: { [key: string]: any } = {
    Sales: dollarFormatter,
    Profit: dollarFormatter,
    Customers: numberFormatter,
  }

  useEffect(() => {
    if (!user) {
      router.push('/')
    } else {
      getExpensesByUser().then((_expenses: any) => {
        let arr: Expense[] = []
        let arrByType: any = [
          {
            type: 'Savings',
            total: 0,
          },
          {
            type: 'Food',
            total: 0,
          },
          {
            type: 'Entertainment',
            total: 0,
          },
          {
            type: 'Transportation',
            total: 0,
          },
          {
            type: 'Housing',
            total: 0,
          },
          {
            type: 'Debt Payment',
            total: 0,
          },
          {
            type: 'Medical',
            total: 0,
          },
          {
            type: 'Other',
            total: 0,
          },
        ]

        _expenses.docs.forEach((doc: any) => {
          arr.push(doc.data())

          arrByType.forEach((item: any) => {
            if (item.type === doc.data().type) {
              item.total += doc.data().price
            }
          })
        })

        setExpenses(arr)
        setBreakdownByType(arrByType)
      })
      setIsLoading(false)
    }
  }, [render])

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
            <div className="scrolling-touch max-w-2xs top:24 z-20 h-full bg-white lg:sticky lg:top-24 lg:mr-0 lg:block lg:h-[calc(100vh-18rem)]">
              <div className="col-span-3 mt-8 bg-white">
                <div className="w-full p-2 text-center">
                  <button onClick={() => setShowModal(!showModal)} className="secondary-btn" type="button">
                    Add new expense
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
                    {expenses &&
                      expenses.map((expense: Expense) => (
                        <ExpenseItem key={expense.name + expense.date + expense.price} data={expense} />
                      ))}
                  </ul>
                </nav>
              </div>
            </div>
          </aside>

          <main className="w-full min-w-0 flex-auto lg:static lg:max-h-full lg:overflow-visible">
            <main className="bg-slate-50 px-6 sm:px-10 sm:pt-4 sm:pb-10">
              {/* Net Worth */}
              <Grid numColsLg={3} className="mt-6 gap-6">
                <Card className="max-w-lg">
                  <Flex alignItems="start">
                    <div>
                      <Text>Net Worth</Text>
                      <Metric>$ 12,699</Metric>
                    </div>
                    <BadgeDelta deltaType="moderateIncrease">13.2%</BadgeDelta>
                  </Flex>
                  <Flex className="mt-4">
                    <Text className="truncate">68% ($ 149,940)</Text>
                    <Text> Goal: $ 220,500 </Text>
                  </Flex>
                  <ProgressBar percentageValue={15.9} className="mt-2" />
                </Card>

                {/* Weekly expense */}

                <Card className="max-w-lg">
                  <Flex alignItems="start">
                    <div>
                      <Text>Weekly Expenses</Text>
                      <Metric>$ 12,699</Metric>
                    </div>
                    <BadgeDelta deltaType="moderateIncrease">13.2%</BadgeDelta>
                  </Flex>
                  <Flex className="mt-4">
                    <Text className="truncate">68% ($ 149,940)</Text>
                    <Text> Goal: $ 220,500 </Text>
                  </Flex>
                  <ProgressBar percentageValue={15.9} className="mt-2" />
                </Card>

                {/* Monthly Expenses */}

                <Card className="max-w-lg">
                  <Flex alignItems="start">
                    <div>
                      <Text>Sales</Text>
                      <Metric>$ 12,699</Metric>
                    </div>
                    <BadgeDelta deltaType="moderateIncrease">13.2%</BadgeDelta>
                  </Flex>
                  <Flex className="mt-4">
                    <Text className="truncate">68% ($ 149,940)</Text>
                    <Text> Goal: $ 220,500 </Text>
                  </Flex>
                  <ProgressBar percentageValue={15.9} className="mt-2" />
                </Card>
              </Grid>

              {/* graph */}
              <Grid numCols={2} className="mt-6 gap-6">
                <Card>
                  <div className="justify-between md:flex">
                    <div>
                      <Flex justifyContent="start" className="space-x-0.5" alignItems="center">
                        <Title> Expense History </Title>
                        <Icon icon={InformationCircleIcon} variant="simple" tooltip="Shows daily changes of expenses" />
                      </Flex>
                      <Text> Daily increase or decrease </Text>
                    </div>
                  </div>
                  <AreaChart
                    data={expenses}
                    index="date"
                    categories={[selectedKpi]}
                    colors={['blue']}
                    showLegend={false}
                    valueFormatter={formatters[selectedKpi]}
                    yAxisWidth={56}
                    className="mt-8 h-96"
                  />
                </Card>

                {/* pie chart */}
                <Card className="max-w-lg font-title text-2xl text-palette-500 drop-shadow-sm md:text-3xl">
                  <Title>Expense Breakdown</Title>
                  <DonutChart
                    className="mt-6 h-96 w-full focus:outline-none"
                    data={breakdownByType}
                    category="total"
                    index="type"
                    valueFormatter={valueFormatter}
                    colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
                  />
                </Card>
              </Grid>
            </main>
          </main>

          {showModal ? (
            <AddExpenseModal setRender={setRender} showModal={showModal} setShowModal={setShowModal} />
          ) : null}
        </div>
      </div>
    </>
  )
}

function AddExpenseModal({ setShowModal, setRender }: any) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [date, setDate] = useState('')
  const [paymentType, setPaymentType] = useState('Savings')
  const [paymentStatus, setPaymentStatus] = useState('Paid')
  const [loading, setLoading] = useState(false)
  const [imageData, setImageData] = useState({})
  const [selectedFile, setSelectedFile] = useState<any>(null)

  async function handleSubmit(e: any): Promise<void> {
    if (loading) {
      return
    }

    // make sure the form doesnt have default values
    if (name === '' || date === '') {
      alert('Please fill in all fields')
      return
    }

    e.preventDefault()

    setLoading(true)

    const expense: Expense = {
      name: name,
      price: price,
      date: date,
      type: paymentType,
      status: paymentStatus,
    }

    await uploadExpense(expense).then((res) => {
      setLoading(false)
      setShowModal(false)
      // re-render the page
      setRender(name + price + date + paymentType + paymentStatus)
    })
  }

  function handleFileChange(e: any) {
    setSelectedFile(e.target.files[0])
  }

  async function getImageData(e: any) {
    if (selectedFile == null) {
      return
    }

    var myHeaders = new Headers()
    myHeaders.append('Authorization', 'Token b1e123be55c250aa9237cb62ea9d3c2d')

    let formdata = new FormData()

    formdata.append('document', selectedFile, selectedFile.name)

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    }

    await fetch('https://api.mindee.net/v1/products/mindee/expense_receipts/v4/predict', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // console.log(result)

        const resultJson = JSON.parse(result)

        const predictions = resultJson?.document?.inference?.prediction

        if (predictions?.date?.value) {
          setDate(predictions.date.value)
        }

        if (predictions?.total_amount?.value) {
          setPrice(predictions?.total_amount?.value)
        }

        if (predictions?.supplier?.value) {
          setName(predictions?.supplier?.value)
        }
      })
      .catch((error) => console.log('error', error))
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative my-5 mx-auto w-auto max-w-3xl">
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            <div className="items-start justify-between rounded-t border-b border-solid border-slate-200 px-5 pt-5 pb-2">
              <h3 className="text-xl font-semibold">Add a new Expense Below</h3>
              <p className="text-sm">
                Enter in your expense information manually, or you can upload an image of your receipt.
              </p>
            </div>

            <form>
              <div className="relative flex-auto px-5 py-2">
                <div className="text-sm leading-relaxed text-slate-500">
                  <div className="w-full">
                    <label
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="grid-name"
                    >
                      Name
                    </label>
                    <input
                      className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-2 px-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-name"
                      type="text"
                      placeholder="Name"
                      required={true}
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />

                    <label
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="grid-date"
                    >
                      Date
                    </label>
                    <input
                      className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-2 px-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-date"
                      type="date"
                      placeholder="Date"
                      required={true}
                      onChange={(e) => setDate(e.target.value)}
                      value={date}
                    />

                    <label
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="grid-price"
                    >
                      Price
                    </label>
                    <input
                      className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-2 px-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-price"
                      type="number"
                      step="0.01"
                      placeholder="Price"
                      required={true}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      value={price}
                    />

                    <label
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="grid-type"
                    >
                      Type
                    </label>

                    <select
                      className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-2 px-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-type"
                      required={true}
                      onChange={(e) => setPaymentType(e.target.value)}
                      value={paymentType}
                    >
                      <option>Savings</option>
                      <option>Food</option>
                      <option>Entertainment</option>
                      <option>Transportation</option>
                      <option>Housing</option>
                      <option>Debt Payment</option>
                      <option>Medical</option>
                      <option>Other</option>
                    </select>

                    <label
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="grid-status"
                    >
                      Status
                    </label>

                    <select
                      className="block w-full rounded border border-gray-200 bg-gray-200 py-2 px-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-status"
                      required={true}
                      onChange={(e) => setPaymentStatus(e.target.value)}
                      value={paymentStatus}
                    >
                      <option>Paid</option>
                      <option>Unpaid</option>
                    </select>

                    {/* upload image */}
                    <div className="mt-4">
                      <label
                        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                        htmlFor="grid-status"
                      >
                        Upload Receipt
                      </label>

                      <div className="mt-1 flex items-center">
                        <label
                          htmlFor="file-upload"
                          // className="relative cursor-pointer rounded-md bg-white font-medium text-slate-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-slate-500 focus-within:ring-offset-2 hover:text-slate-500"
                          className="mr-1 mb-1 cursor-pointer rounded bg-palette-300 px-5 py-2 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                        >
                          <span>Upload Image</span>
                        </label>

                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                        />

                        <button
                          type="button"
                          onClick={getImageData}
                          className="ml-5 mb-1 cursor-pointer rounded bg-palette-300 px-5 py-2 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                        >
                          Extract Data
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 px-5 pt-2 pb-5">
                <button
                  className={`background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none ${
                    loading ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                  type="button"
                  onClick={() => {
                    if (!loading) {
                      setShowModal(false)
                    }
                  }}
                >
                  Close
                </button>
                <button
                  className="mr-1 mb-1 rounded bg-palette-300 px-5 py-2 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  )
}
