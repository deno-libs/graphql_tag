import { buildASTSchema } from 'graphql'
import { describe, it } from '@std/testing/bdd'
import { expect } from '@std/expect'
import {
  disableExperimentalFragmentArguments,
  disableFragmentWarnings,
  enableExperimentalFragmentArguments,
  gql,
  resetCaches,
} from './mod.ts'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

describe('gql', () => {
  it('Returns a valid document node', () => {
    expect(typeDefs.kind).toBe('Document')
  })

  it('Creates a valid schema from AST', () => {
    const schema = buildASTSchema(typeDefs)

    expect(typeof schema === 'object').toBe(true)
  })

  it('Caches documents by normalized source', () => {
    expect(gql`{ hello }`).toBe(gql`{   hello   }`)
  })

  it('Strips location tokens from the cached document', () => {
    const doc = gql`{ stripped }`

    expect(doc.loc?.startToken).toBe(undefined)
    expect(doc.loc?.endToken).toBe(undefined)
  })

  it('Supports interpolating other documents', () => {
    const fragment = gql`
      fragment Name on Query {
        hello
      }
    `
    const doc = gql`
      { ...Name }
      ${fragment}
    `

    expect(doc.definitions.length).toBe(2)
  })

  it('Deduplicates identical fragments', () => {
    disableFragmentWarnings()
    resetCaches()

    const doc = gql`
      fragment Dup on Query { hello }
      fragment Dup on Query { hello }
      { ...Dup }
    `

    expect(doc.definitions.length).toBe(2)
  })

  it('Accepts a plain string', () => {
    expect(gql('{ plain }').kind).toBe('Document')
  })

  it('Parses fragment arguments when experimentally enabled', () => {
    resetCaches()

    const source = `
      { t { ...A(var: true) } }
      fragment A($var: Boolean = false) on T { name }
    `

    expect(() => gql(source)).toThrow()

    resetCaches()
    enableExperimentalFragmentArguments()

    expect(gql(source).kind).toBe('Document')

    disableExperimentalFragmentArguments()
    resetCaches()
  })
})
