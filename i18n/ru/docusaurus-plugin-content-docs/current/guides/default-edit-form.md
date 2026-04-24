---
title: "Настройка элементов лайтбокса"
sidebar_label: "Настройка элементов лайтбокса"
---

# Настройка элементов лайтбокса

Лайтбокс — это форма редактирования, используемая для изменения сведений о задаче.

По умолчанию лайтбокс отображается на изображении ниже.

![лайтбокс](/img/lightbox.png)

Конфигурация лайтбокса может различаться в зависимости от типа задачи. Настройки для каждого типа сохраняются в объекте [lightbox](api/config/lightbox.md):

- **gantt.config.lightbox.sections** - для обычных задач.
- **gantt.config.lightbox.project_sections** - для задач проекта.
- **gantt.config.lightbox.milestone_sections** - для вех.

Вы также можете [добавить пользовательский тип](guides/task-types.md#creating-a-custom-type) и определить структуру лайтбокса для него. Для деталей смотрите [Типы задач](guides/task-types.md#specificlightboxpertasktype).

Общая структура типов выглядит следующим образом:

- <span class="subproperty">**sections?**</span> - (*LightboxSection[]*) - опционально, массив разделов лайтбокса для обычных задач
- <span class="subproperty">**project_sections?**</span> - (*LightboxSection[]*) - опционально, массив разделов лайтбокса для задач проекта
- <span class="subproperty">**milestone_sections?**</span> - (*LightboxSection[]*) - опционально, массив разделов лайтбокса для вех
- <span class="subproperty">**[lightboxType: string]**</span> - (*LightboxSection[] | undefined*) - массив разделов лайтбокса для настраиваемого типа


:::note
С версии 7.1.13, если либо [gantt.config.csp](api/config/csp.md) установлен в значение *true*, либо Gantt работает в окружении Salesforce, лайтбокс будет отрисован внутри контейнера Gantt.
:::

## Структура лайтбокса

### Разделы

Структура лайтбокса задаётся свойством **sections** объекта лайтбокса:

~~~js
// дефиниция базового лайтбокса
gantt.config.lightbox.sections = [
    { name: 'description', height: 70, map_to: 'text', type: 'textarea', focus: true },
    { name: 'time', height: 72, map_to: 'auto', type: 'duration' }
];
~~~

Каждый элемент в массиве **sections** является объектом, который определяет один раздел в лайтбоксе.
См. [конфигурацию лайтбокса](api/config/lightbox.md) для доступных свойств раздела.

### Элементы управления секциями {#lightboxcontrols}

Каждый раздел лайтбокса основан на некотором элементе управления. Следующие типы элементов управления доступны для использования в лайтбоксе:

- [Textarea](guides/textarea.md) - многострочное текстовое поле
- [Time](guides/time.md) - пара селекторов для задания продолжительности задачи путем указания даты начала и окончания
- [Duration](guides/duration.md) - набор селекторов для задания продолжительности задачи путем указания даты начала задачи и количества дней
- [Select](guides/select.md) - простое выпадающее меню
- [Typeselect](guides/typeselect.md) - выпадающий список для изменения типа задачи
- [Parent](guides/parent.md) - выпадающее меню для изменения родителя задачи
- [Template](guides/template.md) - контейнер с некоторым HTML-содержимым внутри
- [Checkbox](guides/checkbox.md) - флажок для включения одной или нескольких опций
- [Radio button](guides/radio.md) - радиокнопка для выбора только одного варианта из заданного набора
- [Resources](guides/resources.md) - сложный контрол для назначения нескольким ресурсам задачи
- [Resource Assignments](guides/resource-assignments.md) - расширенный контрол для назначения ресурсов задаче
- [Constraint](guides/constraint.md) - сложный контрол для задания ограничений задачи
- [Baselines](guides/baseline.md) - сложный контрол для задания базовых линий задачи

~~~js
const opts = [
    { key: 1, label: 'High' },
    { key: 2, label: 'Normal' },
    { key: 3, label: 'Low' }
];

gantt.config.lightbox.sections = [
    { name: 'description', height: 38, map_to: 'text', type: 'textarea', focus: true },
    { name: 'priority', height: 22, map_to: 'priority', type: 'select', options: opts },
    { name: 'time', height: 72, map_to: 'auto', type: 'duration' }
];
~~~