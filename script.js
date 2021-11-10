const TREE_CONTAINER = document.getElementById('tree');

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

  show() {
    let row = undefined
    let e = 0
    for (let i = 0; i < this.nodes.length; i++) {
      if ((i + 1) % Math.pow(2, e) == 0) {
        // Creo la riga
        row = document.createElement('div')
        TREE_CONTAINER.appendChild(row)
        e++
      }
      row.className = 'tree-row'
      // Creo il nodo
      let node = document.createElement('div')
      node.innerHTML = this.nodes[i]
      node.className = 'tree-node'
      row.appendChild(node)
    }
    let i = this.nodes.length
    while (i < Math.pow(2, e) - 1) {
      let node = document.createElement('div')
      node.className = 'tree-node'
      node.style.visibility = 'hidden'
      row.appendChild(node)
      i++
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
t.show()