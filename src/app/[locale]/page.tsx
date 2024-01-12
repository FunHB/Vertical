import HomePage from "@/src/components/main/Home"
import initTranslations from "../i18n"
import TranslationsProvider from "@/src/providers/TranslationsProvider"
import { getOffers } from "@/src/actions/getOffers"

const i18nNamespaces: string[] = ['home', 'process']

interface HomeParams {
  params: {
    locale: string
  }
}

export default async function Home({ params: { locale } }: HomeParams) {
  const { resources } = await initTranslations(locale, i18nNamespaces)

  const offers = await getOffers(locale)

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}>
      <HomePage offers={offers} />
    </TranslationsProvider>
  )
}
