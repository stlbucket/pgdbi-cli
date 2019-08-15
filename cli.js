#!/usr/bin/env node
'use strict';
// const meow = require('meow');
// const unicornFun = require('unicorn-fun');

// const cli = meow(`
// 	Usage
// 	  $ unicorn-fun [input]

// 	Options
// 	  --postfix  Lorem ipsum  [Default: rainbows]

// 	Examples
// 	  $ cli-name
// 	  unicorns & rainbows
// 	  $ cli-name ponies
// 	  ponies & rainbows
// `, {
// 	flags: {
// 		postfix: {
// 			type: 'string',
// 			default: 'rainbows'
// 		}
// 	}
// });

// console.log(moduleName(cli.input[0] || 'unicorns', cli.flags));



// POSTGRAPHILE
// import express from "express";
// import pgdbi from "@graphile-contrib/pgdbi";
// import { postgraphile, makePluginHook } from "postgraphile";
// import mutationHooks from "./mutation-hooks";
const express = require('express')
const pgdbi = require('@graphile-contrib/pgdbi')
const postgraphile = require('postgraphile').postgraphile
const makePluginHook = require('postgraphile').makePluginHook

const app = express();
const pluginHook = makePluginHook([pgdbi]);

const postgresConnection = process.env.POSTGRES_CONNECTION
const schemataToGraphql = process.env.SCHEMATA_TO_GRAPHQL
const port = process.env.PORT

const schema = postgraphile(
  postgresConnection,
  schemataToGraphql.split(","),
  {
    pluginHook,
    enableCors: true,
    enablePgdbi: true,
    disableDefaultMutations: true,
    dynamicJson: true,
    disableQueryLog: true,
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
  }
);

app.use(schema);

// app.use('/api', api)
// app.use(function (err, req, res, next) {
//   clog.error('WE GOT US A SERVER SIDE ERROR', err.stack)
//   res.status(500).send('Something broke!')
// })

const server = app.listen(port);

/*
 * When being used in nodemon, SIGUSR2 is issued to restart the process. We
 * listen for this and shut down cleanly.
 */
process.once("SIGUSR2", function() {
  server.close();
  const t = setTimeout(function() {
    process.kill(process.pid, "SIGUSR2");
  }, 200);
  // Don't prevent clean shutdown:
  t.unref();
});

console.log(`listening on ${port}`);
console.log(`http://localhost:${port}/pgdbi`)
console.log(`http://localhost:${port}/graphiql`)