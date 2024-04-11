'use server'

import { Pricing } from '../types/Pricing'
import { cmsRequest } from './cmsRequest'
import { transformImage } from './getImages'

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

export const transformPricing = (pricing: any): Pricing => {
    const { id, attributes: { index, title, subtitle, price, description, background_image } } = pricing
    const { data: { id: imageId, attributes } } = background_image

    return {
        id,
        title,
        subtitle,
        price,
        description,
        backgroundImage: transformImage({ imageId, ...attributes }),
        index
    }
}