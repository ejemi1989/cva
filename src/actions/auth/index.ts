'use server'

import { client } from '@/lib/prisma'
import { currentUser, redirectToSignIn } from '@clerk/nextjs'
import { onGetAllAccountDomains } from '../settings'
import { clerkClient } from '@clerk/nextjs/server';

export const onCompleteUserRegistration = async (
  fullname: string,
  clerkId: string,
  type: string
) => {
  try {
    const registered = await client.user.create({
      data: {
        fullname,
        clerkId,
        type,
        subscription: {
          create: {},
        },
      },
      select: {
        fullname: true,
        id: true,
        type: true,
      },
    })

    if (registered) {
      return { status: 200, user: registered }
    }
  } catch (error) {
    return { status: 400 }
  }
}

export const onLoginUser = async () => {
  const user = await currentUser()
  if (!user) redirectToSignIn()
  else {
    try {
      const authenticated = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          fullname: true,
          id: true,
          type: true,
        },
      })
      if (authenticated) {
        const domains = await onGetAllAccountDomains()
        return { status: 200, user: authenticated, domain: domains?.domains }
      }
    } catch (error) {
      return { status: 400 }
    }
  }
}

export const onForgotPassword = async (email: string) => {
  try {
    await clerkClient.emails.createEmail({
      fromEmailName: 'noreply',
      emailAddressId: email,
      subject: 'Reset your password',
      body: 'Click here to reset your password: {{password_reset_url}}',
    });
    return { status: 200, message: 'Password reset email sent' };
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    return { status: 400, message: 'Failed to send password reset email' };
  }
}

export const onResetPassword = async (token: string, newPassword: string) => {
  try {
    await clerkClient.users.updateUser(token, {
      password: newPassword,
    });
    return { status: 200, message: 'Password reset successful' };
  } catch (error) {
    console.error('Failed to reset password:', error);
    return { status: 400, message: 'Failed to reset password' };
  }
}
