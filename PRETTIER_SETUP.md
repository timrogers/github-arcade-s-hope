# Prettier & ESLint Setup

This project uses Prettier as an ESLint plugin to automatically format code.

## How it works

- **ESLint** runs with Prettier integration via `eslint-plugin-prettier`
- **Pre-push hook** automatically runs linting before each push using Husky
- Prettier formatting errors are treated as ESLint errors

## Commands

- `npm run lint` - Run ESLint with Prettier checks
- `npm run lint:fix` - Automatically fix ESLint and Prettier issues

## Configuration

- **ESLint Config**: `eslint.config.js`
- **Prettier Config**: `.prettierrc`
- **Pre-push Hook**: `.husky/pre-push`

## What happens on push

When you run `git push`, the pre-push hook will:
1. Run `npm run lint`
2. Check all files for linting and formatting issues
3. Block the push if there are any errors

To fix issues before pushing, run `npm run lint:fix`.
