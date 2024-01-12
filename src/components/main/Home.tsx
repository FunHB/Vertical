'use client'

import { Offer } from "@/src/types/offer"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import OfferTileComponent from "../OfferTileComponent"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { Process1, Process10, Process2, Process3, Process4, Process5, Process6, Process7, Process8, Process9 } from "@/src/assets/img/home/process"
import BackgroundCarousel from "../carousels/BackgroundCarousel"
import ProjectsCarousel from "../carousels/ProjectsCarousel"
import ProcessTile from "../ProcessTile"

interface HomePageProps {
    offers: Offer[]
}

export default function HomePage({ offers }: HomePageProps) {
    const { t: homeStrings } = useTranslation('home')
    const { t: processStrings } = useTranslation('process')

    const scrollRef = useRef<HTMLDivElement>(null)

    const processTiles = [
        { src: Process1, alt: 'point-1', caption: processStrings('point-1') },
        { src: Process2, alt: 'point-2', caption: processStrings('point-2') },
        { src: Process3, alt: 'point-3', caption: processStrings('point-3') },
        { src: Process4, alt: 'point-4', caption: processStrings('point-4') },
        { src: Process5, alt: 'point-5', caption: processStrings('point-5') },
        { src: Process6, alt: 'point-6', caption: processStrings('point-6') },
        { src: Process7, alt: 'point-7', caption: processStrings('point-7') },
        { src: Process8, alt: 'point-8', caption: processStrings('point-8') },
        { src: Process9, alt: 'point-9', caption: processStrings('point-9') },
        { src: Process10, alt: 'point-10', caption: processStrings('point-10') },
    ]

    const images = [
        { src: '/img/test.png', alt: '1' },
        { src: '/img/test.png', alt: '1' },
        { src: '/img/test.png', alt: '1' },
        { src: '/img/test.png', alt: '1' },
        { src: '/img/test.png', alt: '1' }
    ]

    return (
        <main>
            <section ref={scrollRef} className="h-screen relative bg-black/0">
                <BackgroundCarousel />
                <div className="absolute top-0 left-0 bg-black/70 z-10 w-full h-full">
                    <div className="flex flex-col items-center justify-start h-full">
                        <div className="flex flex-col justify-end h-2/3 md:h-3/4 items-center md:items-end">
                            <h1 className="underline underline-offset-4 uppercase text-7xl decoration-4 md:text-[10rem] md:decoration-8">Vertical</h1>
                            <div className="flex flex-col items-center text-lg mt-3 md:text-2xl md:mt-10">
                                <p>&quot;Make Yourself all simplicity&quot;</p>
                                <p>~ Marcus Aurelius</p>
                            </div>
                        </div>
                        <button className="flex-1 flex items-center animate-bounce-slow"
                            type="button"
                            onClick={() => {
                                const height = scrollRef.current?.clientHeight ?? 0
                                window.scrollBy(0, (height - window.scrollY) / 2)
                            }}>
                            <FontAwesomeIcon className="w-10 h-10 md:w-14 md:h-14" icon={faChevronDown} />
                        </button>
                    </div>
                </div>
            </section>
            <section className="text-black bg-white py-5">
                <h2 className="text-4xl md:text-5xl pt-5 text-center">{homeStrings('offer-header')}</h2>
                <div className="p-3 flex flex-row flex-wrap justify-center">
                    {offers.map((offer, index) => {
                        return (
                            <OfferTileComponent key={index} offer={offer} />
                        )
                    })}
                </div>
            </section>
            <section className="text-black bg-white border-t-2 border-black py-5">
                <h2 className="text-3xl md:text-5xl pt-5 text-center">{homeStrings('process-header')}</h2>
                <h2 className="text-2xl md:text-4xl text-center mb-2 md:mb-10">{homeStrings('process-subtitle')}</h2>
                <div className="relative flex flex-row justify-center flex-wrap mb-10">
                    {processTiles.map((tile, index) => {
                        return (
                            <ProcessTile key={index} index={index} tile={tile} />
                        )
                    })}
                </div>
            </section>
            <section className="text-black bg-white border-t-2 border-black pt-5 pb-20">
                <h2 className="text-4xl md:text-5xl py-5 text-center mb-2 md:mb-10">{homeStrings('example-header')}</h2>
                <div className="w-full bg-gray-200">
                    <ProjectsCarousel images={images} />
                </div>
            </section>
            <section className="text-black bg-white border-t-2 border-black py-5">
                <h2 className="text-4xl md:text-5xl py-5 text-center md:mb-10">{homeStrings('contact-header')}</h2>
            </section>
        </main >
    )
}
