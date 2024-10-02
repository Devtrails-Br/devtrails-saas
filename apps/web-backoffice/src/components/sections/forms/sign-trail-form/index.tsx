'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import type { ComponentProps } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { FormContainer } from '../form-container'
import { signTrailAction } from './actions'

interface SignTrailFormProps extends ComponentProps<'div'> {}

export function SignTrailForm({ className }: SignTrailFormProps) {
  const [{ errors, message, success }, handleSubmit, isPending] =
    useFormState(signTrailAction)

  return (
    <FormContainer className={className}>
      <div className="space-y-4">
        <div className="flex flex-col items-center gap-3">
          <h2 className="block text-2xl font-bold text-foreground">
            Start your free trial
          </h2>
          <p className="mt-2 text-sm text-foreground-light">
            Already have an account?{' '}
            <a
              className="font-medium text-blue-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-blue-500"
              href="../examples/html/signup.html"
            >
              Sign in here
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label htmlFor="name">Name</Label>
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
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" name="password" />

            {errors?.password && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.password[0]}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password_confirmation">Confirm your password</Label>
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

          <div className="pt-10">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                'Get started'
              )}
            </Button>
          </div>
        </form>
      </div>
    </FormContainer>
  )
}
