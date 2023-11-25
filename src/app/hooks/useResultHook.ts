import { useState } from "react"

export function useResultHook(): [boolean, () => void, () => void] {
    const [resultStatus,setResultStatus] = useState(false)

  const handleOpenResult = () => {
    setResultStatus(true)
  }

  const handleCloseResult = () => {
    setResultStatus(false)
  }

  return [resultStatus,handleOpenResult,handleCloseResult]
}