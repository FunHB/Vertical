'use server'

import { Offer } from '../types/offer'
import { cmsRequest } from './cmsRequest'
import { transformImage } from './getImages'
import { transformProject } from './getProject'

export const getOffer = async (offerId: number): Promise<Record<string, Offer>> => {
    try {
        const response = await cmsRequest(`offers/${offerId}`, 'GET', {
            'populate': 'icon,projects,projects.images,localizations,localizations.projects,localizations.projects.images,localizations.icon'
        })

        const offer = Object.assign({}, ...([
            transformOffer(response.data),
            ...response.data.attributes.localizations.data.map((locale: any) => transformOffer(locale))
        ] as Offer[]).map(locale => { return { [locale.locale]: locale } }))

        return offer
    } catch (exception) {
        console.error(exception)
        return {}
    }
}

export const transformOffer = (offer: any): Offer => {
    const { id, attributes: { index, title, short_description, createdAt, updatedAt, long_description, icon, projects, locale, localizations } } = offer
    const { id: iconId, data: { attributes } } = icon

    const { data } = projects ?? {}

    return {
        id,
        title,
        shortDescription: short_description,
        longDescription: long_description,
        icon: transformImage({ iconId, ...attributes }),
        projects: data && data.length > 0 ? data.map((project: any) => transformProject(project)) : [],
        locale,
        index,
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
        localizations: localizations ? localizations.data.map((localization: any) => transformOffer(localization)) : []
    }
}