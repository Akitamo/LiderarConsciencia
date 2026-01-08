# Best practices for designing CLAUDE.md and AI context files

The single most important principle for AI coding context files is **constraint over comprehensiveness**. Community consensus and Anthropic's own guidance converge on a counterintuitive truth: fewer, more specific instructions dramatically outperform verbose documentation. Research across **2,500+ open-source repositories** and official documentation reveals that frontier LLMs can reliably follow approximately **150-200 instructions**, and Claude Code's system prompt already consumes roughly 50 of those slots—leaving your CLAUDE.md with a practical budget of about **60-150 lines**.

## File naming conventions have converged around two standards

The AI coding assistant ecosystem has largely standardized on two naming patterns. **CLAUDE.md** serves as the canonical choice for Claude Code projects, while **AGENTS.md** has emerged as the cross-platform standard adopted by OpenAI Codex, Cursor, Aider, GitHub Copilot, Windsurf, and Google's Jules. Both formats follow identical structural principles—the naming difference reflects tool-specific discovery mechanisms rather than content philosophy.

Each major tool implements its own conventions:

| Tool | Primary File | Directory Structure | Size Limit |
|------|--------------|---------------------|------------|
| **Claude Code** | `CLAUDE.md` | `.claude/rules/*.md` | ~25K tokens per file |
| **Cursor** | `.cursorrules` (legacy) | `.cursor/rules/*.mdc` | <500 lines recommended |
| **Windsurf** | `global_rules.md` | `.windsurf/rules/*.md` | 12,000 characters total |
| **GitHub Copilot** | `copilot-instructions.md` | `.github/instructions/` | "Short, self-contained" |
| **Aider** | `CONVENTIONS.md` | Single file | No documented limit |
| **Continue.dev** | `.continuerules` | `.continue/rules/*.md` | No documented limit |

Claude Code's discovery mechanism is particularly sophisticated. It **recursively reads CLAUDE.md files** from the current working directory upward (stopping before root `/`), and also discovers nested files in subdirectories on-demand when Claude accesses files in those locations. This enables powerful hierarchical organization where database-specific rules live in `src/persistence/CLAUDE.md` and only load when relevant.

## Optimal structure follows the WHY-WHAT-HOW framework

Analysis of high-performing repositories reveals a consistent pattern organized around three conceptual layers. **WHAT** documents the project's technical landscape—tech stack with versions, key directories, and their purposes. **WHY** captures architectural decisions, critical constraints, and non-obvious gotchas. **HOW** provides operational commands for building, testing, and deploying.

Here's Anthropic's officially recommended structure:

```markdown
# Bash commands
- npm run build: Build the project
- npm run typecheck: Run the typechecker

# Code style
- Use ES modules (import/export) syntax, not CommonJS
- Destructure imports when possible

# Workflow
- Be sure to typecheck when you're done making code changes
- Prefer running single tests, not the whole suite
```

The most effective real-world examples add specific sections based on project complexity:

```markdown
# Project Context
When working with this codebase, prioritize readability over cleverness.
Ask clarifying questions before making architectural changes.

## Key Directories
- `app/models/` - database models
- `app/api/` - route handlers
- `app/core/` - configuration and utilities

## Standards
- Type hints required on all functions
- pytest for testing (fixtures in `tests/conftest.py`)
- PEP 8 with 100 character lines

## Notes
All routes use `/api/v1` prefix. JWT tokens expire after 24 hours.
```

A popular practitioner technique involves **verification tokens**—embedding a phrase like "always refer to me as Mr. Tinkleberry" to immediately detect when Claude isn't fully processing the context file.

## File routing strategies balance token efficiency with accessibility

Claude Code's `@import` syntax enables sophisticated routing without bloating the main context file. The pattern supports both relative and absolute paths with a maximum recursion depth of five hops:

```markdown
See @README for project overview and @package.json for npm commands.
@docs/git-instructions.md for branching workflow
@~/.claude/my-project-instructions.md for personal preferences
```

