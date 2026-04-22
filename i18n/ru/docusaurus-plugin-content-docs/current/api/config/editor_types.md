---
sidebar_label: editor_types
title: Конфигурация editor_types
description: "объект, содержащий определения встроенных редакторов"
---

# editor_types

### Description

@short: Объект, содержащий определения встроенных редакторов

@signature: editor_types: \{ text?: InlineEditor; number?: InlineEditor; duration?: InlineEditor; date?: InlineEditor; select?: InlineEditor; predecessor?: InlineEditor; [customEditorName: string]: InlineEditor | undefined; \}

### Example

~~~jsx
gantt.config.editor_types.custom_editor = {// custom editor logic}
~~~

### Details

Конфигурацию можно использовать для создания собственных редакторов (см. приведённый выше пример).

Существует несколько заранее определённых inline editors:

- **text** - (*InlineEditor*) - для редактирования текстовых столбцов, например названия задачи
- **number** - (*InlineEditor*) - для редактирования числовых столбцов, например продолжительности задачи, порядка и т.д.
- **duration** - (*InlineEditor*) - для редактирования столбцов продолжительности, т.е. продолжительности задачи. Работает только когда используется конфигурация ***map_to:"duration"*** и [тип редактора](guides/inline-editing.md#types-of-editors) установлен как **"duration"** тип
- **date** - (*InlineEditor*) - для редактирования дат столбцов, например дат начала и окончания задачи
- **select** - (*InlineEditor*) - для выбора варианта из списка
- **predecessor** - (*InlineEditor*) - для установки зависимости задачи для текущей редактируемой задачи. Этот редактор получает [коды WBS задач](guides/specifying-columns.md#wbscode) для установки связи с задачей-предшественником
- **[customEditorName: string]** - (*InlineEditor | undefined*) - пользовательские inline editors


Редакторы, определённые в этом объекте, можно привязать к колонкам диаграммы Гантта:

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
- [Встроенное редактирование в Grid](guides/inline-editing.md#types-of-editors)