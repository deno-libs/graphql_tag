import { buildASTSchema } from 'https://esm.sh/graphql@16.6.0/utilities#='
import { expect, it, run } from 'https://deno.land/x/tincan@1.0.2/mod.ts'
import { gql } from './mod.ts'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

it('Returns a valid document node', () => {
  expect(typeDefs.kind).toBe('Document')
})

it('Creates a valid schema from AST', () => {
  const schema = buildASTSchema(typeDefs)

  expect(typeof schema === 'object').toBe(true)
})

run()
