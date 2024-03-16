import Navbar from './Navbar'

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <head>
      <title>A & A Burger</title>
      </head>      
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
