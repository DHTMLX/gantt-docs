---
title: "Vue Gantt"
sidebar_label: Vue Gantt
description: "Установите, настройте и используйте DHTMLX Gantt в Vue с официальной оберткой."
image: /img/frameworks/vue.png
---

Vue Gantt — официальная обертка Vue для DHTMLX Gantt. Она нацелена на Vue 3 и сохраняет полный доступ к API Gantt, при этом добавляя Vue-дружелюбные пропсы, события и composables.

## Что вы получаете вместе с оберткой

- Декларативная настройка через пропсы (`config`, `templates`, `plugins`, `theme`, `locale`)
- Синхронизация данных для задач/связей и продвинутых наборов данных
- Подключение событий Gantt через карту `events`
- Точка входа в жизненный цикл Vue через `@ready`
- Доступ к ref компонента к базовому `instance`
- Типизированные фабрики-помощники и composables для распространённых рабочих процессов обертки

~~~vue
<script setup lang="ts">
import VueGantt from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";
</script>

<template>
  <div style="height: 520px;">
    <VueGantt :tasks="tasks" :links="links" />
  </div>
</template>
~~~

Если вам сначала нужна архитектура и карта возможностей, прочтите [Обзор Vue Gantt](integrations/vue/overview.md).

## Рекомендуемый путь обучения

Используйте этот порядок, если вы новичок во wrapper:

1. [Установка](integrations/vue/installation.md) для выбора канала пакета и импортов
2. [Быстрый старт](integrations/vue/quick-start.md) для отрисовки вашей первой диаграммы
3. [Справочник по конфигурации](integrations/vue/configuration-props.md) для деталей по пропсам и колбэкам
4. [Основы привязки данных и управления состоянием](integrations/vue/state/state-management-basics.md) для выбора модели владения данными
5. [Учебник по интеграции Pinia](integrations/vue/state/pinia.md) для реализации на основе хранилища
6. [Паттерны настройки](integrations/vue/customization-patterns.md) для шаблонов, lightbox, встроенных редакторов и модальных окон

## Обертка против низкоуровневой JS-интеграции

Выбирайте путь интеграции в зависимости от того, сколько логики жизненного цикла и синхронизации вы хотите управлять самостоятельно.

- Используйте **официальную обертку** (`@dhtmlx/trial-vue-gantt` или `@dhx/vue-gantt`) для Vue пропсов/событий, синхронизации, управляемой оберткой, и типизированных API-помощников.
- Используйте **низкоуровневую JS-интеграцию** только если хотите прямой контроль над жизненным циклом экземпляра и ручной оркестрацией API.

Для низкоуровневого пути см. [dhtmlxGantt with Vue.js (Low-Level Integration)](integrations/vue/js-gantt-vue.md).

## Вводная точка по данным и состоянию

Начните с раздела состояния, если вы уже знаете, что вам нужна синхронизация со Store/бэкендом:

- [Данные и управление состоянием](integrations/vue/state.md)
- [Основы привязки данных и управления состоянием](integrations/vue/state/state-management-basics.md)
- [Использование Vue Gantt с Pinia](integrations/vue/state/pinia.md)

## Примеры и ресурсы для оценки

Ознакомьтесь с публичными примерами Vue Gantt для работоспособных демо обертки:

- [Живой демо](https://dhtmlx.github.io/vue-gantt-examples/) - все возможности обертки работают в браузере
- [GitHub репозиторий](https://github.com/DHTMLX/vue-gantt-examples) - исходники для каждого примера, упомянутого в обзоре

Минимальные стартовые проекты (по одному функционалу обертки на проект):

- [vue-gantt-quick-start](https://github.com/DHTMLX/vue-gantt-quick-start) - минимальная возможная настройка, соответствует [Быстрому старту](integrations/vue/quick-start.md)
- [vue-gantt-pinia-starter](https://github.com/DHTMLX/vue-gantt-pinia-starter) - хранилище Pinia с `batchSave` и undo/redo на уровне хранилища, соответствует [учебнику по Pinia](integrations/vue/state/pinia.md)

Если вы оцениваете Vue Gantt, страница оценки предоставляет доступ к технической поддержке в период оценки. См. [Установка](integrations/vue/installation.md).