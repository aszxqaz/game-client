import { motion } from "framer-motion"
import styled from 'styled-components'

type ManaCircleProps = {
  display: 'none' | 'block'
  cost: number
}

export const ManaCircle = ({display, cost}: ManaCircleProps) => {
  return (
    <motion.div style={{ display }} className="circle">
    <div className="circle__wrapper-first">
      <div className="circle__wrapper-second">
        <div className="circle__wrapper-third">
          <div className="circle__number">
            <span data-text={`${cost.toString()}`}>{cost}</span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
  )
}

const Wrapper = styled.div`
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;
  border-radius: 50%;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, .5);
`


const FirstLayer = styled.div`
  position: relative;
  background: linear-gradient(to bottom right, hsl(293, 8%, 30%), hsl(293, 8%, 60%));
  width: 39px;
  height: 39px;
  border-radius: 50%;
  display: grid;
  place-items: center;
`

const SecondLayer = styled.div`
  position: relative;
  background: linear-gradient(to bottom right, rgb(240, 247, 240), rgb(255, 255, 255));
  width: 37px;
  height: 37px;
  border-radius: 50%;
  display: grid;
  place-items: center;
`

const ThirdLayer = styled.div`
  position: relative;
  background: linear-gradient(to bottom right, rgb(158, 142, 116), rgb(250, 245, 240));
  width: 33px;
  height: 33px;
  border-radius: 50%;
  display: grid;
  place-items: center;
`