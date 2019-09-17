
# pgdbi-cli

a command line tool to easily run pgdbi


## Install

```
$ npm install --global pgdbi
```

## Usage
```
$ pgdbi

pgdbi

Options:
  --help                     Show help                                 [boolean]
  --version                  Show version number                       [boolean]
  -v, --verbose                            [boolean] [required] [default: false]
  -c, --postgres-connection  postgres connection uri: https://www.postgresql.org
                             /docs/10/libpq-connect.html#id-1.7.3.8.3.6
                                                                      [required]
  -s, --schemata-to-graphql  comma-delimited list of schemas to expose via
                             postgraphile.  ex: "schema_one,schema_two"
                                                                      [required]
  -p, --port                 the port on which to expose pgdbi
                                                        [number] [default: 5000]
  -q, --enable-sqitch        sqitch inspector will be enabled
                                                      [boolean] [default: false]```
```
-- example using docker for postgres

pgdbi -c postgres://postgres:1234@0.0.0.0/pg_phile_starter -s auth,auth_fn,org,org_fn,prj
```

or, using npx
```
npx pgdbi -c postgres://postgres:1234@0.0.0.0/pg_phile_starter -s auth,auth_fn,org,org_fn,prj
```