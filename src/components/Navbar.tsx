'use client'

import Link from "next/link"
import { useTranslation } from "react-i18next"

interface NavbarProps {
    vertical?: boolean
    border?: boolean
    size?: string
}

export default function Navbar({ vertical = false, border = false, size = 'lg' }: NavbarProps) {
    const { t } = useTranslation('navigation')

    const links = ['about', 'offer', 'pricing', 'faq', 'contact']

    return (
        <nav className="flex flex-row items-center justify-between">
            <ul className={`flex ${vertical ? 'flex-col' : 'flex-row'} text-${size}`}>
                {links.map((link, index) => {
                    return (
                        <li key={index} className={`px-6 py-2 ${border ? 'border border-dashed border-white' : ''}`}>
                            <Link className="w-full h-full" href={`/${link}`}>{t(link)}</Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
