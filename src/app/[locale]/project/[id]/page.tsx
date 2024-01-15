import { getProject } from "@/src/actions/getProject"
import Header from "@/src/components/Header"
import { Metadata } from "next"


interface ProjectPageParams {
    params: {
        locale: string,
        id: number
    }
}

export async function generateMetadata({ params: { locale, id } }: ProjectPageParams): Promise<Metadata> {
    const { title } = await getProject(id, locale) ?? {}

    return {
        title: `${title}`,
    }
}

export default async function ProjectPage({ params: { locale } }: ProjectPageParams) {

    return (
        <>
            <Header />
            <main>
                <section className="text-black bg-white py-5">

                </section>
            </main>
        </>
    )
}
