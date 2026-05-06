---
sidebar_label: smart_rendering
title: smart_rendering 구성
description: "gantt의 작업 및 연결 렌더링을 위한 스마트 렌더링 모드를 활성화합니다"
---

# smart_rendering

### Description

@short: gantt의 작업 및 링크 렌더링에 대한 스마트 렌더링 모드를 활성화합니다

@signature: smart_rendering: boolean

### Example

~~~jsx
gantt.config.smart_rendering = true;
...
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

버전 6.2부터 스마트 렌딩은 기본값으로 활성화되며, 이는 코어 파일 *dhtmlxgantt.js*에 포함되어 있습니다. 따라서 스마트 렌더링을 작동시키기 위해 페이지에 *dhtmlxgantt_smart_rendering.js* 파일을 추가로 포함할 필요가 없습니다.

:::note
오래된 버전에서 온 *dhtmlxgantt_smart_rendering.js* 파일을 연결하면, 새로 내장된 **smart_rendering** 확장의 개선 사항이 덮어씌워집니다.
:::

### Related Guides
- [Performance: Ways to Improve](guides/performance.md#smart-rendering)