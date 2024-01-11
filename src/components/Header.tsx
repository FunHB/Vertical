'use client'

import LanguageChanger from "./LanguageChanger"
import Navbar from "./Navbar"
import SocialMedia from "./SocialMedia"
import Logo from "./Logo"

interface HeaderProps {
}

export default function Header({ }: HeaderProps) {
    return (
        <header className="flex flex-row items-start w-full p-3 z-20 fixed bg-black/90 md:absolute md:top-0 md:bg-black/0">
            <Logo className="w-16 h-44 mb-2 fill-white hidden md:block" />
            <div className="flex-1 flex flex-row justify-between items-center">
                <SocialMedia />
                <div className="flex flex-row-reverse md:flex-row items-center">
                    <Navbar />
                    <LanguageChanger />
                </div>
            </div>
        </header>
    )
}
