import { useRouter } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import "./Header.css"

const AllLandingHeader = () => {
  const router = useRouter()
  return (
    <header className="root-layout-header">
      <div className="root-layout-header-content">
        <Image
          src="/CuetLogo.png"
          alt="CUET Teachers Association Logo"
          width={50}
          height={50}
          style={{height:"auto", width:"auto", cursor:"pointer"}}
          onClick={() => router.push("/")}
        />
        <h1 className="root-layout-title">
          🎓 CUET Teachers Association 🌟
        </h1>
        <nav className="root-layout-nav">
          <ul className="root-layout-nav-links">
            <li>
              <Link href="/" className="root-layout-nav-link">
                🏠 Home
              </Link>
            </li>
            <li>
              <Link href="/register" className="root-layout-nav-link">
                📝 Sign Up
              </Link>
            </li>
            <li>
              <Link href="/login" className="root-layout-nav-link">
                🔑 Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default AllLandingHeader