import {
  AnimatePresence,
  motion,
  useDragControls,
  useMotionValue,
} from "framer-motion"
import { MutableRefObject, Ref, useEffect, useRef, useState } from "react"
import {
  addPlayerMinionToBoard,
  selectMinion,
  setSelectedPosition,
  setSelectedSquare,
} from "../../redux/gameSlice"
import { isIntersecting, Point } from "../../redux/isIntersecting"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { BOARD_MINION_CLIP_PATH, CARD_CLIP_PATH } from "../../styling/constants"
import { Minion } from "../../types/minion"
import { getShift } from "./getShiftedPos"
import { getTighten } from "./getTighten"
import "./style.less"

type MinionCardProps = {
  minion: Minion
} & {
  setSwiperEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

const MAXIMUM_DELTA_TIME = 100
const THRESHOLD_REQUIRED = 100

export const MinionCard = ({ minion, setSwiperEnabled }: MinionCardProps) => {
  const [xx, setX] = useState(0)
  const [y, setY] = useState(0)
  const [rotate, setRotate] = useState(0)
  let shift: Point = {
    x: 0,
    y: 0,
  }

  const { image, name, cost } = minion
  const { health, attack } = minion.stats
  const dragState = useRef({
    isDragging: false,
    isPointerDown: false,
    initialScreenY: -1,
    initialScreenX: 0,
  })
  const dragData = useRef({
    startSec: 0,
    prevDate: 0,
    totalDeltaTime: 0,
    totalDeltaScreenY: 0,
    prevScreenY: 0,
    screenYCur: 0,
    deltaY: 0,
  })
  const [dragElastic, setDragElastic] = useState({
    left: 0,
    right: 0,
    top: 1,
  })
  const isUp = useRef(false)

  const x = useMotionValue(0)
  const descriptionDisplay = useMotionValue("")
  const circleDisplay = useMotionValue("")

  const selfRef = useRef() as MutableRefObject<HTMLDivElement>
  const dispatch = useAppDispatch()
  const {
    selectedMinion,
    boundingRects,
    selectedSquare,
    playerSquarePosition,
  } = useAppSelector((state) => state.game)

  const firstLayerStyle = {
    clipPath: useMotionValue(
      "polygon(50% 0, 100% 33%, 83% 100%, 17% 100%, 0 33%)"
    ),
    width: useMotionValue("114px"),
    height: useMotionValue("114px"),
  }

  return (
      <motion.div
        key={"fsdfsdf"}
        ref={selfRef}
        drag
        dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
        dragElastic={dragElastic}
        dragMomentum={false}
        onDragStart={(event, info) => {
          console.log()
          setSwiperEnabled(false)
          dragState.current.initialScreenY = info.point.y
          dragState.current.initialScreenX = info.point.x

          shift = getShift(
            info.point,
            {
              width: 120,
              height: 170,
            },
            {
              left: 10,
            }
          )
        }}
        onDragEnd={(event, info) => {
          dragState.current.isDragging = false
          x.set(0)
          setSwiperEnabled(false)
          setRotate(0)
          descriptionDisplay.set("block")
          circleDisplay.set("block")
          firstLayerStyle.clipPath.set(CARD_CLIP_PATH)
          firstLayerStyle.width.set("114px")
          firstLayerStyle.height.set("114px")
          isUp.current = false
          if (selectedSquare && selectedMinion) {
            dispatch(
              addPlayerMinionToBoard({
                minionId: selectedMinion.id,
                cell: selectedSquare,
              })
            )
          }
          dispatch(setSelectedSquare(null))
          dispatch(selectMinion(null))
          dispatch(setSelectedPosition(null))
        }}
        onDrag={(event, info) => {
          if (dragState.current.initialScreenY - info.point.y > 75) {
            x.set(info.point.x - dragState.current.initialScreenX)
            const { left, right, top, bottom } =
              selfRef.current.getBoundingClientRect()
            let point = { x: (left + right) / 2, y: top }
            console.log(point)
            point = {
              x: point.x + shift.x,
              y: point.y + shift.y,
            }
            const br = isIntersecting(point, playerSquarePosition)

            // console.log(playerSquarePosition)
            if (
              br?.index !== selectedSquare?.index ||
              br?.line !== selectedSquare?.line
            ) {
              dispatch(setSelectedSquare(br))
            }
            // dispatch(
            //   setSelectedPosition({
            //     top: rect.top,
            //     left: rect.left,
            //     bottom: rect.bottom,
            //     right: rect.right,
            //   })
            // )
          }
          if (
            dragState.current.initialScreenY - info.point.y > 75 &&
            !selectedMinion
          ) {
            isUp.current = true
            setRotate(720)
            descriptionDisplay.set("none")
            circleDisplay.set("none")
            firstLayerStyle.clipPath.set(BOARD_MINION_CLIP_PATH)
            firstLayerStyle.width.set("20vw")
            firstLayerStyle.height.set("23vw")
            dispatch(selectMinion(minion))
          }
          // console.log(selfRef.current.getBoundingClientRect())
        }}
        style={{ translateX: x }}
        animate={{ x: xx, y }}
        transition={{ type: "tween" }}
      >
        <div className="minion-card">
          <div className="card">
            <motion.div style={firstLayerStyle} className="card__first-layer">
              <div className="card__second-layer">
                <div className="card__third-layer">
                  <div
                    style={{ backgroundImage: `url(${image})` }}
                    className="card__img"
                  ></div>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div
            style={{ display: descriptionDisplay }}
            className="card__description description"
          >
            <div className="description__first-wrapper">
              <div className="description__second-wrapper">
                <div className="description__blue-bg">
                  <div className="description__light-bg">
                    <div className="description__title-first-wrapper">
                      <div className="description__title-second-wrapper">
                        <div className="description__title-text">{name}</div>
                      </div>
                    </div>
                    <div className="description__text-wrapper">
                      <div className="description__stats">
                        <div>
                          <span className="icon-sword"></span>
                          {attack}
                        </div>
                        <div>
                          <span className="icon-health"></span>
                          {health}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
  )
}
