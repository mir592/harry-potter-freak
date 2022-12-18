export default {
  setQuestionsPassed ({ commit }, questionsPassed) {
    commit('setQuestionsPassed', questionsPassed)
  },
  setCharacterSelected ({ commit }, characterSelected) {
    commit('setCharacterSelected', characterSelected)
  },
  resetUserData ({ commit }) {
    commit('setQuestionsPassed', -1)
    commit('setCharacterSelected', null)
  }
}
