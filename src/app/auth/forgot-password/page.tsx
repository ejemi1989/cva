'use client'
import React, { useState } from 'react'
import { useAuth, useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Button,} from '@/components/ui/button'
import { Input} from '@/components/ui/input'
import {Card} from '@/components/ui/card'


const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [successfulCreation, setSuccessfulCreation] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { isLoaded, signIn, setActive } = useSignIn()

  if (!isLoaded || isSignedIn) {
    router.push('/')
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!successfulCreation) {
      await createResetRequest()
    } else {
      await resetPassword()
    }
  }

  async function createResetRequest() {
    try {
      await signIn?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      setSuccessfulCreation(true)
      setError('')
    } catch (err: any) {
      setError(err.errors[0].longMessage)
    }
  }

  async function resetPassword() {
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });
      
      if (result?.status === 'complete' && result.createdSessionId) {
        await setActive?.({ session: result.createdSessionId });
        router.push('/');
      } else {
        setError('Password reset failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.errors ? err.errors[0]?.longMessage : 'An error occurred.');
    }
  }

  return (
    <div className="flex-1 py-36 md:px-16 min-h-screen w-full ">
      <div className="flex flex-col h-full gap-3">
        <h2 className="mb-6 text-center text-2xl font-bold">
          {!successfulCreation ? 'Forgot Password' : 'Reset Password'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!successfulCreation ? (
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
          ) : (
            <>
              <Input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="Reset code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </>
          )}
          <Button type="submit" className="w-full">
            {!successfulCreation ? 'Send Reset Code' : 'Reset Password'}
          </Button>
        </form>
        {error && (
          <p className="mt-4 text-red-500 text-center">
            {error}
          </p>
        )}
   </div>
    </div>
  )
}

export default ForgotPasswordPage