import { BaseComponent } from '../../../../util/types'
import { ReactNode } from 'react'

export const Container = ({ children, className }: BaseComponent) => (
  <div className={`container sm:px-2 mx-auto ${className}`}>{children}</div>
)
