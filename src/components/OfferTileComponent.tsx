'use client'

import Link from "next/link"
import { OfferTile } from "../types/offerTiles"
import Image from "next/image"
import { useTranslation } from "react-i18next"

interface OfferTileComponentProps {
    offerTile: OfferTile
}

export default function OfferTileComponent({ offerTile }: OfferTileComponentProps) {
    const { t } = useTranslation('home')
    const { title, description, link, icon } = offerTile

    return (
        <article className="aspect-square w-80 md:w-96 p-4 m-4 md:m-12 border-2 border-black flex flex-col items-center">
            <div className="relative w-24 h-24">
                <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${icon.formats.small}`}
                    alt={title}
                    fill={true}
                    sizes="6rem"
                    style={{ objectFit: "contain" }}
                />
            </div>
            <div className="mt-2">
                <div>
                    <h3 className="uppercase text-center text-2xl mb-4">{title}</h3>
                    <p className="text-justify text-lg">{description}</p>
                </div>
                {link ? (<Link className="text-center pb-1" href={link}>{t('more')}</Link>) : null}
            </div>
        </article>
    )
}
