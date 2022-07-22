import { MutableRefObject, useCallback, useMemo, useRef } from "react"
import { GameState } from "../../redux/gameSlice"
import { SelectedSquare } from "../../redux/isIntersecting"
import { useAppSelector } from "../../redux/store"
import { Line, Minion } from "../../types/minion"
import { Square } from "../Square/Square"
import "./Board.less"

type BoardProps = Pick<GameState, "playerBoard" | "opponentBoard">

export const Board = ({ playerBoard, opponentBoard }: BoardProps) => {
  const { selectedMinion, selectedSquare } = useAppSelector(
    (state) => state.game
  )
  
  const getSquareState = (line: Line) => {
    if (!selectedMinion) return "default"
    return selectedMinion?.line === line ? "allowed" : "forbidden"
  }

  const getSquareHover = (square: SelectedSquare | null, index: number, line: Line) => {
    return square?.index === index && square?.line === line ? "allowed" : "default"
  }

  return (
    <div className="board">
      <div className="board__grid">
        <div className="board__opponent">
          <div className="board__opponent-second-row row">
            {opponentBoard.backline.map((minion, i) => (
              <Square
                key={`ob-${i}`}
                minion={minion}
                index={i}
                line={"backline"}
                type="opponent"
                
              />
            ))}
          </div>
          <div className="board__opponent-first-row row">
            {opponentBoard.frontline.map((minion, i) => (
              <Square
                key={`of-${i}`}
                minion={minion}
                index={i}
                line={"backline"}
                type="opponent"
              />
            ))}
          </div>
        </div>
        <div className="board__player">
          <div className="board__player-first-row row">
            {playerBoard.frontline.map((minion, i) => (
              <Square
                key={`pf-${i}`}
                minion={minion}
                state={getSquareHover(selectedSquare, i, "frontline")}

                index={i}
                line={"frontline"}
                type="player"
              />
            ))}
          </div>
          <div className="board__player-second-row row">
            {playerBoard.backline.map((minion, i) => (
              <Square
                key={`pb-${i}`}
                minion={minion}
                state={getSquareHover(selectedSquare, i, "backline")}
                index={i}
                line={"backline"}
                type="player"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
