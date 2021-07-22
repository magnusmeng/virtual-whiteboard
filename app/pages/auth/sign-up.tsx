import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button'

import InputGroup from '../../components/InputGroup'
import AuthLayout from '../../components/layouts/AuthLayout'
import { ISignUpData, useAuth } from '../../models'

export default function SignUp() {
  const authStore = useAuth()
  const router = useRouter()

  const { register, handleSubmit, formState } = useForm<ISignUpData>()

  const onSubmit = async (values: ISignUpData) => {
    try {
      const user = await authStore.signUp(values)
      router.push('/')
    } catch (error) {
      // TODO: We should handle errors here
      alert(error.message)
    }
  }

  return (
    <AuthLayout
      title="Sign up"
      sub="Enter your credentials to create a new account"
    >
      <InputGroup
        label="Name"
        placeholder="Enter your name"
        type="text"
        {...register('name', {
          required: 'Please enter your name',
        })}
        validationMessage={formState.errors.name?.message}
      />
      <InputGroup
        label="Team name"
        placeholder="Enter the name of your new team"
        type="text"
        className="mt-4"
        {...register('teamName', {
          required: 'Please enter the name of your new team',
        })}
        validationMessage={formState.errors.teamName?.message}
      />

      <div className="w-full border-t border-gray-200 mt-6" />

      <InputGroup
        label="Email"
        placeholder="Enter your email"
        type="email"
        className="mt-4"
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

      <div className="w-full border-t border-gray-200 my-6" />

      <Button className="button w-full mt-4" onClick={handleSubmit(onSubmit)}>
        Create your account
      </Button>
      <Link href="/auth/sign-in">
        <a className="button-secondary w-full mt-2">Already have an account?</a>
      </Link>
    </AuthLayout>
  )
}
