const KEYS = {
  ALLDATAS: 'asr456788'
}

export const state = () => ({
  allDatas: []
})

export const getters = {
  getAllDatas: state => {
    return state.allDatas
  }
}

export const mutations = {
  setAllDatas: (state, payload) => {
    state.allDatas = payload
    localStorage
  }
}

export const actions = {
  fetchLocalStorage: ({commit}) => {
    if(process.browser) {
      commit('setAllDatas', localStorage.getItem(KEYS.ALLDATAS) || [])
    }
  }
}