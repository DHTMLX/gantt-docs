---
sidebar_label: drag_resize
title: drag_resize config
description: "드래그 앤 드롭을 사용하여 작업 크기를 조절할 수 있습니다."
---

# drag_resize

### Description

@short: 드래그 앤 드롭을 사용하여 작업 크기를 조절할 수 있습니다.

@signature: drag_resize: boolean

### Example

~~~jsx
gantt.config.drag_resize = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

![property_drag_resize](/img/property_drag_resize.png)

모든 작업에서 resize 핸들을 제거하는 방법은 [CSS 문서의 관련 섹션](guides/css-overview.md#resizer)을 참조하세요.

작업 크기 조절에 대해 더 세밀한 제어가 필요하면 [타임라인 내 작업 드래그](guides/dnd.md) 문서를 참고하세요. 해당 문서에서는 다음 내용을 다룹니다:

- [특정 작업의 크기 조절 비활성화](guides/dnd.md#disablingresizingofspecifictasks)
- [작업의 어느 쪽이 크기 조절되고 있는지 식별](guides/dnd.md#identifyingwhichsideofataskisbeingresized)
- [작업 시작일 또는 종료일 크기 조절 비활성화](guides/dnd.md#disablingresizingofthestartorenddateofatask)

### Related Guides
- [drag_lightbox](api/config/drag_lightbox.md)
- [drag_links](api/config/drag_links.md)
- [drag_mode](api/config/drag_mode.md)
- [drag_move](api/config/drag_move.md)
- [drag_progress](api/config/drag_progress.md)

