'use client'

import Image from "next/image"
import LanguageChanger from "./LanguageChanger"
import Navbar from "./Navbar"
import SocialMedia from "./SocialMedia"

interface HeaderProps {

}

export default function Header({ }: HeaderProps) {
    return (
        <div className="absolute top-0 w-full h-24 flex flex-row items-start justify-between p-3 z-50">
            <div className="flex flex-row">
                <div className="relative w-16 h-44 mb-2">
                    <Image src={'/images/logo.png'} alt={"Logo"} fill={true} style={{ objectFit: "contain" }} />
                </div>
                <SocialMedia />
            </div>
            <div className="flex flex-row items-center">
                <Navbar border={true} />
                <LanguageChanger />
            </div>
        </div>
    )
}