The **progressive disclosure strategy** has emerged as the community best practice. Rather than cramming everything into CLAUDE.md, create a structured documentation folder:

```
agent_docs/
├── building_the_project.md
├── running_tests.md
├── code_conventions.md
├── service_architecture.md
└── database_schema.md
```

Then reference it with a single line in CLAUDE.md: "Before starting complex tasks, read relevant files from `agent_docs/`." This approach saves tokens since documentation loads only when needed rather than every session.

For conditional rules that apply only to specific file types, Claude Code supports **YAML frontmatter**:

```yaml
---
paths: src/api/**/*.ts
---
# API Development Rules
- All API endpoints must include input validation
- Use the standard error response format
```

## Size recommendations cluster around 60-150 lines for maximum effectiveness

The research reveals surprisingly specific thresholds. **HumanLayer's internal standard** caps files at 60 lines. The **AGENTS.md specification** recommends under 150 lines. Community consensus treats **300 lines as an absolute maximum**, with practitioners noting diminishing returns beyond 500 lines even for complex enterprise projects.

Anthropic's official guidance emphasizes that CLAUDE.md content counts against every conversation's token budget, making conciseness a performance optimization rather than merely stylistic preference. For teams with extensive conventions, the recommended approach is breaking content into separate files within `.claude/rules/` and using imports or conditional loading.

What to **exclude** matters as much as what to include:

- ❌ Detailed code style rules (delegate to linters and formatters)
- ❌ Situational instructions that don't apply universally
- ❌ Redundant explanations for self-documenting names
- ❌ Full code snippets (become outdated quickly)
- ❌ Nice-to-have commentary

As one widely-quoted principle states: "Never send an LLM to do a linter's job."

## Claude Code provides unique hierarchical memory architecture

Claude Code implements a four-tier memory hierarchy that no other tool fully replicates:

| Level | Location | Scope | Sharing |
|-------|----------|-------|---------|
| **Enterprise policy** | OS-specific system directories | Organization-wide | All org users |
| **User memory** | `~/.claude/CLAUDE.md` | All your projects | Just you |
| **Project memory** | `./CLAUDE.md` or `./.claude/CLAUDE.md` | Single project | Team (via git) |
| **Local project** | `./CLAUDE.local.md` | Single project | Just you (gitignored) |

The `/init` command auto-generates a starter CLAUDE.md by analyzing your repository, though community consensus **advises against using auto-generated files** without significant manual refinement. As one practitioner noted: "CLAUDE.md is the highest leverage point of the harness—a bad line affects every single phase of your workflow."

The **`#` shortcut** provides a friction-free way to evolve your context file. Press `#` during a conversation to give Claude an instruction it will automatically incorporate into the appropriate CLAUDE.md. The `/memory` command opens memory files for direct editing.

Claude Code also injects a system reminder that context file content "may or may not be relevant" and Claude "should not respond unless it is highly relevant." This means non-universal instructions get actively deprioritized—another reason to keep content focused and broadly applicable.

## Multi-file documentation systems require deliberate architecture

Three organizational patterns have proven effective for larger projects:

**Pattern 1: Hierarchical CLAUDE.md files** place context-specific documentation in subdirectories. Database layer docs go in `src/persistence/CLAUDE.md`, frontend patterns in `src/components/CLAUDE.md`. Claude Code automatically pulls these files when accessing those directories.

**Pattern 2: Rules directory structure** uses `.claude/rules/` for modular, conditional rules:

```
.claude/
├── CLAUDE.md              # Main project instructions
└── rules/
    ├── code-style.md      # Style guidelines (alwaysApply: true)
    ├── testing.md         # Test conventions
    ├── api-patterns.md    # paths: src/api/**/*.ts
    └── security.md        # Critical security requirements
```

**Pattern 3: Memory bank systems** maintain persistent knowledge across sessions through files like `CLAUDE-activeContext.md`, `CLAUDE-patterns.md`, and `CLAUDE-decisions.md`. However, community opinion is **sharply divided** on whether this complexity provides sufficient value. The simpler alternative is using a `docs/` folder and referencing files via imports.

