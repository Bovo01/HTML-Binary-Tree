class Tree {
  constructor() {
    this.nodes = []
  }

  size() {
    return this.nodes.length
  }

  isEmpty() {
    return this.size() == 0
  }

  push(val) {
    this.nodes.push(val)
    let i = this.nodes.length - 1
    while (parseInt(i / 2) >= 0 && this.nodes[i] > this.nodes[parseInt(i / 2)]) {
      let tmp = this.nodes[i]
      this.nodes[i] = this.nodes[parseInt(i / 2)]
      this.nodes[parseInt(i / 2)] = tmp
      i = parseInt(i / 2)
    }
  }
}

let t = new Tree()
t.push(3)
t.push(4)
t.push(5)
t.push(6)
t.push(7)
t.push(8)
console.log(t)