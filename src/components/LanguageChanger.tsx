'use client'

import { createRef, useState } from "react"
import { useClickOutside } from "@/src/hooks/useClickOutside"
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import i18nConfig from '@/i18nConfig'

interface LanguageChangerProps {

}

export default function LanguageChanger({ }: LanguageChangerProps) {
    const [showLanguages, setShowLanguages] = useState(false)

    const ClickOutsideRef = createRef<HTMLDivElement>()

    const { i18n } = useTranslation()
    const currentLocale = i18n.language
    const router = useRouter()
    const currentPathname = usePathname()

    useClickOutside(ClickOutsideRef, () => {
        setShowLanguages(false)
    })

    const languages = [
        { name: 'English', code: 'en' },
        { name: 'Polski', code: 'pl' }
    ]

    return (
        <div ref={ClickOutsideRef} className="flex flex-col items-center relative w-24 mx-2">
            <button className="items-center py-1 px-4 text-xl font-medium text-center text-whitefocus:outline-none"
                type="button"
                onClick={() => {
                    setShowLanguages(!showLanguages)
                }}>
                {currentLocale === 'en' ? 'ENG' : 'POL'}
            </button>
            {showLanguages ? (
                <div className="z-10 absolute top-9 bg-black md:bg-black/0 rounded-md">
                    <ul className="py-2 text-sm text-white" aria-labelledby="states-button">
                        {languages.map(((language, index) => {
                            const { name, code } = language
                            return (
                                <li key={index} className="hover:bg-white text-black">
                                    <button className="inline-flex justify-center w-full px-4 py-2 text-sm text-white hover:bg-gray-200 hover:text-black"
                                        type="button"
                                        onClick={() => {
                                            const days = 30
                                            const date = new Date()
                                            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
                                            const expires = '; expires=' + date.toUTCString()
                                            document.cookie = `NEXT_LOCALE=${code};expires=${expires};path=/`

                                            // redirect to the new locale path
                                            if (
                                                currentLocale === i18nConfig.defaultLocale &&
                                                !i18nConfig.prefixDefault
                                            ) {
                                                router.push('/' + code + currentPathname)
                                            } else {
                                                router.push(
                                                    currentPathname.replace(`/${currentLocale}`, `/${code}`)
                                                )
                                            }

                                            router.refresh()
                                        }}>
                                        <div>{name}</div>
                                    </button>
                                </li>
                            )
                        }))}
                    </ul>
                </div>
            ) : null}
        </div>
    )
}