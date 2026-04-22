---
sidebar_label: drag_timeline
title: drag_timeline 구성
description: "drag_timeline 확장의 동작을 구성합니다"
---

# drag_timeline

### Description

@short: drag_timeline 확장의 동작 구성

@signature: drag_timeline: null | \{ ignore?: string; useKey?: string | boolean; render?: boolean; \}

### Example

~~~jsx
gantt.config.drag_timeline = {
    ignore:".gantt_task_line, .gantt_task_link",
    useKey: false,
    render: false
};
~~~

**기본값:** \{ useKey: false, ignore: ".gantt_task_line, .gantt_task_link" \}

### Related samples
- [Drag timeline](https://docs.dhtmlx.com/gantt/samples/02_extensions/27_drag_timeline.html)

### Details

:::note
이 옵션은 **drag_timeline** 확장에 정의되어 있으므로 [drag_timeline](guides/extensions-list.md#drag-timeline) 플러그인을 활성화해야 합니다.
:::

구성 값은 객체이거나 **null** 값일 수 있으며, **null** 값은 확장을 비활성화합니다.

~~~js
gantt.config.drag_timeline = null; // disables the extension
~~~

**drag_timeline** 객체에는 다음 속성이 포함되어 있습니다:

- **ignore** - (*string*) - CSS 선택자. 이 선택자와 일치하는 요소에 대해 타임라인 스크롤이 활성화되지 않습니다

- **useKey** - (*string | boolean*) - 이 속성이 지정되면, 지정된 수정 키가 눌려 있을 때만 타임라인 스크롤이 활성화됩니다. 지원되는 값은: "ctrlKey", "shiftKey", "metaKey", "altKey"

- **render** - (*boolean*) - 이 속성이 활성화되면 스크롤이 시작될 때와 끝날 때 타임라인이 다시 렌더링됩니다