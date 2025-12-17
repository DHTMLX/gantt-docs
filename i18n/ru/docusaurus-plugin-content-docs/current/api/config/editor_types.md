---
sidebar_label: editor_types
title: editor_types config
description: "объект, содержащий определения для inline редакторов"
---

# editor_types

### Description

@short: Объект, содержащий определения для inline редакторов

@signature: editor_types: \{ text?: InlineEditor; number?: InlineEditor; duration?: InlineEditor; date?: InlineEditor; select?: InlineEditor; predecessor?: InlineEditor; [customEditorName: string]: InlineEditor | undefined; \}

### Example

~~~jsx
gantt.config.editor_types.custom_editor = {// логика кастомного редактора}
~~~

### Details

Эта конфигурация используется для создания кастомных редакторов (как показано в примере выше).

Доступны несколько встроенных inline редакторов:

- **text** - (*InlineEditor*) - используется для редактирования текстовых полей, например, названий задач
- **number** - (*InlineEditor*) - используется для редактирования числовых полей, таких как длительность задачи или порядок
- **duration** - (*InlineEditor*) - для редактирования полей длительности, т.е. длительности задачи.
Работает только при применении конфигурации ***map_to:"duration"*** и установке [типа редактора](guides/inline-editing.md#typesofeditors) в **"duration"**
- **date** - (*InlineEditor*) - для редактирования полей с датами, таких как дата начала и окончания задачи
- **select** - (*InlineEditor*) - для выбора опции из выпадающего списка
- **predecessor** - (*InlineEditor*) - для назначения предшествующей задачи текущей задаче. Этот редактор использует [WBS коды](guides/specifying-columns.md#wbscode) для связи предшествующей задачи
- **[customEditorName: string]** - (*InlineEditor | undefined*) - для определения кастомных inline редакторов

Редакторы, определённые здесь, могут быть назначены колонкам gantt:

~~~js
const textEditor = {type: "text", map_to: "text"};
const dateEditor =  {type: "date", map_to: "start_date",
    min: new Date(2018, 0, 1), max: new Date(2019, 0, 1)};

gantt.config.columns = [
    {name: "text", label: "Task name", tree: true, width: "*", editor: textEditor},
    {name: "start_date", label: "Start time", align: "center", editor: dateEditor}
];

~~~

### Related Guides
- [Редактирование 'на месте' в гриде](guides/inline-editing.md#typesofeditors)
