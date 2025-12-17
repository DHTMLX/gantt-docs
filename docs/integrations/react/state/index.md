---
title: "Data & State Management"
description: "How to bind React Gantt to React state or a state manager, handle user edits, and choose between React-managed and Gantt-managed data models."
---

This section explains how to keep Gantt data in sync with your application state. It covers the recommended React-driven model (React or a store as the source of truth), the performance-focused Gantt-managed model, and practical implementations for popular state libraries.

## Start here

Read this first to understand the two supported data models and the common integration patterns:

- [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)

It explains how to use `data.save` and `data.batchSave` callbacks, how loading fits into each model, and what changes when Gantt manages data internally.

## Pick your state library

Each tutorial below applies the same core pattern (state -> props -> Gantt, changes -> callbacks -> state), but uses the idioms of the specific library:

- [Redux Toolkit](integrations/react/state/redux-toolkit.md)
- [Zustand](integrations/react/state/zustand.md)
- [MobX](integrations/react/state/mobx.md)
- [XState](integrations/react/state/xstate.md)
- [Jotai](integrations/react/state/jotai.md)
- [Valtio](integrations/react/state/valtio.md)

## Real-time sync

If you need live updates, start here:

- [Firebase Integration](integrations/react/firebase-integration.md)

## Performance notes

If your app performs large operations (auto-scheduling, mass edits, big datasets), pay attention to:

- using `data.batchSave` to reduce update overhead,
- the **Gantt-managed data** model when React does not need to reflect every change immediately.

Both topics are covered in [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md).