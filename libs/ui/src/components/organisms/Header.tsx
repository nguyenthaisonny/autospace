'use client'
import { BaseComponent, MenuItem, Role } from '../../../../util/types'
import { Brand } from '../atoms/Brand'
import { Container } from '../atoms/Container'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Sidebar } from './Sidebar'
import { UserInfo } from '../molecules/UserInfo'
import { LogoutButton } from '../molecules/LogoutButton'
import { Button } from '../atoms/Button'

export type IHeaderProps = {
  type?: Role
  menuItems: MenuItem[]
} & BaseComponent

export const Header = ({ type, menuItems }: IHeaderProps) => {
  const session = useSession()
  const uid = session?.data?.user?.uid

  return (
    <header>
      <nav className="fixed z-40 top-0 w-full shadow-md bg-white/50 backdrop-blur-md">
        <Container className="relative   flex items-center justify-between h-16 py-2 gap-16">
          <Link href="/" aria-label="Home" className="w-auto z-50">
            <Brand type={type} className="hidden h-10 sm:block" />
            <Brand type={type} shortForm className="block sm:hidden" />
          </Link>
          <div className="flex items-center gap-2">
            {uid ? (
              <div className="flex gap-6 items-center">
                <div className="text-sm mr-6 flex gap-3">
                  <Sidebar open={false}>
                    <UserInfo className="mb-4" />
                    <div className="flex flex-col items-start justify-between space-y-1">
                      {menuItems.map(({ label, href }) => (
                        <Link
                          className="hover:underline underline-offset-4 transition-all hover:pl-1"
                          href={href}
                          key={label}
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-auto">
                      <LogoutButton />
                    </div>
                  </Sidebar>
                </div>
              </div>
            ) : (
              <>
                <Link href="/register">
                  <Button variant="outlined" className="hidden md:block">
                    Register
                  </Button>
                </Link>
                <Link href="/login">
                  <Button>Log in</Button>
                </Link>
              </>
            )}
          </div>
        </Container>
      </nav>
      <div className="h-16" />
    </header>
  )
}
