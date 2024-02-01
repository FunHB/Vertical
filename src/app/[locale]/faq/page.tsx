import initTranslations from "@/src/app/i18n"
import Header from "@/src/components/Header"
import { Metadata } from "next"

const i18nNamespaces: string[] = []

interface FAQParams {
    params: {
        locale: string
    }
}

export async function generateMetadata({ params: { locale } }: FAQParams): Promise<Metadata> {
    const { t: metadata } = await initTranslations(locale, ['metadata'])

    return {
        title: metadata('faq-title')
    }
}

export default async function FAQ({ params: { locale } }: FAQParams) {
    const { t: strings } = await initTranslations(locale, ['faq'])

    return (
        <>
            <Header locale={locale} />
            <main>
                <section className="text-black bg-white py-5">
                    <h2 className="text-4xl md:text-5xl pt-5 text-center">{strings('faq-header')}</h2>
                </section>
            </main>
        </>
    )
}
