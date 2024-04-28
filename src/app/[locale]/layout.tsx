import type { Metadata, ResolvingMetadata } from 'next'
import '../globals.css'
import { TanstackProvider } from '@/src/providers/TanstackProvider'
import i18nConfig from '@/i18nConfig'
import { dir } from 'i18next'
import TranslationsProvider from '@/src/providers/TranslationsProvider'
import initTranslations from '../i18n'
import localFont from 'next/font/local'
import Footer from '@/src/components/Footer'
import { Graph, Organization, WebSite, WithContext } from 'schema-dts'

import type { Viewport } from 'next'

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
      canonical: `/${locale}`,
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
    },
    keywords: metadata('keywords')
  }
}

const i18nNamespaces = ['navigation']

const CaviarDreams = localFont({
  src: '../CaviarDreams.ttf',
  display: 'swap'
})

export default async function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  const { resources } = await initTranslations(locale, i18nNamespaces)

  return (
    <html lang={locale} dir={dir(locale)} className={CaviarDreams.className}>
      <body>
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

export const jsonLd = (url: string, title: string, description: string, locale: string, datePublished: Date, dateModified: Date): Graph => {
  return {
    "@context": "https://schema.org",
    "@graph": [{
      "@type": "Organization",
      "@id": "https://www.vertical-arch.com/#organization",
      name: title,
      url: `https://www.vertical-arch.com/`,
      sameAs: ["https://www.facebook.com/BiuroVertical"],
      logo: {
        "@type": "ImageObject",
        "@id": "https://www.vertical-arch.com/#logo",
        url: "https://www.vertical-arch.com/img/logo.png",
        caption: title
      },
      image: { "@id": "https://www.vertical-arch.com/#logo" }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.vertical-arch.com/#website",
      url: "https://www.vertical-arch.com/",
      name: title,
      publisher: { "@id": "https://www.vertical-arch.com/#organization" }
    },
    {
      "@type": "WebPage",
      "@id": `https://www.vertical-arch.com/${locale}${url}#webpage`,
      url: `https://www.vertical-arch.com/${locale}${url}`,
      inLanguage: locale,
      name: title,
      isPartOf: { "@id": "https://www.vertical-arch.com/#website" },
      about: { "@id": "https://www.vertical-arch.com/#organization" },
      datePublished: datePublished.toISOString(),
      dateModified: dateModified.toISOString(),
      description: description
    }]
  }
}