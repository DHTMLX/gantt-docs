---
sidebar_label: onBeforeTaskChanged
title: onBeforeTaskChanged 이벤트
description: "사용자가 드래그를 마치고 마우스 버튼을 놓은 직후이지만 변경이 적용되기 전"
---

# onBeforeTaskChanged

### Description

@short: 사용자가 드래그를 마치고 마우스 버튼을 놓은 직후이지만 변경이 적용되기 전

@signature: onBeforeTaskChanged: (id: string | number, mode: string, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 태스크 ID
- `mode` - (required) *string* - 드래그 앤 드롭 모드 ("resize", "progress", "move", "ignore")
- `task` - (required) *Task* - 드래그 앤 드롭 이전의 원래 상태를 가진 태스크 객체의 복사본

### Returns
- `result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskChanged", function(id, mode, task){
    // 여기에 코드 작성
    return true;
});
~~~

### Details

- 타임라인 영역에서 작업을 드래그할 때 이벤트가 발생합니다.
- 이벤트는 차단될 수 있습니다. 드래그 작업을 취소하려면 *false*를 반환합니다.
- 이벤트는 [onAfterTaskDrag](api/event/onaftertaskdrag.md) 이벤트보다 먼저 발생합니다.

**task** 인수는 원래 상태의(수정되지 않은) 태스크 객체를 포함하고 있으며, **gantt.getTask(id)** 메서드를 통해 얻을 수 있는 동일한 데이터 객체는 이미 수정되어 있습니다.
이 객체는 드래그 앤 드롭으로 인한 변경 내용과 초기 태스크 상태 간의 차이를 확인하는 데 사용할 수 있습니다 - 예를 들어 지속 시간이 증가했는지 감소했는지, 시작 날짜가 앞으로 이동했는지 뒤로 이동했는지 등.
메서드에서 *false*를 반환하면 gantt의 태스크 객체는 원래 태스크 객체의 값으로 롤백됩니다.

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)