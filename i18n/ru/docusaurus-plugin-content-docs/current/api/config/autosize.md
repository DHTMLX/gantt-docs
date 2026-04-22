---
sidebar_label: autosize
title: Конфигурация autosize
description: "заставляет диаграмму Ганта автоматически изменять размер, чтобы отображать все задачи без прокрутки"
---

# autosize

### Description

@short: Диаграмма Ганта автоматически изменяет размер, чтобы показывать все задачи без прокрутки

@signature: autosize: boolean | string

### Example

~~~jsx
gantt.config.autosize = "xy";

gantt.init("gantt_here");
~~~

**Default value:** false

### Details

Параметр конфигурации `autosize` определяет, будет ли Gantt подгонять данные под размер контейнера, в котором она инициализирована, и показывать внутренние полосы прокрутки, или изменять размер самого контейнера, чтобы показать все данные без внутренних прокруток:

- [пример с размерами div Gantt, заданными в CSS](https://snippet.dhtmlx.com/2m48u5oz) - внутренние полосы прокрутки активны при необходимости
- [пример с размерами div Gantt, рассчитанными компонентом](https://snippet.dhtmlx.com/syzmiqwt) - внутренние полосы прокрутки отключены

В случае, если диаграмма Ганта должна вписаться в заданную область на странице, размер контейнера диаграммы должен управляться вручную:

- отключено авторазмерирование
- ширина/высота div должны вычисляться либо HTML-разметкой, если используется готовое решение для адаптивной верстки, либо вручную кодом

## Scrolling to hidden elements

В режиме по умолчанию диаграмма Ганта прокручивается автоматически, когда вы используете методы [`showTask()`](api/method/showtask.md) или [`showDate()`](api/method/showdate.md). Но если включено значение `autosize`, диаграмма Ганта увеличивает размер своего контейнера, чтобы отобразиться на странице вместо того, чтобы показывать скрытый элемент.

Нет универсального способа избавиться от проблемы, потому что на странице могут быть другие элементы помимо Gantt, и некоторые элементы тоже требуют прокрутки. Поэтому проблему следует решать в зависимости от конфигурации страницы/приложения.

В простой конфигурации диаграмма Ганта может располагаться перед некоторыми элементами вашего приложения или после них. Она может работать корректно, если прокручивать страницу.

В сложной конфигурации контейнер Gantt может быть размещен внутри других контейнеров, которые также могут находиться внутри других контейнеров. В этом случае нужно прокручивать только те элементы, которые вам необходимы.

Один из способов прокрутки страницы к нужному элементу — использовать метод `element.scrollIntoView()`:

~~~js
const taskAttribute = gantt.config.task_attribute;
const timelineElement = document.querySelector(`.gantt_task_line[${taskAttribute}='${id}']`);

timelineElement?.scrollIntoView({ block: "center" });
~~~

где id — идентификатор задачи, которую нужно показать.

Другой способ — изменить метод [`showTask()`] или [`showDate()`] диаграммы Ганта:

~~~js
const defaultShowTask = gantt.showTask;

gantt.showTask = function(id) {
    defaultShowTask.apply(this, [id]);
    const taskAttribute = gantt.config.task_attribute;
    const timelineElement = document.querySelector(`.gantt_task_line[${taskAttribute}='${id}']`);

    timelineElement?.scrollIntoView({ block: "center" });
};
~~~

или создать пользовательскую функцию показа задачи:

~~~js
const showTask = (id) => {
    gantt.showTask(id);
    const taskAttribute = gantt.config.task_attribute;
    const timelineElement = document.querySelector(`.gantt_task_line[${taskAttribute}='${id}']`);

    timelineElement?.scrollIntoView({ block: "center" });
};
~~~

:::note
Пример: [Scrolling to the specified element](https://snippet.dhtmlx.com/or73u6a5)
:::

### Related API
- [autosize_min_width](api/config/autosize_min_width.md)