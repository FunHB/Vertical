'use client'

import Link from "next/link"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Fade as Hamburger } from 'hamburger-react'

interface NavbarProps {
    vertical?: boolean
    border?: boolean
    size?: {
        small?: string,
        normal: string
    }
}

export default function Navbar({ vertical = false, border = false, size = { small: 'md', normal: '2xl' } }: NavbarProps) {
    const { t } = useTranslation('navigation')

    const [showNavigation, setShowNavigation] = useState(false)

    const { small, normal } = size
    const links = ['about', 'offer', 'pricing', 'faq', 'contact']

    return (
        <nav className="flex flex-row items-center justify-between">
            {/* Desktop Navigation */}
            <ul className={`hidden text-${small ?? normal} md:flex ${vertical ? 'flex-col' : 'flex-row'} md:text-${normal}`}>
                {links.map((link, index) => {
                    return (
                        <li key={index} className={`px-6 py-2 ${border ? 'border border-dashed border-white' : ''}`}>
                            <Link className="w-full h-full" href={`/${link}`}>{t(link)}</Link>
                        </li>
                    )
                })}
            </ul>

            {/* Mobile Navigation Icon */}
            <div className="block md:hidden">
                <Hamburger size={25} toggled={showNavigation} toggle={setShowNavigation} />
            </div>

            {/* Desktop Navigation */}
            <ul className={`-z-10 top-0 fixed w-full h-full py-16 ease-in-out duration-500 ${showNavigation ? 'md:hidden right-0 border-l border-l-gray-900 bg-black/90' : 'bottom-0 right-[-100%]'}`}>
                {/* Mobile Navigation Items */}
                {links.map((link, index) => (
                    <li key={index} className='p-4 border-b duration-300 cursor-pointer border-gray-600 text-end hover:bg-white hover:text-black'>
                        <Link className="w-full h-full" href={`/${link}`}>{t(link)}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
