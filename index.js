'use strict'

const express = require('express')
const config = require('./modules/config')
const UIGenerator = require('uid-generator');
const uidgen = new UIGenerator();
const PORT = config.PORT || 8080
const app = express()
//middleware para parsear los cuerpos tipo application/JSON en el cuerpo
app.use(express.json())

let listaInvestigadores = []

//        BUSQUEDAS GLOBALES (LISTAS)

app.route('/investigadores')
  .get((req, res) => {
    res.json(listaInvestigadores)
  })

  .post(async (req, res) => {
    let nuevoInvestigador = req.body
    // reseteamos lo que haya en "expansion" por "desconocido", quitando lo que haya enviado por post
    if (nuevoInvestigador.hasOwnProperty('expansion')) {
      nuevoInvestigador.expansion = "desconocido"
    }

    nuevoInvestigador.investigadorId = await uidgen.generate()

    listaInvestigadores.push(nuevoInvestigador)

    res.status(201).json(nuevoInvestigador)
  })

  //        BUSQUEDAS CONCRETAS

  app.route('/investigadores/:investigadorId')
    //! BUSCA un investigador concreto por "ID"
    .get((req, res) => {
      //? recogemos los parametros de busqueda
      const getInvestigadorId = req.params.investigadorId

      //? buscamo l investigador y metemos el resultado de la busqueda en una variable
      const foundInvestigador = listaInvestigadores.find((investigador) => investigador.investigadorId === getInvestigadorId)

      //? comprobamos si se ha encontrado al investigador (corta la ejecucion si no ha encontrado nada)
      if (!foundInvestigador) {
        res.status(404).json({message: `Investigador con id ${getInvestigadorId} ha sido devorado por el vacio`})
        return
      }

      //? devolvemos el investigador encontrado
      res.json({foundInvestigador})
    })

    //! EDITA un investigador concreto por "ID"
    .put((req, res) => {
      const putInvestigadorId = req.params.investigadorId
      //? OJO <-- Aqui buscamos la POSICION donde hayamos encontrado al investigador (para posteriormente editarlo)
      //                        |                            |
      //                       VVV                          VVV
      const foundInvestigadorIndex = listaInvestigadores.findIndex((investigador) => investigador.investigadorId === putInvestigadorId)
      // si no encuentra nada, devolvera un -1

      //? por lo cual aqui comprobamos que si es -1(no ha encontrado el investigador) ...
      if (foundInvestigadorIndex === -1) {
        res.status(404).json({message: `Investigador con id ${putInvestigadorId} ha sido devorado por el vacio`})
        return
      }

      //? juntamos lo que habia en esa posicion mas lo que nos han enviado por parametros YYY guardamos en el mismo sitio donde se ha encontrado al investigador (termianndo de editar asi el investigador correctamente dentro del array de listaInvestigadores)
      listaInvestigadores[foundInvestigadorIndex] = {... listaInvestigadores[foundInvestigadorIndex], ...req.body}

      res.json(listaInvestigadores[foundInvestigadorIndex])
    })

    //! ELIMINA un investigador concreto por "ID"
    .delete((req, res) => {
      console.log('borra investigador por su id: ' +req.params.investigadorId)

      res.json({})
    })


app.listen(PORT, () => console.info(`Servidor en http://localhost:${PORT}`))

