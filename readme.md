
# pgdbi-cli

> My awesome command-line tool


## Install

```
$ npm install --global pgdbi-cli
```


## Usage

```
pgdbi-cli

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
```
