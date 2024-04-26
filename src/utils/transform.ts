import { Pricing } from '../types/Pricing'
import { IImage } from '../types/image'
import { Offer } from '../types/offer'
import { Project } from '../types/project'
import { Question } from '../types/question'

export const transformImage = (image: any): IImage => {
    const { name, caption, alternativeText, formats } = image
    const { thumbnail, small, medium, large, xlarge } = formats ?? {}

    return {
        name,
        caption,
        alternativeText,
        formats: {
            thumbnail: thumbnail?.url,
            small: small?.url,
            medium: medium?.url,
            large: large?.url,
            huge: xlarge?.url
        }
    }
}

export const transformOffer = (offer: any): Offer => {
    const { id, attributes: { index, title, short_description, createdAt, updatedAt, long_description, icon, projects, locale, localizations } } = offer
    const { data: { id: iconId, attributes } } = icon ?? { data: {} }
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
        localizations: localizations?.data?.map((localization: any) => transformOffer(localization)) ?? []
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

export const transformProject = (project: any): Project => {
    const { id, attributes: { title, images } } = project

    const transformedImages: IImage[] = images?.data && images?.data.length > 0 ? images?.data.map(({ id, attributes }: any) => {
        return transformImage({ id, ...attributes })
    }) : []

    return {
        id,
        title,
        images: transformedImages
    }
}

export const transformQuestion = (question: any): Question => {
    const { attributes: { index, header, answer, adnotation } } = question

    return { id: index, header, answer, adnotation }
}