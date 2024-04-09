import type { Metadata, ResolvingMetadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { TanstackProvider } from '@/src/providers/TanstackProvider'
import i18nConfig from '@/i18nConfig'
import { dir } from 'i18next'
import TranslationsProvider from '@/src/providers/TranslationsProvider'
import initTranslations from '../i18n'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'

import type { Viewport } from 'next'

const inter = Inter({ subsets: ['latin'] })

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }))
}

interface RootLayoutProps {
  children: React.ReactNode
  params: {
    locale: string
  }
}
 
export const viewport: Viewport = {
  themeColor: 'black',
}

export async function generateMetadata({ params: { locale } }: RootLayoutProps, parent: ResolvingMetadata): Promise<Metadata> {
  const { t: metadata } = await initTranslations(locale, ['metadata'])

  return {
    metadataBase: new URL('https://vertical-arch.com'),
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en',
        'pl-PL': '/pl'
      }
    },
    title: metadata('home-title'),
    description: metadata('home-description'),
    openGraph: {
      title: metadata('home-title'),
      description: metadata('home-description'),
      images: '/img/metadata.png',
      type: 'website',
      url: 'https://vertical-arch.com/'
    },
    keywords: metadata('keywords')
  }
}

const i18nNamespaces = ['navigation']

export default async function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  const { resources } = await initTranslations(locale, i18nNamespaces)

  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={`font-caviar-dreams ${inter.className}`}>
        <TanstackProvider>
          <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
            {children}
            <Footer locale={locale} />
          </TranslationsProvider>
        </TanstackProvider>
      </body>
    </html>
  )
}
