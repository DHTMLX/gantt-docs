---
title: Vue Gantt Customization
sidebar_label: Customization
description: "Customization patterns for Vue Gantt: templates, custom lightbox, inline editors, modals, events, ready hook, and template wrapping."
---

# Vue Gantt Customization

This guide covers the main customization layers in the Vue wrapper and when to use each one. Use it after you can render the wrapper and need application-specific UI or behavior.

Use this page with:

- [Vue Gantt Overview](integrations/vue/overview.md)
- [Configuration Reference](integrations/vue/configuration-props.md)

## Choose The Right Customization Layer

Start with the lowest-cost option that solves the task:

- Use `config` and `templates` for visual output and built-in behavior changes
- Use `theme` and `locale` for chart-wide skin and language switches
- Return a Vue `VNode` from `h()` inside any template function - `templates.task_text`, `templates.tooltip_text`, scale/timeline cell templates, and column `template`/`label` - whenever you need an interactive or composable Vue element instead of a string
- Use `events` and `@ready` for interaction rules and startup orchestration
- Use `modals` for delete-confirmation control
- Use `customLightbox` when edit UI must be application-specific and fits in a modal
- Use `events.onBeforeLightbox` returning `false` + `vue-router` when the editor needs its own route or full-page UI
- Use `inlineEditors` when grid cells need custom editing widgets

Keep one data ownership model while customizing UI. If the chart edits data, make sure your Vue state strategy matches it.

## Template-Driven Visual Customization

Use `templates` for task text, CSS classes, scale labels, and grid output.

~~~vue
<script setup lang="ts">
const templates = {
  task_text: (_start, _end, task) => `#${task.id}: ${task.text}`,
  task_class: (_start, _end, task) => (task.priority === "high" ? "task--high" : "")
};
</script>

<template>
  <VueGantt :tasks="tasks" :links="links" :templates="templates" />
</template>
~~~

Use this when your changes map cleanly to native Gantt template APIs.

## Themes, Locales, And Vue Components Inside Templates

Use the `theme` and `locale` props for chart-wide skin and language switches. Use `h()` to return Vue `VNode`s from any template function - both the timeline-side `templates` prop (`task_text`, `tooltip_text`, `timeline_cell_content`, ...) and column `template` / `label`. The wrapper mounts the result into the right place - the timeline bar, the scale cell, the grid cell, or the tooltip.

- `theme` accepts the built-in skin names (for example `"terrace"`, `"dark"`)
- `locale` accepts a locale code (`"en"`, `"es"`, `"de"`, `"cn"`, ...) or a full locale object
- Any template function can return either a plain string/HTML (the native Gantt template shape) or `h(Component, props)` for a Vue component
- Wire interaction (`onToggle`, `onClick`, ...) through Vue event props on the rendered component, the same way you would in a template

~~~vue
<script setup lang="ts">
import { computed, h, ref } from "vue";
import {
  VueGantt,
  type GanttConfigOptions,
  type Task,
  type VueGanttRef
} from "@dhtmlx/trial-vue-gantt";
import DoneToggleButton from "./components/DoneToggleButton.vue";
import FilterDropdown from "./components/FilterDropdown.vue";
import TaskTextBadge from "./components/TaskTextBadge.vue";

const ganttRef = ref<VueGanttRef | null>(null);
const theme = ref<"terrace" | "dark">("terrace");
const locale = ref<"en" | "es" | "de" | "cn">("en");
const filterMode = ref<"all" | "done" | "notDone">("all");

const toggleTheme = () => (theme.value = theme.value === "terrace" ? "dark" : "terrace");

// Vue component inside a timeline template (task_text):
const templates = {
  task_text: (_start: Date, _end: Date, task: Task) =>
    h(TaskTextBadge, { task, onToggle: () => toggleCompleted(task.id) })
} as any;

