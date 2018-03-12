const R = require('ramda')

const spells = require('../spells.json')

const classes = spells.map(s => s.classes)
const tags = spells.map(s => s.tags)

console.log('classes:', R.uniq(R.flatten(classes)))
console.log('tags:', R.uniq(R.flatten(tags)))
