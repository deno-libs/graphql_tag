import { DocumentNode, buildASTSchema, isSchema } from 'https://deno.land/x/graphql_deno@v15.0.0/mod.ts'
import { describe, it, run, expect } from 'https://deno.land/x/wizard@0.1.3/mod.ts'
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
