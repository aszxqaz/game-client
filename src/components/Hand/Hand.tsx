import "./Hand.less"
import { MINIONS } from "../../types/minion"
import { MinionCard } from "../MinionCard/MinionCard"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { GameState } from "../../redux/gameSlice"
import { AnimatePresence } from "framer-motion"

type SwiperControls = {
  swiperEnabled: boolean
  setSwiperEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

type HandProps = SwiperControls & Pick<GameState, "playerHand">

export const Hand = ({
  swiperEnabled,
  setSwiperEnabled,
  playerHand,
}: HandProps) => {
  return (
    <div className="hand">
      <Swiper
        breakpoints={{}}
        slidesPerView={3.2}
        spaceBetween={0}
        enabled={swiperEnabled}
      >
        {playerHand.map((minion, i) => (
          <SwiperSlide key={`${minion}${i}`}>
            <AnimatePresence>
              <MinionCard minion={minion} setSwiperEnabled={setSwiperEnabled} />
            </AnimatePresence>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
