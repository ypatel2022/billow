import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider as RWBProvider } from 'react-wrap-balancer'

export default function MyApp({ Component, pageProps: { ...pageProps } }: AppProps<{}>) {
  return (
    <RWBProvider>
      <Component {...pageProps} />
    </RWBProvider>
  )
}
