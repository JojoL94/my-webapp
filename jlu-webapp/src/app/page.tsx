"use client";

import UserList from '@/components/UserList'
import AddUserForm from '@/components/AddUserForm'
import '@/styles/globals.css'

export default function Home() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Johannes Lützenhoffs spaßige Grüße</h1>
            <UserList />
        </div>
    )
}
