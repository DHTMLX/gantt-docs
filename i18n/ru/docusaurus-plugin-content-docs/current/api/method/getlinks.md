---
sidebar_label: getLinks
title: getLinks method
description: "получает все ссылки, отображаемые на диаграмме Ганта"
---

# getLinks

### Description

@short: Получает все ссылки, отображаемые на диаграмме Ганта

@signature: getLinks: () =\> Array\<Link\>

### Returns
- `links` - (Array &lt;Link&gt;) - массив, содержащий объекты ссылок

### Example

~~~jsx
const links = gantt.getLinks();
~~~

### Details

Чтобы узнать, как получить все ссылки, связанные с конкретной задачей, обратитесь к статьям [Получение объекта/ID связи](guides/link-object-operations.md#gettingthelinksrelatedtoacertaintask) и [getLink](api/method/getlink.md).

