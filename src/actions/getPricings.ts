'use server'

import { Pricing } from '../types/Pricing'
import { transformPricing } from '../utils/transform'
import { cmsRequest } from './cmsRequest'

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