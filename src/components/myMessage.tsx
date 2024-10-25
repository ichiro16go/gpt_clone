import React,{ FC } from 'react'
import { formatTime } from '../utils/utils.tsx'

type Props = {
  message: string
  at: Date
}

export const MyMessage: FC<Props> = ({ message, at }) => {
  return (
    <div className="flex gap-2 justify-end">
      <div>
        <div className="flex items-end gap-2">
          <div>{formatTime(at)}</div>
          <div className="mt-2 p-4 bg-[#5fcb76] rounded-2xl max-w-[400px] drop-shadow-md">
            {message}
          </div>
        </div>
      </div>
    </div>
  )
}