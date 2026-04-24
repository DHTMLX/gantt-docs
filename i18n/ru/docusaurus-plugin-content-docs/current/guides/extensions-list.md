---
title: "Полный список расширений"
sidebar_label: "Полный список расширений"
---

# Полный список расширений

dhtmlxGantt включает набор расширений, которые добавляют дополнительную функциональность к стандартному поведению.

Чтобы использовать расширение, необходимо активировать плагин с помощью метода [gantt.plugins](api/method/plugins.md).

## Расширенное drag-n-drop

Предоставляет возможность создавать и выбирать задачи с помощью перетаскивания и сброса.

~~~js
gantt.plugins({
    click_drag: true
});
~~~

#### Связанные ресурсы

Статья: [Создание/Выбор задач с DnD](guides/advanced-dnd.md)

API: [click_drag](api/config/click_drag.md)

Пример: [Создать новые задачи с помощью Drag and Drop](https://docs.dhtmlx.com/gantt/samples/02_extensions/24_click_drag.html)

## Автоматическое планирование {#autoscheduling}

:::note
Это расширение доступно только в PRO-версии
:::

Позволяет автоматически планировать задачи в зависимости от связей между ними.

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

#### Связанные ресурсы

Статья: [Автоматическое планирование](guides/auto-scheduling.md)

API: [auto_scheduling](api/config/auto_scheduling.md)

Пример: [Расширение автоматического планирования](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

## Критический путь

:::note
Это расширение доступно только в PRO-версии
:::

Представляет собой последовательность задач, задержка которых невозможна без влияния на общий срок проекта.
Критический путь также определяет минимальное время, которое может занять проект.

~~~js
gantt.plugins({
    critical_path: true
});
~~~

#### Связанные ресурсы

Статья: [Критический путь](guides/critical-path.md)

API: [highlight_critical_path](api/config/highlight_critical_path.md)

Пример: [Критический путь](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

## Перетаскивание временной шкалы

Позволяет прокручивать просмотры временной шкалы с помощью перетаскивания мышью.

~~~js
gantt.plugins({
    drag_timeline: true
});
~~~

#### Связанные ресурсы

API: [drag_timeline](api/config/drag_timeline.md)

Пример: [Перетаскивание временной шкалы](https://docs.dhtmlx.com/gantt/samples/02_extensions/27_drag_timeline.html)

## Дополнительная наложка

:::note
Это расширение доступно только в PRO-версии.
:::

Предоставляет возможность добавить дополнительный слой поверх диаграммы Gantt для размещения произвольного контента.

~~~js
gantt.plugins({
    overlay: true
});
~~~

#### Связанные ресурсы

Статья: [Пользовательские элементы в области Timeline](guides/baselines.md#extra-overlay-for-the-chart)

Пример: [Диаграмма Gantt с наложением и зумом (S-curve)](https://docs.dhtmlx.com/gantt/samples/02_extensions/21_overlay.html)

## Сервис экспорта

Предоставляет возможность включить онлайн-сервис экспорта.

~~~js
gantt.plugins({
    export_api: true
});
~~~

#### Связанные ресурсы

Статья: [Экспорт и импорт данных](guides/export-common.md)

## Полноэкранный режим {#fullscreen}

Отображает Gantt в полноэкранном режиме.

~~~js
gantt.plugins({
    fullscreen: true
});
~~~

#### Связанные ресурсы

Статья: [Полноэкранный режим](guides/fullscreen-mode.md)

Пример: [Полноэкранный режим](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

## Группировка

:::note
Это расширение доступно только в PRO-версии
:::

Позволяет группировать задачи по любым атрибутам задач.

~~~js
gantt.plugins({
    grouping: true
});
~~~

#### Связанные ресурсы

Статья: [Группировка задач](guides/grouping.md)

API: [groupBy](api/method/groupby.md)

Пример: [Группировка задач](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)

## Навигация с клавиатуры {#keyboardnavigation}

Позволяет осуществлять навигацию по диаграмме Gantt с помощью клавиатуры.

~~~js
gantt.plugins({
    keyboard_navigation: true
});
~~~

#### Связанные ресурсы

Статья: [Accessibility](guides/accessibility.md), [Навигация с клавиатуры](guides/keyboard-navigation.md)

API: [keyboard_navigation](api/config/keyboard_navigation.md),[keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)

## Выбор нескольких задач {#multitaskselection}

Позволяет выбрать несколько задач на диаграмме Gantt за один раз.

~~~js
gantt.plugins({
    multiselect: true
});
~~~

#### Связанные ресурсы

Статья: [Множественный выбор задач](guides/multiselection.md)

API: [multiselect](api/config/multiselect.md)

Пример: [Множественный выбор и выравнивание задач](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

## Быстрая информация

Предоставляет всплывающее окно с деталями задачи.

~~~js
gantt.plugins({
    quick_info: true
});
~~~

#### Связанные ресурсы

Статья: [Шаблоны расширения 'Быстрая Информация' (Touch Support)](guides/touch-templates.md), 

[Быстрая Информация (Touch Support)](guides/quick-info.md)

Пример: [Расширение QuickInfo](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

## Тултип

Позволяет добавить дополнительную информацию для пользователей, не перегружая экран текстом.

~~~js
gantt.plugins({
    tooltip: true
});
~~~

#### Связанные ресурсы

Статья: [Подсказки для элементов Gantt](guides/tooltips.md)

Пример: [Тултип](https://docs.dhtmlx.com/gantt/samples/02_extensions/02_tooltip.html)

## Undo

Позволяет отменять/повторять внесённые изменения.

~~~js
gantt.plugins({
    undo: true
});
~~~

#### Связанные ресурсы

Статья: [Undo/Redo Functionality](guides/undo-redo.md)

API: [undo](api/config/undo.md), [redo](api/config/redo.md)

Пример: [Отмена/Повтор изменений в Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

## Вертикальный маркер

Подчеркивает определенные даты или диапазоны дат.

~~~js
gantt.plugins({
    marker: true
});
~~~

#### Связанные ресурсы

Статья: [Добавление вертикальных маркеров](guides/markers.md)

API: [addMarker](api/method/addmarker.md),[show_markers](api/config/show_markers.md)

Пример: [Сегодня и линии статуса в Gantt (вертикальные маркеры)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)