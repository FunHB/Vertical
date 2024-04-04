import { getPricing } from "@/src/actions/getPricing"
import Header from "@/src/components/Header"
import { Metadata } from "next"
import { notFound } from "next/navigation"

interface PricingPageParams {
    params: {
        locale: string,
        id: number
    }
}

export async function SinglePricing({ params: { locale, id } }: PricingPageParams): Promise<Metadata> {
    const { title } = await getPricing(id, locale) ?? {}

    return {
        title: `${title}`,
    }
}

export default async function OfferPage({ params: { locale, id } }: PricingPageParams) {
    const pricing = await getPricing(id, locale)

    if (!pricing) {
        notFound()
    }

    const { title, subtitle, price, backgroundImage } = pricing

    return (
        <>
            <Header locale={locale} />
            <main>
                <section className="text-black bg-white pt-28 pb-16">
                    <h2 className="text-4xl md:text-5xl pt-5 pb-5 text-center">{title}</h2>
                </section>
            </main>
        </>
    )
}
