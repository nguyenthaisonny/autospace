'use client'
import { add } from '@autospace/sample-lib'
import { useMutation, useQuery } from '@apollo/client'
import { CompaniesDocument } from '@autospace/network/src/gql/generated'
import { BrandIcon } from '@autospace/ui/src/components/atoms/BrandIcon'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@autospace/ui/src/components/atoms/Button'
import Link from 'next/link'
export default function Home() {
  const { data, loading } = useQuery(CompaniesDocument)
  const { data: sessionData, status } = useSession()
  console.log('data', { sessionData })

  return (
    <main className="bg-primary">
      {sessionData?.user ? (
        <Button onClick={() => signOut()}>Signout</Button>
      ) : (
        <Link href="/login">Login</Link>
      )}
      <BrandIcon />
      <div>
        {data?.companies.map((company) => (
          <div key={company.id}>
            <div>{company.displayName}</div>
            <div>{company.description}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
