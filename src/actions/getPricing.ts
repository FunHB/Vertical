'use server'

import { Pricing } from '../types/Pricing'
import { transformPricing } from '../utils/transform'
import { cmsRequest } from './cmsRequest'

export const getPricing = async (pricingId: number, language: string): Promise<Pricing | null> => {
    try {
        const response = await cmsRequest(`pricings/${pricingId}`, 'GET', {
            'populate': 'background_image',
            'locale': language
        })

        const pricing: Pricing = transformPricing(response.data)

        return pricing
    } catch (exception) {
        console.error(exception)
        return null
    }
}
