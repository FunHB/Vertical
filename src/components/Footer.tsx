'use client'

import SocialMedia from "./SocialMedia"
import { useTranslation } from "react-i18next"
import Navbar from "./Navbar"
import Link from "next/link"
import Logo from "./Logo"

interface FooterProps {

}

export default function Footer({ }: FooterProps) {
    const { t } = useTranslation('footer')

    return (
        <footer className="bg-footer-texture bg-cover">
            <div className="bg-black/30">
                <div className="flex-1 flex flex-row justify-between p-4 w-full">
                    <div className="flex flex-col items-start">
                        <Logo className="fill-white w-32 h-full mb-2" />
                    </div>
                    <div className="flex-1 px-16 hidden md:block">
                        <h1 className="uppercase underline text-white p-6 text-4xl">Vertical</h1>
                        <Navbar vertical={true} size={{ normal: 'xl' }} />
                    </div>
                    <div className="flex flex-col items-center p-5">
                        <div className="my-5 mx-2 md:mx-16 px-6 py-2 border border-white uppercase">
                            <Link className="text-xl"
                                href={'/contact'}>
                                {t('header')}
                            </Link>
                        </div>
                        <div className="whitespace-pre-line text-center text-lg">
                            {t('working-hours')}
                        </div>
                        <div className="flex flex-col items-center py-8">
                            <div className="text-center text-lg mb-3">
                                {t('social-media-label')}
                            </div>
                            <SocialMedia box={true} />
                        </div>
                    </div>
                </div>
                <div className="text-center md:text-end text-lg p-4">
                    Copyright &copy; 2024 Vertical Design Studio
                </div>
            </div>
        </footer>
    )
}