// Vue components inside column template/label:
const config = computed<Partial<GanttConfigOptions>>(() => ({
  columns: [
    { name: "text", tree: true, width: 220 },
    {
      name: "status",
      width: 180,
      label: h(FilterDropdown, {
        modelValue: filterMode.value,
        "onUpdate:modelValue": (next: typeof filterMode.value) => (filterMode.value = next)
      }),
      template: (task: Task) =>
        h(DoneToggleButton, { task, onToggle: () => toggleCompleted(task.id) })
    }
  ]
}));
</script>

<template>
  <button @click="toggleTheme">Switch Theme</button>
  <VueGantt
    ref="ganttRef"
    :tasks="tasks"
    :links="links"
    :theme="theme"
    :locale="locale"
    :config="config"
    :templates="templates"
  />
</template>
~~~

:::note
The native `GanttTemplates` type declares timeline template returns as `string | number | void`. The wrapper accepts a Vue `VNode` at runtime, but an `as any` cast (or per-function cast) is currently required to satisfy TypeScript. Templates that return plain strings can still use `defineGanttTemplates(...)` for full type inference.
:::

For bulk operations on the live chart (expand/collapse all, toggle a flag on every task), reach for the instance and call `render()` afterwards:

~~~ts
const collapseAll = () => {
  const gantt = ganttRef.value?.instance;
  if (!gantt) return;
  gantt.eachTask((task: Task & { $open?: boolean }) => {
    task.$open = false;
  });
  gantt.render();
};
~~~

Pair this with the `filter` prop for grid-side filtering driven by the toolbar state.

## Replace The Task Form (`customLightbox`)

Use `customLightbox` when the built-in lightbox is not enough and you need a Vue component for task editing.

~~~vue
<script setup lang="ts">
import CustomLightbox from "./CustomLightbox.vue";

const data = {
  batchSave: changes => {
    console.log(changes);
  }
};
</script>

<template>
  <VueGantt :tasks="tasks" :links="links" :customLightbox="CustomLightbox" :data="data" />
</template>
~~~

Your custom component receives:

- `data`
- `onSave(updatedTask)`
- `onCancel()`
- `onDelete()`
- `ganttInstance`

~~~vue title='CustomLightbox.vue'
<script setup lang="ts">
import { ref, watch } from "vue";

interface CustomLightboxProps {
  data?: any;
  onSave?: (updatedTask: any) => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

const props = defineProps<CustomLightboxProps>();

const text = ref("");

watch(
  () => props.data,
  nextValue => {
    text.value = String(nextValue?.text ?? "");
  },
  { immediate: true }
);

const save = () => {
  props.onSave?.({ ...props.data, text: text.value });
};
</script>

<template>
  <div class="lightbox-backdrop" data-cy="custom-lightbox">
    <div class="lightbox-panel" role="dialog" aria-modal="true">
      <h3>Edit Task</h3>
      <label class="field">
        <span>Task Text</span>
        <input data-cy="custom-lightbox-text" type="text" v-model="text" />
      </label>
      <div class="actions">
        <button data-cy="custom-lightbox-save" type="button" @click="save">Save</button>
        <button data-cy="custom-lightbox-cancel" type="button" @click="props.onCancel?.()">Cancel</button>
        <button data-cy="custom-lightbox-delete" type="button" @click="props.onDelete?.()">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lightbox-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 27, 38, 0.45);
  z-index: 1000;
}

.lightbox-panel {
  width: min(420px, calc(100vw - 24px));
  background: #fff;
  border: 1px solid #cfd8e2;
  border-radius: 8px;
  padding: 14px;
}

h3 {
  margin: 0 0 12px;
}

.field {
  display: block;
}

.field span {
  display: inline-block;
  font-size: 12px;
  margin-bottom: 4px;
  color: #455a6f;
}

.field input {
  width: 100%;
  border: 1px solid #cfd8e2;
  padding: 8px;
  font-size: 14px;
}

.actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.actions button {
  border: 1px solid #cfd8e2;
  background: #fff;
  padding: 6px 10px;
  cursor: pointer;
}

.actions button:hover {
  border-color: #91abd0;
}
</style>

~~~


## Replace The Lightbox With A Route

