'use client'
import { Loader } from '@/components/loader'
import { AuthContextProvider } from '@/context/use-auth-context'
import { useForgotPassword } from '@/hooks/forgot-password/use-forgot-password'
// Rest of your component code
import React from 'react'
import { FormProvider } from 'react-hook-form'

type Props = {
  children: React.ReactNode
}

const ForgotPasswordFormProvider = ({ children }: Props) => {
  const { methods, onHandleSubmit, loading } = useForgotPassword()

  return (
    <AuthContextProvider>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit} className="h-full">
          <div className="flex flex-col justify-between gap-3 h-full">
            <Loader loading={loading}>{children}</Loader>
          </div>
        </form>
      </FormProvider>
    </AuthContextProvider>
  )
}

export default ForgotPasswordFormProvider



