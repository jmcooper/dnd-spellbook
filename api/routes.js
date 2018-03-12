'use strict'

const express = require('express')
const fs = require('fs')
const path = require('path')
const formatJson = require('format-json-pretty');

const router = express.Router()

router.post('/signin',
  (req, res) => {
    const usersData = require('./users.json')
    const {accessToken, firstName, lastName, profileImage} = req.body
    let user = usersData[accessToken]
    if (user)
      return res.json(user)

    user = {
      accessToken,
      firstName,
      lastName,
      profileImage,
      spellbooks: []
    }

    usersData[accessToken] = user
    fs.writeFileSync(path.join(__dirname, 'users.json'), formatJson(usersData))
    return res.json(user)
  }
)

router.post(
  '/user',
  (req, res) => {
    const usersData = require('./users.json')
    const user = req.body
    
    usersData[user.accessToken] = user
    fs.writeFileSync(path.join(__dirname, 'users.json'), formatJson(usersData))
    return res.json(user)
  }
)

router.get(
  '/spells',
  (req, res) => {
    const spells = require('./spells.json')
    res.json(spells)
  }
)

module.exports = router