import { InterceptedSheetContent } from '@/components/refactor/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/refactor/ui/sheet'
import { OrganizationForm } from '@/forms/organization/organization-form'

export default function CreateOrganization() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Criar organização</SheetTitle>
        </SheetHeader>

        <div className="py-4">
          <OrganizationForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
