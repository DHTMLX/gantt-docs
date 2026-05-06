---
sidebar_label: link_arrow_size
title: link_arrow_size конфигурация
description: "устанавливает размер стрелки ссылки"
---

# link_arrow_size

### Description

@short: Устанавливает размер стрелки ссылки

@signature: link_arrow_size: number

### Example

~~~jsx
gantt.config.link_arrow_size = 8;
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** 6

### Details

Свойство задаёт размер HTML-элемента и не изменяет реальный размер стрелки ссылки.
Чтобы изменить его, необходимо использовать CSS.

Посмотрите пример, чтобы найти стили для разных скинов:

:::note
sample: [Skins ](https://snippet.dhtmlx.com/hb0be53m)
:::