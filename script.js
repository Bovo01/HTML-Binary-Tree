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
    TREE_CONTAINER.innerHTML = ''
    let row = undefined
    let e = 0
    // Creo i nodi con i valori
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
      node.id = 'node-' + i
      row.appendChild(node)
    }
    // Creo i nodi restanti nascosti
    let i = this.nodes.length
    while (i < Math.pow(2, e) - 1) {
      let node = document.createElement('div')
      node.className = 'tree-node'
      node.style.visibility = 'hidden'
      row.appendChild(node)
      i++
    }

    // Collego i nodi ai rispettivi figli
    let linesContainer = document.getElementById('tree-links')
    document.getElementById('tree-links').innerHTML = ''
    i = 0
    while (2 * i + 1 < this.nodes.length) {
      let node = document.getElementById('node-' + i)
      let nodePosition = node.getBoundingClientRect()
      // Aggiungo collegamento al figlio sinistro
      let left = document.getElementById('node-' + (2 * i + 1))
      let leftPosition = left.getBoundingClientRect()
      let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', nodePosition.left)
      line.setAttribute('y1', nodePosition.bottom - nodePosition.height / 2)
      line.setAttribute('x2', leftPosition.right - leftPosition.width / 2)
      line.setAttribute('y2', leftPosition.top)
      linesContainer.appendChild(line)
      if (2 * i + 2 < this.nodes.length) {
        // Aggiungo collegamento al figlio destro
        let right = document.getElementById('node-' + (2 * i + 2))
        let rightPosition = right.getBoundingClientRect()
        line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', nodePosition.right)
        line.setAttribute('y1', nodePosition.bottom - nodePosition.height / 2)
        line.setAttribute('x2', rightPosition.left + rightPosition.width / 2)
        line.setAttribute('y2', rightPosition.top)
        linesContainer.appendChild(line)
      }
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
t.show()