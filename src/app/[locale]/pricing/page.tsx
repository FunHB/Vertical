import { getPricings } from "@/src/actions/getPricings"
import initTranslations from "@/src/app/i18n"
import Header from "@/src/components/Header"
import PricingComponent from "@/src/components/PricingComponent"
import TranslationsProvider from "@/src/providers/TranslationsProvider"
import { Metadata } from "next"
import Link from "next/link"
import { jsonLd } from "../layout"

const i18nNamespaces: string[] = ['pricing']

interface PricingParams {
    params: {
        locale: string
    }
}

export async function generateMetadata({ params: { locale } }: PricingParams): Promise<Metadata> {
    const { t: metadata } = await initTranslations(locale, ['metadata'])

    return {
        metadataBase: new URL('https://vertical-arch.com/pricing'),
        alternates: {
            canonical: '/pricing',
            languages: {
                'en-US': '/en/pricing',
                'pl-PL': '/pl/pricing'
            }
        },
        title: metadata('pricing-title'),
        description: metadata('pricing-description'),
        openGraph: {
            title: metadata('pricing-title'),
            description: metadata('pricing-description'),
            siteName: 'Vertical Design Studio',
            type: 'website',
            images: [{
                url: '/img/logo.png',
                width: 1200,
                height: 630,
                type: 'image/png',
                secureUrl: 'https://vertical-arch.com/img/logo.png',
            }],
            url: 'https://vertical-arch.com/'
        }
    }
}

export default async function Pricing({ params: { locale } }: PricingParams) {
    const { t: strings, resources } = await initTranslations(locale, i18nNamespaces)
    const { t: metadata } = await initTranslations(locale, ['metadata'])

    const pricings = await getPricings(locale)

    return (
        <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd(
                        '/pricing/',
                        metadata('pricing-title'),
                        metadata('pricing-description'),
                        locale,
                        new Date('2024-04-22T17:38:48.063Z'),
                        new Date()
                    ))
                }}
            />
            <Header locale={locale} />
            <main>
                <section className="text-black bg-white pt-28 overflow-hidden">
                    <h2 className="text-4xl md:text-5xl pt-5 mb-5 text-center">{strings('pricing-header')}</h2>
                    <h4 className="whitespace-pre-wrap w-3/4 m-auto text-base md:text-xl pt-1 pb-10 text-center">{strings('pricing-description')}</h4>

                    <ul className="hidden sm:flex justify-center items-center flex-wrap text-center">
                        {pricings.map((pricing, index) => {
                            const { id, title } = pricing
                            return (
                                <Link key={index} href={`#${id}`} className="hover:font-bold">
                                    <li className="flex-1 px-5 py-3 text-lg md:text-xl max-w-56">{title}</li>
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

                    <div className="whitespace-pre-line w-full text-base md:text-xl text-center mb-10">
                        {strings('pricing-end')}
                    </div>
                </section>
            </main>
        </TranslationsProvider>
    )
}
