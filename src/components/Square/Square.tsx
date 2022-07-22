import { motion } from "framer-motion"
import { MutableRefObject, useEffect, useRef } from "react"
import { GameState, setBoundingRect } from "../../redux/gameSlice"
import { useAppDispatch } from "../../redux/store"
import { SQUARE_STYLING } from "../../styling/constants"
import { Line, Minion } from "../../types/minion"
import "./Square.less"

interface SquareProps {
  state?: "default" | "forbidden" | "allowed"
  minion?: Minion | null
  index: number
  line: Line
  type: "opponent" | "player"
}

export const Square = ({
  state = "default",
  minion,
  index,
  line,
  type,
}: SquareProps) => {
  const dispatch = useAppDispatch()
  const squareRef = useRef() as MutableRefObject<HTMLDivElement>
  useEffect(() => {
    const { left, right, top, bottom } =
      squareRef.current.getBoundingClientRect()
    const rect = { left, right, top, bottom }

    // dispatch(
    //   setBoundingRect({
    //     type,
    //     boundingRect: rect,
    //     line,
    //     index,
    //   })
    // )
  }, [])

  let backgroundColor = SQUARE_STYLING.background[state]

  return (
    <div
      ref={squareRef}
      className={`square ${state} ${minion && "square-minion"}`}
    >
      {minion ? (
        <div className="square__border">
          <div className="square__layer-1">
            <div className="square__layer-2" style={{ position: "relative" }}>
              <motion.div
                style={{
                  position: "absolute",
                  zIndex: 1,
                  width: "200%",
                  height: 0,
                  left: 0,
                  transform: "rotateZ(-45deg)",
                  boxShadow: "rgb(249 14 14 / 90%) 0px 0px 25px 5px",
                }}
                initial={{ top: "-50%" }}
                animate={{ top: "150%" }}
                transition={{ delay: 0.3, duration: 1.2, ease: "easeIn" }}
              ></motion.div>
              <motion.div
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                transition={{ type: "tween", duration: 0.3 }}
                className="square__minion-img"
                style={{
                  backgroundImage: `url("${minion.image}")`,
                }}
              ></motion.div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          // animate={{ backgroundColor }}
          transition={{
            duration: state === "forbidden" ? 0.1 : 0.3,
            ease: "easeInOut",
          }}
        >
          <div className="square__border">
            <div className="square__main-bg"></div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
