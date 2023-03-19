import Head from 'next/head'

const DOMAIN = 'https://precedent.dev'

export default function Meta({
  title = 'Billow',
  description = 'Billow is a place to keep track of all of your bills to manage your money effectively.',
  image = `${DOMAIN}/api/og`,
}: {
  title?: string
  description?: string
  image?: string
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta itemProp="image" content={image} />
      <meta property="og:logo" content={`${DOMAIN}/logo.png`}></meta>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  )
}
