'use strict'
const express = require('express');
const router = express.Router();

const enemiesModel = require('../models/enemiesModel');

const UIGenerator = require('uid-generator');
const uidgen = new UIGenerator();

//          BUSQUEDAS GLOBALES          //
router.route('/enemies')
//! LISTAR TODOS los enemigos
.get((req, res) => {
  res.json(enemiesModel.list())
})

//! CREAR nuevo enemigo
.post(async  (req, res) => {
  let newEnemie = req.body
  if (newEnemie.hasOwnProperty('expansion')) {
    newEnemie.expansion = "desconocid"
  }

  newEnemie.enemieId = await uidgen.generate()

  enemiesModel.add(newEnemie)
  res.status(201).json(newEnemie)
})

router.route('/enemies/enemiesMap/:idMap')
.get((req, res) => {
  let getListEnemies = enemiesModel.list()
  const getEnemieMap = req.params.idMap
  let foundEnemies = []

  for (let i = 0; i < getListEnemies.length; i++) {
    if (getListEnemies[i].maps.includes(getEnemieMap)) {
      foundEnemies.push(getListEnemies[i])
    }
  }

  res.json(foundEnemies)
})

router.route('/enemies/:idEnemie')
//! BUSCAR un enemigo por la ID
.get((req, res) => {
  let getListEnemies = enemiesModel.list()
  const getEnemieId = req.params.idEnemie

  const foundEnemie = getListEnemies.find((enemie) => enemie.enemieId === getEnemieId)

  if (!foundEnemie) {
    res.status(404).json({message: `Enemigo con id ${getEnemieId} ya ha sido borrado de la existencia`})
    return
  }

  res.json({foundEnemie})
})

.put((req, res) => {
  //! EDITAR un enemigo por ID
  let getListEnemies = enemiesModel.list()
  const getEnemieId = req.params.idEnemie

  const foundEnemieIndex = getListEnemies.findIndex((enemie) => enemie.enemieId === getEnemieId)

  if (foundEnemieIndex === -1 ) {
    res.status(404).json({message: `No se ha encontrado al enemigo al intentar editarlo`})
    return
  }

  getListEnemies[foundEnemieIndex] = {... getListEnemies[foundEnemieIndex], ...req.body}

  res.json(getListEnemies[foundEnemieIndex])
})

//! ELIMINAR un enemigo por la ID
.delete((req, res) => {
  let getListEnemies = enemiesModel.list()
  const deleteEnemieId = req.params.idEnemie

  const foundEnemieIndex = getListEnemies.findIndex((enemie) => enemie.enemieId === deleteEnemieId)

  if (foundEnemieIndex === -1 ) {
    res.status(404).json({message: `No se ha encontrado al enemigo al intentar borrarlo`})
    return
  }

  enemiesModel.remove(foundEnemieIndex)

  res.status(204).json(null)
})

module.exports = router