Use this pattern when the task editor needs its own page, deep-linkable URL, or layout that does not fit in a modal. Instead of supplying `customLightbox`, intercept lightbox events and route to a separate Vue Router view.

Two events do the work:

- `onBeforeLightbox(taskId)` - fires before the built-in editor opens. Return `false` to suppress it and navigate to your editor route.
- `onTaskCreated(task)` - fires when the user adds a new row. Stage the new task in your store (so the editor route can read it), navigate, and return `false`.

~~~vue title="GanttView.vue"
<script setup lang="ts">
import { inject } from "vue";
import { useRouter } from "vue-router";
import { defineGanttEvents, VueGantt, type Task } from "@dhtmlx/trial-vue-gantt";

const router = useRouter();
const context = inject(CUSTOM_EDIT_VIEW_CONTEXT_KEY)!; // tasks, links, upsertTask, applyBatch, ...

const events = defineGanttEvents({
  onBeforeLightbox: (taskId: string | number) => {
    router.push(`/editor/${taskId}`);
    return false;
  },
  onTaskCreated: (task: Task) => {
    context.upsertTask({ ...(task as any), $new: true });
    router.push(`/editor/${task.id}`);
    return false;
  }
});

const data = {
  batchSave: (changes) => context.applyBatch(changes)
};
</script>

<template>
  <VueGantt :tasks="context.tasks.value" :links="context.links.value" :events="events" :data="data" />
</template>
~~~

The editor route reads and mutates the same store the chart binds to (typically shared via `provide`/`inject` or Pinia), so the chart re-renders automatically after `save`/`delete`.

Use this instead of `customLightbox` when:

- The editor needs more space than a modal allows (multi-pane layout, embedded media)
- You want deep links and browser back/forward to navigate between edits
- The editor should remain mounted after navigation (for example unsaved-changes flows)

For modal-style replacement, prefer [`customLightbox`](#replace-the-task-form-customlightbox).

## Custom Grid Inline Editors

Use `inlineEditors` when users need custom grid cell editors.

~~~vue
<script setup lang="ts">
import TextEditor from "./editors/TextEditor.vue";

const config = {
  columns: [
    {
      name: "text",
      tree: true,
      width: 220,
      editor: { type: "TextEditor", map_to: "text" }
    }
  ]
};

const inlineEditors = {
  TextEditor
};
</script>

<template>
  <VueGantt
    :tasks="tasks"
    :links="links"
    :config="config"
    :inlineEditors="inlineEditors"
    :data="data" />
</template>
~~~

~~~vue title='TextEditor.vue'
<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";

interface TextEditorProps {
  initialValue: any;
  save: () => void;
  cancel: () => void;
}

const props = defineProps<TextEditorProps>();

const inputRef = ref<any>(null);
const value = ref("");

const normalize = (nextValue: any) => String(nextValue ?? "");

watch(
  () => props.initialValue,
  nextValue => {
    value.value = normalize(nextValue);
  },
  { immediate: true }
);

const getInputElement = () => {
  const candidate = inputRef.value?.$el ?? inputRef.value;
  if (!candidate || typeof candidate.querySelector !== "function") {
    return null;
  }
  return candidate.querySelector("input") as HTMLInputElement | null;
};

const focus = () => {
  inputRef.value?.focus?.();
  getInputElement()?.focus();
};

const setValue = (nextValue: any) => {
  value.value = normalize(nextValue);
};

const getValue = () => value.value;
const isChanged = (rawValue: any) => normalize(rawValue) !== value.value;
const isValid = () => value.value.trim().length > 0;
const save = () => props.save();

onMounted(async () => {
  await nextTick();
  focus();
});

defineExpose({
  focus,
  setValue,
  getValue,
  isChanged,
  isValid,
  save
});
</script>

<template>
  <v-sheet class="editor-shell" border elevation="2" rounded="lg">
    <v-text-field
      ref="inputRef"
      v-model="value"
      class="editor-field editor-field-text"
      density="compact"
      hide-details
      type="text"
      variant="outlined"
    />
  </v-sheet>
</template>

<style scoped>
.editor-shell {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
}

.editor-field {
  flex: 0 0 auto;
}

.editor-field-text {
  width: 100%;
  min-width: 100%;
}

</style>
~~~

Use this when grid editing is central to the workflow and built-in editors are not enough.

## Custom Delete Confirmation Modals

Use `modals` to replace built-in task/link deletion confirmations.

The handler receives `{ task, callback, message, title, ganttInstance }` for task deletion (and `{ link, ... }` for link deletion). **Deletion only proceeds when you invoke `callback()`** - skip the call and the deletion is cancelled.

### Quick Path: `window.confirm`

Good enough for prototypes and internal tools:

~~~ts
const modals = {
  onBeforeTaskDelete: ({ task, callback }) => {
    if (window.confirm(`Delete task ${task.text}?`)) callback();
  },
  onBeforeLinkDelete: ({ link, callback }) => {
    if (window.confirm(`Delete link ${link.id}?`)) callback();
  }
};
~~~

### Production Path: Custom Vue Dialog Component

Real apps usually need a branded modal that matches the rest of the UI. The handler can't show a Vue component synchronously - the user has to click first - so you capture the `callback` in component state, open the dialog, and invoke the callback (or don't) when the user chooses.

