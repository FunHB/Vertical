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
                            <Logo className="fill-white w-28 h-full" />
                        </div>
                        <div className="flex-1 px-10 hidden md:block">
                            <h1 className="uppercase text-white p-4 text-3xl"><span className="border-b">Vertical</span></h1>
                            <Navbar vertical={true} size={{ normal: 'lg' }} />
                        </div>
                        <div className="flex flex-col justify-center items-center px-4">
                            <Link className="text-xl uppercase border border-white my-5 mx-2 md:mx-16 px-6 py-2"
                                href={'/contact'}>
                                {t('header')}
                            </Link>
                            <div className="whitespace-pre-line text-center text-base">
                                {t('working-hours')}
                            </div>
                            <div className="text-center text-base mt-5">
                                <p>vertical.biuro@gmail.com</p>
                                <p>(+48) 575 313 091</p>
                            </div>
                            <div className="hidden md:block mt-7">
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
