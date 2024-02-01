import initTranslations from "@/src/app/i18n"
import TranslationsProvider from "@/src/providers/TranslationsProvider"
import { getOffers } from "@/src/actions/getOffers"
import ProjectsCarousel from "@/src/components/carousels/ProjectsCarousel"
import OfferTile from "@/src/components/OfferTile"
import BackgroundCarousel from "@/src/components/carousels/BackgroundCarousel"
import { getHomeProjects } from "@/src/actions/getHomeProjects"
import WorkProcess from "@/src/components/WorkProcess"
import Header from "@/src/components/Header"

const i18nNamespaces: string[] = ['process']

interface HomeParams {
    params: {
        locale: string
    }
}

export default async function Home({ params: { locale } }: HomeParams) {
    const { t: homeStrings } = await initTranslations(locale, ['home'])
    const { resources } = await initTranslations(locale, i18nNamespaces)

    const offers = await getOffers(locale)
    const images = await getHomeProjects()

    return (
        <>
            <Header locale={locale} white={true} />
            <TranslationsProvider
                namespaces={i18nNamespaces}
                locale={locale}
                resources={resources}>
                <BackgroundCarousel />
                <section id="offer" className="text-black bg-white py-5">
                    <h2 className="text-4xl md:text-5xl pt-5 text-center">{homeStrings('offer-header')}</h2>
                    <div className="p-3 flex flex-row flex-wrap justify-center">
                        {offers.map((offer, index) => {
                            return (
                                <OfferTile key={index} offer={offer} />
                            )
                        })}
                    </div>
                </section>
                <section className="text-black bg-white border-t-2 border-black py-5">
                    <h2 className="text-3xl md:text-5xl pt-5 text-center">{homeStrings('process-header')}</h2>
                    <h2 className="text-2xl md:text-4xl text-center mb-2 md:mb-10">{homeStrings('process-subtitle')}</h2>
                    <WorkProcess />
                </section>
                <section className="text-black bg-white border-t-2 border-black pt-5 pb-20">
                    <h2 className="text-4xl md:text-5xl py-5 text-center mb-2 md:mb-10">{homeStrings('example-header')}</h2>
                    <div className="w-full bg-gray-200">
                        <ProjectsCarousel images={images} />
                    </div>
                </section>
            </TranslationsProvider>
        </>
    )
}
