import HomePage from "@/src/components/main/Home"
import initTranslations from "@/src/app/i18n"
import TranslationsProvider from "@/src/providers/TranslationsProvider"

const i18nNamespaces: string[] = ['home', 'process']

interface HomeParams {
  params: {
    locale: string
  }
}

export default async function Home({ params: { locale } }: HomeParams) {
  const { resources } = await initTranslations(locale, i18nNamespaces)

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}>
    </TranslationsProvider>
  )
}
