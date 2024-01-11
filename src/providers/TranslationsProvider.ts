'use client'

import { I18nextProvider } from 'react-i18next'
import initTranslations from '@/src/app/i18n'
import { Resource, createInstance } from 'i18next'

interface TanstackProviderProps {
    children: React.ReactNode
    locale: string
    namespaces: string[]
    resources: Resource
}

export default function TranslationsProvider({ children, locale, namespaces, resources }: TanstackProviderProps) {
    const i18n = createInstance()

    initTranslations(locale, namespaces, i18n, resources)

    return I18nextProvider.call(I18nextProvider, { i18n, children })
}