import { LoginForm } from '@autospace/ui/src/components/templates/LoginForm'
import { AuthLayout } from '@autospace/ui/src/components/molecules/AuthLayout'
import { useSession } from 'next-auth/react'

export default function Page() {
  return (
    <AuthLayout title="Login">
      <LoginForm className={''}></LoginForm>
    </AuthLayout>
  )
}
