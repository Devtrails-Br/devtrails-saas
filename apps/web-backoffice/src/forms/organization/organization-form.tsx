'use client'

import { Separator } from '@root/src/components/refactor/ui/separator'
import { validateDomain } from '@root/src/utils/validators/validate-domain'
import { AlertTriangle, Building, Loader2, ThumbsUp } from 'lucide-react'
import { useState } from 'react'

import {
  createOrganizationAction,
  type OrganizationSchema,
  updateOrganizationAction,
} from '@/actions/organizations'
import * as InputFile from '@/components/refactor/form/input-file'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/refactor/ui/alert'
import { Button } from '@/components/refactor/ui/button'
import { Checkbox } from '@/components/refactor/ui/checkbox'
import { Input } from '@/components/refactor/ui/input'
import { Label } from '@/components/refactor/ui/label'
import { useFormState } from '@/hooks/use-form-state'

interface OrganizationFormProps {
  isUpdating?: boolean
  initialData?: OrganizationSchema
}

export function OrganizationForm({
  isUpdating = false,
  initialData,
}: OrganizationFormProps) {
  const [errorMessage, setErrorMessage] = useState('')

  const formAction = isUpdating
    ? updateOrganizationAction
    : createOrganizationAction

  const [{ errors, message, success }, handleSubmit, isPending] =
    useFormState(formAction)

  const handleValidateDomain = (value: string) => {
    const isValidDomain = validateDomain(value)

    if (isValidDomain) {
      setErrorMessage('')
    } else {
      setErrorMessage('Por favor entre com um domínio válido.')
    }
  }

  return (
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

      {success === true && message && (
        <Alert variant="success">
          <ThumbsUp className="size-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <Separator />
      {/* <Label htmlFor="logo">Logo da organização</Label> */}
      <InputFile.Root className="flex w-full items-center justify-center gap-4">
        <InputFile.ImagePreview size="base" icon={Building} />
        <InputFile.Trigger />
        <InputFile.Control name="logo" defaultValue={initialData?.logoUrl} />
      </InputFile.Root>

      <Separator />

      <div className="space-y-1">
        <Label htmlFor="name">Nome da organização</Label>
        <Input id="name" name="name" defaultValue={initialData?.name} />

        {errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="domain">Domínio de E-mail</Label>
        <Input
          id="domain"
          name="domain"
          inputMode="text"
          type="text"
          placeholder="exemplo.com"
          defaultValue={initialData?.domain ?? undefined}
          onBlur={(e) => handleValidateDomain(e.target.value)}
        />

        {(errorMessage || errors?.domain) && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errorMessage || errors?.domain[0]}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <div className="flex items-baseline space-x-2">
          <Checkbox
            name="shouldAttachUsersByDomain"
            id="shouldAttachUsersByDomain"
            className="translate-y-0.5"
            defaultChecked={initialData?.shouldAttachUsersByDomain}
          />
          <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
            <span className="text-sm font-medium leading-none">
              Auto-adesão de novos membros
            </span>
            <p className="text-sm text-muted-foreground">
              Quando um novo usuário criar uma conta com um email que possui o
              domínio de e-mail acima, ele automaticamente será convidado para
              ser um membro desta organização.
            </p>
          </label>
        </div>

        {errors?.shouldAttachUsersByDomain && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.shouldAttachUsersByDomain[0]}
          </p>
        )}
      </div>

      <div>
        <Button type="submit" className="mt-8 w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Salvar organização'
          )}
        </Button>
      </div>
    </form>
  )
}
