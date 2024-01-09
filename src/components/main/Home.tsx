'use client'

import { getOfferTiles } from "@/actions/getOfferTiles"
import { OfferTile } from "@/types/offerTiles"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"

interface HomePageProps {

}

export default function HomePage({ }: HomePageProps) {
    const queryClient = useQueryClient()

    const [offerTiles, setOfferTiles] = useState<OfferTile[]>([])

    useEffect(() => {
        queryClient.fetchQuery({
            queryKey: ['offerTiles'],
            queryFn: () => {
                return getOfferTiles()
            }
        }).then(data => {
            setOfferTiles(data)
        })
    }, [queryClient])

    return (
        <>
            {offerTiles.map((offerTile, index) => {
                console.log(offerTile)
                const { title } = offerTile ?? {}
                return (
                    <h1 key={index}>{title}</h1>
                )
            })}
        </>
    )
}
