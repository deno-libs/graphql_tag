# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Deno port of Apollo's graphql-tag library. Provides a `gql` template literal function that parses GraphQL schema definitions into AST DocumentNode objects with caching.

## Development Commands

```bash
# Run tests with coverage
deno task test

# Generate LCOV coverage report
deno task cov

# Format code
deno fmt

# Lint code
deno lint

# Publish to JSR (dry-run first)
deno publish --dry-run
deno publish
```

## Code Style

- Single quotes, no semicolons
- 2-space indentation, 120-char line width
- TypeScript throughout

## Architecture

**mod.ts** - Single-file library containing:
- `gql()` template literal function (main export)
- Document caching by normalized source text
- Fragment deduplication with warnings for conflicting definitions
- AST location stripping for memory efficiency
- Utility functions: `resetCaches()`, `disableFragmentWarnings()`, `enableExperimentalFragmentVariables()`

**deps.ts** - GraphQL 16.12.0 via npm: specifier

**mod_test.ts** - Tests using tincan framework
