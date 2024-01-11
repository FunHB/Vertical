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
import { Image1, Image2, Image2b, Image3, Image4, Image5, Image6, Image7 } from "@/src/assets/img/home/background"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

interface HomePageProps {

}

export default function HomePage({ }: HomePageProps) {
    const queryClient = useQueryClient()

    const { i18n, t } = useTranslation('home')
    const currentLocale = i18n.language

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
        { src: Image1, alt: '1' },
        { src: Image2, alt: '2' },
        { src: Image2b, alt: '2b' },
        { src: Image3, alt: '3' },
        { src: Image4, alt: '4' },
        { src: Image5, alt: '5' },
        { src: Image6, alt: '6' },
        { src: Image7, alt: '7' }
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
                        <div className="flex flex-col justify-end h-3/4 items-center md:items-end">
                            <h1 className="underline underline-offset-8 decoration-8 uppercase text-6xl md:text-[10rem]">Vertical</h1>
                            <div className="flex flex-col items-center text-md mt-3 md:text-2xl md:mt-10">
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
                            <FontAwesomeIcon size="3x" icon={faChevronDown} />
                        </button>
                    </div>
                </div>
            </section>
            <section className="text-black bg-white py-5">
                <h2 className="text-4xl md:text-5xl pt-5 text-center">{t('offer-header')}</h2>
                <div className="p-3 flex flex-row flex-wrap justify-center">
                    {offerTiles.map((offerTile, index) => {
                        return (
                            <OfferTileComponent key={index} offerTile={offerTile} />
                        )
                    })}
                </div>
            </section>
            <section className="text-black bg-white border-t-2 border-black py-5">
                <h2 className="text-4xl md:text-5xl py-5 text-center mb-2 md:mb-10">{t('process-header')}</h2>
            </section>
            <section className="text-black bg-white border-t-2 border-black py-5">
                <h2 className="text-4xl md:text-5xl py-5 text-center mb-2 md:mb-10">{t('example-header')}</h2>
                <div className="w-full bg-gray-100">
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
                                <div key={index} className="relative pointer-events-none h-[50vh] mx-2 my-5 md:mx-5 md:my-10 md:h-[25vw]">
                                    <Image src={src} alt={alt} style={{ objectFit: 'contain' }} />
                                </div>
                            )
                        })}
                    </Carousel>
                </div>
            </section>
            <section className="text-black bg-white border-t-2 border-black py-5">
                <h2 className="text-4xl md:text-5xl py-5 text-center md:mb-10">{t('contact-header')}</h2>
            </section>
        </main >
    )
}
