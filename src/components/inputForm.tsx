import React,{ FC, useCallback, useState } from 'react'

type Props = {
  onSubmit: (text: string) => void
}

export const Input: FC<Props> = ({ onSubmit }) => {
  const [userInputText, setUserInputText] = useState('')
  const [isComposition, setIsComposition] = useState(false)

  const handleKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (ev.code === 'Enter' && !isComposition && userInputText.trim()) {
        ev.preventDefault()
        onSubmit(userInputText.trim())
        setUserInputText('')
      }
    },
    [isComposition, onSubmit, userInputText]
  )

  const handleChange = useCallback(
    (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
      setUserInputText(ev.target.value)
    },
    []
  )

  return (
    <textarea
      className="w-full p-2 max-w-[800px] rounded-lg h-24 resize-none border-0 outline-none drop-shadow-lg"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onCompositionStart={() => setIsComposition(true)}
      onCompositionEnd={() => setIsComposition(false)}
      value={userInputText}
    />
  )
}