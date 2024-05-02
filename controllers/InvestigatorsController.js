'use strict'

const express = require('express')
const router = express.Router()

const InvestigatorModel = require('../models/InvestigatorModel')

const UIGenerator = require('uid-generator');
const uidgen = new UIGenerator();

//        BUSQUEDAS GLOBALES (LISTAS)           //

router.route('/investigators')
  //! Lista de todos los Investigadores
  .get((req, res) => {
    res.json(InvestigatorModel.list())
  })

  //! Añadir/Crear un nuevo investigador
  .post(async (req, res) => {
    let nuevoInvestigador = req.body
    //? reseteamos lo que haya en "expansion" por "desconocido", quitando lo que haya enviado por post
    if (nuevoInvestigador.hasOwnProperty('expansion')) {
      nuevoInvestigador.expansion = "desconocido"
    }
    //? Generador automatico de ID. Cogemos el "Objeto(investigador)" y le metemos un nuevo parametro "ID" con su "valor" generado gracias a "uidgen"
    nuevoInvestigador.investigadorId = await uidgen.generate()

    //? Metemos el investigador en la lista de "listaInvestigadores"
    InvestigatorModel.add(nuevoInvestigador)

    res.status(201).json(nuevoInvestigador)
  })

  //        BUSQUEDAS CONCRETAS               //

  router.route('/investigators/:investigadorId')
    //! BUSCA un investigador concreto por "ID"
    .get((req, res) => {
      //? Me traigo la lista de investigadores ...
      let getListaInvestigadores = InvestigatorModel.list()
      //? recogemos los parametros de busqueda(concretamente la id)
      const getInvestigadorId = req.params.investigadorId

      //? buscamos al investigador YYYY metemos el resultado de la busqueda en una variable
      const foundInvestigador = getListaInvestigadores.find((investigador) => investigador.investigadorId === getInvestigadorId)

      //? comprobamos si se ha encontrado al investigador (corta la ejecucion si no ha encontrado nada)
      if (!foundInvestigador) {
        res.status(404).json({message: `Investigador con id ${getInvestigadorId} ya ha sido devorado por el vacio`})
        return
      }

      //? devolvemos el investigador encontrado
      res.json({foundInvestigador})
    })

    //! EDITA un investigador concreto por "ID"
    .put((req, res) => {
      let getListaInvestigadores = InvestigatorModel.list()
      const putInvestigadorId = req.params.investigadorId
      //? OJO <-- Aqui buscamos la POSICION donde hayamos encontrado al investigador (para posteriormente editarlo)
      //                        |                            |
      //                       VVV                          VVV
      const foundInvestigadorIndex = getListaInvestigadores.findIndex((investigador) => investigador.investigadorId === putInvestigadorId)
      // si no encuentra nada, devolvera un -1

      //? por lo cual aqui comprobamos que si es -1(no ha encontrado el investigador) ...
      if (foundInvestigadorIndex === -1) {
        res.status(404).json({message: `Investigador con id ${putInvestigadorId} ya ha sido devorado por el vacio`})
        return
      }

      //? juntamos lo que habia en esa posicion mas lo que nos han enviado por parametros YYY guardamos en el mismo sitio donde se ha encontrado al investigador (termianndo de editar asi el investigador correctamente dentro del array de listaInvestigadores)
      getListaInvestigadores[foundInvestigadorIndex] = {... getListaInvestigadores[foundInvestigadorIndex], ...req.body}
      //!! Quito la linea de abajo porque ahora mismo nose para que puede servir, esta copiado del mock de pizza, en los productos, se supone que es apra la edicion del investigador en este caso, epro solo con la linea superior es suficiente
      //InvestigatorModel.edit(foundInvestigadorIndex, getListaInvestigadores[foundInvestigadorIndex])

      res.json(getListaInvestigadores[foundInvestigadorIndex])
    })

    //! ELIMINA un investigador concreto por "ID"
    .delete((req, res) => {
      let getListaInvestigadores = InvestigatorModel.list()
      const deleteInvestigadorId = req.params.investigadorId

      const foundInvestigadorIndex = getListaInvestigadores.findIndex((investigador) => investigador.investigadorId === deleteInvestigadorId)

      if (foundInvestigadorIndex === -1) {
        res.status(404).json({message: `Investigador con id ${deleteInvestigadorId} ya ha sido devorado por el vacio`})
        return
      }
      //? Aqui es donde borramos al investigador con la ayuda de la posicion que proporciona "foundInvestigadorIndex"
      InvestigatorModel.remove(foundInvestigadorIndex)
      //!! Abajo, version antigua
      //getListaInvestigadores.splice(foundInvestigadorIndex, 1)

      res.status(204).json({message: `El investigador ha sido ofrecido como sacrificio`})
    })

module.exports = router
