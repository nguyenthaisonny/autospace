import { useLazyQuery } from '@apollo/client'
import { SearchGaragesDocument } from '@autospace/network/src/gql/generated'
import { GarageMarker } from './GarageMarker'
import { useEffect } from 'react'
import { FormTypeSearchGarage } from '@autospace/forms/src/searchGarage'
import { useFormContext } from 'react-hook-form'

export const ShowGarages = () => {
  const [searchGarages, { loading, data, error }] = useLazyQuery(
    SearchGaragesDocument,
  )
  const { watch } = useFormContext<FormTypeSearchGarage>()
  const { startTime: start, endTime: end, locationFilter } = watch()
  useEffect(() => {
    searchGarages({
      variables: {
        dateFilter: { start, end },
        locationFilter,
      },
    })
  }, [searchGarages, end, start, locationFilter])
  return (
    <>
      {data?.searchGarages.map((garage) => (
        <GarageMarker key={garage.id} marker={garage} />
      ))}
    </>
  )
}
