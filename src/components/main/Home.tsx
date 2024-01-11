'use client'

import { getOfferTiles } from "@/src/actions/getOfferTiles"
import { OfferTile } from "@/src/types/offerTiles"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from 'react-responsive-carousel'
import Image from "next/image"
import OfferTileComponent from "../OfferTileComponent"

interface HomePageProps {

}

export default function HomePage({ }: HomePageProps) {
    const queryClient = useQueryClient()

    const { i18n, t } = useTranslation('home')
    const currentLocale = i18n.language

    const [offerTiles, setOfferTiles] = useState<OfferTile[]>([])

    useEffect(() => {
        queryClient.fetchQuery({
            queryKey: ['offerTiles'],
            queryFn: () => {
                return getOfferTiles(1, currentLocale)
            }
        }).then(data => {
            setOfferTiles(data)
        })
    }, [currentLocale, queryClient])

    return (
        <>
            <section className="snap-start shrink-0 h-screen relative">
                <Carousel className="h-full w-full"
                    showArrows={false}
                    showStatus={false}
                    showIndicators={false}
                    showThumbs={false}
                    useKeyboardArrows={false}
                    stopOnHover={false}
                    swipeable={false}
                    dynamicHeight={false}
                    emulateTouch={false}
                    autoFocus={false}
                    interval={5000}>
                    <Image src={""} alt={""} fill={true} objectFit="cover" />
                    <Image src={""} alt={""} fill={true} objectFit="cover" />
                    <Image src={""} alt={""} fill={true} objectFit="cover" />
                    <Image src={""} alt={""} fill={true} objectFit="cover" />
                    <Image src={""} alt={""} fill={true} objectFit="cover" />
                </Carousel>
                <div className="absolute top-0 left-0 w-full h-full flex flex-row items-end justify-center z-10 bg-black/20">
                    <div className="flex flex-col items-end h-1/2">
                        <h1 className="underline uppercase text-9xl">Vertical Studio</h1>
                        <div className="flex flex-col items-center text-2xl mt-10">
                            <p>&quot;Make Yourself all simplicity&quot;</p>
                            <p>~ Marcus Aurelius</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="snap-start shrink-0 h-screen text-black bg-white">
                <h2 className="text-5xl p-5 text-center">{t('offer-header')}</h2>
                <div>
                    {offerTiles.map((offerTile, index) => {
                        return (
                            <OfferTileComponent key={index} offerTile={offerTile} />
                        )
                    })}
                </div>
            </section>
        </>
    )
}
