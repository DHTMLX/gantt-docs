---
title: "Расширение Keyboard Navigation"
sidebar_label: "Расширение Keyboard Navigation"
---

# Расширение клавиатурной навигации

Подробнее об расширении клавиатурной навигации можно узнать в статье [Навигация клавиатуры](guides/keyboard-navigation.md).


Объект *keyboardNavigation* имеет следующий API:

## Методы

- <span class="submethod">**focus (config): void**</span> - позволяет выбрать любую ячейку в грид. Работает только если у Грид уже установлен фокус

    - **_config_** - (*object*) - объект конфигурации
        - **_id_** - (*number | string*) - идентификатор редактируемой задачи
        - **_column_** - (*string*) - имя столбца
        - **_type_** - (*string*) - тип области. Возможные значения: "gantt", "taskRow", "taskCell", "headerCell"


~~~js
gantt.ext.keyboardNavigation.focus({type:"taskCell",id:"taskId",column:"columnName"});
~~~

**Связанный пример** [Выбор ячейки грид](https://snippet.dhtmlx.com/v5ffah8w)

- <span class="submethod">**getActiveNode (): boolean | void**</span> - позволяет получать информацию об активной ячейке

~~~js
var active_node = gantt.ext.keyboardNavigation.getActiveNode();
// -> {type: "taskCell", id: "10", column: "text"}
~~~

**Связанный пример** [Получение активной ячейки](https://snippet.dhtmlx.com/dznf7xjw)