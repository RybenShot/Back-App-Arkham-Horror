let listInvestigators = []

module.exports = {
  list(){
    return(listInvestigators)
  },
  add(item){
    listInvestigators.push(item)
  },
  edit(index, item){
    listInvestigators[index, item]
  },
  remove(index){
    listInvestigators.splice(index, 1)
  }
}
