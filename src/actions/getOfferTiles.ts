'use server'

import { OfferTile } from '../types/offerTiles'
import { cmsRequest } from './cmsRequest'

export const getOfferTiles = async (language: string) => {
    try {
        const response = cmsRequest('offer-tiles', 'GET', {
            'populate': 'icon',
            '_locale': language
        })

        const offerTiles: OfferTile[] = (await response).map((tile: any) => {
            const { attributes: { id, title, description, link, icon } } = tile
            const { data: { attributes: { formats: { thumbnail, small } } } } = icon
            return {
                id,
                title,
                link,
                description,
                icon: {
                    formats: {
                        thumbnail: thumbnail.url,
                        small: small.url
                    }
                }
            }
        })

        return offerTiles
    } catch (exception) {
        console.error(exception)
        return []
    }
}