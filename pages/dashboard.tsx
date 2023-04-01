import React, { useEffect, useState } from 'react'
import ExpenseItem from '@/components/ExpenseItem'
import { useRouter } from 'next/router'
import { auth, getExpensesByUser, uploadExpense } from '@/firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Expense } from 'types'
import { Card, Grid, Text, Flex, AreaChart, Icon, DonutChart } from '@tremor/react'
import { InformationCircleIcon } from '@heroicons/react/outline'
import { valueFormatter, dollarFormatter, numberFormatter } from '@/lib/utils'
import optimize from '@/lib/dashboard-utils'

export default function Dashboard() {
  const router = useRouter()

  const [user, loading, error] = useAuthState(auth)
  const [isLoading, setIsLoading] = useState(true)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [breakdownByType, setBreakdownByType] = useState<any>([])
  const [showModal, setShowModal] = useState(false)

  const [render, setRender] = useState('')

  const [hamburgerVisible, setHamburgerVisible] = useState(false)

  const [optimizedExpenses, setOptimizedExpenses] = useState<any>()

  // for dashboard graphs
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

        setOptimizedExpenses(optimize(arr))
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
      <div className="h-screen w-full pt-16">
        {/* hamburger */}
        <div className="block px-6 sm:px-10 sm:pt-4 sm:pb-10 lg:hidden">
          <button className="inline-flex items-center" onClick={() => setHamburgerVisible(!hamburgerVisible)}>
            <svg
              className="h-6 w-6 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>

            <div className="text-sm">View Expenses</div>
          </button>
        </div>

        <div className="flex">
          {/* hamburger menu */}
          <div className={`lg:hidden ${hamburgerVisible ? 'block' : 'hidden'}`}>
            <div className="absolute z-50 flex h-screen w-full flex-col border-r border-gray-200 bg-white">
              <div className="col-span-3 mt-2.5 mb-2">
                <div className="w-full p-2 text-center">
                  <button onClick={() => setShowModal(!showModal)} className="secondary-btn" type="button">
                    Add New Expense
                  </button>
                </div>
              </div>

              <div className="scrolling-touch h-[calc(100vh-9rem)] overflow-y-auto">
                {expenses &&
                  expenses.map((expense: Expense) => (
                    <ExpenseItem key={expense.name + expense.date + expense.price + Date.now()} data={expense} />
                  ))}
              </div>
            </div>
          </div>

          <aside className="hidden overflow-y-visible lg:block">
            <div className="col-span-3 mt-2.5 mb-2">
              <div className="w-full p-2 text-center">
                <button onClick={() => setShowModal(!showModal)} className="secondary-btn" type="button">
                  Add New Expense
                </button>
              </div>
            </div>

            <div className="scrolling-touch h-[calc(100vh-9rem)] overflow-y-auto">
              {expenses &&
                expenses.map((expense: Expense) => (
                  <ExpenseItem key={expense.name + expense.date + expense.price + Date.now()} data={expense} />
                ))}
            </div>
          </aside>

          <main className="w-full min-w-0 flex-auto lg:static lg:max-h-full lg:overflow-visible">
            <div className="px-6 sm:px-10 sm:pt-4 sm:pb-10">
              {/* graph */}
              <div className="hidden xl:block">
                <Grid numCols={2} className="mt-6 gap-6">
                  <Card>
                    <div className="justify-between md:flex">
                      <div>
                        <Flex justifyContent="start" className="space-x-0.5" alignItems="center">
                          <h1 className="max-w-lg font-title text-2xl font-semibold text-palette-500 drop-shadow-sm md:text-3xl">
                            {' '}
                            Expense History{' '}
                          </h1>
                          <Icon
                            icon={InformationCircleIcon}
                            variant="simple"
                            tooltip="Shows daily changes of expenses"
                          />
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
                    <h1 className="max-w-lg font-title text-2xl font-semibold text-palette-500 drop-shadow-sm md:text-3xl">
                      {' '}
                      Expense Breakdown{' '}
                    </h1>
                    <DonutChart
                      className="mt-6 h-96 w-full focus:outline-none"
                      data={breakdownByType}
                      category="total"
                      index="type"
                      valueFormatter={valueFormatter}
                      colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
                    />
                  </Card>

                  <OptimizedExpensesCard optimizedExpenses={optimizedExpenses} />
                </Grid>
              </div>

              {/* mobile version */}
              <div className="block xl:hidden">
                <Grid numCols={1} className="mt-6 gap-6">
                  <Card>
                    <div className="justify-between md:flex">
                      <div>
                        <Flex justifyContent="start" className="space-x-0.5" alignItems="center">
                          <h1 className="max-w-lg font-title text-2xl font-semibold text-palette-500 drop-shadow-sm md:text-3xl">
                            {' '}
                            Expense History{' '}
                          </h1>
                          <Icon
                            icon={InformationCircleIcon}
                            variant="simple"
                            tooltip="Shows daily changes of expenses"
                          />
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
                    <h1 className="max-w-lg font-title text-2xl font-semibold text-palette-500 drop-shadow-sm md:text-3xl">
                      {' '}
                      Expense Breakdown{' '}
                    </h1>
                    <DonutChart
                      className="mt-6 h-96 w-full focus:outline-none"
                      data={breakdownByType}
                      category="total"
                      index="type"
                      valueFormatter={valueFormatter}
                      colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
                    />
                  </Card>

                  <OptimizedExpensesCard optimizedExpenses={optimizedExpenses} />
                </Grid>
              </div>
            </div>
          </main>

          {showModal ? (
            <AddExpenseModal setRender={setRender} showModal={showModal} setShowModal={setShowModal} />
          ) : null}
        </div>
      </div>
    </>
  )
}

function OptimizedExpensesCard({ optimizedExpenses }: any) {
  return (
    <Card>
      <h1 className="max-w-lg font-title text-2xl font-semibold text-palette-500 drop-shadow-sm md:text-3xl">
        {' '}
        Optimize Your Spending{' '}
      </h1>

      <div className="mt-6">
        Greatest Expense:{' '}
        <span className="text-palette-500"> {optimizedExpenses && optimizedExpenses.greatestCost} </span>
      </div>
      <div className="mt-6">
        Expenses:{' '}
        <span className="text-palette-500">
          {' '}
          $
          {optimizedExpenses &&
            (optimizedExpenses.greatestCost === 'Entertainment'
              ? optimizedExpenses.entertainmentCost
              : optimizedExpenses.otherCost)}{' '}
        </span>
      </div>
      <div className="mt-6">
        Amount of Expenses:{' '}
        <span className="text-palette-500">
          {' '}
          {optimizedExpenses &&
            (optimizedExpenses.greatestCost === 'Entertainment'
              ? optimizedExpenses.entertainmentPurchases
              : optimizedExpenses.otherPurchases)}{' '}
        </span>
      </div>
    </Card>
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
      {/* <div className="fixed inset-0 z-40 bg-black opacity-25"></div> */}
    </>
  )
}
