---
sidebar_label: grid_row_class
title: grid_row_class template
description: "определяет CSS-класс, который присваивается строке grid"
---

# grid_row_class

### Description

@short: Определяет CSS-класс, который присваивается строке grid

@signature: grid_row_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - дата начала задачи
- `end` - (required) *Date* - ожидаемая дата окончания задачи
- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string | void) - CSS-класс для соответствующего элемента

### Example

~~~jsx
gantt.templates.grid_row_class = function(start, end, task){
    return "";
};
~~~

### Details

Каждая вторая строка как в grid, так и в области timeline содержит дополнительный CSS-класс **odd**, который можно использовать для создания чередующихся цветов строк:

~~~css
.gantt_row.odd, .gantt_task_row.odd{
    background: silver;
}

.gantt_row, .gantt_task_row {
    background: white;
}
~~~

По умолчанию эти стили применяются только к четным строкам. Чтобы стилизовать нечетные строки, класс **odd** должен быть добавлен в селекторы ваших CSS-правил. Поэтому, если вы хотите, чтобы все строки имели одинаковый цвет, обычно нужно включить правила для обоих селекторов (с классом '.odd' и без), так как стандартные CSS-правила [имеют более высокий приоритет и перекрывают остальные](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity).

~~~css
.gantt_row.odd, .gantt_task_row.odd,
.gantt_row, .gantt_task_row {
    background: white;
}
~~~

Этот подход также применяется к пользовательским CSS-классам, назначаемым через шаблоны [grid_row_class](api/template/grid_row_class.md) и [task_row_class](api/template/task_row_class.md):


~~~js
gantt.templates.grid_row_class = function(start, end, task){
    return "wheat_color";
};
~~~
<br>

~~~css
.wheat_color,
.wheat_color.odd{
    background:wheat;
}
~~~

Вы можете заметить, что на экране подсвечиваются четные строки, а не нечетные. Однако, если проверить [индексы строк](api/method/gettaskindex.md), вы увидите, что стили применяются к строкам с нечетными индексами (1, 3, 5 и так далее).

### Related Guides
- [Шаблоны грида](guides/table-templates.md)

