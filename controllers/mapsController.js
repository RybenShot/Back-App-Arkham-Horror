'use strict'
const express = require('express')
const router = express.Router()

const mapsMdodel = require('../models/mapsModel')

const UIGenerator = require('uid-generator');
const uidgen = new UIGenerator();

//        BUSQUEDAS GLOBALES (LISTA DE MAPAS)           //
router.route('/maps')
  //! Lista de todos los mapas
  .get((req, res) => {
    res.json(mapsMdodel.list())
  })

  .post(async (req, res) => {
    let newMap = req.body
    if (newMap.hasOwnProperty('expansion')) {
      newMap.expansion = "desconocido"
    }

    newMap.idMapa = await uidgen.generate()
    mapsMdodel.add(newMap)

    res.status(201).json(newMap)
  })

//        BUSQUEDAS CONCRETAS                           //
router.route('/maps/:idMapa')
.get((req, res) => {
  let getListMaps = mapsMdodel.list()
  let getMapId = req.params.idMapa

  const foundMap = getListMaps.find((map) => map.idMapa === getMapId)
  if (!foundMap) {
    res.status(404).json({message: `mapa no encontrado`})
  }
  res.json(foundMap)
})

.put((req, res) => {
  let getListMaps = mapsMdodel.list()
  let getMapId = req.params.idMapa

  const foundMapIndex = getListMaps.findIndex((map) => map.idMapa === getMapId)
  if (foundMapIndex === -1) {
    res.status(404).json({message: `Investigador con id ${putInvestigadorId} ya ha sido devorado por el vacio`})
    return
  }

  getListMaps[foundMapIndex] = {... getListMaps[foundMapIndex], ...req.body}

  res.json(getListMaps[foundMapIndex])
})

.delete((req, res) => {
  let getListMaps = mapsMdodel.list()
  let getMapId = req.params.idMapa

  const foundMapIndex = getListMaps.findIndex((map) => map.idMapa === getMapId)
  if (foundMapIndex === -1) {
    res.status(404).json({message: `Investigador con id ${putInvestigadorId} ya ha sido devorado por el vacio`})
    return
  }

  mapsMdodel.remove(foundMapIndex)

  res.status(204).json(null)
})

module.exports = router
