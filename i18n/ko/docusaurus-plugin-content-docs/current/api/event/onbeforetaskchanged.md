---
sidebar_label: onBeforeTaskChanged
title: onBeforeTaskChanged event
description: "사용자가 드래그를 마치고 마우스 버튼을 놓은 직후, 변경 사항이 적용되기 전에 발생합니다."
---

# onBeforeTaskChanged

### Description

@short: 사용자가 드래그를 마치고 마우스 버튼을 놓은 직후, 변경 사항이 적용되기 전에 발생합니다.

@signature: onBeforeTaskChanged: (id: string | number, mode: string, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 작업 ID
- `mode` - (required) *string* - 드래그 앤 드롭 모드 ("resize", "progress", "move", "ignore")
- `task` - (required) *Task* - 드래그 앤 드롭 이전 원본 상태의 작업 객체 복사본

### Returns
- ` result` - (boolean) - 기본 이벤트 동작을 계속할지(<b>true</b>) 취소할지(<b>false</b>) 결정합니다.

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskChanged", function(id, mode, task){
    //여기에 커스텀 로직을 추가할 수 있습니다
    return true;
});
~~~

### Details

- 이 이벤트는 타임라인 영역 내에서 작업이 드래그될 때 발생합니다.
- *false*를 반환하면 드래그 작업이 취소되어 이벤트를 차단할 수 있습니다.
- [onAfterTaskDrag](api/event/onaftertaskdrag.md) 이벤트보다 먼저 발생합니다.

**task** 파라미터는 원본(변경 전) 작업 객체를 나타내며, **gantt.getTask(id)** 를 통해 접근하는 작업 데이터는 업데이트된 상태를 반영합니다.  
이를 통해 드래그 앤 드롭 중에 기간이 늘어났는지 줄어들었는지, 시작일이 앞으로 이동했는지 뒤로 이동했는지 등 변경된 내용을 비교할 수 있습니다.<br>
이 이벤트에서 *false*를 반환하면 Gantt 내 작업이 원본 작업 값으로 되돌아갑니다.

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)

