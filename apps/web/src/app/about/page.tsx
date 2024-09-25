import { ReactNode } from 'react'

export type IAbout = {
  className: string
  children: ReactNode
}

export default function About({ className, children }: IAbout) {
  return <>{children}</>
}
