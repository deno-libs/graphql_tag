import { buildASTSchema, isSchema } from 'https://deno.land/x/graphql_deno@v15.0.0/mod.ts'
import { it, expect, run } from 'https://deno.land/x/tincan/mod.ts'
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

  expect(isSchema(schema)).toBe(true)
})

run()
