---
sidebar_label: onAfterUndoStackChange
title: onAfterUndoStackChange event
description: "Fires when the undo or redo stack changes"
---

# onAfterUndoStackChange

### Description

@short: Fires when the undo or redo stack changes

@signature: onAfterUndoStackChange: (undoLength: number, redoLength: number) =\> void

### Parameters

- `undoLength` - the number of actions on the undo stack
- `redoLength` - the number of actions on the redo stack

### Example

~~~js
gantt.attachEvent("onAfterUndoStackChange", function (undoLength, redoLength) {
    document.getElementById("undo-button").disabled = undoLength === 0;
    document.getElementById("redo-button").disabled = redoLength === 0;
});
~~~

### Details

Requires the [undo plugin](guides/undo-redo.md). Use the event to update command availability after recording, undoing, redoing or clearing actions.
