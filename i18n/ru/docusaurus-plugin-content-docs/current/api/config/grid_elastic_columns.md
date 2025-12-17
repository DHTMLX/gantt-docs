---
sidebar_label: grid_elastic_columns
title: grid_elastic_columns config
description: "регулирует ширину колонок внутри скроллируемой grid"
---

# grid_elastic_columns

### Description

@short: Регулирует ширину колонок внутри скроллируемой grid

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
 Это свойство работает только когда [grid имеет горизонтальный скроллбар](guides/specifying-columns.md#horizontalscrollbar). 
:::

По умолчанию dhtmlxGantt не изменяет размер колонок при изменении ширины всей grid.

Если ширина grid увеличивается, колонки сохраняют свою исходную ширину, оставляя пустое пространство справа. Если ширина grid уменьшается, появляется горизонтальный скроллбар.

![elastic_false](/img/elastic_false.png)

Чтобы колонки автоматически подстраивались под размер grid, установите **grid_elastic_columns** в *true*:

~~~js
gantt.config.grid_elastic_columns = true;
~~~

:::note
Sample: [Elastic columns of Grid](https://snippet.dhtmlx.com/k0qqj5w5) 
:::

С этой настройкой изменение ширины grid будет также изменять размер колонок:

- При увеличении ширины grid колонки расширяются, чтобы заполнить дополнительное пространство.
- Увеличение ширины одной колонки увеличит размер grid (может появиться горизонтальный скроллбар), но другие колонки останутся без изменений.
- Уменьшение ширины колонки уменьшит размер grid (скроллбар может исчезнуть), а другие колонки могут увеличиться.

![elastic_true](/img/elastic_true.png)

Другой вариант - установить значение свойства в "min_width":

~~~js
gantt.config.grid_elastic_columns = "min_width";
~~~

Что происходит в этом случае:

- При расширении grid колонки растягиваются, чтобы заполнить доступное пространство.
- При сужении grid колонки уменьшаются до своих [минимальных ширин](guides/specifying-columns.md#width). Когда все колонки достигнут минимальной ширины, появится горизонтальный скроллбар.

### Change log
- добавлено в v7.0
