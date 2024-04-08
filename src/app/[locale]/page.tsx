import initTranslations from "@/src/app/i18n"
import TranslationsProvider from "@/src/providers/TranslationsProvider"
import { getOffers } from "@/src/actions/getOffers"
import ProjectsCarousel from "@/src/components/carousels/ProjectsCarousel"
import OfferTile from "@/src/components/OfferTile"
import BackgroundCarousel from "@/src/components/carousels/BackgroundCarousel"
import { getHomeProjects } from "@/src/actions/getHomeProjects"
import WorkProcess from "@/src/components/WorkProcess"
import Header from "@/src/components/Header"

interface HomeParams {
    params: {
        locale: string
    }
}

export default async function Home({ params: { locale } }: HomeParams) {
    const { resources } = await initTranslations(locale, ['process'])
    const { t: strings, resources: homeResources } = await initTranslations(locale, ['home'])

    const offers = await getOffers(locale)
    const images = await getHomeProjects()

    return (
        <>
            <Header locale={locale} white={true} />
            <>
                <BackgroundCarousel />

                <section id="offer" className="text-black bg-white py-5">
                    <h2 className="text-3xl md:text-4xl pt-5 text-center">{strings('offer-header')}</h2>
                    <div className="p-3 flex flex-row flex-wrap justify-center">
                        <TranslationsProvider namespaces={['home']} locale={locale} resources={homeResources}>
                            {offers.map((offer, index) => {
                                return (
                                    <OfferTile key={index} offer={offer} />
                                )
                            })}
                        </TranslationsProvider>
                    </div>
                </section>

                <section className="text-black bg-white border-t-2 border-black py-5">
                    <h2 className="text-3xl md:text-4xl pt-5 text-center">{strings('process-header')}</h2>
                    <h2 className="text-2xl md:text-2xl text-center mb-2 md:mb-5">{strings('process-subtitle')}</h2>
                    <TranslationsProvider namespaces={['process']} locale={locale} resources={resources}>
                        <WorkProcess />
                    </TranslationsProvider>
                </section>

                <section className="text-black bg-white border-t-2 border-black pt-5 pb-20">
                    <h2 className="text-3xl md:text-4xl text-center mb-2 md:mb-5">{strings('example-header')}</h2>
                    <div className="w-full">
                        <div className="bg-white">
                            <ProjectsCarousel images={images} />
                        </div>
                    </div>
                </section>
            </>
        </>
    )
}
