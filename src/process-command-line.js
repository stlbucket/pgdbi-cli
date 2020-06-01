const yargs = require('yargs')
const startServer = require('./start-server')

async function processCommandLine() {
  yargs
  .env(true)
  .command('$0', 'pgdbi-cli', 
    function (yargs) {
      return yargs
      .option({
        'c': {
          alias: 'postgres-connection',
          demandOption: true,
          describe: 'postgres connection uri: https://www.postgresql.org/docs/10/libpq-connect.html#id-1.7.3.8.3.6'
        }
      })
      .option({
        's': {
          alias: 'schemata-to-graphql',
          demandOption: true,
          describe: 'comma-delimited list of schemas to expose via postgraphile.  ex: "schema_one,schema_two"'
        }
      })
      .option({
        'p': {
          alias: 'port',
          demandOption: false,
          describe: 'the port on which to expose pgdbi',
          type: 'number',
          default: 5099
        }
      })
      .option({
        'q': {
          alias: 'enable-sqitch',
          demandOption: false,
          describe: 'sqitch inspector will be enabled',
          type: 'boolean',
          default: false
        }
      })
}, 
    (argv) => {
      process.env.POSTGRES_CONNECTION = argv.postgresConnection
      startServer(argv.postgresConnection, argv.schemataToGraphql, argv.port, {
        enableSqitch: argv.enableSqitch
      })
    }
  )
  .option({
    'v': {
      alias: 'verbose',
      demandOption: true,
      default: false,
      type: 'boolean'
  }})
  .argv
}

module.exports = processCommandLine


