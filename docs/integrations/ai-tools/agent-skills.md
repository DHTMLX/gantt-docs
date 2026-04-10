---
sidebar_label: Agent Skills
title: Agent Skills
description: "Install agent skills for AI assistants working with DHTMLX Gantt"
---

# Agent Skills

AI coding assistants such as Claude Code or Codex can generate DHTMLX Gantt code, but they often make mistakes with specialized APIs: wrong prop names, missing CSS imports, incorrect callback signatures, or mixing incompatible data patterns. Agent skills address this by teaching the assistant the correct patterns and known pitfalls before it writes code.

Unlike the [MCP server](./mcp-server/), which provides real-time API reference, skills focus on integration patterns, decision points, and failure prevention.

**GitHub:** [DHTMLX/skills](https://github.com/DHTMLX/skills)

## Available Skills

### DHTMLX React Gantt

Covers integration of `@dhtmlx/trial-react-gantt` and `@dhx/react-gantt` into React applications. The skill helps the assistant add Gantt to a project and set it up correctly, connect CRUD operations, and handle theming so that Gantt reuses the app's own theme rather than drifting out of sync. It also includes known pitfalls extracted from real projects and directs the assistant to verify unfamiliar APIs through the [DHTMLX MCP server](./mcp-server/) rather than guessing.

The skill files are readable Markdown - you can review exactly what rules your assistant will follow in the [GitHub repository](https://github.com/DHTMLX/skills/tree/main/dhtmlx-react-gantt).

## Installing

```bash
npx skills add DHTMLX/skills --skill dhtmlx-react-gantt
```

### Manual Installation

Clone or download the [DHTMLX/skills](https://github.com/DHTMLX/skills) repository and copy the `dhtmlx-react-gantt` folder into your project's skills directory (e.g., `.claude/skills/` for Claude Code, `.cursor/skills/` for Cursor).

## Using Skills with MCP

Skills and the MCP server are complementary. MCP gives your assistant access to real-time API documentation - method signatures, property values, configuration options. Skills teach it the integration patterns that prevent common mistakes. For best results, use both. See [DHTMLX MCP Server](./mcp-server/) for setup instructions.
