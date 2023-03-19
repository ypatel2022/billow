/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

const poppins = fetch(new URL('../../styles/Poppins-Bold.ttf', import.meta.url)).then((res) => res.arrayBuffer())

export default async function handler(req: NextRequest) {
  const [poppinsData] = await Promise.all([poppins])

  const { searchParams } = req.nextUrl
  const title = searchParams.get('title') || 'Precedent'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#E0F1FF',
        }}
      >
        <h1
          style={{
            fontSize: '100px',
            fontFamily: 'Poppins',
            backgroundClip: 'text',
            color: '#083661',
            lineHeight: '5rem',
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'SF Pro',
          data: poppinsData,
        },
      ],
    },
  )
}
