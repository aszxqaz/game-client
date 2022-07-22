const CARD_DESCRIPTION_OFFSET = 0.1
const CARD_DESCRIPTION_WIDTH_SCREEN_PERCENT = 0.29
const CARD_DESCRIPTION_HEIGHT_SCREEN_PERCENT = 0.16
const CARD_WIDTH_SCREEN_PERCENT = 0.29
const CARD_CIRCLE_SCREEN_PERCENT = 0.1
const HAND_PADDING_SCREEN_PERCENT = 0.025

const BOARD_SQUARE_WIDTH_SCREEN_PERCENT = 0.2
const BOARD_SQUARE_GAP_SCREEN_PERCENT = 0.02
const BOARD_SQUARE_RATIO = 0.862

export type Size = {
  width: number,
  height: number
}

// 2.5 + 2.5 + 

export type DimensionsComputed = {
  boardSquare: {
    width: number
    height: number
  }
  card: {
    width: number
    height: number
    description: {
      width: number
      height: number
    }
    circle: {
      width: number
    }
  }
}

export const computeDimensions = (screenWidth: number): DimensionsComputed => {
  const description = {
    width: screenWidth * CARD_DESCRIPTION_WIDTH_SCREEN_PERCENT,
    height: screenWidth * CARD_DESCRIPTION_HEIGHT_SCREEN_PERCENT,
  }

  return {
    boardSquare: {
      width: screenWidth * BOARD_SQUARE_WIDTH_SCREEN_PERCENT,
      height:
        (screenWidth * BOARD_SQUARE_WIDTH_SCREEN_PERCENT) / BOARD_SQUARE_RATIO,
    },
    card: {
      width: screenWidth * CARD_WIDTH_SCREEN_PERCENT,
      height:
        screenWidth *
          CARD_WIDTH_SCREEN_PERCENT *
          (1 - CARD_DESCRIPTION_OFFSET) +
        description.height,
      description,
      circle: {
        width: screenWidth * CARD_CIRCLE_SCREEN_PERCENT
      }
    },
  }
}
