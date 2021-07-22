import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button'

import InputGroup from '../../components/InputGroup'
import AuthLayout from '../../components/layouts/AuthLayout'

interface ISignInData {
  email: string
  password: string
}

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm<ISignInData>()

  const onSubmit = async (values: ISignInData) => {
    console.log(values)
    return new Promise((re, rj) => setTimeout(() => re(false), 1000))
  }

  return (
    <AuthLayout title="Sign in" sub="Enter your credentials to enter the site">
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
      <InputGroup
        label="Password"
        placeholder="Enter your password"
        type="password"
        className="mt-4"
        {...register('password', {
          required: 'Please enter your password',
        })}
        validationMessage={formState.errors.password?.message}
      />

      <Button className="button w-full mt-4" onClick={handleSubmit(onSubmit)}>
        Sign in
      </Button>
      <Link href="/auth/forgot">
        <a className="button-secondary w-full mt-2">Forgot your password?</a>
      </Link>
    </AuthLayout>
  )
}
