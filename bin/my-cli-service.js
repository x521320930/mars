#!/usr/bin/env node


const Service = require('../lib/Service')

const sevice = new Service(process.cwd())

const rawArgv = process.argv.slice(2)

const parseArgs = require('minimist')(rawArgv, {
  boolean: [
    'open'
  ]
})

const command = parseArgs._[0]


sevice.run(command, parseArgs, rawArgv)

// .catch(err => {
//   console.error(err)
//   process.exit(1)
// })