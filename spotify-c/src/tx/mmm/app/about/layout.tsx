import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
interface layoutProps{
    children: React.ReactNode
}

const layout = ({children}: layoutProps) => {
  return (
    <div>
      <div className='bg-red-300'>

        <Image alt='' src="/slider/naruto.jpg" className='w-full h-52 object-cover' width={500} height={500}></Image>

        <Link href='/about/mission'>Mission</Link>
        <Link href='/about/vision'>Vision</Link>
        <Link href='/about/team'>Team</Link>


        <div>
            {children}
        </div>

      </div>
    </div>
  )
}

export default layout
