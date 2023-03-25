import { useState } from 'react'
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

// graph data
export const performance = [
  {
    date: '2021-01-01',
    Sales: 900.73,
    Profit: 173,
    Customers: 73,
  },
  {
    date: '2021-01-02',
    Sales: 1000.74,
    Profit: 174.6,
    Customers: 74,
  },
  // ...
  {
    date: '2021-03-13',
    Sales: 882,
    Profit: 682,
    Customers: 682,
  },
]

//for pie chart
const valueFormatter = (number: number) => `$ ${Intl.NumberFormat('us').format(number).toString()}`

const expenses = [
  {
    name: 'New York',
    sales: 981,
  },
  {
    name: 'London',
    sales: 452,
  },
  {
    name: 'Hong Kong',
    sales: 390,
  },
  {
    name: 'San Francisco',
    sales: 245,
  },
  {
    name: 'Singapore',
    sales: 190,
  },
  {
    name: 'Zurich',
    sales: 139,
  },
]

const dollarFormatter = (value: number) => `$ ${Intl.NumberFormat('us').format(value).toString()}`

const numberFormatter = (value: number) => `${Intl.NumberFormat('us').format(value).toString()}`

export default function Test() {
  const [selectedView, setSelectedView] = useState(1)

  const [selectedKpi, setSelectedKpi] = useState('Sales')

  // map formatters by selectedKpi
  const formatters: { [key: string]: any } = {
    Sales: dollarFormatter,
    Profit: dollarFormatter,
    Customers: numberFormatter,
  }

  return (
    <main className="bg-slate-50 p-6 sm:p-10">
      {selectedView === 1 ? (
        <>
          {/* Net Worth */}
          <Grid numColsLg={2} className="mt-6 gap-6">
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
            <div className="mt-6">
              <Card>
                <div className="justify-between md:flex">
                  <div>
                    <Flex justifyContent="start" className="space-x-0.5" alignItems="center">
                      <Title> Expense History </Title>
                      <Icon
                        icon={InformationCircleIcon}
                        variant="simple"
                        tooltip="Shows day-over-day (%) changes of past performance"
                      />
                    </Flex>
                    <Text> Daily increase or decrease per domain </Text>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <Toggle color="zinc" defaultValue={selectedKpi} onValueChange={(value) => setSelectedKpi(value)}>
                      <ToggleItem value="Sales" text="Sales" />
                      <ToggleItem value="Profit" text="Profit" />
                      <ToggleItem value="Customers" text="Customers" />
                    </Toggle>
                  </div>
                </div>
                <AreaChart
                  data={performance}
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
              <div className="mt-6">
                <Card className="max-w-lg font-title text-2xl text-palette-500 drop-shadow-sm md:text-3xl">
                  <Title>Expense Breakdown</Title>
                  <DonutChart
                    className="mt-6 h-96 w-full focus:outline-none"
                    data={expenses}
                    category="sales"
                    index="name"
                    valueFormatter={valueFormatter}
                    colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
                  />
                </Card>
              </div>
            </div>
          </Grid>
        </>
      ) : (
        <Card className="mt-6">
          <div className="h-96" />
        </Card>
      )}
    </main>
  )
}
