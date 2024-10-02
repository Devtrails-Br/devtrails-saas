import { ImageCell } from './image-cell'

export function BackgroundImageGrid() {
  return (
    <div className="m-4 grid h-[calc(100%-32px)] max-w-full grid-cols-4 gap-4 overflow-hidden rounded-2xl">
      <div className="flex max-w-96 flex-col gap-4 overflow-hidden">
        <ImageCell variant="odd" src="https://picsum.photos/id/203/600" />
        <ImageCell variant="odd" />
        <ImageCell variant="odd" src="https://picsum.photos/id/431/600" />
        <ImageCell variant="odd" src="https://picsum.photos/id/104/600" />
      </div>
      <div className="flex max-w-96 flex-col gap-4 overflow-hidden">
        <ImageCell variant="even" />
        <ImageCell variant="even" src="https://picsum.photos/id/867/600" />
        <ImageCell variant="even" src="https://picsum.photos/id/250/600" />
        <ImageCell variant="even" />
        <ImageCell variant="even" src="https://picsum.photos/id/827/600" />
      </div>
      <div className="flex max-w-96 flex-col gap-4 overflow-hidden">
        <ImageCell src="https://picsum.photos/id/249/600" />
        <ImageCell src="https://picsum.photos/id/442/600" />
        <ImageCell />
        <ImageCell src="https://picsum.photos/id/554/600" />
      </div>
      <div className="flex max-w-96 flex-col gap-4 overflow-hidden">
        <ImageCell variant="even" src="https://picsum.photos/id/123/600" />
        <ImageCell variant="even" />
        <ImageCell variant="even" src="https://picsum.photos/id/474/600" />
        <ImageCell variant="even" src="https://picsum.photos/id/289/600" />
        <ImageCell variant="even" src="https://picsum.photos/id/827/600" />
      </div>
    </div>
  )
}