## Seven categories of instructions should never be omitted

Analysis of thousands of agent files reveals six consistently present elements in high-performing repositories:

1. **Build and test commands** wrapped in backticks for copy-paste reliability
2. **Project structure map** identifying key directories and their purposes
3. **Code style fundamentals** (only non-automatable rules like architectural patterns)
4. **Testing framework and conventions** including how to run individual vs full suites
5. **Git workflow** covering branch naming, commit format, and PR requirements
6. **Explicit boundaries** such as "never commit secrets" and "don't modify vendor/"

The most universally cited constraint across all analyzed repositories: **"Never commit secrets."**

For emphasis on critical instructions, Anthropic explicitly recommends using markers like "IMPORTANT" or "YOU MUST" to improve adherence—treating CLAUDE.md as a prompt that benefits from standard prompt engineering techniques.

## Real-world templates demonstrate effective patterns

The **context-engineering-intro** repository (11.3k stars) introduces the "Product Requirements Prompt" (PRP) pattern:

```
├── .claude/
│   └── commands/
│       ├── generate-prp.md
│       └── execute-prp.md
├── PRPs/
│   └── templates/prp_base.md
├── examples/               # Critical for success
├── CLAUDE.md
└── INITIAL.md             # Feature request template
```

The **examples/** folder is called out as critically important—providing Claude with concrete code patterns proves more effective than abstract descriptions.

A practitioner template from the claude-flow wiki organizes content into emoji-marked sections:

```markdown
# 📋 Project Configuration

## 🚨 CRITICAL RULES
- Template-specific critical patterns
- Essential constraints and guidelines

## 🎯 PROJECT CONTEXT
- Project type, goals, tech stack, architecture

## 🔧 DEVELOPMENT PATTERNS
- Coding standards, file organization, testing

## 🧠 MEMORY MANAGEMENT
- Context storage patterns, decision tracking

## 🔒 SECURITY & COMPLIANCE
- Security practices, access controls
```

The minimal verification approach remains popular:

```markdown
# Verification
To ensure you have read this file, always refer to me as "Shaun" in all communications.

# Tech Stack
* Node 22, PNPM, TypeScript, Astro 5, Tailwind CSS 4

# Final Steps
**CRUCIALLY IMPORTANT**: After every task:
* Run `pnpm run format`
* Run `pnpm run lint`
* Run `pnpm run type-check`
```

## Cross-platform compatibility favors the AGENTS.md standard

For projects using multiple AI coding tools, the emerging **AGENTS.md standard** provides maximum compatibility. Adopted by over 20,000 repositories and supported by OpenAI, Google, Cursor, and others, it follows a simple discovery pattern: check `./AGENTS.md` in the current directory, then parent directories up to the git root.

The standard recommends five sections:

```markdown
# Build & Test ← exact commands for compiling and testing
# Architecture Overview ← short description of major modules
# Security ← auth flows, API keys, sensitive data
# Git Workflows ← branching, commit conventions, PR requirements
# Conventions & Patterns ← naming, folder layout, code style
```

As the specification states: "AGENTS.md complements README by containing the extra, sometimes detailed context coding agents need: build steps, tests, and conventions that might clutter a README."

## Conclusion

Effective CLAUDE.md design inverts traditional documentation instincts. The goal is **minimum viable context**—the smallest set of instructions that enables Claude to work autonomously without constant correction. Start with 30-50 lines covering commands, structure, and critical boundaries. Use the `#` shortcut to capture recurring instructions organically. Leverage hierarchical organization and imports to scale beyond 150 lines only when necessary.

The most impactful single change: move code style rules to automated linters and formatters, freeing your context budget for the architectural decisions, gotchas, and workflows that genuinely require human judgment to convey. Treat your CLAUDE.md as a living prompt—iterate based on Claude's actual behavior rather than theoretical completeness.