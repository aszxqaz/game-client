import { ReactNode } from "react"
import styled, { css, ThemedStyledFunction } from "styled-components"

export type FrameProps = {
  background: string[]
  width: number[]
  clipPath: string[] | string
  borderRadius?: string | number | (string | number)[]
}

type LayerProps = {
  background: string
  width: number | string
  clipPath?: string
  borderRadius?: string | number
  children?: ReactNode
}

export const Frame = ({background,clipPath,width,borderRadius}: FrameProps) => {
  let Frame: ReactNode
  background.forEach(bg => {
    
  })
}

const UnstyledLayer = (props: LayerProps) => <div>{props.children}</div>

const Layer = styled(UnstyledLayer)`
  display: grid;
  place-items: center;
  width: calc(100% - ${props => props.width});
  height: calc(100% - ${props => props.width});
  ${props => props.clipPath && css`
    clip-path: ${props.clipPath};
  `}
  background: ${props => props.background};
  ${props => props.borderRadius && css`
  border-radius: ${props.borderRadius};
`}
`

