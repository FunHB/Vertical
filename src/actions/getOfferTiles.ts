'use server'

import { OfferTile } from '../types/offerTiles'

export const getOfferTiles = async () => {
    try {
        const response = await fetch(`${process.env.API_URL}/offer-tiles?populate=Icon`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${process.env.API_TOKEN ?? ''}`
            }
        })

        const json = await response.json()

        if (!/(2\d\d)|(304)/.test(`${response.status}`)) {
            throw new Error(`[${response.status}] Cannot fetch Offer Tiles\n ${json}`)
        }

        const offerTiles: OfferTile[] = json.data.map((tile: any) => {
            const { attributes: { Title, Description, Icon } } = tile
            const { data: { attributes: { formats: { thumbnail, small } } } } = Icon
            return {
                title: Title,
                description: Description,
                icon: {
                    formats: {
                        thumbnail: thumbnail.url,
                        small: small.url
                    }
                }
            } as OfferTile
        })

        return offerTiles
    } catch (exception) {
        console.error(exception)
        return []
    }
}