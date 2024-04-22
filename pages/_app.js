import * as React from 'react'

import theme from '../lib/theme'
import components from '../lib/components'
import { ThemeProvider } from 'theme-ui'
import Layout from '../components/layout'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import localFont from 'next/font/local'

const gramercy = localFont({
  src: [
    {
      path: './fonts/ABCGramercy-Medium-Trial.woff2',
      weight: '600',
      style: 'normal',
    },
    // {
    //   path: './fonts/ABCGramercy-MediumItalic-Trial.woff2',
    //   weight: '600',
    //   style: 'italic',
    // },
    {
      path: './fonts/ABCGramercy-Regular-Trial.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/ABCGramercy-RegularItalic-Trial.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  adjustFontFallback: 'Times New Roman',
  fallback: ['serif'],
  variable: '--font-serif',
})

const monaSans = localFont({
  src: [
    {
      path: './fonts/Mona-Sans-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Mona-Sans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  fallback: ['system-ui', 'arial'],
  variant: '--font-sans',
})

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme} components={components}>
      <Layout
        xl={Component.layout === 'xl'}
        className={`${monaSans.className} ${monaSans.variable} ${gramercy.variable}`}
      >
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default App
