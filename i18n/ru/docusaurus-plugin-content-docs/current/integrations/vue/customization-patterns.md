---
title: Настройка Vue Gantt
sidebar_label: Настройки
description: "Паттерны настройки Vue Gantt: шаблоны, пользовательский lightbox, встроенные редакторы, модальные окна, события, готовый хук и обёртка шаблонов."
---

# Настройка Vue Gantt

Это руководство охватывает основные уровни настройки в обёртке Vue и когда использовать каждый из них. Используйте его после того, как вы сможете отрендерить обёртку и вам понадобится пользовательский интерфейс или поведение, специфичные для приложения.

Используйте эту страницу вместе с:

- [Обзор Vue Gantt](integrations/vue/overview.md)
- [Справочник по конфигурации](integrations/vue/configuration-props.md)

## Выбор подходящего уровня настройки

Начинайте с наименее затратного варианта, который решает задачу:

- Используйте `config` и `templates` для визуального вывода и изменений встроенного поведения
- Используйте `theme` и `locale` для оформления всего графика и переключения языка
- Возвращайте Vue `VNode` из `h()` внутри любой функции шаблона - `templates.task_text`, `templates.tooltip_text`, шаблоны ячеек шкалы/таймлайна и `template`/`label` столбца - когда вам нужен интерактивный или композиционный элемент Vue вместо строки
- Используйте `events` и `@ready` для правил взаимодействия и координации запуска
- Используйте `modals` для контроля подтверждения удаления
- Используйте `customLightbox`, когда интерфейс редактирования должен быть специфичным для приложения и помещается в модальное окно
- Используйте `events.onBeforeLightbox`, возвращающий `false`, вместе с `vue-router` когда редактору нужен собственный маршрут или полноразмерный UI
- Используйте `inlineEditors`, когда ячейки грида требуют пользовательских виджетов редактирования

Сохраняйте единую модель владения данными при настройке UI. Если график редактирует данные, убедитесь, что ваша стратегия состояния Vue этому соответствует.

## Визуальная настройка через шаблоны

Используйте `templates` для текста задачи, CSS-классов, подписей шкалы и вывода гридa.

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

Используйте это, когда ваши изменения явно соответствуют нативным API шаблонов Gantt.

## Темы, локали и Vue-компоненты внутри шаблонов

Используйте пропсы `theme` и `locale` для общего оформления и переключения языка графика. Используйте `h()` для возврата Vue `VNode` из любой функции шаблона — как в пропе `templates` на стороне таймлайна (`task_text`, `tooltip_text`, `timeline_cell_content`, ...) так и в `template`/`label` столбца. Обёртка монтирует результат в нужное место — полосу таймлайна, ячейку шкалы, ячейку грида или тултипа.

- `theme` принимает встроенные имена скина (например, `"terrace"`, `"dark"`)
- `locale` принимает код локали (`"en"`, `"es"`, `"de"`, `"cn"`, ...) или полный объект локали
- Любая функция шаблона может возвращать либо обычную строку/HTML (нативная форма шаблонов Gantt) либо `h(Component, props)` для Vue-компонента
- Связывайте взаимодействие (`onToggle`, `onClick`, ...) через пропсы событий Vue на отрисованном компоненте, так же, как вы сделали бы в шаблоне

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

// Vue-компонент внутри шаблона таймлайна (task_text):
const templates = {
  task_text: (_start: Date, _end: Date, task: Task) =>
    h(TaskTextBadge, { task, onToggle: () => toggleCompleted(task.id) })
} as any;

// Vue-компоненты внутри шаблона/ярлыка столбца:
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
Native type `GanttTemplates` объявляет возвращаемые значения шаблонов timelines как `string | number | void`. Внешний обёртka принимает Vue `VNode` во время выполнения, но в текущей реализации требуется приведение типа к `any` (или по-функционально) для удовлетворения TypeScript. Шаблоны, возвращающие обычные строки, по-прежнему могут использовать `defineGanttTemplates(...)` для полной типизации.
:::

Для пакетных операций на работающей диаграмме (развернуть/свернуть всё, переключить флаг у каждой задачи) обратитесь к экземпляру и вызовите `render()` после:
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

Сочетайте это с пропсом `filter` для фильтрации на стороне грида, управляемой состоянием панели инструментов.

## Заменить форму задачи (`customLightbox`) {#replace-the-task-form-customlightbox}

