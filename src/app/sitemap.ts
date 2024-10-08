import { MetadataRoute } from 'next'
import { getOffers } from '../actions/getOffers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const offers = await getOffers('en', ['localizations'])

    const offersSites = offers.map(offer => {
        const { id, localizations, updatedAt } = offer

        return {
            url: `https://vertical-arch.com/offer/${id}`,
            lastModified: updatedAt,
            changeFrequency: 'monthly' as 'monthly',
            priority: 1,
            alternates: {
                languages: Object.assign(
                    { en: `https://vertical-arch.com/en/${id}` },
                    ...(localizations?.map(localization => {
                        return { [localization.locale]: `https://vertical-arch.com/${localization.locale}/${localization.id}` }
                    }) ?? [])
                )
            }
        }
    })

    return [
        {
            url: 'https://vertical-arch.com',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
            alternates: {
                languages: {
                    en: 'https://vertical-arch.com/en',
                    pl: 'https://vertical-arch.com/pl'
                }
            }
        },
        {
            url: 'https://vertical-arch.com/about',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
            alternates: {
                languages: {
                    en: 'https://vertical-arch.com/en/about',
                    pl: 'https://vertical-arch.com/pl/about'
                }
            }
        },
        {
            url: 'https://vertical-arch.com/faq',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
            alternates: {
                languages: {
                    en: 'https://vertical-arch.com/en/faq',
                    pl: 'https://vertical-arch.com/pl/faq'
                }
            }
        },
        {
            url: 'https://vertical-arch.com/pricing',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
            alternates: {
                languages: {
                    en: 'https://vertical-arch.com/en/pricing',
                    pl: 'https://vertical-arch.com/pl/pricing'
                }
            }
        },
        {
            url: 'https://vertical-arch.com/contact',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
            alternates: {
                languages: {
                    en: 'https://vertical-arch.com/en/contact',
                    pl: 'https://vertical-arch.com/pl/contact'
                }
            }
        },
        ...offersSites
    ]
}