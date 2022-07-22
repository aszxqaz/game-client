import { useLayoutEffect, useState } from "react"
import { computeDimensions } from "./dimensions"

const compute = () => {
  return computeDimensions(document.documentElement.clientWidth)
}

export const useComputeDimensions = () => {
  const [dimensions, setDimensions] = useState(compute())

  useLayoutEffect(() => {
    window.addEventListener('resize', () => {
      setDimensions(compute())
    })
  }, [])

  return dimensions
}