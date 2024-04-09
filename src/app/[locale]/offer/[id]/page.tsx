import { getOffer } from "@/src/actions/getOffer"
import Header from "@/src/components/Header"
import ProjectComponent from "@/src/components/ProjectComponent"
import { Metadata } from "next"
import { notFound } from "next/navigation"

interface OfferPageParams {
    params: {
        locale: string,
        id: number
    }
}

export async function generateMetadata({ params: { locale, id } }: OfferPageParams): Promise<Metadata> {
    const { title } = await getOffer(id, locale) ?? {}

    return {
        title: `${title}`,
    }
}

export default async function OfferPage({ params: { locale, id } }: OfferPageParams) {
    const offer = await getOffer(id, locale)

    if (!offer) {
        notFound()
    }

    const { title, projects } = offer

    return (
        <>
            <Header locale={locale} />
            <main>
                <section className="text-black bg-white pt-28 pb-16">
                    <h2 className="text-4xl md:text-5xl pt-5 pb-5 text-center">{title}</h2>

                    <div>
                        {projects.map(project => {
                            return (
                                <div key={project.id} className="py-5 md:my-10">
                                    <ProjectComponent project={{...project, images: project.images.filter(image => !!image)}} />
                                </div>
                            )
                        })}
                    </div>
                </section>
            </main>
        </>
    )
}
