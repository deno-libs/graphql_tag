import { buildASTSchema, graphql } from 'graphql'
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
