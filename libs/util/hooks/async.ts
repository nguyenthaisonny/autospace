import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay = 1000) => {
  const [debounceValue, setDebounceValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [delay, value])
  return debounceValue
}
