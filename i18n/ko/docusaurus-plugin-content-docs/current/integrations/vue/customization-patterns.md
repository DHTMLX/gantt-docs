--- 
title: Vue Gantt 맞춤화
sidebar_label: 맞춤화
description: "Vue Gantt의 맞춤화 패턴: 템플릿, 커스텀 라이트박스, 인라인 편집기, 모달, 이벤트, 준비 훅(ready hook), 그리고 템플릿 래핑." 
--- 

# Vue Gantt 맞춤화

이 가이드는 Vue 래퍼의 주요 맞춤화 계층과 각 계층을 언제 사용해야 하는지에 대해 다룹니다. 래퍼를 렌더링할 수 있고 애플리케이션 특화 UI나 동작이 필요해진 후에 시행하면 됩니다.

다음과 함께 이 페이지를 사용하세요:

- [Vue Gantt 개요](integrations/vue/overview.md)
- [구성 참조](integrations/vue/configuration-props.md)

## 적절한 맞춤화 계층 선택

작업을 해결하는 가장 낮은 비용의 옵션부터 시작하세요:

- 시각적 출력과 내장 동작 변경을 원하면 `config`와 `templates`를 사용하세요
- 차트 전체의 스킨과 언어 전환을 원하면 `theme`와 `locale`을 사용하세요
- 문자열 대신 대화형이 필요할 때는 템플릿 함수 안에서 `h()`를 사용해 Vue `VNode`를 반환하세요 — `templates.task_text`, `templates.tooltip_text`, 축/타임라인 셀 템플릿, 그리고 열의 `template`/`label` — 언제든지
- 상호작용 규칙과 시작 시 오케스트레이션은 `events` 와 `@ready`를 사용하세요
- 삭제 확인 컨트롤은 `modals`를 사용하세요
- 편집 UI가 애플리케이션에 맞게 모달에 들어가야 하는 경우 `customLightbox`를 사용하세요
- 편집기에 고유 경로나 전체 페이지 UI가 필요하고 `vue-router`를 사용해야 하는 경우 `events.onBeforeLightbox`가 `false`를 반환하도록 하고 Vue Router를 사용하세요
- 그리드 셀에 맞춤 편집 위젯이 필요하면 `inlineEditors`를 사용하세요

UI를 맞춤화하는 동안 하나의 데이터 소유 모델을 유지하세요. 차트가 데이터를 편집한다면 Vue 상태 관리 전략이 이를 반영하도록 해야 합니다.

## Template-Driven Visual Customization

작업 텍스트, CSS 클래스, 축 레이블, 그리고 그리드 출력에 대해 `templates`를 사용합니다.

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

이 방식은 변경 내용이 기존의 native Gantt 템플릿 API에 잘 매핑될 때 적합합니다.

## Themes, Locales, And Vue Components Inside Templates

차트 전체의 스킨과 언어 전환에 대해 `theme`와 `locale` 프롭을 사용합니다. 템플릿 함수에서 Vue `VNode`를 반환하려면 `h()`를 사용하세요 — 타임라인 측의 `templates` 프롭(`task_text`, `tooltip_text`, `timeline_cell_content`, ...) 와 열의 `template`/`label` 모두에 적용됩니다. 래퍼는 결과물을 올바른 위치에 마운트합니다 — 타임라인 바, 스케일 셀, 그리드 셀, 또는 툴팁입니다.

- `theme`는 기본 제공 스킨 이름을 받습니다(예: `"terrace"`, `"dark"`)
- `locale`은 로케일 코드(`"en"`, `"es"`, `"de"`, `"cn"`, ...) 또는 전체 로케일 객체를 받습니다
- 모든 템플릿 함수는 일반 문자열/HTML(네이티브 Gantt 템플릿 형태) 또는 Vue 구성요소용 `h(Component, props)`를 반환할 수 있습니다
- 렌더링된 컴포넌트에 대한 상호작용은 템플릿에서처럼 Vue 이벤트 프롭을 통해 연결합니다(`onToggle`, `onClick` 등)

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

// 타임라인 템플릿 안의 Vue 컴포넌트(예: task_text):
const templates = {
  task_text: (_start: Date, _end: Date, task: Task) =>
    h(TaskTextBadge, { task, onToggle: () => toggleCompleted(task.id) })
} as any;

// 열 템플릿/레이블 안의 Vue 컴포넌트:
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
Native `GanttTemplates` 타입은 타임라인 템플릿 반환을 `string | number | void`로 선언합니다. 래퍼는 런타임에 Vue `VNode`를 허용하지만, TypeScript를 만족시키려면 현재 `as any` 캐스트(또는 함수별 캐스트)가 필요합니다. 일반 문자열을 반환하는 템플릿은 여전히 전체 타입 추론을 위해 `defineGanttTemplates(...)`를 사용할 수 있습니다.
:::

라이브 차트에 대해 대량 작업(모두 확장/축소, 모든 작업의 플래그 토글)을 수행하려면 인스턴스를 불러와 `render()`를 호출하세요:

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

