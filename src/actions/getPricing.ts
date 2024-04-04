'use server'

import { Pricing } from '../types/Pricing'
import { cmsRequest } from './cmsRequest'
import { transformImage } from './getImage'

export const getPricing = async (pricingId: number, language: string): Promise<Pricing | null> => {
    try {
        const response = await cmsRequest(`pricings/${pricingId}`, 'GET', {
            'populate': 'background_image',
            'locale': language
        })

        const offer: Pricing = transformPricing(response.data)

        return offer
    } catch (exception) {
        console.error(exception)
        return null
    }
}

export const transformPricing = (offer: any): Pricing => {
    const { id, attributes: { title, subtitle, price, description, background_image } } = offer
    const { data: { id: imageId, attributes } } = background_image

    return {
        id,
        title,
        subtitle,
        price,
        description,
        backgroundImage: transformImage({ imageId, ...attributes })
    }
}