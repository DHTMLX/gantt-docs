---
title: "Полный список расширений"
sidebar_label: "Полный список расширений"
---

# Полный список расширений


dhtmlxGantt предлагает ряд расширений, которые расширяют базовую функциональность.

Чтобы включить расширение, просто активируйте плагин с помощью метода [gantt.plugins](api/method/plugins.md).

## Расширенный drag-n-drop {#advanceddragndrop}


Это расширение позволяет создавать и выделять задачи с помощью drag-and-drop.

~~~js
gantt.plugins({
    click_drag: true
});
~~~

#### Связанные материалы

Статья: [Создание/Выделение задач с помощью DnD](guides/advanced-dnd.md)


API: [click_drag](api/config/click_drag.md)


[Create new tasks by Drag and Drop](https://docs.dhtmlx.com/gantt/samples/02_extensions/24_click_drag.html)


## Автоматическое планирование {#autoscheduling}


:::info
Это расширение доступно только в PRO-версии
:::

Эта функция автоматически планирует задачи на основе связей между ними.

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

#### Связанные материалы

Статья: [Автоматическое планирование](guides/auto-scheduling.md)


API: [auto_scheduling](api/config/auto_scheduling.md)


[Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)


## Критический путь {#criticalpath}


:::info
Это расширение доступно только в PRO-версии
:::

Отображает последовательность задач, которые необходимо завершить вовремя, чтобы не задерживать весь проект. Также показывает минимально возможную продолжительность проекта.

~~~js
gantt.plugins({
    critical_path: true
});
~~~

#### Связанные материалы

Статья: [Критический путь](guides/critical-path.md)


API: [highlight_critical_path](api/config/highlight_critical_path.md)


[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)


## Перетаскивание таймлайна {#dragtimeline}


Позволяет прокручивать временную шкалу путем перетаскивания мышью.

~~~js
gantt.plugins({
    drag_timeline: true
});
~~~

#### Связанные материалы

API: [drag_timeline](api/config/drag_timeline.md)


[Drag timeline](https://docs.dhtmlx.com/gantt/samples/02_extensions/27_drag_timeline.html)


## Дополнительный overlay {#extraoverlay}


:::info
Это расширение доступно только в PRO-версии.
:::

Позволяет добавить дополнительный слой поверх диаграммы Gantt для размещения пользовательского контента.

~~~js
gantt.plugins({
    overlay: true
});
~~~

#### Связанные материалы

Статья: [Пользовательские элементы в области временной шкалы](guides/baselines.md#extraoverlayforthechart)


[Gantt chart with overlay and zoom (S-Curve)](https://docs.dhtmlx.com/gantt/samples/02_extensions/21_overlay.html)


## Сервис экспорта {#exportservice}


Включает онлайн-сервис экспорта.

~~~js
gantt.plugins({
      export_api: true
});
~~~

#### Связанные материалы

Статья: [Экспорт и импорт данных](guides/export-common.md)

## Полноэкранный режим {#fullscreen}


Отображает диаграмму Gantt в полноэкранном режиме.

~~~js
gantt.plugins({
    fullscreen: true
});
~~~

#### Связанные материалы

Статья: [Полноэкранный режим](guides/fullscreen-mode.md) 


[Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)


## Группировка {#grouping}


:::info
Это расширение доступно только в PRO-версии
:::

Позволяет группировать задачи по любому атрибуту задачи.

~~~js
gantt.plugins({
    grouping: true
});
~~~

#### Связанные материалы

Статья: [Группировка задач](guides/grouping.md)


API: [groupBy](api/method/groupby.md)


[Tasks grouping](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)


## Навигация с клавиатуры {#keyboardnavigation}

Позволяет перемещаться по диаграмме Gantt с помощью клавиатуры.

~~~js
gantt.plugins({
    keyboard_navigation: true
});
~~~

#### Связанные материалы

Статья: [Доступность](guides/accessibility.md#keyboardnavigation), [Навигация с клавиатуры](guides/keyboard-navigation.md)


API: [keyboard_navigation](api/config/keyboard_navigation.md),[keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)


## Множественный выбор задач {#multitaskselection}


Позволяет выделять несколько задач одновременно на диаграмме Gantt.

~~~js
gantt.plugins({
    multiselect: true
});
~~~

#### Связанные материалы

Статья: [Множественный выбор задач](guides/multiselection.md)


API: [multiselect](api/config/multiselect.md)


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


## Быстрая информация {#quickinfo}


Показывает всплывающее окно с деталями задачи.

~~~js
gantt.plugins({
    quick_info: true
});
~~~

#### Связанные материалы

Статья: [Шаблоны расширения 'Quick Info' (Поддержка Touch)](guides/touch-templates.md), 


[Быстрая информация (Поддержка касаний)](guides/quick-info.md)


[QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)


## Тултип {#tooltip}

Добавляет дополнительную информацию для пользователей, не загромождая экран.

~~~js
gantt.plugins({
    tooltip: true
});
~~~

#### Связанные материалы

Статья: [Тултипы для элементов Gantt](guides/tooltips.md)


[Tooltip](https://docs.dhtmlx.com/gantt/samples/02_extensions/02_tooltip.html)


## Undo {#undo}


Добавляет возможность отмены и возврата изменений.

~~~js
gantt.plugins({
    undo: true
});
~~~

#### Связанные материалы

Статья: [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md)


API: [undo](api/config/undo.md), [redo](api/config/redo.md)


[Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)


## Вертикальный маркер {#verticalmarker}


Выделяет определённые даты или диапазоны дат.

~~~js
gantt.plugins({
    marker: true
});
~~~

#### Связанные материалы

Статья: [Добавление вертикальных маркеров](guides/markers.md)


API: [addMarker](api/method/addmarker.md),[show_markers](api/config/show_markers.md)


[Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

