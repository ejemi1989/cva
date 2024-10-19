import { useToast } from '@/components/ui/use-toast'
import { ForgotPasswordSchema } from '@/schemas/auth.schema'
import { useSignIn } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const useForgotPassword = () => {
  const { isLoaded, signIn } = useSignIn()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const methods = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: 'onChange',
  })

  const onHandleSubmit = methods.handleSubmit(async (values) => {
    if (!isLoaded) return
    setLoading(true)
    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: values.email,
      })
      toast({
        title: 'Success',
        description: 'Password reset email sent. Please check your inbox.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send reset email. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  })

  return { methods, onHandleSubmit, loading }
}