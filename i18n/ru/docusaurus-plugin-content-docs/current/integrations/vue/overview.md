---
title: Обзор Vue Gantt
sidebar_label: Обзор
description: "Обзор на уровне архитектуры Vue Gantt: возможности, поток данных, события, жизненный цикл и точки расширения для настройки."
---

# Обзор Vue Gantt

Vue Gantt — официальный обёртка Vue для DHTMLX Gantt. Он объединяет композиционные паттерны, удобные для Vue, с полным доступом к базовому движку Gantt.

Если вам понадобятся инструкции по настройке сначала, начните с [Быстрый старт с Vue Gantt](integrations/vue/quick-start.md).

## Ментальная модель

Vue Gantt — обёртка вокруг движка DHTMLX Gantt. Обёртка предоставляет API Vue-компонента, но сам движок по-прежнему остаётся источником поведения диаграммы и низкоуровневых методов.

Уровень обёртки выполняет три основные задачи:

- инициализирует и уничтожает экземпляр Gantt с использованием жизненного цикла Vue
- синхронизирует выбранные props Vue с текущим экземпляром Gantt
- предоставляет точки расширения, специфичные для обёртки (`events`, `@ready`, `customLightbox`, `inlineEditors`, composables)

Это значит, что вы можете оставаться декларативными для большинства задач интеграции и в то же время переходить к `instance`, когда это нужно.

## Основные возможности

Обёртка покрывает как базовые, так и продвинутые сценарии интеграции:

- декларативная настройка через пропсы (`config`, `templates`, `plugins`, `theme`, `locale`)
- синхронизацию данных для `tasks`, `links`, и продвинутых хранилищ (`resources`, `resourceAssignments`, `baselines`)
- настройку обработки событий через карту `events`
- одноразовую логику жизненного цикла через `@ready`
- Vue-основу для настройки через (`customLightbox`, `inlineEditors`, `modals`)
- типизированные помощники и композаблы для повторно используемых паттернов

## Сценарий: Базовая настройка обёртки

Используйте пропсы для конфигурации диаграммы и настройки шаблонов.

~~~vue
<script setup lang="ts">
import { ref } from "vue";
import VueGantt, {
  defineGanttConfig,
  defineGanttTemplates,
  type SerializedLink,
  type SerializedTask
} from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

const tasks = ref<SerializedTask[]>([
  {
    id: 1,
    text: "Project",
    start_date: new Date(2026, 0, 5),
    duration: 5,
    open: true,
    parent: 0
  }
]);
const links = ref<SerializedLink[]>([]);

const config = defineGanttConfig({
  scales: [
    { unit: "month", step: 1, format: "%F, %Y" },
    { unit: "day", step: 1, format: "%d %M" }
  ]
});

const templates = defineGanttTemplates({
  task_text: (_start, _end, task) => `#${task.id}: ${task.text}`
});
</script>

<template>
  <div style="height: 520px;">
    <VueGantt :tasks="tasks" :links="links" :config="config" :templates="templates" />
  </div>
</template>
~~~

Для полного списка пропсов смотрите [Справочник по конфигурации](integrations/vue/configuration-props.md).

## Выбор модели владения данными

Обёртка синхронизирует входящие props с текущим экземпляром. Основной вопрос — где ваше приложение считает данные авторитетными.

- **Vue state/store как источник правды**: колбэки обёртки (`data.save` / `data.batchSave`) обновляют ваше состояние, затем обновлённые props возвращаются во обёртку.
- **Gantt как источник правды**: Gantt и бэкенд управляют основным жизненным циклом данных; пропсы Vue используются реже для состояния живого графика.

Когда данные принадлежат Vue, предпочтительно использовать `SerializedTask[]` и `SerializedLink[]` для реактивного состояния и типизации полезной нагрузки.

Кратко о поведении синхронизации:

- обновления задач/ссылок обычно основаны на различиях (diff-based)
- обёртка может перейти к сбросу/переразбору для крупных изменений
- продвинутые хранилища (`resources`, `resourceAssignments`, `baselines`) синхронизируются через их датасторы

Используйте [Основы привязки данных и управления состоянием](integrations/vue/state/state-management-basics.md) для понимания компромиссов и контрактов колбеков.

## Обработка событий и логика запуска

Используйте карту `events` для событий Gantt и `@ready` для одноразовой настройки после инициализации.

~~~vue
<script setup lang="ts">
import { defineGanttEvents, type GanttStatic } from "@dhtmlx/trial-vue-gantt";

const events = defineGanttEvents({
  onTaskCreated: task => {
    console.log("task created", task);
    return true;
  },
  onBeforeLightbox: taskId => {
    console.log("before lightbox", taskId);
    return true;
  }
});

const onReady = (instance: GanttStatic) => {
  console.log("ready", instance);
};
</script>

<template>
  <VueGantt :events="events" @ready="onReady" />
</template>
~~~

Используйте `events` для поведения взаимодействия. Используйте `@ready` для инициализационной логики, которая требует живого экземпляра.

## Преодоление императивной границы

Используйте реф компонента, когда нужны методы, которые неудобно моделировать через props.

~~~vue
<script setup lang="ts">
import { onMounted, ref } from "vue";
import VueGantt, { type VueGanttRef } from "@dhtmlx/trial-vue-gantt";

const ganttRef = ref<VueGanttRef | null>(null);

onMounted(() => {
  const gantt = ganttRef.value?.instance;
  if (!gantt) return;
  gantt.showDate(new Date());
});
</script>

<template>
  <VueGantt ref="ganttRef" />
</template>
~~~

Если вы изменяете данные задач/ссылок через `instance`, поддерживайте синхронность внешнего состояния. В противном случае следующее обновление prop может перезаписать эти изменения.

## Продвинутые точки расширения

### Компонент настраиваемого lightbox

Замените встроенную форму задачи на компонент Vue:

~~~vue
<VueGantt :tasks="tasks" :links="links" :customLightbox="CustomLightbox" :data="data" />
~~~

### Пользовательские встроенные редакторы

Сопоставьте имена встроенных редактироров Gantt с компонентами Vue:

~~~vue
<VueGantt :config="config" :inlineEditors="inlineEditors" :data="data" />
~~~

### Пользовательный поток подтверждения удаления

Переопределите подтверждения удаления с помощью `modals`:

~~~ts
const modals = {
  onBeforeTaskDelete: ({ task, callback }) => {
    if (window.confirm(`Delete ${task.text}?`)) callback();
  }
};
~~~

### Фильтрация задач и ресурсов

Используйте `filter` для фильтрации задач и `resourceFilter` для фильтрации панели ресурсов.

## Связанные статьи

- [Справочник по конфигурации](integrations/vue/configuration-props.md)
- [Паттерны настройки](integrations/vue/customization-patterns.md)
- [Основы привязки данных и управления состоянием](integrations/vue/state/state-management-basics.md)
- [Использование Vue Gantt с Pinia](integrations/vue/state/pinia.md)
- [Руководства по DHTMLX Gantt](guides.md)