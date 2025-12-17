---
sidebar_label: drag_timeline
title: drag_timeline config
description: "drag_timeline 확장 기능의 동작 방식을 설정합니다."
---

# drag_timeline

### Description

@short: Drag_timeline 확장 기능의 동작 방식을 설정합니다.

@signature: drag_timeline: null | \{ ignore?: string; useKey?: string | boolean; render?: boolean; \}

### Example

~~~jsx
gantt.config.drag_timeline = {
    ignore:".gantt_task_line, .gantt_task_link",
    useKey: false,
    render: false
};
~~~

**Default value:** \{ useKey: false, ignore: ".gantt_task_line, .gantt_task_link" \}

### Related samples
- [Drag timeline](https://docs.dhtmlx.com/gantt/samples/02_extensions/27_drag_timeline.html)

### Details

:::note
 이 옵션은 **drag_timeline** 확장 기능의 일부이므로, [drag_timeline](guides/extensions-list.md#dragtimeline) 플러그인이 활성화되어 있는지 확인하세요. 
:::

설정값은 객체 또는 **null**로 지정할 수 있으며, **null**은 확장 기능을 비활성화합니다.

~~~js
gantt.config.drag_timeline = null; // 확장 기능 비활성화
~~~

**drag_timeline** 객체는 다음 속성을 지원합니다:


- **ignore** - (*string*) - 상호작용 시 타임라인 스크롤을 트리거하지 않을 요소에 대한 CSS 선택자

- **useKey** - (*string | boolean*) - 설정 시 지정한 수정키가 눌려 있을 때만 타임라인 스크롤이 활성화됩니다. 지원하는 키는 "ctrlKey", "shiftKey", "metaKey", "altKey"입니다.

- **render** - (*boolean*) - 활성화하면 스크롤 시작과 종료 시 타임라인을 재렌더링합니다.
