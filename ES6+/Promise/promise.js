class _Promise {
  constructor(excuseFunc) {
    this.promiseQueue = []
    this.handleError = () => {}
    this.onResolve = this.onResolve.bind(this)
    this.onReject = this.onReject.bind(this)    

    excuseFunc(this.onResolve, this.onReject)
  }

  then (onResolve) {
    // 加入队列，返回this
    this.promiseQueue.push(onResolve)
    return this
  }

  catch (handleError) {
    // 捕获错误，返回this
    this.handleError = handleError
    return this
  }

  onResolve (value) {
    let storeValue
    try {
      this.promiseQueue.forEach(nextFunc => {
        storeValue = nextFunc(value)
      })
    } catch (error) {
      this.promiseQueue = []

      this.onReject(error)
    }
    
  }

  onReject (error) {
    this.handleError(error)
  }
}
