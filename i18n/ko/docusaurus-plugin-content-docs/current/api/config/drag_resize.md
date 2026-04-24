---
sidebar_label: drag_resize
title: drag_resize config
description: "드래그 앤 드롭으로 작업의 크기 조정을 가능하게 하는 기능을 활성화합니다"
---

# drag_resize

### Description

@short: 드래그 앤 드롭으로 작업의 크기 조정을 가능하게 합니다

@signature: drag_resize: boolean

### Example

~~~jsx
gantt.config.drag_resize = false;
gantt.init("gantt_here");
~~~

**기본 값:** true

### Details

![property_drag_resize](/img/property_drag_resize.png)

다음의 [CSS 문서의 관련 섹션](guides/css-overview.md#resizer)으로 모든 작업에 대해 리사이즈 핸들을 비활성화하는 방법을 확인하세요.

타임라인에서 작업 드래그에 대한 세부 제어에 대한 자세한 내용은 [Dragging Tasks within the Timeline](guides/dnd.md) 문서를 참조하세요. 특히 다음과 같습니다:

- [특정 작업의 리사이즈 비활성화](guides/dnd.md#disabling-resize-of-specific-tasks)
- [어떤 쪽의 작업이 리사이즈되고 있는지](guides/dnd.md#which-side-of-a-task-is-being-resized)
- [작업의 시작 날짜 또는 종료 날짜의 리사이즈 비활성화](guides/dnd.md#disabling-resize-of-the-start-or-the-end-date-of-a-task)

### Related Guides
- [drag_lightbox](api/config/drag_lightbox.md)
- [drag_links](api/config/drag_links.md)
- [drag_mode](api/config/drag_mode.md)
- [drag_move](api/config/drag_move.md)
- [drag_progress](api/config/drag_progress.md)