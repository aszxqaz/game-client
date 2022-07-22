// 320px = 3.2
// ? = ?

export const getSwiperSlidesPerView = (screenWidth: number, paddingLeft: number, cardWidth: number, swiperRightOffset: number) => {
  const availableSpace = screenWidth - paddingLeft
  const notRound = availableSpace / cardWidth
  const whole = Math.floor(notRound)
  if (whole / notRound > swiperRightOffset) {
    return whole + swiperRightOffset
  }
  return whole - 1 + swiperRightOffset
}