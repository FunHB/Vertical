'use server'

import { Offer } from '../types/offer'
import { cmsRequest } from './cmsRequest'
import { transformProject } from './getProject'

export const getOffer = async (offerId: number, language: string): Promise<Offer | null> => {
    try {
        const response = await cmsRequest(`offers/${offerId}`, 'GET', {
            'populate': 'icon,projects,projects.images',
            'locale': language
        })

        const offer: Offer = transformOffer(response.data)

        return offer
    } catch (exception) {
        console.error(exception)
        return null
    }
}

export const transformOffer = (offer: any): Offer => {
    const { id, attributes: { title, short_description, icon, projects } } = offer
    const { data: { attributes: { formats: { thumbnail, small, medium, large } } } } = icon

    const { data } = projects ?? {}

    return {
        id,
        title,
        shortDescription: short_description,
        icon: {
            formats: {
                thumbnail: thumbnail.url,
                image: (large ?? medium ?? small).url
            }
        },
        projects: data && data.length > 0 ? data.map((project: any) => transformProject(project)) : []
    }
}