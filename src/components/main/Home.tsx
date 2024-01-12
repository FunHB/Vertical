'use client'

import { getOfferTiles } from "@/src/actions/getOfferTiles"
import { OfferTile } from "@/src/types/offerTiles"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import Image from "next/image"
import OfferTileComponent from "../OfferTileComponent"
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Background1, Background2, Background2b, Background3, Background4, Background5, Background6, Background7 } from "@/src/assets/img/home/background"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { Process1, Process10, Process2, Process3, Process4, Process5, Process6, Process7, Process8, Process9 } from "@/src/assets/img/home/process"

interface HomePageProps {

}

export default function HomePage({ }: HomePageProps) {
    const queryClient = useQueryClient()

    const { i18n, t: homeStrings } = useTranslation('home')
    const currentLocale = i18n.language

    const { t: processStrings } = useTranslation('process')

    const [offerTiles, setOfferTiles] = useState<OfferTile[]>([])
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        queryClient.fetchQuery({
            queryKey: ['offerTiles'],
            queryFn: () => {
                return getOfferTiles(currentLocale)
            }
        }).then(data => {
            setOfferTiles(data)
        })
    }, [currentLocale, queryClient])

    const backgoundImages = [
        { src: Background1, alt: '1' },
        { src: Background2, alt: '2' },
        { src: Background2b, alt: '2b' },
        { src: Background3, alt: '3' },
        { src: Background4, alt: '4' },
        { src: Background5, alt: '5' },
        { src: Background6, alt: '6' },
        { src: Background7, alt: '7' }
    ]

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

    return (
        <main>
            <section ref={scrollRef} className="h-screen relative bg-black/0">
                <Carousel className="h-full w-full"
                    additionalTransfrom={0}
                    swipeable={false}
                    draggable={false}
                    showDots={false}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={5000}
                    keyBoardControl={false}
                    arrows={false}
                    centerMode={false}
                    focusOnSelect={false}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    partialVisible={false}
                    shouldResetAutoplay={false}
                    slidesToSlide={1}
                    responsive={{
                        desktop: {
                            breakpoint: { max: 3000, min: 0 },
                            items: 1
                        }
                    }}
                >
                    {backgoundImages.map((image, index) => {
                        const { src, alt } = image
                        return (
                            <div key={index} className="relative h-screen w-screen">
                                <Image src={src} alt={alt} fill={true} className="object-cover" />
                            </div>
                        )
                    })}
                </Carousel>
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
                    {offerTiles.map((offerTile, index) => {
                        return (
                            <OfferTileComponent key={index} offerTile={offerTile} />
                        )
                    })}
                </div>
            </section>
            <section className="text-black bg-white border-t-2 border-black py-5">
                <h2 className="text-3xl md:text-5xl pt-5 text-center">{homeStrings('process-header')}</h2>
                <h2 className="text-2xl md:text-4xl text-center mb-2 md:mb-10">{homeStrings('process-subtitle')}</h2>
                <div className="relative flex flex-row justify-center flex-wrap mb-10">
                    {processTiles.map((tile, index) => {
                        const { src, alt, caption } = tile
                        return (
                            <div key={index} className="flex-auto flex flex-col items-center w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 my-5">
                                <div className="relative flex flex-col items-center w-full">
                                    <div className="absolute flex items-center w-full h-full">
                                        <hr className="w-full h-1 bg-black"/>
                                    </div>
                                    <div className="z-10 p-4 bg-white">
                                        <div key={index} className="relative h-32 w-32 sm:h-44 sm:w-44">
                                            <Image src={src} alt={alt} fill={true} sizes="(max-width: 764px) 8rem, 11rem" className="object-cover rounded-full" />
                                            <div className="absolute flex justify-center items-center text-5xl rounded-full w-full h-full bg-black/40 text-white">
                                                {index + 1}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-2xl text-center w-40 sm:w-50">
                                    {caption}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
            <section className="text-black bg-white border-t-2 border-black pt-5 pb-20">
                <h2 className="text-4xl md:text-5xl py-5 text-center mb-2 md:mb-10">{homeStrings('example-header')}</h2>
                <div className="w-full bg-gray-200">
                    <Carousel
                        additionalTransfrom={0}
                        swipeable={true}
                        draggable={true}
                        minimumTouchDrag={80}
                        showDots={false}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={5000}
                        keyBoardControl={true}
                        arrows={false}
                        centerMode={false}
                        focusOnSelect={false}
                        rewind={false}
                        rewindWithAnimation={false}
                        rtl={false}
                        partialVisible={true}
                        shouldResetAutoplay={true}
                        sliderClass=""
                        slidesToSlide={1}
                        responsive={{
                            desktop: {
                                breakpoint: { max: 3000, min: 1024 },
                                items: 3,
                                partialVisibilityGutter: 50 // this is needed to tell the amount of px that should be visible.
                            },
                            tablet: {
                                breakpoint: { max: 1024, min: 464 },
                                items: 2,
                                partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
                            },
                            mobile: {
                                breakpoint: { max: 464, min: 0 },
                                items: 1,
                                partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
                            }
                        }}
                        itemClass="cursor-grab"
                        containerClass=""
                    >
                        {backgoundImages.map((image, index) => {
                            const { src, alt } = image
                            return (
                                <div key={index} className="relative flex items-center pointer-events-none h-[50vh] mx-2 my-5 md:mx-6 md:my-12 md:h-[25vw]">
                                    <Image src={src} alt={alt} style={{ objectFit: 'contain' }} />
                                </div>
                            )
                        })}
                    </Carousel>
                </div>
            </section>
            <section className="text-black bg-white border-t-2 border-black py-5">
                <h2 className="text-4xl md:text-5xl py-5 text-center md:mb-10">{homeStrings('contact-header')}</h2>
            </section>
        </main >
    )
}
