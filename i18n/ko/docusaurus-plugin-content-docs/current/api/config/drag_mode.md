---
sidebar_label: drag_mode
title: drag_mode config
description: "사용 가능한 다양한 드래그 앤 드롭 모드 유형을 포함합니다."
---

# drag_mode

### Description

@short: 사용 가능한 다양한 드래그 앤 드롭 모드 유형을 포함합니다.

@signature: drag_mode: \{ resize?: string; progress?: string; move?: string; ignore?: string; \}

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    const modes = gantt.config.drag_mode;
    switch (mode){
        case modes.move:
        
        break;
        case modes.resize:
        
        break;
        case modes.progress:
        
        break;
    
    }
    //...
});
~~~

**Default value:** \{
  "resize":"resize",
  "progress":"progress",
  "move":"move",
  "ignore":"ignore"
\}

### Details

기존 drag 모드 이름을 변경하지 않는 것이 중요합니다. 이름을 변경하면 관련 기능이 작동하지 않게 됩니다. 하지만, 커스텀 동작을 지원하고 싶다면 새로운 속성을 추가할 수 있습니다.
특정 drag 모드를 비활성화하려면 [drag_move](api/config/drag_move.md), [drag_resize](api/config/drag_resize.md), 또는 [drag_progress](api/config/drag_progress.md) 설정을 사용하는 것이 좋습니다.

- **resize** - (*string*) - 사용자가 작업 바를 드래그하여 기간을 조정할 수 있는 모드입니다.
- **progress** - (*string*) - 사용자가 작업 바의 진행 핸들을 드래그할 수 있는 모드입니다.
- **move** - (*string*) - 작업 바를 드래그하여 위치를 변경할 수 있는 모드입니다.
- **ignore** - (*string*) - 드래그 앤 드롭 동작을 비활성화하는 특별한 모드입니다.

