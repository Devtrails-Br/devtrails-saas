'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import githubIcon from '@/assets/icons/github.svg'
import googleIcon from '@/assets/icons/google.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { signInWithGithub, signInWithGoogle } from '../actions'
import { signUpAction } from './actions'

export function SignUpForm() {
  const router = useRouter()

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    signUpAction,
    () => {
      router.push('/auth/sign-in')
    },
  )

  return (
    <div className="flex h-full w-full flex-col space-y-4 py-4 pl-4 pr-12">
      <div className="flex w-full items-center text-sm">
        <p>Já possui uma conta?</p>
        <Button className="w-fit" variant="link" size="sm" asChild>
          <Link href="/auth/sign-in">Acessar conta</Link>
        </Button>
      </div>

      <div className="flex flex-1 items-center">
        <div className="h-fit w-full">
          <div className="flex flex-col items-center gap-3 space-y-4">
            <h2 className="block text-2xl font-normal text-foreground">
              Criar conta na{' '}
              <span className="bg-gradient-to-br from-purple-800 to-purple-200 bg-clip-text text-transparent">
                Devtrails
              </span>
            </h2>
            <p className="text-center font-light">
              Bem vindo a Devtrails, cadastre-se agora e comece a aproveitar as
              melhores ferramentas para seu negócio.
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
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" />

              {errors?.name && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.name[0]}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" />

              {errors?.email && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.email[0]}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" name="password" />

              {errors?.password && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.password[0]}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password_confirmation">Confirmar Senha</Label>
              <Input
                id="password_confirmation"
                type="password"
                name="password_confirmation"
              />

              {errors?.password_confirmation && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.password_confirmation[0]}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                'Criar conta'
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
              Entrar com Github
            </Button>
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
          </form>
        </div>
      </div>
    </div>
  )
}
