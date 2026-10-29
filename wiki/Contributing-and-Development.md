# Contributing & Development Standards

This document establishes the collaboration standards, branching models, commit message specifications, and quality verification steps for all contributors to the Restaurant Ecosystem repository.

---

## Branching Model

1. **Default Branch**: `main` represents production-ready, deployable code.
2. **Feature & Fix Branches**: Create focused branches off `main` using structured prefixes:
   - `feat/<feature-name>`: New functionality or architecture additions.
   - `fix/<issue-name>`: Bug fixes and security patches.
   - `docs/<doc-name>`: Documentation, wiki, or README updates.
   - `chore/<task-name>`: Dependency updates, CI/CD, or tooling maintenance.

```bash
git checkout main
git pull origin main
git checkout -b feat/menu-nutrition-badges
```

---

## Commit Message Standards (Conventional Commits)

All commits in this repository must follow the Conventional Commits specification. 

### Format
```text
<type>(<scope>): <imperative summary under 50 chars>

<detailed body explaining the change and why it was made>

Co-authored-by: Vyshnavi Nagavelli <nagavellivyshnavi3@gmail.com>
```

### Commit Types
- `feat`: A new feature or user-facing functionality.
- `fix`: A bug fix or patch.
- `docs`: Documentation changes only.
- `refactor`: Code restructuring without modifying behavior.
- `test`: Adding or modifying automated tests.
- `chore`: Tooling, build config, or dependency updates.

### Mandatory Co-Authorship Trailer
Every commit must conclude with the official co-authorship trailer:
```text
Co-authored-by: Vyshnavi Nagavelli <nagavellivyshnavi3@gmail.com>
```

---

## Pre-Commit Quality Checklist

Before committing or opening a pull request, run the following commands from the repository root:

1. **Type Checking**:
   ```bash
   pnpm turbo run typecheck
   ```
   *Ensures zero TypeScript errors across all 7 workspace packages.*

2. **Linting**:
   ```bash
   pnpm turbo run lint
   ```
   *Enforces ESLint and React hooks best practices.*

3. **Production Compilation**:
   ```bash
   pnpm turbo run build
   ```
   *Verifies that Next.js Turbopack compiles all four applications successfully without bundling issues.*

---

## Pull Request Guidelines

1. **Title**: Follow the same conventional commit format (e.g. `feat(ui): add cross-restaurant ecosystem switcher`).
2. **Description**:
   - Provide context on what was changed and why.
   - List the applications or shared packages impacted.
   - Document any new environment variables required.
   - Note test and verification commands executed.
3. **Draft Mode**: Open long-running or exploratory work as a Draft PR.
4. **Clean Git History**: Rebase against `origin/main` if the default branch has advanced during development.
