---
sidebar_label: grid_elastic_columns
title: конфигурация grid_elastic_columns
description: "регулирует ширину столбцов внутри прокручиваемой сетки"
---

# grid_elastic_columns

### Description

@short: Регулирует ширину столбцов внутри прокручиваемой сетки

@signature: grid_elastic_columns: boolean | string

### Example

~~~jsx
gantt.config.grid_elastic_columns = true;
...
gantt.init("gantt_here");
~~~

**Default value:** false

### Details

:::note
Свойство работает только тогда, когда у сетки имеется горизонтальная полоса прокрутки ([grid has a horizontal scrollbar](guides/specifying-columns.md#horizontal-scrollbar)).
:::

By default, dhtmlxGantt doesn't adjust the size of columns during resizing of the whole grid. 

По умолчанию dhtmlxGantt не подгоняет размер столбцов во время изменения размера всей сетки.

По этой причине, когда ширина сетки увеличивается, ширина столбцов останется неизменной. В результате на правой стороне сетки появится пустое пространство. 
В случае если ширина сетки уменьшается, горизонтальная прокрутка будет отображаться в сетке.

![elastic_false](/img/elastic_false.png)

To make columns dependent on the grid size, set **grid_elastic_columns** to *true*:

Чтобы сделать столбцы зависимыми от размера сетки, установите значение grid_elastic_columns в *true*:

~~~js
gantt.config.grid_elastic_columns = true;
~~~

:::note
sample: [Elastic columns of Grid ](https://snippet.dhtmlx.com/k0qqj5w5)
:::

Now, if the width of the grid is changed, the width of columns will be also resized, and vice versa:

Теперь, если изменится ширина сетки, ширина столбцов также будет изменяться, и наоборот:

- if you widen the grid, the columns will expand to fit the size of the grid and occupy all the remaining space
- если вы увеличите сетку, столбцы расширятся, чтобы занять размер сетки и занять всё оставшееся пространство
- if you expand the column width, the size of the grid will increase (the horizontal scrollbar may appear but the size of other columns won't change)
- если вы увеличите ширину столбца, размер сетки увеличится (может появиться горизонтальная полоса прокрутки, но размер других столбцов не изменится)
- if you reduce the column width, the size of the grid will reduce (the horizontal scrollbar may disappear but the size of other columns may increase)
- если вы уменьшите ширину столбца, размер сетки уменьшится (горизонтальная прокрутка может исчезнуть, но размер остальных столбцов может увеличиться)

![elastic_true](/img/elastic_true.png)

Еще один вариант - установить значение свойства как "min_width":

~~~js
gantt.config.grid_elastic_columns = "min_width";
~~~

В этом случае:

- if you widen the grid, the columns will expand to fit the size of the grid and occupy all the remaining space
- если вы увеличите сетку, столбцы расширятся, чтобы заполнить размер сетки и занять все оставшееся пространство
- if you reduce the width of the grid, the columns will shrink until they reach their [minimal width](guides/specifying-columns.md#width). When all columns reach minimum, the horizontal scroll will appear in the grid.
- если вы уменьшите ширину сетки, столбцы сузятся до достижения своей [минимальной ширины](guides/specifying-columns.md#width). Когда все столбцы достигнут минимума, горизонтальная прокрутка появится в сетке.

### Change log
- добавлено в версии v7.0