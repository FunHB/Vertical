import SocialMedia from "./SocialMedia"
import Navbar from "./Navbar"
import Link from "next/link"
import Logo from "./Logo"
import initTranslations from "../app/i18n"
import TranslationsProvider from "../providers/TranslationsProvider"

const i18nNamespaces = ['footer', 'navigation']

interface FooterProps {
    locale: string
}

export default async function Footer({ locale }: FooterProps) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces)

    return (
        <TranslationsProvider locale={locale} namespaces={i18nNamespaces} resources={resources}>
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
                        <div className="flex flex-col justify-center items-center px-5">
                            <Link className="text-xl uppercase border border-white my-5 mx-2 md:mx-16 px-6 py-2"
                                href={'/contact'}>
                                {t('header')}
                            </Link>
                            <div className="whitespace-pre-line text-center text-lg">
                                {t('working-hours')}
                            </div>
                            <div className="text-center text-lg mt-5">
                                <p>vertical.biuro@gmail.com</p>
                                <p>(+48) 575 313 091</p>
                            </div>
                            <div className="hidden md:block mt-8">
                                <SocialMedia box={true} />
                            </div>
                        </div>
                    </div>
                    <div className="text-center md:text-end text-xs p-4 mr-16">
                        Copyright &copy; 2024 Vertical Design Studio
                    </div>
                </div>
            </footer>
        </TranslationsProvider>
    )
}
