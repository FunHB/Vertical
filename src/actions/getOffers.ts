'use server'

import { Offer } from '../types/offer'
import { transformOffer } from '../utils/transform'
import { cmsRequest } from './cmsRequest'

export const getOffers = async (language: string, populate?: string[]): Promise<Offer[]> => {
    try {
        const response = await cmsRequest('offers', 'GET', {
            'populate': ['icon', ...populate ?? []].join(','),
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