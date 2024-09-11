import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function Get(req: NextRequest, res: NextResponse) {
  const getCookies = cookies()
  const nextAuthSesssion =
    getCookies.get('next-auth.session-token')?.value || ''

  return NextResponse.json(nextAuthSesssion)
}
