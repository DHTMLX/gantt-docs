---
sidebar_label: onLinkDragEnd
title: onLinkDragEnd event
description: "Fires when dragging a new dependency link ends."
---

# onLinkDragEnd

### Description

@short: Fires when dragging a new dependency link ends, including drops that do not create a link

@signature: onLinkDragEnd: (state: LinkDragState) =\> void;

### Parameters

- `state` is the final [link drag state](api/event/onlinkdragmove.md#parameters), with the source and target task IDs, endpoint flags and landing-area flag.

### Details

It fires before Gantt validates the drop or creates a link. Use it to clear temporary UI such as a scheduling preview. Returning `false` has no effect. Use [onLinkCreated](api/event/onlinkcreated.md) to cancel creating a link.

### Related API

- [onLinkDragStart](api/event/onlinkdragstart.md)
- [onLinkDragMove](api/event/onlinkdragmove.md)
- [isLinkAllowed](api/method/islinkallowed.md)

### Change log

- Added in v10.1.
