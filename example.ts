import { graphql } from 'https://esm.sh/graphql@16.8.1#='
import { buildASTSchema } from 'https://esm.sh/graphql@16.8.1/utilities#='
import { gql } from './mod.ts'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const query = `
{
  hello
}
`

const resolvers = {
  hello: () => 'world',
}

const schema = buildASTSchema(typeDefs)

console.log(await graphql({ schema, source: query, rootValue: resolvers }))
