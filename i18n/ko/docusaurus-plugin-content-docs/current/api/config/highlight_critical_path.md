---
sidebar_label: highlight_critical_path
title: highlight_critical_path config
description: "차트 내에서 중요 경로를 하이라이트합니다"
---

# highlight_critical_path
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 차트 내에서 중요 경로를 하이라이트합니다

@signature: highlight_critical_path: boolean

### Example

~~~jsx
gantt.config.highlight_critical_path = true; /*!*/

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

### Details

:::note
 이 설정은 **critical_path** 확장의 일부이므로, 반드시 [critical_path](guides/extensions-list.md#criticalpath) 플러그인을 활성화해야 합니다. 자세한 내용은 [Critical Path](guides/critical-path.md) 문서를 참조하세요. 
:::

### Related API
- [isCriticalTask](api/method/iscriticaltask.md)
- [isCriticalLink](api/method/iscriticallink.md)

### Related Guides
- [Critical Path](guides/critical-path.md)

