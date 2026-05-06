---
sidebar_label: getLinks
title: getLinks method
description: "Gantt 차트에 표시된 모든 링크를 반환합니다"
---

# getLinks

### Description

@short: Gantt 차트에 표시된 모든 링크를 반환합니다

@signature: getLinks: () => Array&lt;Link&gt;

### Returns
- `links` - (Array &lt;Link&gt;) - 링크 객체의 배열

### Example

~~~jsx
const links = gantt.getLinks();
~~~

### Details

특정 작업에 연결된 모든 링크를 얻는 방법에 대한 정보는 [Getting the Link Object/Id](guides/link-object-operations.md#getting-the-links-related-to-a-certain-task) 및 [getLink](api/method/getlink.md) 문서를 참조하십시오.