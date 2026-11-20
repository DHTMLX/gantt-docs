---
sidebar_label: onLinkDragStart
title: onLinkDragStart event
description: "Fires when the user starts dragging a new dependency link."
---

# onLinkDragStart

### Description

@short: Fires when the user starts dragging a new dependency link

@signature: onLinkDragStart: (sourceId: string | number, fromStart: boolean) =\> void;

### Parameters

- `sourceId` is the ID of the task at the source of the dependency.
- `fromStart` is `true` if the user started the drag from the task's start. It is `false` for the finish.

### Details

This event reports that a drag has started. Returning `false` has no effect. Use [onLinkCreated](api/event/onlinkcreated.md) to cancel creating a link.

### Related API

- [onLinkDragMove](api/event/onlinkdragmove.md)
- [onLinkDragEnd](api/event/onlinkdragend.md)
- [Previewing a new link](guides/auto-scheduling.md#previewing-a-new-link)

### Change log

- Added in v10.1.
