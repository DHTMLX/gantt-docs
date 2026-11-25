---
sidebar_label: onAfterWBSOperation
title: onAfterWBSOperation event
description: "fires after an operation changes stored WBS codes"
---

# onAfterWBSOperation

### Description

@short: Fires after an operation changes stored WBS codes

@signature: onAfterWBSOperation: (result: WBSOperationPlan) =\> void

### Parameters

- `result` - (required) *WBSOperationPlan* - the operation ID, reason, origin and code changes

### Example

~~~js
gantt.attachEvent("onAfterWBSOperation", (result) => {
    console.log(result.reason, result.codeChanges);
});
~~~

### Details

The event fires once for a completed operation with code changes. It reports every changed code, including changes to tasks outside the visible grid. This event reports the local operation. A server confirmation, if used, comes separately through the data processor.

### Related API

- [onBeforeWBSOperation](api/event/onbeforewbsoperation.md)

### Related Guides

- [WBS Codes and Task Numbering](guides/wbs-and-task-numbering.md#wbs-events)
