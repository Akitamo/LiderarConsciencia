# PAI - Ejemplos de Código y Patrones de Implementación

**Complemento técnico al análisis principal**
**Fecha:** 2026-01-07

---

## TABLA DE CONTENIDOS

1. [Ejemplos Completos de Hooks](#1-ejemplos-completos-de-hooks)
2. [Skill Definitions Reales](#2-skill-definitions-reales)
3. [Workflow Patterns](#3-workflow-patterns)
4. [Tools CLI Examples](#4-tools-cli-examples)
5. [Pack Installation Scripts](#5-pack-installation-scripts)
6. [Observability Implementation](#6-observability-implementation)
7. [Voice System Integration](#7-voice-system-integration)
8. [Security Patterns](#8-security-patterns)
9. [History System Advanced](#9-history-system-advanced)
10. [Agent Orchestration Patterns](#10-agent-orchestration-patterns)

---

## 1. EJEMPLOS COMPLETOS DE HOOKS

### 1.1 SessionStart Hook - Context Loader

```typescript
#!/usr/bin/env bun
/**
 * ~/.claude/hooks/session-start/load-core-context.ts
 * Loads CORE skill and user identity at session start
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface CoreContext {
  constitution: string;
  skillSystem: string;
  hookSystem: string;
  identity: string;
}

async function loadCoreContext(): Promise<CoreContext> {
  const PAI_DIR = process.env.PAI_DIR;
  if (!PAI_DIR) {
    throw new Error('PAI_DIR environment variable not set');
  }

  const skillsDir = join(PAI_DIR, '.claude', 'Skills', 'CORE');

  const context: CoreContext = {
    constitution: '',
    skillSystem: '',
    hookSystem: '',
    identity: ''
  };

  // Load core files
  const files = [
    { key: 'constitution', path: 'CONSTITUTION.md' },
    { key: 'skillSystem', path: 'SkillSystem.md' },
    { key: 'hookSystem', path: 'HookSystem.md' },
    { key: 'identity', path: 'IDENTITY.md' }
  ];

  for (const file of files) {
    const filePath = join(skillsDir, file.path);
    if (existsSync(filePath)) {
      context[file.key as keyof CoreContext] = readFileSync(filePath, 'utf-8');
    } else {
      console.warn(`Warning: ${file.path} not found`);
    }
  }

  return context;
}

async function main() {
  console.log('🚀 Loading PAI CORE context...\n');

  try {
    const context = await loadCoreContext();

    // Output context to Claude Code's system prompt
    console.log('# PAI CORE CONTEXT\n');
    console.log('## Constitution\n');
    console.log(context.constitution);
    console.log('\n## Skill System\n');
    console.log(context.skillSystem);
    console.log('\n## Hook System\n');
    console.log(context.hookSystem);
    console.log('\n## Identity\n');
    console.log(context.identity);

    console.log('\n✅ CORE context loaded successfully');
  } catch (error) {
    console.error('❌ Error loading CORE context:', error);
    // Don't exit with error - fail gracefully
  }
}

main();
```

### 1.2 PreToolUse Hook - Advanced Security Validator

```typescript
#!/usr/bin/env bun
/**
 * ~/.claude/hooks/pre-tool-use/security-validator.ts
 * Validates and blocks unsafe operations
 */

import { readStdin, logSecurityEvent } from '../lib/utils';

interface ValidationRule {
  name: string;
  pattern: RegExp;
  severity: 'critical' | 'high' | 'medium';
  message: string;
}

const COMMAND_RULES: ValidationRule[] = [
  {
    name: 'recursive-delete',
    pattern: /rm\s+(-[rf]+|--recursive|--force)/i,
    severity: 'critical',
    message: 'Recursive file deletion blocked'
  },
  {
    name: 'privilege-escalation',
    pattern: /sudo\s+/,
    severity: 'critical',
    message: 'Privilege escalation attempt blocked'
  },
  {
    name: 'disk-write',
    pattern: /dd\s+if=/,
    severity: 'critical',
    message: 'Direct disk write blocked'
  },
  {
    name: 'pipe-to-shell',
    pattern: /(curl|wget)\s+.*\|\s*(bash|sh|zsh)/,
    severity: 'critical',
    message: 'Pipe to shell from network source blocked'
  },
  {
    name: 'insecure-permissions',
    pattern: /chmod\s+777/,
    severity: 'high',
    message: 'Insecure file permissions blocked'
  },
  {
    name: 'environment-manipulation',
    pattern: /(export|set)\s+PATH=/,
    severity: 'high',
    message: 'PATH manipulation blocked'
  }
];

const URL_RULES = {
  allowedSchemes: ['http', 'https'],
  blockedIPs: [
    '127.0.0.1',
    'localhost',
    '0.0.0.0',
    '169.254.169.254', // AWS metadata
    '::1',              // IPv6 localhost
  ],
  privateNetworks: [
    /^10\./,
    /^172\.(1[6-9]|2\d|3[01])\./,
    /^192\.168\./,
    /^fd[0-9a-f]{2}:/i, // IPv6 private
  ]
};

class SecurityValidator {
  async validateCommand(cmd: string): Promise<{ allowed: boolean; reason?: string }> {
    for (const rule of COMMAND_RULES) {
      if (rule.pattern.test(cmd)) {
        await logSecurityEvent({
          type: 'command_blocked',
          severity: rule.severity,
          rule: rule.name,
          command: cmd,
          timestamp: new Date().toISOString()
        });

        return {
          allowed: false,
          reason: `${rule.message} (rule: ${rule.name})`
        };
      }
    }

    return { allowed: true };
  }

  async validateURL(url: string): Promise<{ allowed: boolean; reason?: string }> {
    try {
      const parsedURL = new URL(url);

      // Check scheme
      if (!URL_RULES.allowedSchemes.includes(parsedURL.protocol.replace(':', ''))) {
        return {
          allowed: false,
          reason: `Protocol ${parsedURL.protocol} not allowed`
        };
      }

      // Check for blocked IPs
      const hostname = parsedURL.hostname;
      if (URL_RULES.blockedIPs.includes(hostname)) {
        await logSecurityEvent({
          type: 'ssrf_blocked',
          severity: 'critical',
          url: url,
          reason: 'Blocked IP',
          timestamp: new Date().toISOString()
        });

        return {
          allowed: false,
          reason: 'Access to internal/metadata endpoints blocked (SSRF protection)'
        };
      }

      // Check for private networks
      for (const pattern of URL_RULES.privateNetworks) {
        if (pattern.test(hostname)) {
          return {
            allowed: false,
            reason: 'Access to private network blocked'
          };
        }
      }

      return { allowed: true };
    } catch (error) {
      return {
        allowed: false,
        reason: 'Invalid URL format'
      };
    }
  }

  async validateFileOperation(operation: string, path: string): Promise<{ allowed: boolean; reason?: string }> {
    const protectedPaths = [
      '/etc/passwd',
      '/etc/shadow',
      '/etc/sudoers',
      '/System',
      '/Library/System',
      '/.env',
      '/id_rsa',
      '/id_ed25519'
    ];

    for (const protected_ of protectedPaths) {
      if (path.includes(protected_)) {
        await logSecurityEvent({
          type: 'protected_file_access',
          severity: 'critical',
          operation: operation,
          path: path,
          timestamp: new Date().toISOString()
        });

        return {
          allowed: false,
          reason: `Access to protected path blocked: ${protected_}`
        };
      }
    }

    return { allowed: true };
  }
}

async function main() {
  const eventData = await readStdin();
  const validator = new SecurityValidator();

  let result: { allowed: boolean; reason?: string };

  switch (eventData.tool) {
    case 'bash':
      result = await validator.validateCommand(eventData.input.command);
      break;

    case 'fetch':
      result = await validator.validateURL(eventData.input.url);
      break;

    case 'edit':
    case 'write':
      result = await validator.validateFileOperation(
        eventData.tool,
        eventData.input.file_path
      );
      break;

    default:
      result = { allowed: true };
  }

  if (!result.allowed) {
    console.error(`🚫 SECURITY BLOCK: ${result.reason}`);
    console.error(`Tool: ${eventData.tool}`);
    console.error(`Input: ${JSON.stringify(eventData.input, null, 2)}`);
    process.exit(1); // Block operation
  }

  process.exit(0); // Allow operation
}

main().catch(err => {
  console.error('Security validator error:', err);
  process.exit(0); // Fail open to avoid breaking Claude Code
});
```

### 1.3 PostToolUse Hook - Complete Event Capture

```typescript
#!/usr/bin/env bun
/**
 * ~/.claude/hooks/post-tool-use/capture-all-events.ts
 * Captures all tool executions to history and observability
 */

import { appendFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { readStdin } from '../lib/utils';
import { sendToObservability } from '../lib/observability';

interface ToolEvent {
  timestamp: string;
  event: 'PostToolUse';
  sessionId: string;
  tool: string;
  input: any;
  output: any;
  exitCode?: number;
  duration: number;
  error?: string;
  metadata: {
    tokensUsed?: number;
    model?: string;
    agentType?: string;
  };
}

class EventCapture {
  private PAI_DIR: string;

  constructor() {
    this.PAI_DIR = process.env.PAI_DIR!;
    if (!this.PAI_DIR) {
      throw new Error('PAI_DIR not set');
    }
  }

  private ensureDirectoryExists(dirPath: string): void {
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }
  }

  private getLogFilePath(): string {
    const now = new Date();
    const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const yearMonth = date.substring(0, 7); // YYYY-MM

    const logDir = join(this.PAI_DIR, 'history', 'raw-outputs', yearMonth);
    this.ensureDirectoryExists(logDir);

    return join(logDir, `${date}_all-events.jsonl`);
  }

  async captureEvent(eventData: any): Promise<void> {
    const event: ToolEvent = {
      timestamp: new Date().toISOString(),
      event: 'PostToolUse',
      sessionId: process.env.CLAUDE_SESSION_ID || 'unknown',
      tool: eventData.tool,
      input: this.sanitizeInput(eventData.input),
      output: this.sanitizeOutput(eventData.output),
      exitCode: eventData.exitCode,
      duration: eventData.duration || 0,
      error: eventData.error,
      metadata: {
        tokensUsed: eventData.tokensUsed,
        model: eventData.model,
        agentType: eventData.agentType
      }
    };

    // Write to JSONL file
    const logFile = this.getLogFilePath();
    appendFileSync(logFile, JSON.stringify(event) + '\n');

    // Send to observability dashboard
    if (process.env.OBSERVABILITY_ENABLED === 'true') {
      await sendToObservability(event);
    }

    // Check for errors and alert if needed
    if (eventData.exitCode !== 0 || eventData.error) {
      await this.handleError(event);
    }
  }

  private sanitizeInput(input: any): any {
    // Remove sensitive data from input
    if (typeof input === 'object' && input !== null) {
      const sanitized = { ...input };

      // Remove common sensitive fields
      const sensitiveKeys = ['password', 'token', 'apiKey', 'secret', 'api_key'];
      for (const key of Object.keys(sanitized)) {
        if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
          sanitized[key] = '[REDACTED]';
        }
      }

      return sanitized;
    }

    return input;
  }

  private sanitizeOutput(output: any): any {
    // Truncate large outputs
    if (typeof output === 'string' && output.length > 10000) {
      return output.substring(0, 10000) + '\n... [truncated]';
    }

    return output;
  }

  private async handleError(event: ToolEvent): Promise<void> {
    // Log error to separate error log
    const errorLogDir = join(this.PAI_DIR, 'history', 'errors');
    this.ensureDirectoryExists(errorLogDir);

    const errorLogFile = join(
      errorLogDir,
      `${new Date().toISOString().split('T')[0]}_errors.jsonl`
    );

    appendFileSync(errorLogFile, JSON.stringify(event) + '\n');

    // Optionally: Send alert notification
    if (process.env.ERROR_ALERTS_ENABLED === 'true') {
      console.error(`⚠️  Tool execution error detected: ${event.tool}`);
      console.error(`Exit code: ${event.exitCode}`);
      console.error(`Error: ${event.error}`);
    }
  }
}

async function main() {
  const eventData = await readStdin();
  const capture = new EventCapture();

  try {
    await capture.captureEvent(eventData);
  } catch (error) {
    console.error('Event capture error:', error);
    // Don't exit with error - fail gracefully
  }
}

main();
```

### 1.4 Stop Hook - Session Summary and Categorization

```typescript
#!/usr/bin/env bun
/**
 * ~/.claude/hooks/stop/capture-session-summary.ts
 * Captures main agent completion and categorizes output
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { readStdin } from '../lib/utils';

interface StopEvent {
  sessionId: string;
  output: string;
  tokensUsed: number;
  duration: number;
  agentType?: string;
}

interface CategorizedOutput {
  category: 'learning' | 'research' | 'session' | 'decision' | 'feature' | 'bug' | 'refactor';
  title: string;
  summary: string;
  fullOutput: string;
  keywords: string[];
}

class SessionSummarizer {
  private PAI_DIR: string;

  private CATEGORY_KEYWORDS = {
    learning: ['learned', 'discovered', 'realized', 'insight', 'problem solved', 'bug fixed', 'pattern', 'understanding'],
    research: ['investigation', 'analysis', 'findings', 'comparison', 'evaluation', 'assessment', 'report', 'study'],
    decision: ['decided', 'chose', 'architecture', 'design decision', 'trade-off', 'selected', 'approach'],
    feature: ['implemented', 'added feature', 'new functionality', 'enhancement', 'capability'],
    bug: ['fixed bug', 'resolved issue', 'error fixed', 'debugging', 'crash fixed'],
    refactor: ['refactored', 'cleaned up', 'restructured', 'improved code', 'optimization']
  };

  constructor() {
    this.PAI_DIR = process.env.PAI_DIR!;
  }

  categorizeOutput(output: string): CategorizedOutput['category'] {
    const lowerOutput = output.toLowerCase();
    const scores: Record<string, number> = {};

    // Score each category
    for (const [category, keywords] of Object.entries(this.CATEGORY_KEYWORDS)) {
      scores[category] = keywords.filter(kw => lowerOutput.includes(kw.toLowerCase())).length;
    }

    // Find highest scoring category
    const maxScore = Math.max(...Object.values(scores));
    const category = Object.keys(scores).find(k => scores[k] === maxScore);

    return (category as CategorizedOutput['category']) || 'session';
  }

  extractTitle(output: string): string {
    // Try to extract title from markdown heading
    const headingMatch = output.match(/^#\s+(.+)$/m);
    if (headingMatch) {
      return headingMatch[1].trim();
    }

    // Try to extract from first line
    const firstLine = output.split('\n')[0].trim();
    if (firstLine.length > 10 && firstLine.length < 100) {
      return firstLine;
    }

    // Generate title from keywords
    const keywords = this.extractKeywords(output);
    return keywords.slice(0, 5).join(', ');
  }

  extractSummary(output: string): string {
    // Try to extract summary section
    const summaryMatch = output.match(/##?\s*Summary\s*\n+([\s\S]+?)(?=\n##|$)/i);
    if (summaryMatch) {
      return summaryMatch[1].trim();
    }

    // Extract first paragraph
    const paragraphs = output.split('\n\n').filter(p => p.trim().length > 50);
    if (paragraphs.length > 0) {
      return paragraphs[0].trim();
    }

    // Truncate to first 500 chars
    return output.substring(0, 500).trim() + '...';
  }

  extractKeywords(output: string): string[] {
    // Simple keyword extraction (in production, use NLP library)
    const words = output.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 4);

    // Count word frequency
    const freq: Record<string, number> = {};
    for (const word of words) {
      freq[word] = (freq[word] || 0) + 1;
    }

    // Sort by frequency and return top 10
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);
  }

  async saveOutput(categorized: CategorizedOutput): Promise<void> {
    const now = new Date();
    const yearMonth = now.toISOString().substring(0, 7); // YYYY-MM
    const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const timestamp = now.toISOString().replace(/[:.]/g, '-');

    // Determine directory based on category
    let categoryDir: string;
    if (['feature', 'bug', 'refactor'].includes(categorized.category)) {
      categoryDir = join(this.PAI_DIR, 'history', 'execution', categorized.category + 's', yearMonth);
    } else {
      categoryDir = join(this.PAI_DIR, 'history', categorized.category + 's', yearMonth);
    }

    // Ensure directory exists
    if (!existsSync(categoryDir)) {
      mkdirSync(categoryDir, { recursive: true });
    }

    // Create filename
    const safetitle = categorized.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);

    const filename = `${date}_${timestamp}_${safetitle}.md`;
    const filepath = join(categoryDir, filename);

    // Create markdown content
    const content = this.formatOutput(categorized);

    // Write file
    writeFileSync(filepath, content);

    console.log(`✅ Output saved: ${categorized.category}/${filename}`);
  }

  private formatOutput(categorized: CategorizedOutput): string {
    return `---
category: ${categorized.category}
title: ${categorized.title}
date: ${new Date().toISOString()}
keywords: ${categorized.keywords.join(', ')}
---

# ${categorized.title}

## Summary

${categorized.summary}

## Full Output

${categorized.fullOutput}
`;
  }
}

async function main() {
  const eventData: StopEvent = await readStdin();
  const summarizer = new SessionSummarizer();

  try {
    const category = summarizer.categorizeOutput(eventData.output);
    const title = summarizer.extractTitle(eventData.output);
    const summary = summarizer.extractSummary(eventData.output);
    const keywords = summarizer.extractKeywords(eventData.output);

    const categorized: CategorizedOutput = {
      category,
      title,
      summary,
      fullOutput: eventData.output,
      keywords
    };

    await summarizer.saveOutput(categorized);

    // If voice enabled, send summary to TTS
    if (process.env.VOICE_ENABLED === 'true') {
      await sendToVoiceSystem({
        agentType: eventData.agentType || 'default',
        summary: summary
      });
    }

  } catch (error) {
    console.error('Session summary error:', error);
  }
}

async function sendToVoiceSystem(params: { agentType: string; summary: string }): Promise<void> {
  const voiceURL = process.env.VOICE_SERVER_URL || 'http://localhost:3001/tts';

  try {
    await fetch(voiceURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
  } catch (error) {
    console.error('Failed to send to voice system:', error);
  }
}

main();
```

---

## 2. SKILL DEFINITIONS REALES

### 2.1 Research Skill (Complete Example)

```markdown
---
name: Research
version: 2.0.0
description: Multi-source investigation and synthesis with citation management
icon: 🔬

USE WHEN:
  - User requests investigation of topic
  - Need to gather information from multiple sources
  - Requires fact-checking or verification
  - Competitive analysis needed
  - Technical deep-dive required

dependencies:
  skills:
    - web-scraping
    - fabric-patterns
  tools:
    - research-tool.ts
    - cite-extractor.py
  API_KEYS:
    - ANTHROPIC_API_KEY
    - SERP_API_KEY
    - BRAVE_SEARCH_API_KEY

author: danielmiessler
updated: 2026-01-01
---

# Research Skill

## Overview

The Research skill provides systematic investigation capabilities with multi-source aggregation, citation management, and bias detection.

## Workflow Routing

| User Intent | Workflow | Context Files | Tools |
|-------------|----------|---------------|-------|
| Academic research | AcademicResearch.md | ResearchGuidelines.md | research-tool, cite-extractor |
| Competitive analysis | CompetitiveIntel.md | CompanyProfiles.md | web-scraper, research-tool |
| Technical investigation | TechnicalDeepDive.md | TechStack.md | ref-docs, research-tool |
| Fact-checking | FactCheck.md | CredibleSources.md | multi-source-verify |
| Market research | MarketAnalysis.md | IndustryData.md | research-tool, data-aggregator |

## Capabilities

### Information Gathering
- Multi-source web search (Google Scholar, arXiv, PubMed, general web)
- API-based research (SERP API, Brave Search)
- Web scraping for structured data
- Document parsing (PDF, academic papers)

### Analysis
- Citation extraction and management
- Bias detection in sources
- Credibility assessment
- Consensus vs. conflicting viewpoints identification
- Gap analysis in literature

### Synthesis
- Theme identification
- Multi-source synthesis
- Structured report generation
- Executive summaries

## Context Files

### ResearchGuidelines.md
Defines research standards, source credibility criteria, and citation formats.

### CredibleSources.md
Curated list of high-quality sources by domain:
- Academic: Google Scholar, PubMed, arXiv, JSTOR
- News: Reuters, AP, BBC, The Economist
- Technical: Official docs, GitHub, Stack Overflow (with verification)
- Business: Crunchbase, PitchBook, company filings

### CompanyProfiles.md
Pre-researched company information for competitive analysis.

### TechStack.md
Current technology stack knowledge for technical investigations.

## Tools

### research-tool.ts
```bash
research-tool.ts --query="AI safety" --sources=scholar,arxiv --limit=20 --format=markdown
```

Orchestrates multi-source queries and aggregates results.

### cite-extractor.py
```bash
cite-extractor.py --input=paper.pdf --format=apa --output=citations.md
```

Extracts citation metadata from academic papers.

### multi-source-verify.ts
```bash
multi-source-verify.ts --claim="claim to verify" --min-sources=3
```

Verifies claims across multiple independent sources.

## Output Formats

### Research Report
- Executive summary
- Methodology
- Findings (organized by theme)
- Discussion
- Conclusion
- Full bibliography

### Competitive Analysis
- Company overview matrix
- SWOT analysis
- Market positioning
- Key differentiators
- Recommendations

### Technical Deep Dive
- Technology overview
- Architecture analysis
- Pros/cons assessment
- Use case recommendations
- Implementation notes

## Quality Standards

All research outputs must:
- [ ] Include minimum 5 credible sources
- [ ] Properly cite all claims
- [ ] Acknowledge conflicting viewpoints
- [ ] Assess source credibility
- [ ] Identify gaps or limitations
- [ ] Provide executive summary

## Integration with History System

Research outputs are automatically saved to:
- `$PAI_DIR/history/research/YYYY-MM/`
- Tagged with keywords for future retrieval
- Referenced in future research on similar topics

## Examples

### Example 1: Academic Research
```
User: "Research the latest developments in AI alignment"

→ Triggers: AcademicResearch.md
→ Sources: Google Scholar, arXiv
→ Output: Academic research report with citations
→ Saved to: history/research/2026-01/ai-alignment-developments.md
```

### Example 2: Competitive Analysis
```
User: "Compare OpenAI, Anthropic, and Google DeepMind"

→ Triggers: CompetitiveIntel.md
→ Sources: Crunchbase, company websites, news
→ Output: Competitive analysis matrix
→ Saved to: history/research/2026-01/ai-company-comparison.md
```
```

### 2.2 Prompting Skill (Meta-Prompting System)

```markdown
---
name: Prompting
version: 2.0.0
description: Meta-prompting system for creating effective AI prompts
icon: 📝

USE WHEN:
  - User needs to create or improve prompts
  - Designing system prompts for agents
  - Optimizing prompt performance
  - Creating prompt templates

dependencies:
  skills:
    - fabric-patterns (optional)
  API_KEYS:
    - ANTHROPIC_API_KEY

author: danielmiessler
updated: 2026-01-01
---

# Prompting Skill

## Overview

The Prompting skill helps create, refine, and optimize prompts for AI systems using established patterns and best practices.

## Workflow Routing

| User Intent | Workflow | Output |
|-------------|----------|--------|
| Create new prompt | PromptCreation.md | Structured prompt template |
| Improve existing prompt | PromptRefinement.md | Optimized prompt with analysis |
| Design system prompt | SystemPromptDesign.md | Complete system prompt |
| Create prompt template | TemplateDesign.md | Reusable prompt template |

## Core Principles

### 1. Clarity
- Be specific and unambiguous
- Use clear, direct language
- Avoid jargon unless necessary

### 2. Context
- Provide relevant background
- Define role and expertise
- Establish constraints

### 3. Structure
- Use clear sections
- Numbered steps for procedures
- Examples for complex concepts

### 4. Constraints
- Define output format
- Set length requirements
- Specify what to avoid

### 5. Examples
- Include positive examples
- Show edge cases
- Demonstrate desired output format

## Prompt Template

```
# [Title]

## Role
You are [specific role with expertise].

## Task
[Clear description of what needs to be done]

## Context
[Relevant background information]
- Key point 1
- Key point 2
- Key point 3

## Input Format
[How input will be provided]

## Output Requirements
- Format: [markdown/JSON/plaintext/etc.]
- Length: [word count or constraint]
- Structure: [sections to include]
- Tone: [formal/casual/technical/etc.]

## Constraints
- [Constraint 1]
- [Constraint 2]

## Examples

### Example 1
Input:
```
[example input]
```

Expected Output:
```
[example output]
```

## Quality Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]
```

## Prompt Patterns Library

### Chain of Thought
```
Let's solve this step by step:
1. First, [step 1]
2. Then, [step 2]
3. Finally, [step 3]
```

### Role-Based
```
You are a [specific expert role]. Your task is to [specific task].
Consider your expertise in [domain] when responding.
```

### Few-Shot
```
Here are examples of the desired output:

Example 1: [input] → [output]
Example 2: [input] → [output]

Now apply the same pattern to: [new input]
```

### Constrained Output
```
Respond in the following JSON format:
{
  "analysis": "string",
  "confidence": 0-100,
  "recommendations": ["array", "of", "strings"]
}
```

## Integration with Skills

The Prompting skill can enhance other skills by:
- Generating optimized prompts for research queries
- Creating system prompts for agent definitions
- Designing workflow instructions
- Crafting better tool invocations

## Tools

### prompt-optimizer.ts
```bash
prompt-optimizer.ts --input=prompt.txt --optimize-for=clarity,specificity
```

Analyzes and improves existing prompts.

### prompt-tester.ts
```bash
prompt-tester.ts --prompt=prompt.txt --test-cases=cases.json --iterations=5
```

Tests prompt effectiveness across multiple iterations.
```

---

## 3. WORKFLOW PATTERNS

### 3.1 Academic Research Workflow

```markdown
# Academic Research Workflow

## Purpose
Conduct rigorous academic investigation with proper citation management.

## Prerequisites
- Research question defined
- Scope parameters established
- Access to academic databases

## Steps

### STEP 1: Define Research Question
**Objective:** Clarify exact question to answer

**Actions:**
1. Write specific, answerable research question
2. Identify key terms and concepts
3. Define inclusion/exclusion criteria
4. Set date range for sources (if applicable)
5. Determine required evidence level

**Output:** Research question statement document

**Verification:**
- [ ] Question is specific and answerable
- [ ] Scope is clearly defined
- [ ] Criteria are objective

---

### STEP 2: Identify Sources
**Objective:** Find relevant, credible academic sources

**Actions:**
1. Search Google Scholar for peer-reviewed papers
2. Check arXiv for preprints (if tech/science topic)
3. Search PubMed (if medical/biological topic)
4. Identify seminal papers (highly cited foundational work)
5. Look for recent meta-analyses or systematic reviews
6. Check references of key papers for additional sources

**Tools:**
```bash
research-tool.ts \
  --query="[research question]" \
  --sources=scholar,arxiv,pubmed \
  --limit=30 \
  --min-citations=50 \
  --years=2020-2026
```

**Output:** List of 20-40 potentially relevant papers

**Verification:**
- [ ] Mix of foundational and recent papers
- [ ] Majority are peer-reviewed
- [ ] Represent diverse perspectives
- [ ] Include meta-analyses if available

---

### STEP 3: Screen and Select Papers
**Objective:** Narrow to most relevant sources

**Actions:**
1. Read abstracts of all papers
2. Categorize by relevance (high/medium/low)
3. Check methodology quality
4. Verify author credentials
5. Identify potential bias (funding sources, conflicts of interest)
6. Select final 10-20 papers for deep analysis

**Output:** Curated list with relevance ratings

**Verification:**
- [ ] All selected papers directly address research question
- [ ] Methodologies are sound
- [ ] No obvious bias or conflicts
- [ ] Sufficient diversity of approaches

---

### STEP 4: Extract Information
**Objective:** Systematically extract key information from each paper

**For each selected paper:**

1. **Read thoroughly** (full text, not just abstract)

2. **Extract key information:**
   - Research question/hypothesis
   - Methodology (sample size, design, controls)
   - Key findings
   - Limitations acknowledged by authors
   - Conclusions and implications

3. **Create structured note:**
```markdown
## [Paper Title]

**Authors:** [names]
**Year:** [year]
**Citation count:** [number]
**DOI/URL:** [link]

### Research Question
[what they investigated]

### Methodology
- Design: [experimental/observational/meta-analysis/etc.]
- Sample: [size and characteristics]
- Controls: [what was controlled]
- Analysis: [statistical methods]

### Key Findings
1. [finding 1]
2. [finding 2]
3. [finding 3]

### Limitations
- [limitation 1]
- [limitation 2]

### Relevance to Research Question
[how this paper addresses your question]

### Quality Assessment
- Methodology strength: [high/medium/low]
- Sample size adequate: [yes/no]
- Potential bias: [none/low/medium/high]
- Overall credibility: [high/medium/low]
```

**Tools:**
```bash
cite-extractor.py --input=paper.pdf --format=apa
```

**Output:** Structured notes for each paper

**Verification:**
- [ ] All key information extracted
- [ ] Methodology critically assessed
- [ ] Limitations noted
- [ ] Citations formatted correctly

---

### STEP 5: Synthesize Findings
**Objective:** Identify patterns, themes, and consensus

**Actions:**
1. Group papers by theme or approach
2. Identify consensus viewpoints (what most papers agree on)
3. Note conflicting findings (where papers disagree)
4. Assess strength of evidence for each finding
5. Identify gaps in current literature

**Synthesis matrix:**
```markdown
## Theme 1: [theme name]

**Consensus findings:**
- Finding A: Supported by [Paper 1, Paper 3, Paper 5]
  - Evidence strength: High (replicated in multiple studies)
- Finding B: Supported by [Paper 2, Paper 4]
  - Evidence strength: Medium (limited replication)

**Conflicting findings:**
- Paper 6 found X, but Paper 7 found Y
  - Potential explanation: Different methodologies
  - Resolution: More research needed

**Gaps:**
- No studies examined [specific aspect]
- Limited research on [population/context]
```

**Output:** Synthesis document with themes and evidence assessment

**Verification:**
- [ ] All papers categorized into themes
- [ ] Consensus vs. conflict clearly identified
- [ ] Evidence strength assessed
- [ ] Gaps noted

---

### STEP 6: Assess Quality and Bias
**Objective:** Critical evaluation of overall evidence base

**Actions:**
1. Check for publication bias (are negative results underrepresented?)
2. Assess funding sources (industry vs. independent)
3. Evaluate sample diversity (who was/wasn't included)
4. Check for methodological limitations across studies
5. Identify potential conflicts of interest

**Quality checklist:**
- [ ] Multiple independent research groups (not all from same lab)
- [ ] Mix of funding sources (not all industry-funded)
- [ ] Diverse samples (not all WEIRD populations*)
- [ ] Replication studies present
- [ ] Preregistration or protocols available (for recent studies)

*WEIRD = Western, Educated, Industrialized, Rich, Democratic

**Output:** Quality and bias assessment

---

### STEP 7: Create Research Report
**Objective:** Synthesize all findings into comprehensive report

**Structure:**

```markdown
---
title: [Research Topic]
date: [date]
research_question: [question]
sources_reviewed: [number]
---

# [Title]: A Review of Current Research

## Executive Summary

[3-5 key findings in bullet points]

## Introduction

### Research Question
[specific question addressed]

### Scope and Limitations
[what was included/excluded and why]

## Methodology

### Search Strategy
- Databases: [Google Scholar, arXiv, PubMed, etc.]
- Date range: [YYYY-MM-DD to YYYY-MM-DD]
- Search terms: [list]
- Inclusion criteria: [list]
- Exclusion criteria: [list]

### Selection Process
- Papers identified: [number]
- Papers screened: [number]
- Papers selected: [number]

## Findings

### Theme 1: [Theme Name]

[Synthesis of findings for this theme]

**Supporting evidence:**
- Study 1 (Author, Year): [finding] [citation]
- Study 2 (Author, Year): [finding] [citation]

**Strength of evidence:** [High/Medium/Low]

**Conflicting viewpoints:**
[Description of any disagreements with citations]

### Theme 2: [Theme Name]
[Repeat structure]

## Discussion

### Key Insights
1. [Insight 1 with synthesis across themes]
2. [Insight 2]
3. [Insight 3]

### Limitations of Current Research
- [Limitation 1]
- [Limitation 2]

### Gaps in Literature
- [Gap 1]
- [Gap 2]

### Implications
**For practice:**
[What practitioners should know]

**For policy:**
[What policymakers should consider]

**For future research:**
[What should be studied next]

## Conclusion

[Summary of key findings and answer to research question]

## References

[Full bibliography in consistent format (APA/MLA/Chicago)]

1. Author, A. (Year). Title. *Journal*, volume(issue), pages. DOI
2. [etc.]

## Appendices

### Appendix A: Search Strings
[Exact search queries used]

### Appendix B: Excluded Papers
[Papers screened but excluded, with reasons]

### Appendix C: Quality Assessment Matrix
[Detailed quality scores for each paper]
```

**Output:** Final research report

**Verification:**
- [ ] Executive summary captures key findings
- [ ] All claims are cited
- [ ] Conflicting viewpoints acknowledged
- [ ] Limitations discussed
- [ ] Bibliography complete and formatted
- [ ] Report answers original research question

---

## Post-Completion

### Save to History
```bash
# Automatically saved by PAI history system to:
$PAI_DIR/history/research/YYYY-MM/[date]_[topic].md
```

### Create Summary for Voice
If voice system enabled, extract executive summary for TTS:
```
"Research on [topic] completed. Key findings: [summary]. Full report saved."
```

### Update Knowledge Base
Add key findings to relevant Context Files for future reference.

---

## Example Execution

**Input:**
```
User: "Research the effectiveness of AI coding assistants on developer productivity"
```

**Execution:**
1. Research question: "How do AI coding assistants impact developer productivity?"
2. Search Google Scholar, arXiv for papers on "AI coding assistants", "GitHub Copilot productivity", "AI pair programming"
3. Identify 25 relevant papers from 2021-2026
4. Screen and select 12 high-quality studies
5. Extract findings from each (mix of user studies, productivity metrics, qualitative research)
6. Synthesize themes:
   - Theme 1: Code completion speed improvements (consensus: 20-40% faster)
   - Theme 2: Code quality impact (conflicting: some studies show improvement, others no change)
   - Theme 3: Learning curve effects (consensus: helps junior developers more)
7. Assess quality: Mix of industry and academic research, some industry-funded bias
8. Generate report with findings, limitations, and recommendations
9. Save to `history/research/2026-01/ai-coding-assistants-productivity.md`

**Output:**
```markdown
# AI Coding Assistants and Developer Productivity: A Research Review

## Executive Summary

- AI coding assistants like GitHub Copilot improve code completion speed by 20-40%
- Impact on code quality is mixed and depends on developer experience
- Greater benefits observed for junior developers and boilerplate code
- Limited long-term studies on skill development effects
- Industry-funded research shows more positive results than independent studies

[... full report ...]
```
```

---

## 4. TOOLS CLI EXAMPLES

### 4.1 Research Tool (Multi-Source Aggregation)

```typescript
#!/usr/bin/env bun
/**
 * research-tool.ts - Multi-source research aggregation
 *
 * Usage:
 *   research-tool.ts --query="AI safety" --sources=scholar,arxiv --limit=20
 */

import { parseArgs } from 'util';

// ... (código completo en análisis principal, sección 8.5)
```

### 4.2 Web Scraper Tool

```typescript
#!/usr/bin/env bun
/**
 * web-scraper.ts - Structured data extraction from websites
 *
 * Usage:
 *   web-scraper.ts --url="https://example.com" --selector=".article" --output=json
 */

import { JSDOM } from 'jsdom';
import { parseArgs } from 'util';

interface ScraperOptions {
  url: string;
  selector: string;
  attributes?: string[];
  output: 'json' | 'markdown' | 'csv';
  waitFor?: number;
}

class WebScraper {
  async scrape(options: ScraperOptions): Promise<any[]> {
    // Fetch HTML
    const response = await fetch(options.url);
    const html = await response.text();

    // Parse with JSDOM
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Select elements
    const elements = document.querySelectorAll(options.selector);

    // Extract data
    const results = [];
    for (const element of Array.from(elements)) {
      const data: Record<string, any> = {
        text: element.textContent?.trim(),
        html: element.innerHTML
      };

      // Extract specified attributes
      if (options.attributes) {
        for (const attr of options.attributes) {
          data[attr] = element.getAttribute(attr);
        }
      }

      // Extract common structured data
      data.links = Array.from(element.querySelectorAll('a'))
        .map(a => ({
          text: a.textContent?.trim(),
          href: a.getAttribute('href')
        }));

      data.images = Array.from(element.querySelectorAll('img'))
        .map(img => ({
          src: img.getAttribute('src'),
          alt: img.getAttribute('alt')
        }));

      results.push(data);
    }

    return results;
  }

  formatOutput(results: any[], format: string): string {
    switch (format) {
      case 'json':
        return JSON.stringify(results, null, 2);

      case 'markdown':
        return this.toMarkdown(results);

      case 'csv':
        return this.toCSV(results);

      default:
        return JSON.stringify(results);
    }
  }

  private toMarkdown(results: any[]): string {
    let md = '';
    for (let i = 0; i < results.length; i++) {
      md += `## Result ${i + 1}\n\n`;
      md += `**Text:** ${results[i].text}\n\n`;

      if (results[i].links?.length > 0) {
        md += `**Links:**\n`;
        for (const link of results[i].links) {
          md += `- [${link.text}](${link.href})\n`;
        }
        md += '\n';
      }
    }
    return md;
  }

  private toCSV(results: any[]): string {
    if (results.length === 0) return '';

    // Get all unique keys
    const keys = new Set<string>();
    for (const result of results) {
      Object.keys(result).forEach(k => keys.add(k));
    }

    const headers = Array.from(keys);
    let csv = headers.join(',') + '\n';

    for (const result of results) {
      const row = headers.map(header => {
        const value = result[header];
        if (typeof value === 'object') {
          return JSON.stringify(value).replace(/,/g, ';');
        }
        return value || '';
      });
      csv += row.join(',') + '\n';
    }

    return csv;
  }
}

async function main() {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      url: { type: 'string', short: 'u' },
      selector: { type: 'string', short: 's', default: 'body' },
      attributes: { type: 'string', short: 'a' },
      output: { type: 'string', short: 'o', default: 'json' },
      waitFor: { type: 'string', short: 'w' }
    }
  });

  if (!values.url) {
    console.error('Error: --url is required');
    process.exit(1);
  }

  const options: ScraperOptions = {
    url: values.url as string,
    selector: values.selector as string,
    attributes: values.attributes ? (values.attributes as string).split(',') : undefined,
    output: (values.output as 'json' | 'markdown' | 'csv') || 'json',
    waitFor: values.waitFor ? parseInt(values.waitFor as string) : undefined
  };

  const scraper = new WebScraper();
  const results = await scraper.scrape(options);
  const output = scraper.formatOutput(results, options.output);

  console.log(output);
}

main().catch(console.error);
```

---

## 5. PACK INSTALLATION SCRIPTS

### 5.1 Kai Bundle Installer (install.ts)

```typescript
#!/usr/bin/env bun
/**
 * Bundles/Kai/install.ts
 * Interactive wizard for installing complete Kai Bundle
 */

import { existsSync, mkdirSync, copyFileSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import * as readline from 'readline';

interface InstallConfig {
  assistantName: string;
  timezone: string;
  voiceEnabled: boolean;
  observabilityEnabled: boolean;
  paiDir: string;
  claudeDir: string;
  backupCreated: boolean;
}

class KaiBundleInstaller {
  private rl: readline.Interface;
  private config: Partial<InstallConfig> = {};

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async question(query: string): Promise<string> {
    return new Promise(resolve => {
      this.rl.question(query, resolve);
    });
  }

  async run() {
    console.log('╔══════════════════════════════════════════════╗');
    console.log('║   Kai Bundle Installation Wizard            ║');
    console.log('║   Personal AI Infrastructure v2.0           ║');
    console.log('╚══════════════════════════════════════════════╝\n');

    try {
      await this.detectEnvironment();
      await this.createBackup();
      await this.gatherConfiguration();
      await this.installPacks();
      await this.configureSettings();
      await this.setupEnvironment();
      await this.verify();
      await this.showCompletionMessage();
    } catch (error) {
      console.error('\n❌ Installation failed:', error);
      process.exit(1);
    } finally {
      this.rl.close();
    }
  }

  async detectEnvironment() {
    console.log('🔍 Detecting environment...\n');

    // Detect PAI_DIR
    this.config.paiDir = process.env.PAI_DIR || join(process.env.HOME!, 'PAI');
    console.log(`  PAI_DIR: ${this.config.paiDir}`);

    // Detect Claude directory
    const claudeDirs = [
      join(process.env.HOME!, '.claude'),
      join(process.env.HOME!, '.cursor'),
      join(process.env.HOME!, '.windsurf')
    ];

    for (const dir of claudeDirs) {
      if (existsSync(dir)) {
        this.config.claudeDir = dir;
        console.log(`  AI System Dir: ${dir}`);
        break;
      }
    }

    if (!this.config.claudeDir) {
      this.config.claudeDir = join(process.env.HOME!, '.claude');
      console.log(`  AI System Dir: ${this.config.claudeDir} (will be created)`);
    }

    // Check Bun
    try {
      const bunVersion = execSync('bun --version', { encoding: 'utf-8' }).trim();
      console.log(`  Bun: v${bunVersion} ✅`);
    } catch {
      console.error('  Bun: Not found ❌');
      console.error('\nPlease install Bun first: brew install oven-sh/bun/bun');
      process.exit(1);
    }

    console.log('');
  }

  async createBackup() {
    if (existsSync(this.config.claudeDir!)) {
      const backupAnswer = await this.question(
        `Create backup of ${this.config.claudeDir}? (Y/n): `
      );

      if (backupAnswer.toLowerCase() !== 'n') {
        const timestamp = new Date().toISOString().split('T')[0];
        const backupDir = `${this.config.claudeDir}-BACKUP-${timestamp}`;

        console.log(`  Creating backup: ${backupDir}`);
        execSync(`cp -r "${this.config.claudeDir}" "${backupDir}"`);
        console.log('  Backup created ✅\n');
        this.config.backupCreated = true;
      }
    }
  }

  async gatherConfiguration() {
    console.log('⚙️  Configuration\n');

    // Assistant name
    const nameAnswer = await this.question('  Assistant name (default: Kai): ');
    this.config.assistantName = nameAnswer.trim() || 'Kai';

    // Timezone
    const tzAnswer = await this.question('  Timezone (default: America/Los_Angeles): ');
    this.config.timezone = tzAnswer.trim() || 'America/Los_Angeles';

    // Voice
    const voiceAnswer = await this.question('  Enable voice notifications? (Y/n): ');
    this.config.voiceEnabled = voiceAnswer.toLowerCase() !== 'n';

    // Observability
    const obsAnswer = await this.question('  Enable observability dashboard? (Y/n): ');
    this.config.observabilityEnabled = obsAnswer.toLowerCase() !== 'n';

    console.log('');
  }

  async installPacks() {
    console.log('📦 Installing packs...\n');

    const packs = [
      { name: 'kai-hook-system', dependencies: [] },
      { name: 'kai-history-system', dependencies: ['kai-hook-system'] },
      { name: 'kai-core-install', dependencies: ['kai-hook-system', 'kai-history-system'] },
      { name: 'kai-prompting-skill', dependencies: ['kai-core-install'] },
      { name: 'kai-voice-system', dependencies: ['kai-hook-system', 'kai-core-install'], optional: !this.config.voiceEnabled },
      { name: 'kai-agents-skill', dependencies: ['kai-core-install'] },
      { name: 'kai-art-skill', dependencies: ['kai-core-install'] },
      { name: 'kai-browser-skill', dependencies: [] },
      { name: 'kai-observability-server', dependencies: ['kai-hook-system'], optional: !this.config.observabilityEnabled }
    ];

    for (const pack of packs) {
      if (pack.optional) {
        console.log(`  ⏭️  Skipping ${pack.name} (disabled)`);
        continue;
      }

      console.log(`  📦 Installing ${pack.name}...`);
      await this.installPack(pack.name);
      console.log(`     ✅ ${pack.name} installed`);
    }

    console.log('');
  }

  async installPack(packName: string) {
    const packDir = join(this.config.paiDir!, 'Packs', packName);
    const installScript = join(packDir, 'INSTALL.md');

    if (!existsSync(installScript)) {
      throw new Error(`Install script not found for ${packName}`);
    }

    // Read and execute installation steps
    const installMd = readFileSync(installScript, 'utf-8');

    // Extract bash commands from markdown code blocks
    const commandBlocks = installMd.match(/```bash\n([\s\S]*?)\n```/g);

    if (commandBlocks) {
      for (const block of commandBlocks) {
        const commands = block
          .replace(/```bash\n/, '')
          .replace(/\n```/, '')
          .trim();

        // Execute commands (with PAI_DIR substitution)
        const substituted = commands.replace(/\$PAI_DIR/g, this.config.paiDir!);
        execSync(substituted, { stdio: 'ignore' });
      }
    }
  }

  async configureSettings() {
    console.log('⚙️  Configuring settings.json...\n');

    const settingsPath = join(this.config.claudeDir!, 'settings.json');

    const settings = {
      name: this.config.assistantName,
      timezone: this.config.timezone,
      hooks: {
        SessionStart: [
          `\${PAI_DIR}/.claude/hooks/session-start/load-core-context.ts`,
          `\${PAI_DIR}/.claude/hooks/capture-all-events.ts`
        ],
        PreToolUse: [
          `\${PAI_DIR}/.claude/hooks/pre-tool-use/security-validator.ts`
        ],
        PostToolUse: [
          `\${PAI_DIR}/.claude/hooks/post-tool-use/capture-all-events.ts`
        ],
        Stop: [
          `\${PAI_DIR}/.claude/hooks/stop/capture-session-summary.ts`
        ],
        SubagentStop: [
          `\${PAI_DIR}/.claude/hooks/subagent-stop/route-output.ts`
        ],
        UserPromptSubmit: [
          `\${PAI_DIR}/.claude/hooks/user-prompt/update-tab-title.ts`
        ],
        SessionEnd: [
          `\${PAI_DIR}/.claude/hooks/session-end/save-session.ts`
        ]
      },
      observability: {
        enabled: this.config.observabilityEnabled,
        port: 3000
      },
      voice: {
        enabled: this.config.voiceEnabled
      }
    };

    writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    console.log('  settings.json configured ✅\n');
  }

  async setupEnvironment() {
    console.log('🔧 Setting up environment...\n');

    // Determine shell config file
    const shell = process.env.SHELL || '';
    const configFile = shell.includes('zsh') ? '.zshrc' : '.bashrc';
    const configPath = join(process.env.HOME!, configFile);

    // Check if PAI_DIR already set
    const configContent = existsSync(configPath)
      ? readFileSync(configPath, 'utf-8')
      : '';

    if (!configContent.includes('export PAI_DIR=')) {
      const envVars = `\n# PAI Configuration\nexport PAI_DIR="${this.config.paiDir}"\n`;

      const addEnv = await this.question(
        `  Add PAI_DIR to ${configFile}? (Y/n): `
      );

      if (addEnv.toLowerCase() !== 'n') {
        appendFileSync(configPath, envVars);
        console.log(`  PAI_DIR added to ${configFile} ✅`);
        console.log(`  Run: source ~/${configFile}\n`);
      }
    } else {
      console.log(`  PAI_DIR already in ${configFile} ✅\n`);
    }

    // Setup .env file
    const envExamplePath = join(this.config.paiDir!, '.env.example');
    const envPath = join(this.config.paiDir!, '.env');

    if (!existsSync(envPath) && existsSync(envExamplePath)) {
      copyFileSync(envExamplePath, envPath);
      console.log('  .env file created from template ✅');
      console.log(`  Edit ${envPath} to add your API keys\n`);
    }
  }

  async verify() {
    console.log('✅ Verifying installation...\n');

    const checks = [
      {
        name: 'PAI_DIR set',
        check: () => !!this.config.paiDir
      },
      {
        name: 'settings.json exists',
        check: () => existsSync(join(this.config.claudeDir!, 'settings.json'))
      },
      {
        name: 'Hooks directory exists',
        check: () => existsSync(join(this.config.paiDir!, '.claude', 'hooks'))
      },
      {
        name: 'History directory exists',
        check: () => existsSync(join(this.config.paiDir!, 'history'))
      },
      {
        name: 'CORE skill exists',
        check: () => existsSync(join(this.config.paiDir!, '.claude', 'Skills', 'CORE', 'SKILL.md'))
      }
    ];

    let allPassed = true;
    for (const check of checks) {
      const passed = check.check();
      console.log(`  ${passed ? '✅' : '❌'} ${check.name}`);
      if (!passed) allPassed = false;
    }

    console.log('');

    if (!allPassed) {
      throw new Error('Verification failed');
    }
  }

  async showCompletionMessage() {
    console.log('╔══════════════════════════════════════════════╗');
    console.log('║   Installation Complete! 🎉                  ║');
    console.log('╚══════════════════════════════════════════════╝\n');

    console.log('Next steps:\n');
    console.log('1. Add your API keys to .env:');
    console.log(`   nano ${join(this.config.paiDir!, '.env')}\n`);

    console.log('2. Source your shell config:');
    const shell = process.env.SHELL || '';
    const configFile = shell.includes('zsh') ? '.zshrc' : '.bashrc';
    console.log(`   source ~/${configFile}\n`);

    console.log('3. Restart Claude Code (or your AI assistant)\n');

    if (this.config.observabilityEnabled) {
      console.log('4. Start observability dashboard:');
      console.log(`   ${join(this.config.paiDir!, '.claude', 'Observability', 'manage.sh')} start\n`);
    }

    console.log('Documentation:');
    console.log('  https://github.com/danielmiessler/PAI\n');

    if (this.config.backupCreated) {
      console.log('⚠️  Backup created. You can restore if needed:\n');
      console.log(`   ${this.config.claudeDir}-BACKUP-*\n`);
    }
  }
}

const installer = new KaiBundleInstaller();
installer.run();
```

---

*Nota: Este documento continúa con más ejemplos de código en las secciones 6-10. Por límites de espacio, he incluido las secciones más críticas. ¿Deseas que continúe con las secciones restantes (Observability Implementation, Voice System, Security Patterns, etc.)?*
