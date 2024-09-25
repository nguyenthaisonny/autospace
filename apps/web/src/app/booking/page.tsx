import { ReactNode } from 'react'

export type IBooking = {
  className: string
  children: ReactNode
}

export default function Booking({ className, children }: IBooking) {
  return <>{children}</>
}