이를 도구 모음 상태로 구동되는 그리드 측 필터링과 함께 사용하세요.

## Task Form(를 교체) (`customLightbox`) {#replace-the-task-form-customlightbox}

내장 라이트박스가 충분하지 않고 태스크 편집에 Vue 컴포넌트가 필요할 때 `customLightbox`를 사용합니다.

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

사용하는 커스텀 컴포넌트는 다음을 수신합니다:

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

## 태스크 폼을 라우트로 교체하기

편집기가 모달에 맞지 않고 더 큰 공간이나 고유 페이지 구조가 필요할 때 이 패턴을 사용합니다. 커스텀 Lightbox를 공급하는 대신 라이트박스 이벤트를 가로채고 별도의 Vue Router 뷰로 라우팅합니다.

두 가지 이벤트가 핵심 작업을 수행합니다:

- `onBeforeLightbox(taskId)` - 내장 편집기가 열리기 전에 발생합니다. 이를 `false`로 반환하여 억제하고 편집기 경로로 이동합니다.
- `onTaskCreated(task)` - 사용자가 새 행을 추가했을 때 발생합니다. 새 작업을 스토어에 스테이지하고(편집기 경로가 읽을 수 있도록), 이동한 뒤 `false`를 반환합니다.

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

편집기 경로는 차트가 바인딩하는 동일한 저장소를 읽고 수정합니다(일반적으로 `provide`/`inject` 또는 Pinia를 통해 공유). 따라서 저장/삭제 후 차트가 자동으로 다시 렌더링됩니다.

다음과 같이 사용할 때는 커스텀Lightbox 대신 이 방법을 선택하세요:

- 편집기에 모달이 허용하는 공간보다 더 많은 공간이 필요할 때(다중 창 배치, 임베디드 미디어)
- 편집 간에 브라우저의 딥 링크 및 뒤로 가기/다음으로 이동하고 싶을 때
- 네비게이션 후에도 편집기가 마운트된 상태로 남아 있어야 할 때(예: 저장하지 않은 변경 흐름)

모달 스타일의 대체의 경우 [`customLightbox`](#replace-the-task-form-customlightbox)을 선호하세요.

## 커스텀 그리드 인라인 편집기

그리드 셀에 맞춤 편집 위젯이 필요할 때 `inlineEditors`를 사용합니다.

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

그리드 편집이 워크플로의 핵심이고 내장 편집기로는 충분하지 않을 때 이 방법을 사용하세요.

## 커스텀 삭제 확인 모달

삭제 확인 대화를 내장 태스크/링크 삭제 확인에서 교체하려면 `modals`를 사용합니다.

핸들러는 태스크 삭제의 경우 `{ task, callback, message, title, ganttInstance }`를 받고(링크 삭제의 경우도 마찬가지로 `{ link, ... }`), 오로지 `callback()`를 호출할 때만 삭제가 진행됩니다. 호출을 건너뛰면 삭제는 취소됩니다.

### 빠른 경로: `window.confirm`

프로토타입과 내부 도구에 충분합니다:

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

### 생산 환경 경로: 커스텀 Vue 대화상자 컴포넌트

실제 앱은 보통 UI의 나머지 부분과 어울리는 브랜드화된 모달이 필요합니다. 핸들러는 Vue 컴포넌트를 동기적으로 표시할 수 없으므로(사용자가 먼저 클릭해야 함), 상태에 `callback`을 담고 다이얼로그를 열고 사용자가 선택할 때 콜백을 호출(또는 호출하지 않음)합니다.

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

`TaskDeleteDialog.vue`는 원하는 Vue 대화상자 컴포넌트로 교체 가능합니다 — Vuetify의 `v-dialog`, Element Plus의 `el-dialog`, 커스텀 생성된 `<Teleport>` 오버레이 등. 계약은 단지 `modelValue`(또는 열림/닫힘 프롭), `confirm` 액션, 그리고 `cancel` 액션입니다.

실행 가능한 Vue 버전은 [`vue-gantt-examples`](https://github.com/DHTMLX/vue-gantt-examples)의 `templates` 경로에서 확인할 수 있습니다.

`OnBeforeTaskDeleteConfirmArgs`와 `OnBeforeLinkDeleteConfirmArgs` 타입은 [구성 참조](integrations/vue/configuration-props.md#type-exports)에 나열되어 있습니다.

## `events` + `@ready`로 동작 오케스트레이션하기

상호작용 로직은 `events`로, 한 번만 설정하면 되는 초기화는 `@ready`로 구성합니다.

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

## 계속 읽기

- [Vue Gantt 개요](integrations/vue/overview.md)
- [구성 참조](integrations/vue/configuration-props.md)
- [데이터 바인딩과 상태 관리 기초](integrations/vue/state/state-management-basics.md)
- [Pinia로 Vue Gantt 사용하기](integrations/vue/state/pinia.md)