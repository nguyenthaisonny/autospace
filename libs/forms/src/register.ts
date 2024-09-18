import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formSchemaLogin, formSchemaRegister } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'

export type FormTypeLogin = z.infer<typeof formSchemaRegister>

export const useRegisterForm = () =>
  useForm<FormTypeLogin>({ resolver: zodResolver(formSchemaLogin) })
