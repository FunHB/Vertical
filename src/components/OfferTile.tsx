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
        <article className="aspect-square w-72 md:w-80 p-3 m-3 md:m-7 border-2 border-black flex flex-col justify-between">
            <div className="flex flex-col items-center">
                <div className="relative w-20 h-20">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${icon.formats.image}`}
                        alt={title}
                        fill={true}
                        sizes="6rem"
                        className="object-contain"
                    />
                </div>
                <div className="mt-2">
                    <h3 className="uppercase text-center text-2xl mb-3">{title}</h3>
                    <p className="text-justify text-base">{shortDescription}</p>
                </div>
            </div>
            <div className="w-full text-center text-base">
                <Link className="pb-1" href={`/offer/${id}`}>{t('more')}</Link>
            </div>
        </article>
    )
}
