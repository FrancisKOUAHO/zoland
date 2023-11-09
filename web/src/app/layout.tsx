'use client'

import {HydrationBoundary, QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {useState} from "react";

import '../styles/_main.scss'

const RootLayout = ({children}: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient(
        {
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false,
                    retry: false,
                    staleTime: 0,
                },
            },
        },
    ))
    return (
        <html lang="en">
        <body>
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary>
                {children}
            </HydrationBoundary>
            <ReactQueryDevtools/>
        </QueryClientProvider>
        </body>
        </html>
    )
}

export default RootLayout
