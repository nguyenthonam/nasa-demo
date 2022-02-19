const KEYS = {
  ALLDATAS: "asr456788",
  LIKEDS: "lid77993",
  REMOVEDS: "ooie77993",
};

export const state = () => ({
  allDatas: [],
  likedList: [],
  removedList: [],
});

export const getters = {
  getAllDatas: (state) => {
    return state.allDatas;
  },
  getLikedList: (state) => {
    return state.likedList;
  },
  getRemovedList: (state) => {
    return state.removedList;
  },
};

export const mutations = {
  setAllDatas: (state, payload) => {
    state.allDatas = payload;
    if (process.browser)
      localStorage.setItem(KEYS.ALLDATAS, JSON.stringify(payload));
  },
  setLikedList: (state, payload) => {
    state.likedList = payload;
    if (process.browser)
      localStorage.setItem(KEYS.LIKEDS, JSON.stringify(payload));
  },
  setItemToLikedList: (state, item) => {
    if (process.browser) {
      let matchItem = state.likedList.find(
        (i) => i.data[0].nasa_id == item.data[0].nasa_id
      );
      if (!matchItem) {
        item.liked = true;
        state.likedList.push(item);
      }
      localStorage.setItem(KEYS.LIKEDS, JSON.stringify(state.likedList));
    }
  },
  removeItemInLikedList: (state, item) => {
    if (process.browser) {
      item.liked = false
      state.likedList = state.likedList.filter(
        (i) => i.data[0].nasa_id != item.data[0].nasa_id
      );
      localStorage.setItem(KEYS.LIKEDS, JSON.stringify(state.likedList));
    }
  },
  setItemToRemovedList: (state, item) => {
    if (process.browser) {
      let matchItem = state.removedList.find(
        (i) => i.data[0].nasa_id == item.data[0].nasa_id
      );
      if (!matchItem) {
        item.removed = true;
        state.removedList.push(item);
      }
      localStorage.setItem(KEYS.REMOVEDS, JSON.stringify(state.removedList));
    }
  },
  removeItemInRemovedList: (state, item) => {
    if (process.browser) {
      item.removed = true;
      state.removedList = state.removedList.filter(
        (i) => i.data[0].nasa_id != item.data[0].nasa_id
      );
      localStorage.setItem(KEYS.REMOVEDS, JSON.stringify(state.removedList));
    }
  },
};

export const actions = {
  fetchLocalStorage: ({ commit }) => {
    if (process.browser) {
      commit(
        "setAllDatas",
        JSON.parse(localStorage.getItem(KEYS.ALLDATAS)) || []
      );
      commit(
        "setLikedList",
        JSON.parse(localStorage.getItem(KEYS.LIKEDS)) || []
      );
    }
  },
  async search({ commit }, query) {
    try {
      if (!query) return;
      const resData = await this.$axios.$get(
        `https://images-api.nasa.gov/search?${query}`
      );
      commit("setAllDatas", resData);
      return resData;
    } catch (err) {
      console.log("ERR_API_SEARCH:", err.message);
    }
  },
};
