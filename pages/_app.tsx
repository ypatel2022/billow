import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider as RWBProvider } from 'react-wrap-balancer'
import Layout from '@/components/layout'

export default function MyApp({ Component, pageProps: { ...pageProps } }: AppProps<{}>) {
  return (
    <RWBProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RWBProvider>
  )
}
