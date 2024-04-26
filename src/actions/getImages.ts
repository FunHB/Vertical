'use server'

import { IImage } from '../types/image'
import { transformImage } from '../utils/transform'
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