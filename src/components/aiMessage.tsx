import React,{ FC } from 'react'
import { formatTime } from '../utils/utils.tsx'

type Props = {
  imagePath: string
  name: string
  message: string
  at: Date
}

export const OtherMessage: FC<Props> = ({ imagePath, name, message, at }) => {
  return (
    <div className="flex gap-2 justify-start">
    <img src={imagePath} className="rounded-full w-12 h-12" />
    <div>
      <div className="font-bold">{name}</div>
      <div className="flex items-end gap-2">
        <div className="mt-2 p-4 bg-white rounded-2xl max-[400px] drop-shadow-md">
          {message}
        </div>
        <div>{formatTime(at)}</div>
      </div>
    </div>
  </div>
  )
}