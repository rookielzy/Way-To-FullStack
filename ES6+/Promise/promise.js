class _Promise {
  constructor(excuseFunc) {
    this.promiseQueue = []
    this.handleError = () => {}
    this.handleFinsh = () => {}
    this.onResolve = this.onResolve.bind(this)
    this.onReject = this.onReject.bind(this)    
    this.onFinally = this.onFinally.bind(this)

    excuseFunc(this.onResolve, this.onReject, this.onFinally)
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

  finally (handleFinsh) {
    this.handleFinsh = handleFinsh
    return this
  }

  onResolve (value) {
    let storeValue = value
    try {
      this.promiseQueue.forEach(nextFunc => {
        storeValue = nextFunc(value)
      })
    } catch (error) {
      this.promiseQueue = []

      this.onReject(error)
    }

    this.onFinally()
  }

  onReject (error) {
    this.handleError(error)
  }

  onFinally () {
    this.handleFinsh()
  }
}
