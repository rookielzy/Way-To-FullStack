import { GET_DATA } from '../../mutation-types'
import { getData2 } from '../../../api/getData'

const state = {
  test2: null
}

const getters = {

}

const mutations = {
  [GET_DATA] (state, { data }) {
    console.log(data)
    state.test2 = data
  }
}

const actions = {
  getData2 ({ commit, state }) {
    getData2().then(res => {
      commit(GET_DATA, { data: res })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
