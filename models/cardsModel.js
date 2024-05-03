let listUsableTinyCards = []

module.exports = {
  list(){
    return(listUsableTinyCards)
  },
  add(item){
    listUsableTinyCards.push(item)
  },
  edit(index, item){
    listUsableTinyCards[index, item]
  },
  remove(index){
    listUsableTinyCards.splice(index, 1)
  }
}
