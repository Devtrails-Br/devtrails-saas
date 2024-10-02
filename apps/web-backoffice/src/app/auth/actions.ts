'use server'

import { env } from '@devtrails-saas/env'
import { redirect } from 'next/navigation'

export async function signInWithGithub() {
  const githubSignInUrl = new URL('login/oauth/authorize', 'https://github.com')

  githubSignInUrl.searchParams.append('client_id', env.GITHUB_OAUTH_CLIENT_ID)
  githubSignInUrl.searchParams.append(
    'redirect_uri',
    env.GITHUB_OAUTH_REDIRECT_URI,
  )
  githubSignInUrl.searchParams.append('scope', 'user')

  redirect(githubSignInUrl.toString())
}

export async function signInWithGoogle() {
  const googleSignInUrl = new URL(
    'o/oauth2/v2/auth',
    'https://accounts.google.com/',
  )

  googleSignInUrl.searchParams.append(
    'redirect_uri',
    env.GOOGLE_OAUTH_REDIRECT_URI,
  )
  googleSignInUrl.searchParams.append('client_id', env.GOOGLE_OAUTH_CLIENT_ID)
  googleSignInUrl.searchParams.append('access_type', 'offline')
  googleSignInUrl.searchParams.append('response_type', 'code')
  googleSignInUrl.searchParams.append('prompt', 'consent')

  const scope = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ].join(' ')

  googleSignInUrl.searchParams.append('scope', scope)

  redirect(googleSignInUrl.toString())
}
