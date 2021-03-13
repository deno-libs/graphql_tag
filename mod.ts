import { parse } from 'https://deno.land/x/graphql_deno@v15.0.0/mod.ts'

// Strip insignificant whitespace
// Note that this could do a lot more, such as reorder fields etc.
const normalize = (x: string) => x.replace(/[\s,]+/g, ' ').trim()

// A map docString -> graphql document
let docCache: any = {}

// A map fragmentName -> [normalized source]
let fragmentSourceMap: any = {}

function cacheKeyFromLoc(loc: any) {
  return normalize(loc.source.body.substring(loc.start, loc.end))
}

// For testing.
export function resetCaches() {
  docCache = {}
  fragmentSourceMap = {}
}

// Take a unstripped parsed document (query/mutation or even fragment), and
// check all fragment definitions, checking for name->source uniqueness.
// We also want to make sure only unique fragments exist in the document.
let printFragmentWarnings = true
function processFragments(ast: any) {
  const astFragmentMap: any = {}
  const definitions: any[] = []

  for (let i = 0; i < ast.definitions.length; i++) {
    const fragmentDefinition = ast.definitions[i]

    if (fragmentDefinition.kind === 'FragmentDefinition') {
      const fragmentName = fragmentDefinition.name.value
      const sourceKey = cacheKeyFromLoc(fragmentDefinition.loc)

      // We know something about this fragment
      if (fragmentSourceMap.hasOwnProperty(fragmentName) && !fragmentSourceMap[fragmentName][sourceKey]) {
        // this is a problem because the app developer is trying to register another fragment with
        // the same name as one previously registered. So, we tell them about it.
        if (printFragmentWarnings) {
          console.warn(
            'Warning: fragment with name ' +
              fragmentName +
              ' already exists.\n' +
              'graphql-tag enforces all fragment names across your application to be unique; read more about\n' +
              'this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names'
          )
        }

        fragmentSourceMap[fragmentName][sourceKey] = true
      } else if (!fragmentSourceMap.hasOwnProperty(fragmentName)) {
        fragmentSourceMap[fragmentName] = {}
        fragmentSourceMap[fragmentName][sourceKey] = true
      }

      if (!astFragmentMap[sourceKey]) {
        astFragmentMap[sourceKey] = true
        definitions.push(fragmentDefinition)
      }
    } else {
      definitions.push(fragmentDefinition)
    }
  }

  ast.definitions = definitions
  return ast
}

export function disableFragmentWarnings() {
  printFragmentWarnings = false
}

function stripLoc(doc: any, removeLocAtThisLevel: any) {
  let docType = Object.prototype.toString.call(doc)

  if (docType === '[object Array]') {
    return doc.map(function (d: any) {
      return stripLoc(d, removeLocAtThisLevel)
    })
  }

  if (docType !== '[object Object]') {
    throw new Error('Unexpected input.')
  }

  // We don't want to remove the root loc field so we can use it
  // for fragment substitution (see below)
  if (removeLocAtThisLevel && doc.loc) {
    delete doc.loc
  }

  // https://github.com/apollographql/graphql-tag/issues/40
  if (doc.loc) {
    delete doc.loc.startToken
    delete doc.loc.endToken
  }

  const keys = Object.keys(doc)
  let key
  let value
  let valueType

  for (key in keys) {
    if (keys.hasOwnProperty(key)) {
      value = doc[keys[key]]
      valueType = Object.prototype.toString.call(value)

      if (valueType === '[object Object]' || valueType === '[object Array]') {
        doc[keys[key]] = stripLoc(value, true)
      }
    }
  }

  return doc
}

let experimentalFragmentVariables = false

function parseDocument(doc: string) {
  const cacheKey = normalize(doc)

  if (docCache[cacheKey]) {
    return docCache[cacheKey]
  }

  let parsed = parse(doc, {
    experimentalFragmentVariables
  })
  if (!parsed || parsed.kind !== 'Document') {
    throw new Error('Not a valid GraphQL document.')
  }

  // check that all "new" fragments inside the documents are consistent with
  // existing fragments of the same name
  parsed = processFragments(parsed)
  parsed = stripLoc(parsed, false)
  docCache[cacheKey] = parsed

  return parsed
}

export function enableExperimentalFragmentletiables() {
  experimentalFragmentVariables = true
}

export function disableExperimentalFragmentVariables() {
  experimentalFragmentVariables = false
}

// XXX This should eventually disallow arbitrary string interpolation, like Relay does
export function gql(...args: any[]) {
  // We always get literals[0] and then matching post literals for each arg given
  const literals = args[0]
  let result = typeof literals === 'string' ? literals : literals[0]

  for (let i = 1; i < args.length; i++) {
    if (args[i] && args[i].kind && args[i].kind === 'Document') {
      result += args[i].loc.source.body
    } else {
      result += args[i]
    }

    result += literals[i]
  }

  return parseDocument(result)
}
