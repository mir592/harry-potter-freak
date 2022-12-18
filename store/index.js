import user from './user'
import character from './character'

const initialState = {
  user: user.state(),
  character: character.state()
}

export const mutations = {
  resetState (state) {
    Object.keys(state).forEach(key => Object.assign(state[key], initialState[key]))
  }
}
