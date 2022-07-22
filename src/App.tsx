import { useEffect, useState } from "react"
import "./App.css"
import { Canvas } from "./Canvas"
import { Board } from "./components/Board/Board"
import { Hand } from "./components/Hand/Hand"
import { ImageBackground } from "./components/ImageBackground/ImageBackground"
import { Opponent } from "./components/Opponent/Opponent"
import { computeSquarePosition } from "./layout/computeSquaresPosition"
import { useComputeDimensions } from "./layout/useComputeDimensions"
import { addPlayerMinionToBoard, addToPlayerHand, setPlayerSquarePosition } from "./redux/gameSlice"
import { useAppDispatch, useAppSelector } from "./redux/store"
import { MINIONS } from "./types/minion"

function App() {
  const [swiperEnabled, setSwiperEnabled] = useState(true)
  const dispatch = useAppDispatch()
  const dim = useComputeDimensions()
  useEffect(() => {
    const size = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
    dispatch(setPlayerSquarePosition(computeSquarePosition(size)))
  }, [])

  const game = useAppSelector((state) => state.game)

  return (
    // <DndProvider backend={TouchBackend}>
    <>
      <ImageBackground />
      <button
        style={{
          position: "fixed",
          right: 0,
          top: "50%",
          zIndex: 1000

        }}
        onClick={() => {
          const number = Math.floor(Math.random() * 4)
          console.log(number)
          dispatch(addToPlayerHand([MINIONS[number]]))
          console.log(game.playerHand)
        }}
      >
        Add Card
      </button>
      {/* <button
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 1000
        }}
        
      >
        Add Card to Board
      </button> */}
      <Opponent />
      <h3 style={{ color: "white" }}>
        {document.documentElement.clientWidth} /{" "}
        {document.documentElement.clientHeight}
      </h3>
      <Board {...game} />
      <Hand
        {...game}
        swiperEnabled={swiperEnabled}
        setSwiperEnabled={setSwiperEnabled}
      />
      {/* <Canvas /> */}
    </>
    // </DndProvider>
  )
}

export default App
