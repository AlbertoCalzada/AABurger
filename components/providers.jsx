'use client'
import { SessionProvider } from 'next-auth/react' //para el session

export  function Providers({ children }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
