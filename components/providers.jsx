'use client'
import { SessionProvider } from 'next-auth/react' //para el session

export default function Providers({ children }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
