import { getQuestions } from "@/src/actions/getQuestions"
import initTranslations from "@/src/app/i18n"
import Header from "@/src/components/Header"
import { Metadata } from "next"
import FAQ from "@/src/components/faq"

const i18nNamespaces: string[] = ['faq']

interface FAQPageParams {
    params: {
        locale: string
    }
}

export async function generateMetadata({ params: { locale } }: FAQPageParams): Promise<Metadata> {
    const { t: metadata } = await initTranslations(locale, ['metadata'])

    return {
        title: metadata('faq-title')
    }
}

export default async function FAQPage({ params: { locale } }: FAQPageParams) {
    const { t: strings } = await initTranslations(locale, i18nNamespaces)

    const questions = await getQuestions(locale)

    return (
        <>
            <Header locale={locale} />
            <main className="text-black bg-white pt-28 overflow-hidden">
                <section>
                    <h2 className="text-4xl md:text-5xl pt-5 text-center pb-5">{strings('faq-header')}</h2>
                    <FAQ questions={questions} />
                </section>
            </main>
        </>
    )
}
