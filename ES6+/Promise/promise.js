class _Promise {
  constructor (fn) {
    const _this = this
    _this.__queue = []

    _this.__succ_res = null
    _this.__erro_res = null

    _this.status = ''

    fn (function (...arg) {
      _this.__succ_res = arg

      _this.status = 'succ'

      _this.__queue.forEach(json => {
        json.resolve(...arg)
      })
    }, function (...arg) {
      _this.__erro_res = arg

      _this.status = 'error'

      _this.__queue.forEach(json => {
        json.rejecet(...arg)
      })
    })
  }

  then (resolve, reject) {
    console.log('Call then method')
    if (this.status == 'succ') {
      console.log('success')
      resolve(...this.__succ_res)
    } else if (this.status == 'error') {
      console.log('fail')      
      reject(...this.__erro_res)
    } else {
      console.log('continue')
      this.__queue.push({resolve, reject})
    }
  }
}