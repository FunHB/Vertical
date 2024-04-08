'use server'

import { IImage } from '../types/image'
import { cmsRequest } from './cmsRequest'

export const getImage = async (name: string): Promise<IImage | null> => {
    try {
        const response = await cmsRequest('upload/files', 'GET', {
            'filters[name][$containsi]': name
        })

        const file = response[0]

        if (!file) {
            return null
        }

        const image: IImage = transformImage(file)

        return image
    } catch (exception) {
        console.error(exception)
        return null
    }
}

export const transformImage = (image: any): IImage => {
    const { name, caption, alternativeText, formats: { thumbnail, small, medium, large } } = image

    return {
        name,
        caption,
        alternativeText,
        formats: {
            thumbnail: thumbnail.url,
            small: small?.url,
            medium: medium?.url,
            large: large?.url
        }
    }
}