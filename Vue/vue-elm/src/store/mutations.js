import { GET_DATA } from './mutation-types'

export default {
  [GET_DATA] (state, { data }) {
    console.log(data)
    state.test1 = data
  }
}
