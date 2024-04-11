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
    const { formats: { thumbnail, small, medium, large } } = icon

    return (
        <Link href={`/offer/${id}`}>
            <article className="aspect-square w-72 md:w-[22rem] p-3 m-3 md:m-5 border-2 border-black flex flex-col justify-between">
                <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${large ?? medium ?? small ?? thumbnail}`}
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
                <div className="w-full text-center text-base font-bold">
                    <p className="pb-1" >{t('more')}</p>
                </div>
            </article>
        </Link>
    )
}
