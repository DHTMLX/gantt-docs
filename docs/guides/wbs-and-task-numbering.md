---
title: "WBS Codes and Task Numbering"
sidebar_label: "WBS Codes and Task Numbering"
---

# WBS Codes and Task Numbering

Use outline numbers to show where tasks sit in the hierarchy, row numbers to show their sequence, and stored work breakdown structure (WBS) codes to identify tasks by codes that you can save with the project.

The outline, row and stored-code APIs described here are available in paid editions.

| Value | Example | Source |
| --- | --- | --- |
| Outline number | `2.3.1` | [getOutlineNumber](api/method/getoutlinenumber.md) follows the hierarchy and sibling order. |
| Row number | `12` | [getRowNumber](api/method/getrownumber.md) counts each task before its children. |
| Stored WBS code | `PRJ-B.003` | The `wbs` extension stores the code in a task field and can generate it from a mask. |
| Legacy WBS number | `2.3.1` | [getWBSCode](api/method/getwbscode.md) returns a display-order number that can change when you sort the grid. |

## Outline and row numbers

Call the numbering methods with a task object. The corresponding lookup methods find a loaded task by number.

~~~js
const task = gantt.getTask(taskId);
const outline = gantt.getOutlineNumber(task);
const row = gantt.getRowNumber(task);

const taskByOutline = gantt.getTaskByOutlineNumber(outline);
const taskByRow = gantt.getTaskByRowNumber(row);
~~~

Outline and row numbers stay stable when you sort, filter or collapse the grid. Inserting, deleting or moving tasks can change them. While grouping is active, the methods follow the grouped hierarchy. Generated group rows can occupy a position in an outline path, but they do not have their own displayed number or contribute to the row count.

