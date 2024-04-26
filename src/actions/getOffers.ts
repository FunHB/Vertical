'use server'

import { Offer } from '../types/offer'
import { cmsRequest } from './cmsRequest'
import { transformOffer } from './getOffer'

export const getOffers = async (language: string, populate = 'icon'): Promise<Offer[]> => {
    try {
        const response = await cmsRequest('offers', 'GET', {
            'populate': populate,
            'locale': language
        })

        const offers: Offer[] = response.data.map((data: any) => {
            return transformOffer(data)
        })

        return offers.sort((a, b) => a.index - b.index)
    } catch (exception) {
        console.error(exception)
        return []
    }
}