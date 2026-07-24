---  
title: Vue Gantt 自定义  
sidebar_label: 自定义  
description: "Vue Gantt 的自定义模式：模板、自定义灯箱、内联编辑器、模态框、事件、ready 钩子，以及模板包装。"  
---  

# Vue Gantt 自定义

本指南覆盖 Vue 封装中的主要自定义层，以及在何时使用每一个层级。请在你能够渲染包装器且需要应用程序特定的 UI 或行为时再使用它。

本页配合使用：  

- [Vue Gantt 概览](integrations/vue/overview.md)  
- [配置参考](integrations/vue/configuration-props.md)  

## 选择合适的自定义层

从能解决任务的最低成本选项开始：

- 使用 `config` 和 `templates` 进行视觉输出和内置行为的变更  
- 使用 `theme` 和 `locale` 进行图表范围的皮肤与语言切换  
- 在任何模板函数中从 `h()` 返回一个 Vue `VNode` —— 当你需要一个交互式或可组合的 Vue 元素而不是字符串时，使用 `templates.task_text`、`templates.tooltip_text`、刻度/时间线单元格模板，以及列的 `template`/`label`  
- 使用 `events` 和 `@ready` 处理交互规则和启动编排  
- 使用 `modals` 处理删除确认控制  
- 当编辑 UI 需要应用程序特定实现且适合放在模态框中时，使用 `customLightbox`  
- 当编辑器需要自己的路由或整页 UI 时，使用 `events.onBeforeLightbox` 返回 `false` + `vue-router`  
- 当网格单元格需要自定义编辑控件时，使用 `inlineEditors`  

在定制 UI 时保持单一的数据拥有模型。如果图表会编辑数据，请确保你的 Vue 状态管理策略与之匹配。

## 基于模板的视觉自定义

使用 `templates` 来定制任务文本、CSS 类、刻度标签和网格输出。

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

当你的变更能清晰映射到原生 Gantt 模板 API 时，请使用此方式。

## 主题、语言环境，以及模板中的 Vue 组件

使用 `theme` 和 `locale` 属性实现图表全局的皮肤和语言切换。使用 `h()` 从任意模板函数返回 Vue `VNode` —— 包括时间线端的 `templates` 属性（`task_text`、`tooltip_text`、`timeline_cell_content` 等等）以及列的 `template` / `label`。包装器会把结果挂载到正确的位置 —— 时间线条、刻度单元、网格单元，或工具提示。

- `theme` 接受内置皮肤名称（例如 `"terrace"`、`"dark"`）  
- `locale` 接受一个语言代码（`"en"`、`"es"`、`"de"`、`"cn"` 等等）或一个完整的 locale 对象  
- 任何模板函数都可以返回普通字符串/HTML（原生 Gantt 模板形状）或 `h(Component, props)` 的 Vue 组件  
- 通过渲染组件上的 Vue 事件属性来连接交互（例如 `onToggle`、`onClick` 等），方式与在模板中一样  

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

// 时间线模板中的 Vue 组件（task_text）:
const templates = {
  task_text: (_start: Date, _end: Date, task: Task) =>
    h(TaskTextBadge, { task, onToggle: () => toggleCompleted(task.id) })
} as any;

// 列模板/标签中的 Vue 组件:
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
原生 `GanttTemplates` 类型将时间线模板的返回值声明为 `string | number | void`。包装器在运行时接受 Vue `VNode`，但当前需要进行 `as any` 强制转换（或按函数进行转换）以满足 TypeScript。返回普通字符串的模板仍然可以使用 `defineGanttTemplates(...)` 以获得完整的类型推断。
:::

对于活跃图表上的批量操作（全部展开/折叠、在每个任务上切换标志），获取实例并在之后调用 `render()`：

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

将此与 `filter` 属性配对使用，以实现由工具栏状态驱动的网格侧过滤。

## 替换任务表单（`customLightbox`） {#替换任务表单-customlightbox}

在内置灯箱不足以满足需求且你需要一个用于任务编辑的 Vue 组件时使用 `customLightbox`。

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

你的自定义组件会接收：

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

## 用路由替换灯箱

当任务编辑器需要独立的页面、可深度链接的 URL，或不适合放在模态框中的布局时，使用此模式。不要提供 `customLightbox`，改为拦截灯箱事件并路由到单独的 Vue Router 视图。

完成这项工作需要的两个事件：

- `onBeforeLightbox(taskId)` —— 在内置编辑器打开之前触发。返回 `false` 以抑制并导航到你的编辑路由。  
- `onTaskCreated(task)` —— 当用户添加新行时触发。将新任务暂存到你的存储中（以便编辑路由可以读取），导航，并返回 `false`。

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

编辑器路由会读取并修改图表绑定的同一存储（通常通过 `provide`/`inject` 或 Pinia 共享），因此在 `save`/`delete` 后图表会自动重新渲染。

在以下场景时，使用该模式替代 `customLightbox`：

- 编辑器需要比模态框更大的空间（多窗格布局、嵌入媒体等）  
- 你希望有深度链接，浏览器的返回/前进键在编辑之间导航  
- 编辑器在导航后仍需保持挂载（如未保存更改流程）  

对于模态样式的替代，优先使用 [`customLightbox`](#替换任务表单-customlightbox)。

## 自定义网格内联编辑器

当网格单元需要自定义编辑控件时，使用 `inlineEditors`。

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

当网格编辑是工作流程的核心且内置编辑器不足以满足需求时，请使用此方案。

## 自定义删除确认模态框

使用 `modals` 来替换内置的任务/链接删除确认。

处理程序在删除任务时接收 `{ task, callback, message, title, ganttInstance }`（删除链接时为 `{ link, … }`）。只有在调用 `callback()` 时才会进行删除——跳过调用即取消删除。

### 快速路径：`window.confirm`

原型和内部工具的快速方案就足够了：

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

### 生产环境路径：自定义 Vue 对话框组件

实际应用通常需要一个与其余 UI 相匹配的品牌模态框。处理程序不能同步显示 Vue 组件——用户必须先点击，所以你将在组件状态中捕获 `callback`，打开对话框，并在用户选择后调用回调（或不调用）。

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

`TaskDeleteDialog.vue` 是你喜欢的任意 Vue 对话框组件——比如 Vuetify 的 `v-dialog`、Element Plus 的 `el-dialog`、自定义实现的 `<Teleport>` 覆盖层等。契约仅仅是 `modelValue`（或任意打开/关闭属性）、一个 `confirm` 动作和一个 `cancel` 动作。

可在 [`vue-gantt-examples`](https://github.com/DHTMLX/vue-gantt-examples) 的 [`templates` 路由] 中找到可运行的 Vue 版本。

`OnBeforeTaskDeleteConfirmArgs` 与 `OnBeforeLinkDeleteConfirmArgs` 类型在 [配置参考](integrations/vue/configuration-props.md#type-exports) 中列出。

## 用 `events` + `@ready` 协调行为

使用 `events` 来处理交互逻辑，使用 `@ready` 进行需要 `instance` 的一次性设置。

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

## 继续阅读

- [Vue Gantt 概览](integrations/vue/overview.md)  
- [配置参考](integrations/vue/configuration-props.md)  
- [数据绑定与状态管理基础](integrations/vue/state/state-management-basics.md)  
- [结合 Pinia 使用 Vue Gantt](integrations/vue/state/pinia.md)