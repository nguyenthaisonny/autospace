'use client'
import { useCallback } from 'react'
import { Map } from '../organisms/map/Map'
import { Panel } from '../organisms/map/Panel'
import { DefaultZoomControls } from '../organisms/map/ZoomControls'
import { ViewStateChangeEvent } from 'react-map-gl'
import { initialViewState } from '@autospace/util/constants'
import { Autocomplete } from '@autospace/ui/src/components/atoms/Autocomplete'
import { SearchPlaceBox } from '../organisms/map/SearchPlacesBox'
import { IconSettings } from '@tabler/icons-react'
export const SearchPage = () => {
  const handleMapChange = useCallback(
    (target: ViewStateChangeEvent['target']) => {
      const bounces = target.getBounds()
      const locationFilter = {
        ne_lat: bounces?.getNorthEast().lat || 0,
        ne_lng: bounces?.getNorthEast().lng || 0,
        sw_lat: bounces?.getSouthWest().lat || 0,
        sw_lng: bounces?.getSouthWest().lng || 0,
      }
      console.log(locationFilter)
    },
    [],
  )
  return (
    <Map
      onLoad={(e) => handleMapChange(e.target)}
      onDrag={(e) => handleMapChange(e.target)}
      onZoomEnd={(e) => handleMapChange(e.target)}
      initialViewState={initialViewState}
    >
      <Panel position="left-top">
        <SearchPlaceBox />
      </Panel>
      <Panel position="right-top">
        <IconSettings stroke={2} />
      </Panel>
      <Panel position="right-center">
        <DefaultZoomControls />
      </Panel>
    </Map>
  )
}
