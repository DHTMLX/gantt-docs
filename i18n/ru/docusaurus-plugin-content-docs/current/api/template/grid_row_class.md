---
sidebar_label: grid_row_class
title: grid_row_class шаблон
description: "указывается CSS-класс, который будет применяться к строке грида"
---

# grid_row_class

### Description

@short: Определяет CSS-класс, который присваивается строке grid

@signature: grid_row_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - дата начала запланированной задачи
- `end` - (required) *Date* - дата завершения запланированной задачи
- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string | void) - CSS-класс для данного элемента

### Example

~~~jsx
gantt.templates.grid_row_class = function(start, end, task){
    return "";
};
~~~

### Details

Каждая вторая строка грида и область таймлайна содержит дополнительный CSS-класс с именем **odd**, который можно использовать для чередования цветов строк:

~~~css
.gantt_row.odd, .gantt_task_row.odd{
    background: silver;
}

.gantt_row, .gantt_task_row {
    background: white;
}
~~~

По умолчанию стили применяются только к четным строкам. Чтобы стилизовать нечетные строки, необходимо добавить имя класса **odd** к селекторам правил стилей. Поэтому, если вы хотите задать один и тот же цвет всем строкам, обычно нужно прописать CSS-правило для обоих селекторов (с классом '.odd' и без него); иначе существующие CSS-правила станут более специфичными и получат более высокий приоритет (см. https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity).

~~~css
.gantt_row.odd, .gantt_task_row.odd,
.gantt_row, .gantt_task_row {
{
    background: white;
}
~~~

То же самое работает и для пользовательских CSS-классов, которые можно применить через шаблоны [grid_row_class](api/template/grid_row_class.md) и [task_row_class](api/template/task_row_class.md):

~~~js
gantt.templates.grid_row_class = function(start, end, task){
    return "wheat_color";
};
~~~

~~~css
.wheat_color,
.wheat_color.odd{
    background:wheat;
}
~~~

Вы можете заметить, что на экране выделяются нечетные строки, а не четные. Но если вы посмотрите на [indexes of rows](api/method/gettaskindex.md), вы увидите, что стиль применяется к строкам с нечетными индексами (1, 3, 5 и т. д.).

### Related Guides
- [Templates of the Grid](guides/table-templates.md)