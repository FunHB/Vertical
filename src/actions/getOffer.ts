'use server'

import { Offer } from '../types/offer'
import { transformOffer } from '../utils/transform'
import { cmsRequest } from './cmsRequest'

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