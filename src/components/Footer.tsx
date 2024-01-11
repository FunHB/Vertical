'use client'

import Image from "next/image"
import SocialMedia from "./SocialMedia"
import { useTranslation } from "react-i18next"
import Navbar from "./Navbar"
import Link from "next/link"

interface FooterProps {

}

export default function Footer({ }: FooterProps) {
    const { t } = useTranslation('footer')

    return (
        <footer className="snap-start flex flex-row h-96 p-4">
            <div className="flex flex-col items-start">
                <div className="relative w-28 h-64 mb-2">
                    <Image src={'/images/logo.png'} alt={"Logo"} fill={true} style={{ objectFit: "contain" }} />
                </div>
                <SocialMedia vertical={true} />
            </div>
            <div className="flex-1 px-16">
                <h1 className="uppercase underline text-white p-6 text-2xl">Vertical</h1>
                <Navbar vertical={true} size="xl" />
            </div>
            <div className="flex flex-col items-center p-5">
                <div className="my-5 mx-16 px-6 py-2 border border-white uppercase">
                    <Link className="text-xl"
                        href={'/contact'}>
                        {t('header')}
                    </Link>
                </div>
                <div className="whitespace-pre-line text-center text-lg">
                    {t('working-hours')}
                </div>
            </div>
        </footer>
    )
}
