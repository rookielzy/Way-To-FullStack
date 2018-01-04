class Bar {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
  get sum () {
    return this.x + this.y
  }
}

const bar = new Bar(1, 1)
bar.sum()
