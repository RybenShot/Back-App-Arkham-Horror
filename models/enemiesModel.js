let listEnemies = []

module.exports = {
  list(){
    return(listEnemies)
  },
  add(item){
    listEnemies.push(item)
  },
  edit(index, item){
    listEnemies[index, item]
  },
  remove(index){
    listEnemies.splice(index, 1)
  }
}
