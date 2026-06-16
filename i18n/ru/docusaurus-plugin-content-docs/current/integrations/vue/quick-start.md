---
title: Быстрый старт с Vue Gantt
sidebar_label: Быстрый старт
description: "Пошаговое руководство по рендерингу официальной обертки Vue Gantt в приложении Vue 3 + Vite."
---

# Быстрый старт с Vue Gantt

:::note
Этот гид охватывает Vue-обертку, включенную в версии **Commercial, Enterprise и Ultimate** DHTMLX Gantt. 
Если вы используете бесплатную версию **Community** (v10+), устаревшую **GPL** версию (v9.x и ранее) или **Individual** версию, следуйте альтернативному руководству: [Как начать с Vue](integrations/vue/js-gantt-vue.md).
:::

Компонент **Vue Gantt** — официальная обертка для **DHTMLX Gantt**. 
Это руководство проведет вас через создание небольшого приложения на Vue 3 + Vite и отрисовку базовой диаграммы Ганта с использованием пробной версии пакета.

Если вы новичок во Vue, начните с официальной [документации Vue](https://vuejs.org/guide/introduction.html).

Посмотрите полностью рабочий проект, который следует этому руководству, на GitHub: [GitHub demo project](https://github.com/DHTMLX/vue-gantt-quick-start).

## Требования

- Node.js установлен
- npm или Yarn
- Проект Vue 3 (на этой странице показано, как создать его с помощью Vite)
- Доступ к пакету Vue Gantt (оценочный или профессиональный)

## 1. Создайте проект Vue 3

~~~bash
npm create vite@latest vue-gantt-quick-start -- --template vue-ts
cd vue-gantt-quick-start
npm install
~~~

Если предпочитаете Yarn, замените шаг установки на `yarn`.

## 2. Установите Vue Gantt

Установите Vue Gantt, как указано в [руководстве по установке Vue Gantt](integrations/vue/installation.md).

В этом руководстве мы используем оценочный пакет:

~~~bash
npm install @dhtmlx/trial-vue-gantt
~~~

или

~~~bash
yarn add @dhtmlx/trial-vue-gantt
~~~

Если вы уже используете Professional пакет, замените `@dhtmlx/trial-vue-gantt` на `@dhx/vue-gantt` в командах и импортах.

## 3. Добавьте демо-данные

Создайте `src/demoData.ts` (для внешних данных во Vue-состоянии, предпочтительно использовать `SerializedTask` / `SerializedLink`):

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

## 4. Создайте компонент Gantt

Создайте `src/components/GanttChart.vue`:

~~~vue title="src/components/GanttChart.vue"
<script setup lang="ts">
import { ref } from "vue";
import VueGantt, {
  type SerializedLink,
  type SerializedTask,
  type VueGanttDataConfig
} from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

import { links as initialLinks, tasks as initialTasks } from "../demoData";

const tasks = ref<SerializedTask[]>(initialTasks);
const links = ref<SerializedLink[]>(initialLinks);

const data: VueGanttDataConfig = {
  save: (entity, action, item, id) => {
    console.log("save", { entity, action, item, id });
  }
};
</script>

<template>
  <div style="height: 100%; width: 100%;">
    <VueGantt :tasks="tasks" :links="links" :data="data" />
  </div>
</template>
~~~

Если вы используете Professional пакет, замените оба импорта:

- `@dhtmlx/trial-vue-gantt` -> `@dhx/vue-gantt`
- `@dhtmlx/trial-vue-gantt/dist/vue-gantt.css` -> `@dhx/vue-gantt/dist/vue-gantt.css`

## 5. Отображение Gantt в оболочке приложения

Замените `src/App.vue`:

~~~vue title="src/App.vue"
<script setup lang="ts">
import GanttChart from "./components/GanttChart.vue";
</script>

<template>
  <div style="height: 100vh; width: 100vw;">
    <GanttChart />
  </div>
</template>
~~~

## 6. Запустите приложение

~~~bash
npm run dev
~~~

Откройте локальный URL Vite. Вы должны увидеть рабочую диаграмму Gantt и вывод в консоли при редактировании задач или связей.

Если вы добавляете Gantt в существующее приложение, сохраните текущий макет `App.vue` и отобразите `<GanttChart />` на целевой странице/компоненте. Убедитесь, что родительский макет задаёт высоту области Gantt.

## 7. (Необязательно) Заменить логирование локальной обработкой сохранения

Используйте это, когда вы хотите, чтобы состояние Vue оставалось синхронизированным с редактированием диаграммы до добавления backend или хранилища. Обновите `src/components/GanttChart.vue`.

~~~ts
const data: VueGanttDataConfig = {
  save: (entity, action, item, id) => {
    if (entity === "task") {
      if (action === "create") tasks.value = [...tasks.value, item as SerializedTask];
      if (action === "update") tasks.value = tasks.value.map(t => String(t.id) === String(id) ? item as SerializedTask : t);
      if (action === "delete") tasks.value = tasks.value.filter(t => String(t.id) !== String(id));
    }

    if (entity === "link") {
      if (action === "create") links.value = [...links.value, item as SerializedLink];
      if (action === "update") links.value = links.value.map(l => String(l.id) === String(id) ? item as SerializedLink : l);
      if (action === "delete") links.value = links.value.filter(l => String(l.id) !== String(id));
    }
  }
};
~~~

Для операций с несколькими изменениями (например, автоматическое планирование), предпочтительно использовать `data.batchSave`.

## Результат

У вас теперь есть приложение Vue 3, рендерящее официальную обертку Vue Gantt с:

- реактивными свойствами `tasks` и `links`
- импортированным CSS-ядром обертки
- подключением обработчика `data.save` для правок пользователем

Это тот же минимальный пример, который использовался в демонстрационном проекте на GitHub: [GitHub demo project](https://github.com/DHTMLX/vue-gantt-quick-start).

## Репозиторий демо на GitHub

Полностью рабочий проект, следующий этому руководству, доступен на GitHub: [GitHub demo project](https://github.com/DHTMLX/vue-gantt-quick-start).

## Что прочитать дальше

- [Обзор Vue Gantt](integrations/vue/overview.md)
- [Справочник по настройкам](integrations/vue/configuration-props.md)
- [Основы привязки данных и управления состоянием](integrations/vue/state/state-management-basics.md)