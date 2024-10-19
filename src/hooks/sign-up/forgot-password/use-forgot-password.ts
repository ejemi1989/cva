'use client'
import { useToast } from '@/components/ui/use-toast'
import {
  ForgotPasswordProps as ForgotPasswordPropsSchema,
  ForgotPasswordSchema,
} from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const useForgotPasswordForm = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const { signIn, isLoaded } = useSignIn()
  const router = useRouter()
  const methods = useForm<ForgotPasswordPropsSchema>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: 'onChange',
  })

  const onGenerateResetToken = async (
    email: string,
    onNext: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (!isLoaded) return

    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })

      onNext((prev) => prev + 1)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.errors[0].longMessage,
      })
    }
  }

  const onHandleSubmit = methods.handleSubmit(
    async (values: ForgotPasswordPropsSchema) => {
      if (!isLoaded) return

      try {
        setLoading(true)
        const result = await signIn.attemptFirstFactor({
          strategy: 'reset_password_email_code',
          code: (values as any).otp ?? '',
          password: ((values as unknown) as ForgotPasswordProps).password ?? '',
        })

        if (result.status === 'complete') {
          setLoading(false)
          toast({
            title: 'Success',
            description: 'Your password has been reset successfully.',
          })
          router.push('/auth/login')
        } else {
          throw new Error('Password reset failed')
        }
      } catch (error: any) {
        setLoading(false)
        toast({
          title: 'Error',
          description: error.message || 'Something went wrong!',
        })
      }
    }
  )

  return {
    methods,
    onHandleSubmit,
    onGenerateResetToken,
    loading,
  }
}

interface ForgotPasswordProps {
  // ... other properties ...
  password: string;
}