import initTranslations from "@/src/app/i18n"
import Header from "@/src/components/Header"
import { Metadata } from "next"

const i18nNamespaces: string[] = []

interface AboutParams {
    params: {
        locale: string
    }
}

export async function generateMetadata({ params: { locale } }: AboutParams): Promise<Metadata> {
    const { t: metadata } = await initTranslations(locale, ['metadata'])

    return {
        title: metadata('about-title')
    }
}

export default async function About({ params: { locale } }: AboutParams) {
    const { t: strings } = await initTranslations(locale, ['about'])

    return (
        <>
            <Header />
            <main>
                <section className="text-black bg-white py-5">
                    <h2 className="text-4xl md:text-5xl pt-5 text-center">{strings('about-header')}</h2>
                </section>
            </main>
        </>
    )
}
