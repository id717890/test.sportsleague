import Vue from 'vue'
import Vuex from 'vuex'
import types from './types'
import ApiLibrary from '@/api/Library'
import libraries from '../../libshort.json'
import librariesAll from '../../libraries.json'

Vue.use(Vuex)

const PAGE_SIZE = 30

export default new Vuex.Store({
  state: {
    loading: false,
    allLibraries: null,
    fetchedLibraries: null,
    page: 1,
  },
  mutations: {
    [types.SET_LIBRARIES](state, payload) {
      state.allLibraries = payload
    },
    [types.SET_FETCHED_LIBRARIES](state, payload) {
      state.fetchedLibraries = payload
    },
    [types.SET_LOADING](state, loading) {
      state.loading = loading
    },
    [types.INCREASE_PAGE](state) {
      state.page++
    },
    [types.ADD_LIBS](state, libs) {
      state.fetchedLibraries = [...state.fetchedLibraries, ...libs]
    },
  },
  actions: {
    async [types.GET_LIBRARIES]({ commit, state }) {
      if (state?.allLibraries?.length) return
      commit(types.SET_LOADING, true)
      const result = await new Promise((resolve) => {
        setTimeout(() => resolve(librariesAll), 2000)
      })
      commit(types.SET_LIBRARIES, result)

      commit(
        types.SET_FETCHED_LIBRARIES,
        state.allLibraries.slice(0, PAGE_SIZE)
      )
      commit(types.SET_LOADING, false)
    },
    [types.INCREASE_PAGE_ACTION]({ commit, state }) {
      // console.log('before commit', state.page, (state.page - 1) * PAGE_SIZE + 1)
      commit(types.INCREASE_PAGE)
      // console.log('after commit', state.page)
      const start = (state.page - 1) * PAGE_SIZE
      const end = start + PAGE_SIZE
      // return
      // console.log(libraries.slice(start, end))
      commit(types.ADD_LIBS, state.allLibraries.slice(start, end))
    },
  },
  // modules: {},
})

Vue.use(Vuex)

// export default new Vuex.Store({
//   modules: {
//     library,
//   },
// })
