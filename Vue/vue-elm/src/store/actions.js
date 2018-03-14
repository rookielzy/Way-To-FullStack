import { getData } from '../api/getData'
import { GET_DATA } from './mutation-types'

export default {
  getData ({ commit, state }) {
    getData().then(res => {
      commit(GET_DATA, { data: res })
    })
  }
}
