'use strict'

const express = require('express')
const router = express.Router()

const cardsModel = require('../models/mapsModel')

const UIGenerator = require('uid-generator');
const uidgen = new UIGenerator();


//        BUSQUEDAS GLOBALES (LISTA DE CARTAS)           //
router.route('/cards')
//! Listar TODAS las cartas
.get((req, res)  => {
  res.json(cardsModel.list())
})

//! CREAR carta
.post(async (req, res) => {
  let newCard = req.body

  newCard.idCard = await uidgen.generate()
  cardsModel.add(newCard)

  res.status(201).json(newCard)
})

//        BUSQUEDAS CONCRETAS (POR EL TIPO DE CARTA)                          //
router.route('/cards/:type')
//! LISTAR todas las cartas de un tipo, ej: listar todas las cartas que tengan el "type": "hechizos"
.get((req, res) => {
  let getListCards = cardsModel.list()
  let getCardType = req.params.type
  let foundCards = []

  for (let i = 0; i < getListCards.length; i++) {
    if (getListCards[i].type.includes(getCardType)) {
      foundCards.push(getListCards[i])
    }
  }
  res.json(foundCards)
})

//          BUSQUEDA CONCRETA (POR TITLE DE CARTA)
router.route('/cards/search/:title')
//! BUSCA una carta concreta por su "title"
.get((req, res) => {
  let getListCards = cardsModel.list()
  let getCardTitle = req.params.title

  let foundCard = getListCards.find((card) => card.title == getCardTitle)
  if (!foundCard) {
    res.status(404).json({message: `Carta no encontrada`})
    return
  }
  res.json(foundCard)
})

//          BUSQUEDA CONCRETA (POR ID DE CARTA)
router.route('/cards/findById/:cardId')
//! EDITA una carta concreta buscando por "idCard"
.put((req, res) => {
  let getListCards = cardsModel.list()
  let putCardId = req.params.cardId

  const foundCardIndex = getListCards.findIndex((card) => card.idCard === putCardId)

  if(foundCardIndex === -1){
    res.status(404).json({message: `carta no encontrada al intentar editarla`})
    return
  }

  getListCards[foundCardIndex] = {...getListCards[foundCardIndex], ...req.body}

  res.json(getListCards[foundCardIndex])
})

//! BORRA una carta en concreto
.delete((req, res) => {
  let getListCards = cardsModel.list()
  let deleteCardId = req.params.cardId

  const foundCardIndex = getListCards.findIndex((card) => card.idCard === deleteCardId)

  if (foundCardIndex === -1) {
    res.status(404).json({message: `Carta no encontrada al intentar borrarla`})
  }

  cardsModel.remove(foundCardIndex)

  res.status(204).json(null)
})

module.exports = router
