import { ReactNode } from 'react'

export type ISearch = {
  className: string
  children: ReactNode
}

export default function Search({ className, children }: ISearch) {
  return <>{children}</>
}
