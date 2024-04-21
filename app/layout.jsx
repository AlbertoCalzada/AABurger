import Navbar from '../components/navbar'
import "../styles/globals.css"
import  Providers  from '../components/providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name='description' content='Web proyecto final de un restaurante' />
        <link rel='icon' href='/img/favicon.ico' />
        <title>A & A Burger</title>
      </head>
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
