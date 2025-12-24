---
title: "Расширение Keyboard Navigation"
sidebar_label: "Расширение Keyboard Navigation"
---

# Расширение Keyboard Navigation


Более подробную информацию о расширении Keyboard navigation можно найти в статье [Навигация с клавиатуры](guides/keyboard-navigation.md). 


Объект *keyboardNavigation* предоставляет следующий API:

## Методы


- <span class="submethod">**focus (config): void**</span> - позволяет выбрать любую ячейку внутри грида. Работает только тогда, когда грид уже в фокусе.

    - **_config_** - (*object*) - объект конфигурации
        - **_id_** - (*number | string*) - ID редактируемой задачи
        - **_column_** - (*string*) - имя колонки
        - **_type_** - (*string*) - определяет тип области. Возможные значения: "gantt", "taskRow", "taskCell", "headerCell"

~~~js
gantt.ext.keyboardNavigation.focus({type:"taskCell",id:"taskId",column:"columnName"});
~~~


**Related example:** [Selecting a grid cell](https://snippet.dhtmlx.com/v5ffah8w)


- <span class="submethod">**getActiveNode (): boolean | void**</span> - возвращает информацию о текущей активной ячейке

~~~js
var active_node = gantt.ext.keyboardNavigation.getActiveNode();
// -> {type: "taskCell", id: "10", column: "text"}
~~~


**Related example:** [Getting the active cell](https://snippet.dhtmlx.com/dznf7xjw)
