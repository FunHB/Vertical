import { getPricings } from "@/src/actions/getPricings"
import initTranslations from "@/src/app/i18n"
import Header from "@/src/components/Header"
import PricingComponent from "@/src/components/PricingComponent"
import TranslationsProvider from "@/src/providers/TranslationsProvider"
import { Metadata } from "next"
import Link from "next/link"

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
    const { t: strings, resources } = await initTranslations(locale, i18nNamespaces)

    const pricings = await getPricings(locale)

    return (
        <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
            <Header locale={locale} />
            <main>
                <section className="text-black bg-white pt-28 overflow-hidden">
                    <h2 className="text-4xl md:text-5xl pt-5 mb-5 text-center">{strings('pricing-header')}</h2>
                    <h4 className="whitespace-pre-wrap w-3/4 m-auto text-base md:text-lg pt-1 pb-10 text-center">{strings('pricing-description')}</h4>

                    <ul className="flex justify-center">
                        {pricings.map((pricing, index) => {
                            const { id, title } = pricing
                            return (
                                <Link key={index} href={`#${id}`}>
                                    <li className="flex-1 px-5 py-3 text-lg md:text-xl">{title}</li>
                                </Link>
                            )
                        })}
                    </ul>

                    <div className="flex justify-center items-center flex-wrap">
                        {pricings.map((pricing, index) => {
                            return (
                                <PricingComponent key={index} pricing={pricing} />
                            )
                        })}
                    </div>
                </section>
            </main>
        </TranslationsProvider>
    )
}
