import { getOffer } from "@/src/actions/getOffer"
import Header from "@/src/components/Header"
import ProjectComponent from "@/src/components/ProjectComponent"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { jsonLd } from "../../layout"

interface OfferPageParams {
    params: {
        locale: string,
        id: number
    }
}

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 60 * 60 * 6 /* hours */ + 60 * 0 /* minutes */ + 0 /* seconds */

export async function generateMetadata({ params: { locale, id } }: OfferPageParams): Promise<Metadata> {
    const offer = await getOffer(id)
    const { title, shortDescription } = offer[locale] ?? {}

    return {
        metadataBase: new URL('https://vertical-arch.com/offer', `${id}`),
        alternates: {
            canonical: `/${locale}/offer/${id}`,
            languages: {
                'en-US': `/en/offer/${id}`,
                'pl-PL': `/pl/offer/${id}`
            }
        },
        title: `Vertical - ${title}`,
        description: shortDescription,
        openGraph: {
            title: `Vertical - ${title}`,
            description: shortDescription,
            siteName: 'Vertical Design Studio',
            type: 'website',
            images: [{
                url: '/img/logo.png',
                width: 1200,
                height: 630,
                type: 'image/png',
                secureUrl: 'https://vertical-arch.com/img/logo.png',
            }],
            url: 'https://vertical-arch.com/'
        }
    }
}

export default async function OfferPage({ params: { locale, id } }: OfferPageParams) {
    const offer = await getOffer(id)
    const localeOffer = offer[locale]

    if (!localeOffer) {
        notFound()
    }

    const { title, shortDescription, longDescription, projects, createdAt, updatedAt } = localeOffer

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd(
                        '/offer/',
                        title,
                        shortDescription,
                        locale,
                        createdAt,
                        updatedAt
                    ))
                }}
            />
            <Header locale={locale} />
            <main>
                <section className="text-black bg-white pt-28 pb-16">
                    <h2 className="text-4xl md:text-5xl py-5 text-center">{title}</h2>
                    {longDescription ? (<h4 className="whitespace-pre-line w-11/12 md:w-5/6 lg:w-3/4 m-auto text-lg md:text-xl pb-5 text-center">{longDescription}</h4>) : null}

                    <div>
                        {projects.map(project => {
                            return (
                                <div key={project.id} className="py-5 md:my-10">
                                    <ProjectComponent project={{ ...project, images: project.images.filter(image => image.formats.thumbnail) }} />
                                </div>
                            )
                        })}
                    </div>
                </section>
            </main>
        </>
    )
}
