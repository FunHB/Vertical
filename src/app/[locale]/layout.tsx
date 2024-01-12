import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { TanstackProvider } from '@/src/providers/TanstackProvider'
import i18nConfig from '@/i18nConfig'
import { dir } from 'i18next'
import TranslationsProvider from '@/src/providers/TranslationsProvider'
import initTranslations from '../i18n'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'

const inter = Inter({ subsets: ['latin'] })
const i18nNamespaces = ['navigation']

export const metadata: Metadata = {
  title: 'Vertical Design Studio',
  description: 'Studio projektowe Vertical'
}

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }))
}

interface RootLayoutProps {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export default async function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  const { resources } = await initTranslations(locale, i18nNamespaces)

  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={`font-caviar-dreams ${inter.className}`}>
        <TanstackProvider>
          <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
            <Header />
            {children}
            <Footer locale={locale} />
          </TranslationsProvider>
        </TanstackProvider>
      </body>
    </html>
  )
}
