import type { AppProps } from 'next/app'
import type { LayoutProps } from '@vercel/examples-ui/layout'
import { getLayout } from '@vercel/examples-ui'
import '@vercel/examples-ui/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = getLayout<LayoutProps>(Component)

  return (
    <Layout
        title="Personalization with Next.js & Prepr"
        path="starter/personalization-prepr-io"
        deployButton={{
            env: ['PREPR_ENDPOINT', 'PREPR_IMAGE_CDN'],
        }}
    >
      <Component {...pageProps} />
    </Layout>
  )
}
