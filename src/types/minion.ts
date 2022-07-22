export type Stats = {
  attack?: number
  health: number
}

export type Line = 'frontline' | 'backline'

export type Minion = {
  name: string
  image: string
  cost: number
  stats: Stats
  line: Line
  id: string
}

const savageBarbarian: Minion = {
  id: '0',
  name: 'Savage Barbarian',
  image: '/savage_barbarian.jpg',
  cost: 7,
  stats: {
    attack: 6,
    health: 7
  },
  line: 'frontline'
}

const windyGiant: Minion = {
  id: '1',
  name: 'Windy Giant',
  image: '/windy_giant.jpg',
  cost: 7,
  stats: {
    attack: 8,
    health: 3
  },
  line: 'frontline'

}

const orcRingleader: Minion = {
  id: '2',
  name: 'Orc Ringleader',
  image: '/orc_ringleader.jpg',
  cost: 8,
  stats: {
    attack: 7,
    health: 8
  },
  line: 'frontline'

}

const silentRobber: Minion = {
  id: '3',
  name: 'Silent Robber',
  image: '/silent_robber.jpg',
  cost: 2,
  stats: {
    attack: 2,
    health: 3
  },
  line: 'backline'
}

export const MINIONS = [savageBarbarian, windyGiant, orcRingleader, silentRobber]