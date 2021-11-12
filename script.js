// Creo un albero
let t = new Tree()
for (let i = 0; i < 20; i++) {
  t.push(i + 1)
}
// Mostro l'albero
t.show()
// Mostro l'albero ogni volta che viene modificata la dimensione della pagina
// (ridisegno le linee che hanno valori statici in pixel)
window.onresize = () => {
  t.show()
}
// Funzione onclick per aggiungere un nodo in modo animato
const btnPush = async function (btn) {
  let input = document.getElementById('to-push')
  let val = parseInt(input.value)
  if (val == undefined || isNaN(val)) {
    alert('Inserisci un numero')
    return
  }
  input.value = ''
  btn.disabled = true
  await t.animatedPush(val)
  btn.disabled = false
}