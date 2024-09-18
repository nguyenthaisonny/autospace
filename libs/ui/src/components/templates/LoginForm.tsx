'use client'
import { useLoginForm } from '@autospace/forms/src/login'
import { Form } from '../atoms/Form'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { HtmlInput } from '../atoms/HtmlInput'
import { Button } from '../atoms/Button'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export interface ILoginFormProps {
  className: string
}

export const LoginForm = ({ className }: ILoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginForm()
  const [loading, setLoading] = useState(false)

  console.log('errors: ', errors)
  const { replace } = useRouter()
  return (
    <Form
      onSubmit={handleSubmit(async ({ email, password }) => {
        setLoading(true)
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })
        if (result?.error) {
          alert('Login failed. Try again.')
        }

        if (result?.ok) {
          replace('/')
        }
        setLoading(false)
      })}
    >
      <HtmlLabel title="Email" error={errors.email?.message}>
        <HtmlInput placeholder="Email address" {...register('email')} />
      </HtmlLabel>
      <HtmlLabel title="Password" error={errors.password?.message}>
        <HtmlInput
          type="password"
          placeholder="Password"
          {...register('password')}
        />
      </HtmlLabel>
      <Button loading={loading} type="submit">
        Submit
      </Button>
      <div className="mt-4 text-sm">
        Do not have an account ?
        <br />
        <Link
          href="/register"
          className="font-bold underline underline-offset-4"
        >
          Create one
        </Link>{' '}
        now.
      </div>
    </Form>
  )
}
