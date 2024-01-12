'use server'

import { Offer } from '../types/offer'
import { cmsRequest } from './cmsRequest'
import { transformOffer } from './getOffer'

export const getOffers = async (language: string) => {
    try {
        const response = await cmsRequest('offers', 'GET', {
            'populate': 'icon',
            '_locale': language
        })

        const offers: Offer[] = response.map((data: any) => {
            return transformOffer(data)
        })

        return offers
    } catch (exception) {
        console.error(exception)
        return []
    }
}