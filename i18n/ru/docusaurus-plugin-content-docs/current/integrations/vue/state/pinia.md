---
title: Использование Vue Gantt с Pinia
sidebar_label: Pinia
description: "Пошаговая интеграция Pinia для Vue Gantt: структура хранилища, связывание обратных вызовов и необязательный откат/повтор на уровне хранилища."
---

# Руководство по Vue Gantt + Pinia

Это руководство демонстрирует интеграцию Vue Gantt на основе хранилища с использованием Pinia. Архитектура остается такой же, как и в открытых примерах Vue: хранилище владеет `tasks` и `links`, обёрточные колбэки отправляют редактирования диаграммы обратно в хранилище.

## Требования

- Проект на Vue 3
- Установлен Pinia (или есть разрешение добавить его)
- Установлен пакет Vue Gantt
- Базовое чтение статьи [Основы привязки данных и управления состоянием](integrations/vue/state/state-management-basics.md)

## 1. Установка и регистрация Pinia

Если Pinia ещё не установлен:

~~~bash
npm install pinia
~~~

Зарегистрируйте Pinia в `src/main.ts`:

~~~ts title="src/main.ts"
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

createApp(App).use(createPinia()).mount("#app");
~~~

## 2. Установка Vue Gantt

Установите Vue Gantt согласно руководству по установке [Vue Gantt installation guide](integrations/vue/installation.md).

В этом руководстве мы используем пробный пакет:

~~~bash
npm install @dhtmlx/trial-vue-gantt
~~~

или

~~~bash
yarn add @dhtmlx/trial-vue-gantt
~~~

Если вы уже используете Professional пакет, замените `@dhtmlx/trial-vue-gantt` на `@dhx/vue-gantt` в командах и импортах.

## 3. Добавление Demo данных

Создайте `src/demoData.ts`:

~~~ts title="src/demoData.ts"
import type { SerializedLink, SerializedTask } from "@dhtmlx/trial-vue-gantt";

export const tasks: SerializedTask[] = [
  {
    id: 1,
    text: "Office itinerancy",
    type: "project",
    start_date: new Date(2026, 0, 5),
    duration: 10,
    progress: 0.4,
    open: true,
    parent: 0
  },
  {
    id: 2,
    text: "Planning",
    start_date: new Date(2026, 0, 5),
    duration: 4,
    progress: 0.6,
    parent: 1
  }
];

export const links: SerializedLink[] = [{ id: 1, source: 1, target: 2, type: "0" }];
~~~

## 4. Создание базового хранилища Gantt

Создайте `src/stores/ganttStore.ts`:

~~~ts title="src/stores/ganttStore.ts"
import { defineStore } from "pinia";
import type { BatchChanges, SerializedLink, SerializedTask } from "@dhtmlx/trial-vue-gantt";
import { links, tasks } from "../demoData";

type ZoomLevel = "day" | "month" | "year";

const zoomLevels = [
  {
    name: "day",
    scale_height: 27,
    min_column_width: 80,
    scales: [{ unit: "day", step: 1, format: "%d %M" }]
  },
  {
    name: "month",
    scale_height: 50,
    min_column_width: 120,
    scales: [
      { unit: "month", format: "%F, %Y" },
      { unit: "week", format: "Week #%W" }
    ]
  },
  {
    name: "year",
    scale_height: 50,
    min_column_width: 36,
    scales: [{ unit: "year", step: 1, format: "%Y" }]
  }
];

function applyBatchChanges(tasks: SerializedTask[], links: SerializedLink[], changes: BatchChanges) {
  let nextTasks = [...tasks];
  let nextLinks = [...links];

  for (const change of changes.tasks || []) {
    if (change.action === "create") nextTasks.push(change.data as SerializedTask);
    if (change.action === "update") {
      nextTasks = nextTasks.map(t => String(t.id) === String(change.id) ? change.data as SerializedTask : t);
    }
    if (change.action === "delete") {
      nextTasks = nextTasks.filter(t => String(t.id) !== String(change.id));
    }
  }

  for (const change of changes.links || []) {
    if (change.action === "create") nextLinks.push(change.data as SerializedLink);
    if (change.action === "update") {
      nextLinks = nextLinks.map(l => String(l.id) === String(change.id) ? change.data as SerializedLink : l);
    }
    if (change.action === "delete") {
      nextLinks = nextLinks.filter(l => String(l.id) !== String(change.id));
    }
  }

  return { tasks: nextTasks, links: nextLinks };
}

