import { getQuestions } from "@/src/actions/getQuestions"
import initTranslations from "@/src/app/i18n"
import Header from "@/src/components/Header"
import { Metadata } from "next"
import FAQ from "@/src/components/faq"
import { jsonLd } from "../layout"

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
    const { t: metadata } = await initTranslations(locale, ['metadata'])

    const questions = await getQuestions(locale)

    const adnotation = questions.map(question => question.adnotation).filter(adnotation => !!adnotation)

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd(
                        '/faq/',
                        metadata('faq-title'),
                        metadata('faq-description'),
                        locale,
                        new Date('2024-04-22T17:38:48.063Z'),
                        new Date()
                    ))
                }}
            />
            <Header locale={locale} />
            <main className="text-black bg-white pt-28 overflow-hidden">
                <section>
                    <h2 className="text-4xl md:text-5xl text-center py-5">{strings('faq-header')}</h2>
                    <FAQ questions={questions} />
                    <div className="w-5/6 m-auto my-16">
                        {adnotation.map((adnotation, index) => {
                            return adnotation ? (
                                <div key={index}>
                                    <span>[{index + 1}]</span>{adnotation}
                                </div>
                            ) : null
                        })}
                    </div>
                    <h4 className="text-lg md:text-xl text-center py-7">{strings('faq-end')}</h4>
                </section>
            </main>
        </>
    )
}
