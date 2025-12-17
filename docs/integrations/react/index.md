---
title: "React Gantt"
sidebar_label: React Gantt
description: "Install, configure, and use DHTMLX Gantt in React with the official wrapper."
image: /img/frameworks/react.png
---

React Gantt is the official React wrapper for DHTMLX Gantt. It lets you use the Gantt chart as a React component while still supporting the full configuration API.

If you want a complete description of how React Gantt works and what features it provides, start with the [Overview](integrations/react/overview.md).

## Get started

If you're new to the wrapper, follow this order:

1. [Installation](integrations/react/installation.md) - choose Evaluation (public npm) or Professional (private npm) version of React Gantt.
2. [Quick Start](integrations/react/quick-start.md) - render your first chart and verify the setup.
3. [Configuration](integrations/react/overview.md) - learn how to work with props, templates, and event handlers.

## Framework integrations

If your app is built with a meta-framework, use these guides for a framework-appropriate setup:

- [Next.js](integrations/react/nextjs.md) - client component setup and common SSR constraints
- [Remix](integrations/react/remix.md) - route-based setup and integration notes

## Choose a data binding model

React Gantt supports two data binding approaches:

- **React-managed data** (recommended for most React apps).
You keep tasks/links in React or in a state manager, pass them as props, and handle updates via `data.save`/`data.batchSave` callbacks.

- **Gantt-managed data** (useful in specialized, performance-sensitive cases)
You initialize data once and let Gantt (and your backend) own the data life cycle. React does not re-apply updated props after each change.

To understand both approaches and their trade-offs, read the [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md).

## Data & state tutorials

If you're using a state management library, the guides in [Data & State Management](integrations/react/state.md) show the same integration pattern implemented for each library (Redux Toolkit, Zustand, MobX, and more), plus real-time sync with Firebase.

## Examples and evaluation resources

If you're evaluating React Gantt, the evaluation page provides access to technical support during the evaluation period. See [Installation](integrations/react/installation.md).