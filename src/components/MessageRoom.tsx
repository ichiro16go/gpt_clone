import React,{ FC } from 'react'
import { MyMessage } from './myMessage.tsx'
import { OtherMessage } from './aiMessage.tsx'
import { Log } from '../data/types'

type Props = {
  logs: Log[]
}

export const Messages: FC<Props> = ({ logs }) => {
    return (
      <div  className="flex flex-col gap-4">
        {logs.map((log, i) => {
          if (log.name) {
            return <OtherMessage key={i} {...log} />
          } else {
            return <MyMessage key={i} {...log} />
          }
        })}
      </div>
    )
  }