export const useGanttStore = defineStore("gantt", {
  state: () => ({
    tasks: tasks,
    links: links,
    zoomLevel: "day" as ZoomLevel
  }),
  getters: {
    config: state => ({
      zoom: {
        current: state.zoomLevel,
        levels: zoomLevels
      }
    })
  },
  actions: {
    setZoom(level: ZoomLevel) {
      this.zoomLevel = level;
    },
    applyBatch(changes: BatchChanges) {
      const next = applyBatchChanges(this.tasks, this.links, changes);
      this.tasks = next.tasks;
      this.links = next.links;
    }
  }
});
~~~

Этот стор держит единственный источник истины:

- `tasks` и `links` — канонические данные
- `config` — производное состояние
- `applyBatch` — точка входа для обёрточного колбэка

## 5. Связывание состояния хранилища с `VueGantt`

Создайте `src/components/GanttChart.vue`:

~~~vue title="src/components/GanttChart.vue"
<script setup lang="ts">
import { storeToRefs } from "pinia";
import VueGantt, { type BatchChanges } from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

import { useGanttStore } from "../stores/ganttStore";

const store = useGanttStore();
const { tasks, links, config, zoomLevel } = storeToRefs(store);

const data = {
  batchSave: (changes: BatchChanges) => store.applyBatch(changes)
};

const setZoom = (level: "day" | "month" | "year") => {
  store.setZoom(level);
};
</script>

<template>
  <section>
    <div style="display:flex; gap:8px; margin-bottom:10px;">
      <button type="button" :class="{ active: zoomLevel === 'day' }" @click="setZoom('day')">Day</button>
      <button type="button" :class="{ active: zoomLevel === 'month' }" @click="setZoom('month')">Month</button>
      <button type="button" :class="{ active: zoomLevel === 'year' }" @click="setZoom('year')">Year</button>
    </div>

    <div style="height: 80vh;">
      <VueGantt :tasks="tasks" :links="links" :config="config" :data="data" />
    </div>
  </section>
</template>
~~~

Это ядро соединения:

- значения хранилища → свойства обёртки
- `batchSave` → действие хранилища
- действие хранилища → новое состояние → свойства обёртки снова

## 6. Рендер Gantt в оболочке приложения

Замените `src/App.vue`:

~~~vue title="src/App.vue"
<script setup lang="ts">
import GanttChart from "./components/GanttChart.vue";
</script>

<template>
  <div :style="{ height: '100%', width: '100%' }">
    <GanttChart />
  </div>
</template>
~~~

## 7. Проверка потока данных

Используйте этот порядок для предсказуемого обновления:

1. Хранилище экспонирует `tasks`, `links` и производное `config`.
2. `VueGantt` отрисовывается по пропсам.
3. Редактирования пользователя на диаграмме инициируют `data.batchSave`.
4. Действие хранилища (`applyBatch`) сливает изменения.
5. Обновлённое состояние снова попадает в `VueGantt`.

Не смешивайте это с прямыми мутациями экземпляра, если вы не обновляете также хранилище.

## 8. (Необязательно) Добавление Undo/Redo на уровне хранилища

Используйте это, если нужен откат/повтор, сохраняя Pinia как источник истины.

В этом режиме не включайте `gantt.plugins({ undo: true })`.

### 8.1 Заменить Хранилище версией с историей

Замените хранилище на шаге 2 на эту версию.
Она хранит состояние с типами `SerializedTask[]` / `SerializedLink[]` и избегает приведения `as any` при клонировании дат.