~~~vue
<script setup lang="ts">
import { ref } from "vue";
import { VueGantt, type OnBeforeTaskDeleteConfirmArgs } from "@dhtmlx/trial-vue-gantt";
import TaskDeleteDialog from "./TaskDeleteDialog.vue";

const showTaskDeleteDialog = ref(false);
const pendingTaskDelete = ref<{ message: string; callback: () => void } | null>(null);

const handleDeleteTaskConfirm = ({ task, callback }: OnBeforeTaskDeleteConfirmArgs) => {
  pendingTaskDelete.value = {
    message: `Delete "${task.text}"?`,
    callback
  };
  showTaskDeleteDialog.value = true;
};

const onDialogConfirm = () => {
  pendingTaskDelete.value?.callback();
  pendingTaskDelete.value = null;
};

const onDialogCancel = () => {
  pendingTaskDelete.value = null;
};

const modals = {
  onBeforeTaskDelete: handleDeleteTaskConfirm
};
</script>

<template>
  <VueGantt :tasks="tasks" :links="links" :modals="modals" />

  <TaskDeleteDialog
    v-model="showTaskDeleteDialog"
    :text="pendingTaskDelete?.message ?? ''"
    @confirm="onDialogConfirm"
    @cancel="onDialogCancel"
  />
</template>
~~~

`TaskDeleteDialog.vue` is any Vue dialog component you like - a Vuetify `v-dialog`, an Element Plus `el-dialog`, a custom-rolled `<Teleport>` overlay, etc. The contract is just `modelValue` (or any open/close prop), a `confirm` action and a `cancel` action.

See the runnable Vue version in the `templates` route of [`vue-gantt-examples`](https://github.com/DHTMLX/vue-gantt-examples).

The `OnBeforeTaskDeleteConfirmArgs` and `OnBeforeLinkDeleteConfirmArgs` types are listed in the [Configuration Reference](integrations/vue/configuration-props.md#type-exports).

## Orchestrate Behavior With `events` + `@ready`

Use `events` for interaction logic and `@ready` for one-time setup that needs `instance`.

~~~vue
<script setup lang="ts">
import { defineGanttEvents, type GanttStatic } from "@dhtmlx/trial-vue-gantt";

const events = defineGanttEvents({
  onBeforeLightbox: taskId => {
    console.log("Open custom editor route", taskId);
    return false;
  }
});

const onReady = (instance: GanttStatic) => {
  instance.showDate(new Date());
};
</script>

<template>
  <VueGantt :events="events" @ready="onReady" />
</template>
~~~

## Continue With

- [Vue Gantt Overview](integrations/vue/overview.md)
- [Configuration Reference](integrations/vue/configuration-props.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
- [Using Vue Gantt with Pinia](integrations/vue/state/pinia.md)
