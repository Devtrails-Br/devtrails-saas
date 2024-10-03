import { api } from './api-client'

export interface UploadLogoOrganizationRequest {
  file: File
}

type UploadLogoOrganizationResponse = {
  logoUrl: string
}

export async function uploadLogoOrganization({
  file,
}: UploadLogoOrganizationRequest): Promise<UploadLogoOrganizationResponse> {
  const formData = new FormData()

  formData.append('file', file)

  const uploaded = await api
    .post('organizations/upload-logo', {
      body: formData,
    })
    .json<UploadLogoOrganizationResponse>()

  return { logoUrl: uploaded?.logoUrl }
}