~~~ts title="src/stores/ganttStore.ts"
import { defineStore } from "pinia";
import type { BatchChanges, SerializedLink, SerializedTask } from "@dhtmlx/trial-vue-gantt";
import { links, tasks } from "../demoData";

type ZoomLevel = "day" | "month" | "year";

type Snapshot = {
  tasks: SerializedTask[];
  links: SerializedLink[];
  zoomLevel: ZoomLevel;
};

type HistoryState = {
  tasks: SerializedTask[];
  links: SerializedLink[];
  zoomLevel: ZoomLevel;
  past: Snapshot[];
  future: Snapshot[];
  maxHistory: number;
};

const zoomLevels = [
  {
    name: "day",
    scale_height: 27,
    min_column_width: 80,
    scales: [{ unit: "day", step: 1, format: "%d %M" }]
  },
  {
    name: "month",
    scale_height: 50,
    min_column_width: 120,
    scales: [
      { unit: "month", format: "%F, %Y" },
      { unit: "week", format: "Week #%W" }
    ]
  },
  {
    name: "year",
    scale_height: 50,
    min_column_width: 36,
    scales: [{ unit: "year", step: 1, format: "%Y" }]
  }
];

function applyBatchChanges(tasks: SerializedTask[], links: SerializedLink[], changes: BatchChanges) {
  let nextTasks = [...tasks];
  let nextLinks = [...links];

  for (const change of changes.tasks || []) {
    if (change.action === "create") nextTasks.push(change.data as SerializedTask);
    if (change.action === "update") {
      nextTasks = nextTasks.map(t => String(t.id) === String(change.id) ? change.data as SerializedTask : t);
    }
    if (change.action === "delete") {
      nextTasks = nextTasks.filter(t => String(t.id) !== String(change.id));
    }
  }

  for (const change of changes.links || []) {
    if (change.action === "create") nextLinks.push(change.data as SerializedLink);
    if (change.action === "update") {
      nextLinks = nextLinks.map(l => String(l.id) === String(change.id) ? change.data as SerializedLink : l);
    }
    if (change.action === "delete") {
      nextLinks = nextLinks.filter(l => String(l.id) !== String(change.id));
    }
  }

  return { tasks: nextTasks, links: nextLinks };
}

const cloneDate = (value: Date | string | undefined): Date | string | undefined => {
  if (value instanceof Date) return new Date(value.getTime());
  return value;
};

const cloneTask = (task: SerializedTask): SerializedTask => {
  const next: SerializedTask = { ...task };
  next.start_date = cloneDate(task.start_date);
  next.end_date = cloneDate(task.end_date);
  return next;
};

const cloneLink = (link: SerializedLink): SerializedLink => ({ ...link });

const createSnapshot = (state: HistoryState): Snapshot => ({
  tasks: state.tasks.map(cloneTask),
  links: state.links.map(cloneLink),
  zoomLevel: state.zoomLevel
});

export const useGanttStore = defineStore("gantt", {
  state: () => ({
    tasks: tasks,
    links: links,
    zoomLevel: "day" as ZoomLevel,
    past: [] as Snapshot[],
    future: [] as Snapshot[],
    maxHistory: 50
  }),
  getters: {
    config: state => ({
      zoom: {
        current: state.zoomLevel,
        levels: zoomLevels
      }
    }),
    canUndo: state => state.past.length > 0,
    canRedo: state => state.future.length > 0
  },
  actions: {
    pushHistory() {
      this.past = [...this.past, createSnapshot(this as HistoryState)];
      if (this.past.length > this.maxHistory) {
        this.past = this.past.slice(this.past.length - this.maxHistory);
      }
      this.future = [];
    },
    restoreSnapshot(snapshot: Snapshot) {
      this.tasks = snapshot.tasks.map(cloneTask);
      this.links = snapshot.links.map(cloneLink);
      this.zoomLevel = snapshot.zoomLevel;
    },
    setZoom(level: ZoomLevel) {
      if (this.zoomLevel === level) return;
      this.pushHistory();
      this.zoomLevel = level;
    },
    applyBatch(changes: BatchChanges) {
      const hasChanges = (changes.tasks?.length ?? 0) > 0 || (changes.links?.length ?? 0) > 0;
      if (!hasChanges) return;

      this.pushHistory();
      const next = applyBatchChanges(this.tasks, this.links, changes);
      this.tasks = next.tasks;
      this.links = next.links;
    },
    undo() {
      if (this.past.length === 0) return;

      const previous = this.past[this.past.length - 1];
      const current = createSnapshot(this as HistoryState);

      this.past = this.past.slice(0, -1);
      this.future = [current, ...this.future];
      this.restoreSnapshot(previous);
    },
    redo() {
      if (this.future.length === 0) return;

      const next = this.future[0];
      const current = createSnapshot(this as HistoryState);

      this.future = this.future.slice(1);
      this.past = [...this.past, current];
      if (this.past.length > this.maxHistory) {
        this.past = this.past.slice(this.past.length - this.maxHistory);
      }
      this.restoreSnapshot(next);
    }
  }
});
~~~

