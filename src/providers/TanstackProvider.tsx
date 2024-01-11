'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface TanstackProviderProps {
    children: React.ReactNode
}

export const TanstackProvider = ({ children }: TanstackProviderProps) => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}