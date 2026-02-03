# AGENTS.md - Recommendwell Project Guidelines

This file provides guidelines for AI agents working on the recommendwell project.

## Project Overview

**Recommendwell** - A recommendation platform with Next.js, Convex, and TypeScript.

## Repository Structure

```
recommendwell/
├── app/                 # Next.js App Router pages
├── components/          # React components
├── convex/             # Convex backend functions
├── lib/                # Utility functions
└── ...
```

## Git Workflow

This project uses a forked repository model:

- **upstream**: `git@github.com:amittam104/recommendwell` (main repo)
- **origin**: `git@github.com:amittambulkar96/recommendwell` (your fork)

## Standard Commands

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Run type checking
bun typecheck

# Run linting
bun lint

# Run tests
bun test
```

## Branch Naming Convention

- `feature/` - New features (e.g., `feature/add-user-profile`)
- `fix/` - Bug fixes (e.g., `fix/login-error`)
- `docs/` - Documentation changes
- ` chore/` - Maintenance tasks

## Pull Request Workflow

When working on features:

1. **Fetch latest upstream:**
   ```bash
   git fetch upstream
   ```

2. **Create feature branch from main:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make changes and commit:**
   ```bash
   git add .
   git commit -m "Add feature description"
   ```

4. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request:**
   - Go to: https://github.com/amittambulkar96/recommendwell
   - Click "Contribute" → "Open pull request"
   - Target: `amittam104/recommendwell` main branch
   - Title: Clear description of changes
   - Body: Explain what and why

## Before Creating PR

Ensure:
- [ ] Code passes linting: `bun lint`
- [ ] Type checking passes: `bun typecheck`
- [ ] Tests pass: `bun test`
- [ ] Changes are in a dedicated feature branch
- [ ] Commit messages are clear

## Code Style

- Use TypeScript
- Follow existing component patterns
- Use TailwindCSS for styling
- Follow the project's import conventions

## Communication

- Use descriptive branch names
- Write clear commit messages
- Provide detailed PR descriptions
