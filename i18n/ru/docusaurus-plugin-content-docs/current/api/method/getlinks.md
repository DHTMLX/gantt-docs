---
sidebar_label: getLinks
title: getLinks method
description: "возвращает все связи, представленные на диаграмме Ганта"
---

# getLinks

### Description

@short: Возвращает все связи, представленные на диаграмме Ганта

@signature: getLinks: () => Array\<Link\>

### Returns
- `links` - (Array &lt;Link&gt;) - массив объектов связей

### Example

~~~jsx
const links = gantt.getLinks();
~~~

### Details

Для получения информации о том, как получить все связи, связанные с конкретной задачей, смотрите статьи [Getting the Link Object/Id](guides/link-object-operations.md#getting-the-links-related-to-a-certain-task) и [getLink](api/method/getlink.md).