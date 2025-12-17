---
sidebar_label: smart_rendering
title: smart_rendering config
description: "간트의 작업과 링크를 표시하기 위해 smart rendering 모드를 활성화합니다."
---

# smart_rendering

### Description

@short: 간트의 작업과 링크를 표시하기 위해 smart rendering 모드를 활성화합니다.

@signature: smart_rendering: boolean

### Example

~~~jsx
gantt.config.smart_rendering = true;
...
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

버전 6.2부터 smart rendering은 기본적으로 활성화되어 있습니다. 이는 이제 *dhtmlxgantt.js* 코어 파일에 포함되어 있기 때문입니다. 따라서 smart rendering을 활성화하기 위해 별도로 *dhtmlxgantt_smart_rendering.js* 파일을 추가할 필요가 없습니다.

:::note
 이전의 *dhtmlxgantt_smart_rendering.js* 파일을 포함하면 업데이트된 내장 **smart_rendering** 기능의 향상된 부분이 덮어쓰여집니다. 
:::

### Related Guides
- [성능: 개선 방법](guides/performance.md#smartrendering)
