---
sidebar_label: highlight_critical_path
title: highlight_critical_path config
description: "차트의 크리티컬 경로를 표시합니다"
---

# highlight_critical_path

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::

### Description

@short: 차트에서 크리티컬 경로를 표시합니다

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
This option is defined in the **critical_path** extension, so you need to activate the [critical_path](guides/extensions-list.md#critical-path) plugin. Read the details in the [Critical Path](guides/critical-path.md) article. 
:::

이 옵션이 활성화되어 있으면 작업이나 링크가 변경될 때마다 전체 차트가 다시 그려집니다. 대규모 차트에서는 사용자가 임계 경로를 확인해야 할 때만 이 옵션을 활성화하거나 [batchUpdate](api/method/batchupdate.md)로 변경 사항을 묶어서 처리하십시오.

### Related API
- [isCriticalTask](api/method/iscriticaltask.md)
- [isCriticalLink](api/method/iscriticallink.md)

### Related Guides
- [Critical Path](guides/critical-path.md)
- [성능: 개선 방법](guides/performance.md#common-techniques)