### 8.2 Добавление кнопок Undo/Redo в Компонент

Обновите `src/components/GanttChart.vue`:

~~~vue title="src/components/GanttChart.vue"
<script setup lang="ts">
import { storeToRefs } from "pinia";
import VueGantt, { type BatchChanges } from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

import { useGanttStore } from "../stores/ganttStore";

const store = useGanttStore();
const { tasks, links, config, zoomLevel, canUndo, canRedo } = storeToRefs(store);

const data = {
  batchSave: (changes: BatchChanges) => store.applyBatch(changes)
};

const setZoom = (level: "day" | "month" | "year") => {
  store.setZoom(level);
};
</script>

<template>
  <section>
    <div style="display:flex; gap:8px; margin-bottom:10px;">
      <button type="button" :disabled="!canUndo" @click="store.undo()">Отменить</button>
      <button type="button" :disabled="!canRedo" @click="store.redo()">Повторить</button>
      <button type="button" :class="{ active: zoomLevel === 'day' }" @click="setZoom('day')">День</button>
      <button type="button" :class="{ active: zoomLevel === 'month' }" @click="setZoom('month')">Месяц</button>
      <button type="button" :class="{ active: zoomLevel === 'year' }" @click="setZoom('year')">Год</button>
    </div>

    <div style="height: 80vh;">
      <VueGantt :tasks="tasks" :links="links" :config="config" :data="data" />
    </div>
  </section>
</template>
~~~

### 8.3 Почему здесь используется история на уровне хранилища

Используйте историю на уровне хранилища, потому что хранилище является источником истины:

- пользовательский интерфейс Vue и диаграмма синхронизируются через одни и те же переходы состояния
- `maxHistory` ограничивает потребление памяти
- любое новое изменение автоматически очищает историю повторов
- вы избегаете двух независимых систем истории

## Результат

Теперь у вас интеграция на базе Pinia, где:

- Pinia владеет `tasks` и `links`
- `data.batchSave` применяет изменения диаграммы к хранилищу
- `VueGantt` повторно рендерится на основе состояния хранилища
- отмена/повтор можно добавить без смены владения на экземпляр Gantt

## Распространенные ошибки

- Замена состояния хранилища на устаревшие снимки API после редактирования диаграммы
- Использование `data.save` для операций с высоким объемом данных, когда `batchSave` лучше подходит
- Смешение владения хранилищем с прямыми мутациями экземпляра и отсутствие согласования состояния
- Включение встроенного плагина Undo для Gantt вместе с историей на уровне хранилища

## Репозиторий Demo на GitHub

Полноценный рабочий проект, следующий этому руководству, доступен [на GitHub](https://github.com/DHTMLX/vue-gantt-pinia-starter).

## Что читать дальше

- [Основы привязки данных и управления состоянием](integrations/vue/state/state-management-basics.md)
- [Справочник по конфигурации](integrations/vue/configuration-props.md)
- [Обзор Vue Gantt](integrations/vue/overview.md)
- [Шаблоны кастомизации](integrations/vue/customization-patterns.md)