Используйте `customLightbox`, когда встроенный lightbox не хватает и вам нужен компонент Vue для редактирования задачи.

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

Ваш настраиваемый компонент получает:

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

## Заменить Lightbox маршрутной навигацией

Используйте этот паттерн, когда редактор задачи требует отдельной страницы, глубокой привязки URL или верстки, которая не поместится в модальное окно. Вместо того чтобы supply `customLightbox`, перехватывайте события lightbox и направляйте пользователя на отдельный маршрут Vue Router.

Два события выполняют работу:

- `onBeforeLightbox(taskId)` — срабатывает перед открытием встроенного редактора. Верните `false`, чтобы подавить его и перейти к вашему маршруту редактора.
- `onTaskCreated(task)` — срабатывает, когда пользователь добавляет новую строку. Поместите новую задачу в ваше хранилище (чтобы редакторный маршрут мог прочитать её), перейдите по маршруту и верните `false`.

~~~vue title="GanttView.vue"
<script setup lang="ts">
import { inject } from "vue";
import { useRouter } from "vue-router";
import { defineGanttEvents, VueGantt, type Task } from "@dhtmlx/trial-vue-gantt";

const router = useRouter();
const context = inject(CUSTOM_EDIT_VIEW_CONTEXT_KEY)!; // задачи, связи, upsertTask, applyBatch, ...

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

Редактор маршрута читает и мутирует то же хранилище, которое привязывает график (как правило, через `provide`/`inject` или Pinia), поэтому график перерисовывается автоматически после `save`/`delete`.

Используйте этот подход вместо `customLightbox`, когда:

- редактору требуется больше пространства, чем позволяет модальное окно (многооконная компоновка, встроенные медиа)
- вы хотите глубокие ссылки и возможность навигации назад/вперёд в браузере между редактированиями
- редактор должен оставаться смонтированным после навигации (например, flows с несохранёнными изменениями)

Для замены в модальном стиле предпочтительнее [`customLightbox`](#replace-the-task-form-customlightbox).

## Пользовательские встроенные редакторы грида

Используйте `inlineEditors`, когда пользователям нужны собственные редакторы ячеек грида.

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

Используйте этот подход, когда редактирование в гриде является центральной частью рабочего процесса и встроенные редакторы недостаточны.

## Кастомные модальные окна подтверждения удаления

Используйте `modals`, чтобы заменить встроенные подтверждения удаления задач/ссылок.

Обработчик получает `{ task, callback, message, title, ganttInstance }` для удаления задачи (и `{ link, ... }` для удаления ссылки). Удаление продолжается только после вызова `callback()` — пропустите вызов и удаление будет отменено.

### Быстрый путь: `window.confirm`

Хватит для прототипов и внутренних инструментов:

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

### Продакшн-путь: настраиваемый Vue-диалоговый компонент

Реальные приложения обычно требуют брендированного модального окна, которое соответствует остальному UI. Обработчик не может показать компонент Vue синхронно — пользователь должен сначала кликнуть — поэтому вы сохраняете `callback` в состоянии компонента, открываете диалог и вызываете колбэк (или нет) после выбора пользователя.

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

`TaskDeleteDialog.vue` — любая на ваш вкус Vue-диалоговая компонента: Vuetify `v-dialog`, Element Plus `el-dialog`, настраиваемый `<Teleport>` оверлей и т.д. Контракт — лишь `modelValue` (или любое открытое/закрытое свойство), действие `confirm` и действие `cancel`.

См. рабочую версию Vue в маршрутe `templates` проекта [`vue-gantt-examples`](https://github.com/DHTMLX/vue-gantt-examples).

Типы `OnBeforeTaskDeleteConfirmArgs` и `OnBeforeLinkDeleteConfirmArgs` перечислены в [Справочнике по конфигурации](integrations/vue/configuration-props.md#type-exports).

## Оркестрация поведения с помощью `events` + `@ready`

Используйте `events` для логики взаимодействия и `@ready` для однократной настройки, требующей `instance`.

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

## Далее

- [Обзор Vue Gantt](integrations/vue/overview.md)
- [Справочник по конфигурации](integrations/vue/configuration-props.md)
- [Основы привязки данных и управления состоянием](integrations/vue/state/state-management-basics.md)
- [Использование Vue Gantt с Pinia](integrations/vue/state/pinia.md)