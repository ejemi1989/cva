'use client';

import { useState } from 'react'
import { useForm } from 'react-hook-form'

// Change this from a named export to a default export
const ForgotPasswordForm = () => {
  const methods = useForm()
  const [loading, setLoading] = useState(false)

  const onHandleSubmit = async (data: any) => {
    setLoading(true)
    // TODO: Implement your forgot password logic here
    console.log('Password reset requested for:', data.email)
    setLoading(false)
  }

  return { methods, onHandleSubmit, loading }
}

export default ForgotPasswordForm;