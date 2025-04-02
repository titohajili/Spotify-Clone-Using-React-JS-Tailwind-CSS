"use client"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import React from 'react'

const Header = () => {
    const pathname = usePathname()
    const router = useRouter()
  return (
    <div className='flex justify-between items-center'>
        <div className='ml-5' >Logo</div>

        <div className='flex items-center gap-9 m-5'>
            <p><Link className={`p-3 ${pathname === "/" ?             "underline" : ""}`} href="/">Home</Link></p>
            <p><Link className={`p-3 ${pathname === "/about" ?         "underline" : ""}`} href="/about">About</Link></p>
            <p><Link className={`p-3 ${pathname === "/blog" ?          "underline" : ""}`} href="/blog">Blog</Link></p>
            <p><Link className={`p-3 ${pathname === "/contact" ?       "underline" : ""}`} href="/contact">Contact</Link></p>


            <button className='bg-cyan-800 p-3 hover:bg-cyan-900 text-white rounded-lg' onClick={() => router.push("/auth/login")}>Login</button>
        </div>
    </div>
  )
}

export default Header
