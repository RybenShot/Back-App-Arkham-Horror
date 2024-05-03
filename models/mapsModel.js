let listMaps = []

module.exports = {
  list(){
    return(listMaps)
  },
  add(item){
    listMaps.push(item)
  },
  edit(index, item){
    listMaps[index, item]
  },
  remove(index){
    listMaps.splice(index, 1)
  }
}
