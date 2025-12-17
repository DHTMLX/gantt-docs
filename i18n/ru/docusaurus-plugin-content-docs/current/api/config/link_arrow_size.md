---
sidebar_label: link_arrow_size
title: link_arrow_size config
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

**Default value:** 6

### Details

Это свойство задаёт размер HTML-элемента для стрелки ссылки, но фактически не изменяет реальный размер стрелки.<br>
Для изменения внешнего вида стрелки необходимо внести корректировки в CSS.

Посмотрите пример, чтобы увидеть стили, применяемые для различных скинов: 

:::note
Sample: [Skins](https://snippet.dhtmlx.com/hb0be53m) 
:::
