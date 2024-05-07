'use strict'
const express = require('express')
const router = express.Router()

const investigatorModel = require ('../models/InvestigatorModel')

const UIGenerator = require('uid-generator');
const uidgen = new UIGenerator();

//        BUSQUEDAS GLOBALES (LISTAS)           //
router.route('/investigators')
  //! LISTAR todos los Investigadores
  .get((req, res) => {
    res.json(investigatorModel.list())
  })

  //! CREAR un nuevo investigador
  .post(async (req, res) => {
    let nuevoInvestigador = req.body
    if (nuevoInvestigador.hasOwnProperty('expansion')) {
      nuevoInvestigador.expansion = "desconocido"
    }
    nuevoInvestigador.investigadorId = await uidgen.generate()

    investigatorModel.add(nuevoInvestigador)

    res.status(201).json(nuevoInvestigador)
  })

  //        BUSCA UN INVESTIGADOR POR DATOS CONCRETOS
  router.route('/investigators/searchArquetipe/:arquetipe')
    //! LISTA  TODOS los investigadores que coincidan con este arquetipo
    .get((req, res) => {
      let getListaInvestigadores = investigatorModel.list()
      const getInvestigadorArquetipe = req.params.arquetipe
      let foundInvestigators = []

      for (let i = 0; i < getListaInvestigadores.length; i++) {
        if (getListaInvestigadores[i].arquetipo.includes(getInvestigadorArquetipe)) {
          foundInvestigators.push(getListaInvestigadores[i])
        }
      }
      res.json(foundInvestigators)
    })

    //! BUSCA un investigador por el nombre
  router.route('/investigators/searchByName/:nameInvestigator')
  .get((req, res) => {
    let getListaInvestigadores = investigatorModel.list()
    const getInvestigadorName = req.params.nameInvestigator

    let foundInvestigator = getListaInvestigadores.find((investigator) => investigator.nombreInvestigador == getInvestigadorName)
    if (!foundInvestigator) {
      res.status(404).json({messaje: `investigador no encontrado al buscar por nombre`})
      return
    }
    res.json(foundInvestigator)
  })

  //        BUSQUEDAS CONCRETAS               //
  router.route('/investigators/:investigadorId')
    //! BUSCA un investigador concreto por "ID"
    .get((req, res) => {
      let getListaInvestigadores = investigatorModel.list()
      const getInvestigadorId = req.params.investigadorId

      const foundInvestigador = getListaInvestigadores.find((investigador) => investigador.investigadorId === getInvestigadorId)

      if (!foundInvestigador) {
        res.status(404).json({message: `Investigador con id ${getInvestigadorId} ya ha sido devorado por el vacio`})
        return
      }

      res.json({foundInvestigador})
    })

    //! EDITA un investigador concreto por "ID"
    .put((req, res) => {
      let getListaInvestigadores = investigatorModel.list()
      const putInvestigadorId = req.params.investigadorId

      const foundInvestigadorIndex = getListaInvestigadores.findIndex((investigador) => investigador.investigadorId === putInvestigadorId)

      if (foundInvestigadorIndex === -1) {
        res.status(404).json({message: `Investigador con id ${putInvestigadorId} ya ha sido devorado por el vacio`})
        return
      }

      getListaInvestigadores[foundInvestigadorIndex] = {... getListaInvestigadores[foundInvestigadorIndex], ...req.body}

      res.json(getListaInvestigadores[foundInvestigadorIndex])
    })

    //! ELIMINA un investigador concreto por "ID"
    .delete((req, res) => {
      let getListaInvestigadores = investigatorModel.list()
      const deleteInvestigadorId = req.params.investigadorId

      const foundInvestigadorIndex = getListaInvestigadores.findIndex((investigador) => investigador.investigadorId === deleteInvestigadorId)

      if (foundInvestigadorIndex === -1) {
        res.status(404).json({message: `Investigador con id ${deleteInvestigadorId} ya ha sido devorado por el vacio`})
        return
      }
      investigatorModel.remove(foundInvestigadorIndex)

      res.status(204).json({message: `El investigador ha sido ofrecido como sacrificio`})
    })

module.exports = router
