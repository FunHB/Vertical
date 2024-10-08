import LanguageChanger from "./LanguageChanger"
import Navbar from "./Navbar"
import SocialMediaComponent from "./SocialMediaComponent"
import Logo from "./Logo"
import initTranslations from "../app/i18n"
import TranslationsProvider from "../providers/TranslationsProvider"
import Link from "next/link"

const i18nNamespaces = ['navigation']

interface HeaderProps {
    locale: string
    white?: boolean
}

export default async function Header({ locale, white = false }: HeaderProps) {
    const { resources } = await initTranslations(locale, i18nNamespaces)

    return (
        <TranslationsProvider locale={locale} namespaces={i18nNamespaces} resources={resources}>
            <header className={`flex flex-row items-start w-full p-3 z-20 fixed text-white bg-black/90 md:absolute ${white ? '' : 'md:text-black'} md:top-0 md:bg-black/0`}>
                <Link href={'/'}>
                    <Logo color={white ? 'white' : 'black'} className={`-top-5 w-20 mb-2 hidden lg:block`} />
                </Link>
                <div className="flex-1 flex flex-row justify-between items-center">
                    <SocialMediaComponent />
                    <div className="flex flex-row-reverse md:flex-row items-center">
                        <Navbar />
                        <LanguageChanger white={white} />
                    </div>
                </div>
            </header>
        </TranslationsProvider>
    )
}
