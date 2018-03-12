'use strict'

const fs = require('fs')
var formatJson = require('format-json-pretty');

const spells = require('./spells.json')
const newSpells = []

for (let key in spells) {
  newSpells.push(Object.assign({name: key}, spells[key]))
}

fs.writeFileSync('new-spells.json', JSON.stringify(newSpells))