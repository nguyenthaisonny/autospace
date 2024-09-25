'use client'

import { ApolloProvider } from '@autospace/network/src/config/apollo'
import { SessionProvider } from '@autospace/ui/src/components/molecules/SessionProvider'
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

export const ClientProviders = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <NextAuthSessionProvider>
        <ApolloProvider>{children}</ApolloProvider>
      </NextAuthSessionProvider>
    </SessionProvider>
  )
}
