#!/usr/bin/env node
'use strict';
const express = require('express')
const open = require('open')
const pgdbi = require('@graphile-contrib/pgdbi')
const postgraphile = require('postgraphile').postgraphile
const makePluginHook = require('postgraphile').makePluginHook

// const postgresConnection = process.env.POSTGRES_CONNECTION
// const schemataToGraphql = process.env.SCHEMATA_TO_GRAPHQL
// const port = process.env.PORT

function startServer(postgresConnection, schemataToGraphql, port, options){
	const app = express();
	const pluginHook = makePluginHook([pgdbi]);
	
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
			pgdbi: options
		}
	);
	
	app.use(schema);
	
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
	console.log(`http://localhost:${port}/graphiql`)
	console.log(`http://localhost:${port}/pgdbi`)
	
	open(`http://localhost:${port}/pgdbi`)
}

module.exports = startServer