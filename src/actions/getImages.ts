'use server'

import { IImage } from '../types/image'
import { cmsRequest } from './cmsRequest'

export const getImages = async (name: string): Promise<IImage[]> => {
    try {
        const response = await cmsRequest('upload/files', 'GET', {
            'filters[caption][$containsi]': name
        })

        const images: IImage[] = response.map((image: any) => {
            return transformImage(image)
        })

        return images
    } catch (exception) {
        console.error(exception)
        return []
    }
}

export const transformImage = (image: any): IImage => {
    const { name, caption, alternativeText, formats } = image
    const { thumbnail, small, medium, large, huge } = formats ?? {}

    return {
        name,
        caption,
        alternativeText,
        formats: {
            thumbnail: thumbnail?.url,
            small: small?.url,
            medium: medium?.url,
            large: large?.url,
            huge: huge?.url
        }
    }
}