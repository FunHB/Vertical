'use client'

import Link from "next/link"
import { Offer } from "../types/offer"
import Image from "next/image"
import { useTranslation } from "react-i18next"

interface OfferTileProps {
    offer: Offer
}

export default function OfferTile({ offer }: OfferTileProps) {
    const { t } = useTranslation('home')
    const { id, title, shortDescription, icon } = offer

    return (
        <article className="aspect-square w-80 md:w-96 p-4 m-4 md:m-12 border-2 border-black flex flex-col justify-between">
            <div className="flex flex-col items-center">
                <div className="relative w-24 h-24">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${icon.formats.image}`}
                        alt={title}
                        fill={true}
                        sizes="6rem"
                        className="object-contain"
                    />
                </div>
                <div className="mt-2">
                    <h3 className="uppercase text-center text-2xl mb-4">{title}</h3>
                    <p className="text-justify text-lg">{shortDescription}</p>
                </div>
            </div>
            <div className="w-full text-center text-lg">
                <Link className="pb-1" href={`/offer/${id}`}>{t('more')}</Link>
            </div>
        </article>
    )
}
