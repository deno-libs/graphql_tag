import { buildASTSchema, graphql } from 'https://deno.land/x/graphql_deno@v15.0.0/mod.ts'
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
  hello: () => 'world'
}

const schema = buildASTSchema(typeDefs)

console.log(await graphql(schema, query, resolvers))
