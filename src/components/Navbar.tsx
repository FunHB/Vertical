'use client'

import Link from "next/link"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Fade as Hamburger } from 'hamburger-react'

interface NavbarProps {
    vertical?: boolean
    border?: boolean
    size?: {
        normal: string,
        large?: string
    }
}

export default function Navbar({ vertical = false, border = false, size = { normal: 'xl', large: '2xl' } }: NavbarProps) {
    const { t } = useTranslation('navigation')

    const [showNavigation, setShowNavigation] = useState(false)

    const { normal, large } = size
    const links = [
        { name: 'home', path: '/' },
        { name: 'about', path: '/about' },
        { name: 'offer', path: '/#offer' },
        { name: 'pricing', path: '/pricing' },
        { name: 'faq', path: '/faq' },
        { name: 'contact', path: '/contact' }
    ]

    return (
        <nav className="flex flex-row items-center justify-between">
            {/* Desktop Navigation */}
            <ul className={`hidden text-${normal} md:flex ${vertical ? 'flex-col' : 'flex-row'} lg:text-${large}`}>
                {links.map((link, index) => {
                    const { name, path } = link
                    return (
                        <li key={index} className={`px-2 lg:px-6 py-2 ${border ? 'border border-dashed border-white' : ''}`}>
                            <Link className="w-full h-full" href={path}>{t(name)}</Link>
                        </li>
                    )
                })}
            </ul>

            {/* Mobile Navigation Icon */}
            <div className="block md:hidden">
                <Hamburger size={25} toggled={showNavigation} toggle={setShowNavigation} />
            </div>

            {/* Mobile Navigation */}
            <ul className={`-z-10 top-0 fixed w-full h-full py-16 ease-in-out duration-500 ${showNavigation ? 'md:hidden right-0 border-l border-l-gray-900 bg-black/90' : 'bottom-0 right-[-100%]'}`}>
                {links.map((link, index) => {
                    const { name, path } = link
                    return (
                        <li key={index} className='group border-b duration-300 cursor-pointer border-gray-600 text-end hover:bg-white hover:text-black'>
                            <Link className="inline-block w-full p-4 text-xl" href={path}>{t(name)}</Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
