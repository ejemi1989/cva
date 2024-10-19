import Image from 'next/image'
import * as React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'


function NavBar() {
  return (
    <div className="flex gap-5 justify-between items-center px-7 py-1 font-bold border-b border-solid border-zinc-100 leading-[154.5%] max-md:flex-wrap max-md:px-5">
      <Link href="/" className="flex gap-1.5 justify-center self-stretch my-auto text-2xl tracking-tighter text-neutral-700">
        <Image
          src="/images/logo.png"
          alt="LOGO"
          sizes="100vw"
          style={{
            width: '100px',
            height: 'auto',
          }}
          width={0}
          height={0}
        />
      </Link>
      <ul className="gap-5 justify-between self-stretch my-auto text-sm leading-5 text-neutral-700 max-md:flex-wrap max-md:max-w-full font-normal hidden md:flex">
        <li><Link href="/" className="hover:text-neutral-900">Home</Link></li>
        <li><Link href="#pricing" className="hover:text-neutral-900">Pricing</Link></li>
        <li><Link href="/news-room" className="hover:text-neutral-900">News Room</Link></li>
        <li><Link href="/features" className="hover:text-neutral-900">Features</Link></li>
        <li><Link href="/contact" className="hover:text-neutral-900">Contact us</Link></li>
      </ul>
      <Link
        href="/dashboard"
        className="bg-blue-900 hover:bg-[#740250] px-4 py-2 rounded-full text-white "
      >
        Free Trial
      </Link>
    </div>
  )
}

export default NavBar
