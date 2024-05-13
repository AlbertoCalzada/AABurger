'use client'
import { useSession } from 'next-auth/react'

export default function Profile() {

    const { data: session, status } = useSession()

    console.log(session, status)
    return <h1>Perfil</h1>
}