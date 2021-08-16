// This program will generate a set of training data. It overwrites the JSON output files when ran
const fs = require('fs')
const { generator } = require('./lib')

const data = generator.buildAndFormatData(0.8, 200, 10)

fs.writeFileSync('./store/data.json', JSON.stringify(data, null, 2))