Display the numbers in [grid columns](guides/specifying-columns.md#task-number-columns), or use them in [predecessor and successor editors](guides/inline-editing.md#linkformatter). Keep task IDs for data relationships because a number can change after a structural edit.

## Enable stored WBS codes

Enable the `wbs` plugin before initializing Gantt. By default, it reads and writes the task properties `wbs_code` and `wbs_locked`. The [wbs configuration](api/config/wbs.md) lets you choose different field names and automatic update rules.

~~~js
gantt.plugins({ wbs: true });
gantt.init("gantt_here");
~~~

An empty, missing or `null` code means the task is unassigned. A non-empty code with `wbs_locked: true` is protected from automatic changes. A locked task without a code is invalid. Loaded codes are compared exactly and case-sensitively. Gantt keeps duplicate codes found in loaded data so you can diagnose and resolve them.

Moving a task keeps its stored fields unless the update policy changes the code. Copying a task clears the code and lock on the copy.

Use `getCode(taskOrId)` to read a stored code and `setCode(id, code, { locked })` to assign a code or change its lock. Pass `null` as the code to clear it, and `locked: false` if the task must also be unlocked.

If you write a lock or code in an [onLightboxSave](api/event/onlightboxsave.md) handler, update the handler's `task` argument so the lightbox can save the value.

~~~js
const result = gantt.ext.wbs.setCode(taskId, "PRJ-A", { locked: true });
if (result.status === "rejected") {
    console.log(result.conflicts);
}
~~~

## Set a mask and generate codes

A mask has a `prefix` and an array of `levels`. Each level specifies a `sequence`, a `length` and a `separator`. The built-in sequences are `numeric`, `uppercase` and `lowercase`. Use `null` for variable length or a positive integer for a fixed length. If a level runs out of values, generation reports a capacity conflict. Levels below the last configured level reuse it.

~~~js
gantt.ext.wbs.setMask({
    prefix: "PRJ-",
    levels: [
        { sequence: "uppercase", length: null, separator: "." },
        { sequence: "numeric", length: 3, separator: "." }
    ]
});

const request = { mode: "renumber", includeMissing: true };
const preview = gantt.ext.wbs.generate({ ...request, dryRun: true });
if (preview.status === "preview" && preview.conflicts.length === 0) {
    gantt.ext.wbs.generate(request);
}
~~~

The example generates codes such as `PRJ-A` and `PRJ-A.001`. A mask is plain data that your application can save with the project. Call `setMask(null)` to restore the default numeric mask. Changing the mask leaves existing codes in place until you generate replacements.

| Mode | Effect |
| --- | --- |
| `assignMissing` | Fills empty codes while keeping existing ones. |
| `renumber` | Generates codes from task positions. Use `includeMissing: true` to fill empty codes too. |
| `rebaseChildren` | Keeps the specified parent's code and generates codes for its descendants. Pass the parent ID in `scope`. Use `includeMissing: true` to fill empty codes. |

Pass `scope` to limit an operation to a branch. For `renumber` and `rebaseChildren`, `skipLocked: true` keeps locked codes while processing eligible descendants. A dry run returns the proposed changes and conflicts. Calling `generate()` again recalculates the operation against the current data.

The generator can reuse a code freed by deletion. Allocate codes on the server if your project requires permanent identifiers.

The result contains a `status` (`"applied"`, `"preview"` or `"rejected"`), a `changes` array with task IDs and before and after codes, and a `conflicts` array. Check `conflicts` for issues such as a protected code, a duplicate or a mask with insufficient capacity. A rejected generation applies no code changes.

## Update codes when tasks move

| Update policy | Effect |
| --- | --- |
| `preserve` (default) | Keeps codes on move, reorder and delete. |
| `reparent` | Assigns a new code when a task moves to another parent and updates its descendants. Reordering under the same parent keeps codes. |
| `structure` | Updates affected codes to follow sibling order after a structural change. |

For the policies that generate a child code from its parent, Gantt uses the parent's stored code as the prefix. It can be a manually assigned code. Editing a parent code directly leaves the children's codes in place. Use `rebaseChildren` to bring them in line.

A conflict such as a locked code normally prevents the structural edit. When automatic generation for a new task cannot allocate a code, Gantt can still add the task without a code. Sorting, filtering, grouping and collapsing leave stored codes in place.

## Look up and validate codes

Call `getTaskByCode(code)` with a non-empty code. It returns the matching loaded task or `null` when no task matches. It throws if the code is invalid or more than one loaded task has the same code.

The [stored-code sample](https://docs.dhtmlx.com/gantt/samples/07_grid/15_wbs_stored_codes.html) shows a custom mask editor, an inline code editor with a uniqueness check, and a lock field. The [row-number sample](https://docs.dhtmlx.com/gantt/samples/07_grid/16_row_numbers.html) shows how to use row numbers in the dependency editor.

### Extension methods

| Method | Purpose |
| --- | --- |
| `getCode(taskOrId)` | Returns the stored code or `null` when the task has no code. |
| `getTaskByCode(code)` | Looks up a loaded task by its exact stored code. |
| `setCode(id, code, options?)` | Sets or clears a code and optionally sets its lock flag. Returns a `WBSResult`. |
| `generate(request)` | Generates or previews code changes and returns a `WBSResult`. |
| `validate()` | Reports duplicates, malformed codes, locked tasks without codes, and child codes that do not derive from their parent's code. This method leaves task data unchanged. |
| `setMask(mask)` | Validates and sets the mask. Pass `null` to restore the default. |
| `addSequence(name, { format, parse })` | Registers a custom sequence. Each handler receives the configured segment length as its second argument. The first argument is an ordinal for `format` and a segment string for `parse`. Return `null` if the value cannot be converted. |

## WBS events {#wbs-events}

Use [onBeforeWBSOperation](api/event/onbeforewbsoperation.md) to approve or cancel a proposed edit and [onAfterWBSOperation](api/event/onafterwbsoperation.md) to read the applied changes. Both receive a plan with `operationId`, `reason`, `origin` and `codeChanges`. Each change includes the task ID and the code before and after the operation.

Operations that leave codes unchanged and previews do not fire these events.

## Save stored codes

Save the code and lock fields with each task. An operation can update multiple tasks, including tasks outside the visible grid. The data processor sends the changed task records through its normal update path. Use [batched JSON requests](guides/server-side.md#batched-json-requests) if the server accepts the batch format. Enforce uniqueness on the server across the full project, especially if the browser has loaded only part of the project.

When the `wbs` extension is active, [serialize()](api/method/serialize.md) uses canonical order by default for JSON. Pass `{ order: "display" }` as the second argument to preserve the current grid order. When the undo extension is enabled, one undo step restores the structure, codes and locks changed by one WBS operation.

## Framework wrappers

The React wrapper exposes the [useWBS hook](integrations/react/hooks.md#usewbs), and the Vue wrapper provides the [useWBS composable](integrations/vue/customization-patterns.md#usewbs). In Angular, enable the plugin through the [wrapper configuration](integrations/angular/configuration-props.md) and use `gantt.ext.wbs` on the Gantt instance.
