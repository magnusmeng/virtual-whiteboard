import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button'

import InputGroup from '../../components/InputGroup'
import AuthLayout from '../../components/layouts/AuthLayout'

interface IForgotData {
  email: string
}

export default function Forgot() {
  const { register, handleSubmit, formState } = useForm<IForgotData>()

  const onSubmit = async (values: IForgotData) => {
    await new Promise((re, rj) => setTimeout(() => re(false), 1000))
    alert(
      'You cannot change password. The API is not connected to an email-provider, so we do not send out reset-links at this moment'
    )
  }

  return (
    <AuthLayout
      title="Forgot password"
      sub="Enter your email and we'll send you a new one"
    >
      <InputGroup
        label="Email"
        placeholder="Enter your email"
        type="email"
        {...register('email', {
          required: 'Please enter your email',
          pattern: {
            message: 'Please enter a valid email',
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          },
        })}
        validationMessage={formState.errors.email?.message}
      />

      <Button className="button w-full mt-4" onClick={handleSubmit(onSubmit)}>
        Request new password
      </Button>
      <Link href="/auth/sign-in">
        <a className="button-secondary w-full mt-2">Return to sign in</a>
      </Link>
    </AuthLayout>
  )
}
