import Vue from 'vue'
import Vuex from 'vuex'
import types from './types'
import libraries from '../../libraries.json'

Vue.use(Vuex)

/**
 * Кол-во элементов на странице для виртуального скролла
 */
const PAGE_SIZE = 30

export default new Vuex.Store({
  state: {
    loading: false,
    allLibraries: null,
    fetchedLibraries: null,
    page: 1,
  },
  getters: {
    getLibraryById: (state) => (id) => {
      return state?.fetchedLibraries?.find((library) => library._id === id)
    },
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
    /**
     * Этот action имитация обращения к API opendata, т.к. возникли проблемы с CORS сделал следующее:
     * - выгрузил весь набор данных в JSON (файл libraries.json в корне проекта)
     * - записываем в store этот набор
     * - далее есть поле fetchedLibraries - это массив библиотек для работы виртуального скролла
     * - по мере скрола вниз массив fetchedLibraries берет следующие 30 элементов из общего хранилища allLibraries и добавляет к текущему массиву
     * - ИТД
     */
    async [types.GET_LIBRARIES]({ commit, state }) {
      if (state?.allLibraries?.length) return
      commit(types.SET_LOADING, true)
      const result = await new Promise((resolve) => {
        setTimeout(() => resolve(libraries), 500)
      })
      commit(types.SET_LIBRARIES, result)
      commit(
        types.SET_FETCHED_LIBRARIES,
        state.allLibraries.slice(0, PAGE_SIZE)
      )
      commit(types.SET_LOADING, false)
    },
    [types.INCREASE_PAGE_ACTION]({ commit, state }) {
      commit(types.INCREASE_PAGE)
      const start = (state.page - 1) * PAGE_SIZE
      const end = start + PAGE_SIZE
      commit(types.ADD_LIBS, state.allLibraries.slice(start, end))
    },
  },
})

Vue.use(Vuex)
