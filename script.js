const TREE_CONTAINER = document.getElementById('tree');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
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

  async animatedPush(val, ms = 1000) {
    const COLOR_CREATE = 'lime'
    const COLOR_SWITCH = 'red'

    this.nodes.push(val)
    this.show()
    // Creazione nuovo nodo animata
    let lastNode = document.getElementById(`node-${this.nodes.length - 1}`)
    lastNode.opacity = 0
    lastNode.classList.add('apparizione')
    lastNode.style.setProperty('--time', `${ms / 1000}s`)
    lastNode.style.setProperty('--color', COLOR_CREATE)
    await sleep(ms)
    lastNode.classList.remove('apparizione')
    // Inizio loop
    let i = this.nodes.length - 1
    let parentIndex = parseInt((i + 1) / 2 - 1)
    while (parentIndex >= 0 && this.nodes[i] > this.nodes[parentIndex]) {
      // Switch dei nodi animati
      let child = document.getElementById(`node-${i}`)
      let parent = document.getElementById(`node-${parentIndex}`)
      let childDim = child.getBoundingClientRect()
      let parentDim = parent.getBoundingClientRect()
      // NODO FIGLIO VA VERSO IL PADRE
      child.classList.add('traslazione')
      child.style.setProperty('--time', `${ms / 1000}s`)
      child.style.setProperty('--color', COLOR_CREATE)
      child.style.setProperty('--x1', `${childDim.left}px`)
      child.style.setProperty('--y1', `${childDim.top}px`)
      child.style.setProperty('--x2', `${parentDim.left}px`)
      child.style.setProperty('--y2', `${parentDim.top}px`)
      // Creo un sostituto temporaneo a questo nodo (per evitare che il flex si riordini)
      let tmpChildNode = document.createElement('div')
      tmpChildNode.classList.add('tree-node')
      tmpChildNode.visibility = 'hidden'
      tmpChildNode.style.setProperty('--w', child.style.getPropertyValue('--w'))
      child.parentNode.insertBefore(tmpChildNode, child)
      // NODO PADRE VA VERSO IL FIGLIO
      parent.classList.add('traslazione')
      parent.style.setProperty('--time', `${ms / 1000}s`)
      parent.style.setProperty('--color', COLOR_SWITCH)
      parent.style.setProperty('--x1', `${parentDim.left}px`)
      parent.style.setProperty('--y1', `${parentDim.top}px`)
      parent.style.setProperty('--x2', `${childDim.left}px`)
      parent.style.setProperty('--y2', `${childDim.top}px`)
      // Creo un sostituto temporaneo a questo nodo (per evitare che il flex si riordini)
      let tmpParentNode = document.createElement('div')
      tmpParentNode.classList.add('tree-node')
      tmpParentNode.visibility = 'hidden'
      tmpParentNode.style.setProperty('--w', parent.style.getPropertyValue('--w'))
      parent.parentNode.insertBefore(tmpParentNode, parent)
      // Aspetto la fine dell'animazione e elimino i nodi temporanei e le classi utilizzate
      await sleep(ms)
      child.classList.remove('traslazione')
      child.parentNode.removeChild(tmpChildNode)
      parent.classList.remove('traslazione')
      parent.parentNode.removeChild(tmpParentNode)
      // Switch reale dei nodi
      let tmp = this.nodes[i]
      this.nodes[i] = this.nodes[parentIndex]
      this.nodes[parentIndex] = tmp
      // Switch grafico dei nodi
      document.getElementById(`node-${i}`).innerHTML = this.nodes[i]
      document.getElementById(`node-${parentIndex}`).innerHTML = this.nodes[parentIndex]
      i = parentIndex
      parentIndex = parseInt((i + 1) / 2 - 1)
    }
    await sleep(ms)
    this.show()
  }

  show(nodeIndexes = [], nodeColors = []) {
    if (this.isEmpty()) return
    // Imposto la dimensione dei nodi in base a quanti sono
    let dimNode = Math.min(window.innerWidth, window.innerHeight) / Math.pow(2, Math.floor(Math.log2(this.nodes.length))) + 'px';
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
      node.style.setProperty('--w', dimNode)
      if (nodeIndexes.includes(i))
        node.style.backgroundColor = nodeColors[nodeIndexes.indexOf(i)]
      row.appendChild(node)
    }
    // Creo i nodi restanti nascosti
    let i = this.nodes.length
    while (i < Math.pow(2, e) - 1) {
      let node = document.createElement('div')
      node.className = 'tree-node'
      node.style.visibility = 'hidden'
      node.style.setProperty('--w', dimNode)
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
for (let i = 0; i < 20; i++) {
  t.push(i + 1)
}
t.show()

window.onresize = () => {
  t.show()
}

const btnPush = function () {
  let val = parseInt(document.getElementById('to-push').value)
  if (val == undefined || isNaN(val)) return
  t.animatedPush(val)
}