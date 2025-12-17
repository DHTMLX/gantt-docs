---
sidebar_label: scrollLayoutCell
title: scrollLayoutCell method
description: "перемещает вид layout в указанную позицию"
---

# scrollLayoutCell

### Description

@short: Перемещает вид layout в указанную позицию

@signature: scrollLayoutCell: (name: string, x: number | null, y: number | null) =\> void

### Parameters

- `name` - (required) *string* - имя вида layout
- `x` - (required) *number | null* -    необязательно, значение горизонтальной прокрутки или 'null' (если не нужно менять горизонтальную позицию)
- `y` - (required) *number | null* -     необязательно, значение вертикальной прокрутки или 'null' (если не нужно менять вертикальную позицию)

### Example

~~~jsx
// прокручивает вид layout только по горизонтали
gantt.scrollLayoutCell("resourceTimeline", 50);

// прокручивает вид layout только по вертикали
gantt.scrollLayoutCell("resourceTimeline", null, 50);

// прокручивает вид layout и по горизонтали, и по вертикали
gantt.scrollLayoutCell("resourceTimeline", 100, 100);
~~~

### Details

:::note
Sample: [Публичные методы для доступа к видам ячеек layout и управления их прокруткой](https://snippet.dhtmlx.com/0v4mmoxu) 
:::

### Related API
- [scrollTo](api/method/scrollto.md)

