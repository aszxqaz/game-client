import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BoardHalf, MinionOrNull, Position, BoundingRect, SquarePositionObject, LineType, CellLineIndex } from "../types"
import { Line, Minion } from "../types/minion"
import { isIntersecting, SelectedSquare } from "./isIntersecting"

export interface GameState {
  playerDeck: Minion[]
  playerHand: Minion[]
  playerBoard: BoardHalf
  opponentBoard: BoardHalf
  opponentHandCount: number | null
  selectedMinion: MinionOrNull
  selectedPosition: Position | null
  selectedSquare: SelectedSquare | null
  boundingRects: BoundingRect
  playerSquarePosition: SquarePositionObject
}

const initialGameState: GameState = {
  playerDeck: [],
  playerHand: [],
  playerBoard: {
    backline: [null, null, null],
    frontline: [null, null, null, null],
  },
  opponentBoard: {
    backline: [null, null, null],
    frontline: [null, null, null, null],
  },
  opponentHandCount: null,
  selectedMinion: null,
  selectedPosition: null,
  boundingRects: {
    opponent: {
      backline: [null, null, null],
      frontline: [null, null, null, null],
    },
    player: {
      backline: [null, null, null],
      frontline: [null, null, null, null],
    },
  },
  playerSquarePosition: {
    backline: [null, null, null],
    frontline: [null, null, null, null],
  },
  selectedSquare: null,
}

type addPlayerMinionToBoardPayload = {
  minionId: Minion['id']
  cell: CellLineIndex
}

type setBoundingRectPayload = {
  type: "opponent" | "player"
  line: Line
  index: number
  boundingRect: Position
}

export const gameSlice = createSlice({
  name: "game",
  initialState: initialGameState,
  reducers: {
    addToPlayerHand: (state, action: PayloadAction<Minion[]>) => {
      state.playerHand = [...state.playerHand, ...action.payload]
    },
    addPlayerMinionToBoard: (
      state,
      action: PayloadAction<addPlayerMinionToBoardPayload>
    ) => {
      const {cell,minionId} = action.payload
      const index = state.playerHand.findIndex(minion => minion.id === minionId)
      if (index === -1) return
      state.playerBoard[cell.line][cell.index] = state.playerHand[index]
      state.playerHand.splice(index, 1)
    },
    selectMinion: (state, action: PayloadAction<MinionOrNull>) => {
      state.selectedMinion = action.payload
    },
    setSelectedPosition: (state, action: PayloadAction<Position | null>) => {
      state.selectedPosition = action.payload
    },
    setSelectedSquare: (state,action: PayloadAction<SelectedSquare | null>) => {
      state.selectedSquare = action.payload
    },
    setBoundingRect: (state, action: PayloadAction<setBoundingRectPayload>) => {
      const { boundingRect, index, line, type } = action.payload
      state.boundingRects[type][line][index] = boundingRect
    },
    setPlayerSquarePosition: (state, action: PayloadAction<SquarePositionObject>) => {
      state.playerSquarePosition = action.payload
    }
  },
})

export const {
  addPlayerMinionToBoard,
  addToPlayerHand,
  selectMinion,
  setBoundingRect,
  setSelectedPosition,
  setPlayerSquarePosition,
  setSelectedSquare
} = gameSlice.actions

const gameReducer = gameSlice.reducer
export default gameReducer
