import Navbar from '../components/navbar'
import Carousel from '../components/carousel'
import "../styles/globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name='description' content='Web proyecto final de un restaurante' />
        <link rel='icon' href='/img/favicon.ico' />
        <title>A & A Burger</title>
      </head>
      <body>
        <Navbar />
       
        {children}
        <Carousel />
      </body>
    </html>
  )
}
