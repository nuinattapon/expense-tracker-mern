import React from 'react'

interface Props {
  message: string
}

const TextMessage: React.FC<Props> = ({ message }) => {
  return <p>{message}</p>
}

export default TextMessage
