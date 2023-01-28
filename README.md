# graphql-tag

[![GitHub release (latest by date)][releases]][releases-page] [![GitHub Workflow Status][gh-actions-img]][github-actions]
[![Codecov][codecov-badge]][codecov] [![][docs-badge]][docs]

> 🦕 Deno port of [graphql-tag](https://github.com/apollographql/graphql-tag) library.

Create a GraphQL schema AST from template literal.

## Example

```ts
import { buildASTSchema, graphql } from 'https://esm.sh/graphql@16.6.0'
import { gql } from 'https://deno.land/x/graphql_tag/mod.ts'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const query = `{ hello }`

const resolvers = { hello: () => 'world' }

const schema = buildASTSchema(typeDefs)

console.log(await graphql(schema, query, resolvers))
```

[releases]: https://img.shields.io/github/v/release/deno-libs/graphql-tag?style=flat-square
[docs-badge]: https://img.shields.io/github/v/release/deno-libs/graphql-tag?color=yellow&label=Documentation&logo=deno&style=flat-square
[docs]: https://doc.deno.land/https/deno.land/x/graphql_tag/mod.ts
[releases-page]: https://github.com/deno-libs/graphql-tag/releases
[gh-actions-img]: https://img.shields.io/github/actions/workflow/status/deno-libs/graphql-tag/main.yml?branch=master&style=flat-square
[codecov]: https://codecov.io/gh/deno-libs/graphql_tag
[github-actions]: https://github.com/deno-libs/graphql-tag/actions
[codecov-badge]: https://img.shields.io/codecov/c/gh/deno-libs/graphql_tag?style=flat-square
