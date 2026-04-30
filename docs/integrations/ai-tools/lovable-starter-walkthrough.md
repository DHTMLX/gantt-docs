---
title: "React Gantt Lovable Starter Walkthrough"
sidebar_label: "Lovable Starter Walkthrough"
description: "Reproduce the DHTMLX React Gantt project planner in Lovable using a fixed sequence of prompts and a Supabase backend"
---

# React Gantt Lovable Starter Walkthrough

This guide explains how to reproduce the [React Gantt Lovable Starter](https://github.com/DHTMLX/react-gantt-lovable-starter) - a multi-project planner with a Supabase backend - in your own Lovable workspace. The published repo and its [`lovable/`](https://github.com/DHTMLX/react-gantt-lovable-starter/tree/main/lovable) folder are the source of truth; this page is the entry point that explains how the pieces fit together.

For a generic Lovable + Gantt walkthrough that doesn't involve Supabase, see the companion guide: [Lovable AI](integrations/ai-tools/lovable-ai.md).

## What you get at the end

A working app with:

- a routed shell (Dashboard, Projects, Reports, Workload)
- per-project Gantt workspaces with task and link CRUD
- persistent task ordering with drag-and-drop reorder
- undo/redo and zoom controls
- working calendar with weekend highlighting
- resource panel with workload badges
- a demo-only role model (viewer / editor / owner)
- a Supabase schema, demo policies, and seed data

The starter targets the standard Lovable stack: React 18 + TypeScript + Vite + Tailwind + shadcn/ui, with React Query, Redux Toolkit, and Supabase added on top.

## Prerequisites

- A Lovable account
- A Supabase project (free tier is enough)
- Optional: Node.js 18+ and npm if you plan to run the result locally

## Two ways to use the recipe

The [`lovable/`](https://github.com/DHTMLX/react-gantt-lovable-starter/tree/main/lovable) folder serves two audiences:

1. **Reproduce the build from scratch.** Send the prompts to Lovable in order. You will end up with the same app structure, the same Gantt configuration, and the same Supabase schema. This is the recommended path if you want to learn the pattern.
2. **Use the published repo as a starting template.** Clone the GitHub repo, point it at your own Supabase project, and skip the Lovable prompts entirely. This is faster if you just want a running starter.

## Reproducing the build in Lovable

The full prompt sequence is in [`lovable/00-build-plan.md`](https://github.com/DHTMLX/react-gantt-lovable-starter/blob/main/lovable/00-build-plan.md). The high-level flow:

1. Paste the contents of [`00-knowledge.md`](https://github.com/DHTMLX/react-gantt-lovable-starter/blob/main/lovable/00-knowledge.md) into your Lovable project's Knowledge Base before sending the first prompt. This locks in the package name, CSS import, container height, and date-handling rules.
2. Run prompt [`01-create-app-shell.md`](https://github.com/DHTMLX/react-gantt-lovable-starter/blob/main/lovable/01-create-app-shell.md) to scaffold routes, navigation, and placeholder pages.
3. Decide your backend before step 03. The starter uses Supabase. If you want a backend-free variant, you can skip the Supabase steps and keep mock data only.
4. Run the remaining prompts in order from `02` through `11`. Each prompt covers one feature area (Gantt core, Supabase, CRUD, permissions, browser verification, Gantt UX, working calendar, resources, final verification, dashboard/reports/workload pages).

A typical run produces a working app in 11 prompt-sized steps. The exact prompts and their scope are version-controlled in the repo.

## Manual fixes you may need

Generated code is rarely perfect on the first try, especially around React-specific patterns. The repo records every manual edit applied during the original build in [`lovable/00-manual-edits.md`](https://github.com/DHTMLX/react-gantt-lovable-starter/blob/main/lovable/00-manual-edits.md). Treat that file as both a known-issues list and an example of how to keep your own Lovable build log when generated output drifts from the desired pattern.

The current set of recorded fixes covers theme context wiring, Gantt date normalization at the CRUD boundary, Redux snapshot freshness, undo/redo persistence, and a weekend template signature mismatch.

## Supabase setup

The repo's [`supabase/migrations`](https://github.com/DHTMLX/react-gantt-lovable-starter/tree/main/supabase/migrations) folder contains the schema, demo policies, and seed data as ordered SQL files. Apply them in order in the Supabase SQL editor, then fill in the three Vite environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`) from your project settings.

The schema supports multiple projects, with tasks and links scoped per project, plus a `project_members` table that drives the demo role model.

## Going to production

The starter uses the public trial package `@dhtmlx/trial-react-gantt`. When the prototype is approved for production, swap to the commercial `@dhx/react-gantt` package - the package-swap procedure is covered in [Installing React Gantt](integrations/react/installation.md#moving-from-the-trial-package-to-the-commercial-one).

Permissions in the starter are demo-only. Replace the demo identity flow with real authentication before exposing the app to end users.

## What to read next

- [Lovable AI](integrations/ai-tools/lovable-ai.md) - the generic Lovable + Gantt workflow without a backend
- [DHTMLX MCP Server](integrations/ai-tools/mcp-server.md) - connect MCP to Lovable for accurate API references
- [Agent Skills](integrations/ai-tools/agent-skills.md) - apply the same DHTMLX patterns when you continue editing the cloned repo in Cursor or Claude Code
- [Installing React Gantt](integrations/react/installation.md) - private-registry setup and the trial-to-commercial package swap
- [React Gantt Overview](integrations/react/overview.md) - the underlying component reference
