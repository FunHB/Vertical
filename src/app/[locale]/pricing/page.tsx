import initTranslations from "@/src/app/i18n"
import Header from "@/src/components/Header"
import { Metadata } from "next"

const i18nNamespaces: string[] = ['pricing']

interface PricingParams {
    params: {
        locale: string
    }
}

export async function generateMetadata({ params: { locale } }: PricingParams): Promise<Metadata> {
    const { t: metadata } = await initTranslations(locale, ['metadata'])

    return {
        title: metadata('pricing-title')
    }
}

export default async function Pricing({ params: { locale } }: PricingParams) {
    const { t: strings } = await initTranslations(locale, i18nNamespaces)

    return (
        <>
            <Header locale={locale} />
            <main>
                <section className="text-black bg-white py-5">
                    <h2 className="text-4xl md:text-5xl pt-5 text-center">{strings('pricing-header')}</h2>
                </section>
            </main>
        </>
    )
}
