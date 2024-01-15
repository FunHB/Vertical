import { getOffer } from "@/src/actions/getOffer"
import Header from "@/src/components/Header"
import { Metadata } from "next"


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

export default async function OfferPage({ params: { locale } }: OfferPageParams) {

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
