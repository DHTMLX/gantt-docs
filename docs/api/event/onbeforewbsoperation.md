---
sidebar_label: onBeforeWBSOperation
title: onBeforeWBSOperation event
description: "fires before an operation that changes stored WBS codes"
---

# onBeforeWBSOperation

### Description

@short: Fires before an operation that changes stored WBS codes

@signature: onBeforeWBSOperation: (plan: WBSOperationPlan) =\> boolean | void

### Parameters

- `plan` - (required) *WBSOperationPlan* - the operation ID, reason, origin and proposed code changes

### Example

~~~js
gantt.attachEvent("onBeforeWBSOperation", (plan) => {
    return plan.codeChanges.length <= 100;
});
~~~

### Details

Return `false` to cancel the operation and its associated structural edit, if any. The event does not fire for a dry run or an operation with no code changes. Run any follow-up WBS or structural operation after the event handler completes.

### Related API

- [onAfterWBSOperation](api/event/onafterwbsoperation.md)

### Related Guides

- [WBS Codes and Task Numbering](guides/wbs-and-task-numbering.md#wbs-events)
