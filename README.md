# graphql-tag

[![GitHub release (latest by date)][releases]][releases-page] [![GitHub Workflow Status][gh-actions-img]][github-actions]
[![Codecov][codecov-badge]][codecov] [![][docs-badge]][docs]

> 🦕 Deno port of [graphql-tag](https://github.com/apollographql/graphql-tag) library.

Create a GraphQL schema AST from template literal.

## Example

```ts
import { buildASTSchema, graphql } from 'https://deno.land/x/graphql_deno@v15.0.0/mod.ts'
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
[docs-badge]: https://img.shields.io/github/v/release/deno-libs/graphql_tag?color=yellow&label=Documentation&logo=deno&style=flat-square
[docs]: https://doc.deno.land/https/deno.land/x/graphql_tag/mod.ts
[releases-page]: https://github.com/deno-libs/graphql-tag/releases
[gh-actions-img]: https://img.shields.io/github/workflow/status/deno-libs/graphql-tag/CI?style=flat-square
[codecov]: https://codecov.io/gh/deno-libs/graphql-tag
[github-actions]: https://github.com/deno-libs/graphql-tag/actions
[codecov-badge]: https://img.shields.io/codecov/c/gh/deno-libs/graphql-tag?style=flat-square

## Donate

[![PayPal](https://img.shields.io/badge/PayPal-cyan?style=flat-square&logo=paypal)](https://paypal.me/v1rtl) [![ko-fi](https://img.shields.io/badge/kofi-pink?style=flat-square&logo=ko-fi)](https://ko-fi.com/v1rtl) [![Qiwi](https://img.shields.io/badge/qiwi-white?style=flat-square&logo=qiwi)](https://qiwi.com/n/V1RTL) [![Yandex Money](https://img.shields.io/badge/Yandex_Money-yellow?style=flat-square&logo=yandex)](https://money.yandex.ru/to/410014774355272)

[![Bitcoin](https://badge-crypto.vercel.app/api/badge?coin=btc&address=3PxedDftWBXujWtr7TbWQSiYTsZJoMD8K5)](https://badge-crypto.vercel.app/btc/3PxedDftWBXujWtr7TbWQSiYTsZJoMD8K5) [![Ethereum](https://badge-crypto.vercel.app/api/badge?coin=eth&address=0x9d9236DC024958D7fB73Ad9B178BD5D372D82288)
](https://badge-crypto.vercel.app/eth/0x9d9236DC024958D7fB73Ad9B178BD5D372D82288) [![ChainLink](https://badge-crypto.vercel.app/api/badge?coin=link&address=0x9d9236DC024958D7fB73Ad9B178BD5D372D82288)](https://badge-crypto.vercel.app/link/0xcd0da1c9b0DA7D2b862bbF813cB50f76F2fB4F5d)
