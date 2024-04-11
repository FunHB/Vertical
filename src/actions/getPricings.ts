'use server'

import { Pricing } from '../types/Pricing'
import { cmsRequest } from './cmsRequest'
import { transformPricing } from './getPricing'

export const getPricings = async (language: string): Promise<Pricing[]> => {
    try {
        const response = await cmsRequest('pricings', 'GET', {
            'populate': 'background_image',
            'locale': language
        })

        const pricing: Pricing[] = response.data.map((data: any) => {
            return transformPricing(data)
        })

        return pricing.sort((a, b) => a.index - b.index)
    } catch (exception) {
        console.error(exception)
        return []
    }
}