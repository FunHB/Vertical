'use server'

import { SocialMedia } from '@/src/types/socialMedia'
import { cmsRequest } from './cmsRequest'
import { SocialMediaType } from '@/src/types/SocialMediaType'

export const getSocialMedia = async () => {
    try {
        const response = cmsRequest('social-medias', 'GET')

        const socialMedia: SocialMedia[] = (await response).map((data: any) => {
            const { attributes: { link_url, website } } = data
            return { link: link_url, type: SocialMediaType[website as keyof typeof SocialMediaType] } as SocialMedia
        })

        return socialMedia
    } catch (exception) {
        console.error(exception)
        return []
    }
}