'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import githubIcon from '@/assets/icons/github.svg'
import googleIcon from '@/assets/icons/google.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { signInWithGithub, signInWithGoogle } from '../actions'
import { signInWithEmailAndPassword } from './actions'

export function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    signInWithEmailAndPassword,
    () => {
      router.push('/')
    },
  )

  return (
    <div className="flex h-full w-full flex-col space-y-4 py-4 pl-12 pr-4">
      <div className="flex w-full items-center justify-end text-sm">
        <p>Ainda não possui uma conta?</p>
        <Button className="w-fit" variant="link" size="sm" asChild>
          <Link href="/auth/sign-up">Criar conta</Link>
        </Button>
      </div>

      <div className="flex flex-1 items-center">
        <div className="h-fit w-full">
          <div className="flex flex-col items-center gap-3 space-y-4">
            <h2 className="block text-2xl font-normal text-foreground">
              Entrar na{' '}
              <span className="bg-gradient-to-br from-purple-800 to-purple-200 bg-clip-text text-transparent">
                Devtrails
              </span>
            </h2>
            <p className="text-center font-light">
              Bem vindo a Devtrails, realize o seu login para acessar o seu
              espaço.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-4">
            {success === false && message && (
              <Alert variant="destructive">
                <AlertTriangle className="size-4" />
                <AlertTitle>Sign in failed!</AlertTitle>
                <AlertDescription>
                  <p>{message}</p>
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-1">
              <Label htmlFor="email">E-mail</Label>
              <Input
                name="email"
                type="email"
                id="email"
                defaultValue={searchParams.get('email') ?? ''}
              />

              {errors?.email && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.email[0]}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Senha</Label>
              <Input name="password" type="password" id="password" />

              {errors?.password && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.password[0]}
                </p>
              )}

              <Link
                href="/refactor/forgot-password"
                className="text-xs font-medium text-foreground hover:underline"
              >
                Esqueceu sua senha?
              </Link>
            </div>

            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
          <div className="mt-4 flex w-full items-center gap-10 py-4">
            <div className="h-px flex-1 bg-border" />
            <span className="font-light text-muted-foreground">OU</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <form action={signInWithGithub} className="mt-4 space-y-4">
            <Button type="submit" className="w-full" variant="outline">
              <Image
                src={githubIcon}
                alt=""
                className="mr-2 size-4 dark:invert"
              />
              Entrar com GitHub
            </Button>
          </form>
          <form action={signInWithGoogle} className="mt-4 space-y-4">
            <Button type="submit" className="w-full" variant="outline">
              <Image
                src={googleIcon}
                alt=""
                className="mr-2 size-4 dark:invert"
              />
              Entrar com Google
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
