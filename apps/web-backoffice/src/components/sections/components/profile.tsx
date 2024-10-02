interface ProfileProps {
  name: string
  position: string
  avatarUrl: string
}

export function Profile({ name, position, avatarUrl }: ProfileProps) {
  return (
    <div className="flex items-center gap-x-4">
      <div className="shrink-0">
        <img className="size-8 rounded-full" src={avatarUrl} alt="Avatar" />
      </div>
      <div className="grow">
        <div className="font-semibold text-gray-800 dark:text-neutral-200">
          {name}
        </div>
        <div className="text-xs text-gray-500 dark:text-neutral-500">
          {position}
        </div>
      </div>
    </div>
  )
}
