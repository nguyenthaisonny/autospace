'use client'
import { useQuery } from '@apollo/client'
import { SearchGaragesDocument } from '@autospace/network/src/gql/generated'
import { useSession } from 'next-auth/react'
import { toLocalISOString } from '@autospace/util/date'
import { useEffect } from 'react'

export default function Home() {
  const { data: garages, loading } = useQuery(SearchGaragesDocument, {
    variables: {
      dateFilter: { end: '2024-09-28', start: '2024-09-27' },
      locationFilter: {
        ne_lat: 1,
        ne_lng: 1,
        sw_lat: -1,
        sw_lng: -1,
      },
    },
  })

  const { data: sessionData, status } = useSession()

  return (
    <main>
      <div>{JSON.stringify(garages)}</div>
    </main>
  )
}
