export const validateDomain = (value: string) => {
  const domainPattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/

  if (value && !domainPattern.test(value)) {
    return false
  }

  return true
}
