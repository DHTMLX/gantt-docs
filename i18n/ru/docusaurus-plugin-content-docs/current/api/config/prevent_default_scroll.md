---
sidebar_label: prevent_default_scroll
title: prevent_default_scroll config
description: "управляет тем, должен ли контейнер gantt блокировать событие mousewheel или позволять ему распространяться на элемент window"
---

# prevent_default_scroll

### Description

@short: Управляет тем, должен ли контейнер gantt блокировать событие mousewheel или позволять ему распространяться на элемент window

### Example

~~~jsx
gantt.config.prevent_default_scroll = false;
gantt.init('gantt_here');
~~~

**Default value:** false

### Details

:::note
 Это свойство устарело. 
:::

Этот параметр удобен, когда gantt размещён где-то посередине страницы и вокруг него есть другой контент.

Когда параметр отключён, полоса прокрутки внутри gantt остаётся видимой. Чтобы прокручивать другие части страницы, пользователю нужно кликнуть вне области gantt.

### Change log
- устарело с версии v5.0
