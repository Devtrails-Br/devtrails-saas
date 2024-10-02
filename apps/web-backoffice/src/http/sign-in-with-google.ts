import { api } from './api-client'

export interface SignInWithGoogleRequest {
  code: string
}
export interface SignInWithGoogleResponse {
  token: string
}

export async function signInWithGoogle({ code }: SignInWithGoogleRequest) {
  const result = await api
    .post('sessions/google', {
      json: {
        code,
      },
    })
    .json<SignInWithGoogleResponse>()

  return result
}
