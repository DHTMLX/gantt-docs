---
sidebar_label: onLinkDragMove
title: onLinkDragMove event
description: "Fires as the user drags a new dependency link."
---

# onLinkDragMove

### Description

@short: Fires after Gantt updates the direction line while dragging a new dependency link

@signature: onLinkDragMove: (state: LinkDragState) =\> void;

### Parameters

- `state.link_source_id` is the source task ID.
- `state.link_target_id` is the task under the pointer, or `null`.
- `state.link_from_start` identifies the source endpoint. It is `true` for start, `false` for finish, or `null` if unknown.
- `state.link_to_start` identifies the current target endpoint. It is `true` for start or `false` for finish.
- `state.link_landing_area` indicates whether the pointer is over a target endpoint. A task bar can also be a valid drop target.

### Details

The event cannot be canceled. For expensive processing such as a [scheduling preview](guides/auto-scheduling.md#previewing-a-new-link), throttle updates or limit them to one per animation frame. The state has the same shape as the result of [getState("linksDnD")](api/method/getstate.md).

### Related API

- [onLinkDragStart](api/event/onlinkdragstart.md)
- [onLinkDragEnd](api/event/onlinkdragend.md)

### Change log

- Added in v10.1.
