'use client'
import { add } from '@autospace/sample-lib'
import { useMutation, useQuery } from '@apollo/client'
import { CompaniesDocument } from '@autospace/network/src/gql/generated'
export default function Home() {
  const { data, loading } = useQuery(CompaniesDocument)
  console.log(data, 'data')

  return (
    <main>
      <div>
        {data?.companies.map((company) => (
          <div className="p-4 bg-gray-100 rounded" key={company.id}>
            <div>{company.displayName}</div>
            <div>{company.description}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
