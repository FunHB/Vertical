'use server'

import { Offer } from '../types/offer'
import { cmsRequest } from './cmsRequest'

export const getOffer = async (offerId: number, language: string) => {
    try {
        const response = await cmsRequest(`offers/${offerId}`, 'GET', {
            'populate': 'icon',
            '_locale': language
        })

        const offer: Offer = transformOffer(response)

        return offer
    } catch (exception) {
        console.error(exception)
        return []
    }
}

export const transformOffer = (offer: any): Offer => {
    const { id, attributes: { title, short_description, icon } } = offer
    const { data: { attributes: { formats: { thumbnail, small, medium, large } } } } = icon

    return {
        id,
        title,
        shortDescription: short_description,
        icon: {
            formats: {
                thumbnail: thumbnail.url,
                image: (large ?? medium ?? small).url
            }
        }
    }
}