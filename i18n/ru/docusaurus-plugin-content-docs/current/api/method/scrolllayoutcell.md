---
sidebar_label: scrollLayoutCell
title: scrollLayoutCell method
description: "Прокручивает представление макета до указанной позиции"
---

# scrollLayoutCell

### Description

@short: Прокручивает представление макета до указанной позиции

@signature: scrollLayoutCell: (name: string, x: number | null, y: number | null) => void

### Parameters

- `name` - (обязательный) *string* - имя представления макета
- `x` - (обязательный) *number | null* -    необязательное, значение горизонтального прокручивания или 'null' (если положение прокрутки не должно изменяться)
- `y` - (обязательный) *number | null* -     необязательное, значение вертикального прокручивания или 'null' (если положение прокрутки не должно изменяться)

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
пример: [Публичные методы получения представлений ячеек макета и их прокрутки](https://snippet.dhtmlx.com/0v4mmoxu)
:::

### Related API
- [scrollTo](api/method/scrollto.md)