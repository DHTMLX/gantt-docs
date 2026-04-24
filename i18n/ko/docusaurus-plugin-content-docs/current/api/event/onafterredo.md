---
sidebar_label: onAfterRedo
title: onAfterRedo 이벤트
description: "redo() 메서드가 호출된 직후 발생합니다"
--- 

# onAfterRedo

### Description

@short: redo() 메서드가 호출된 직후 발생합니다

@signature: onAfterRedo: (action: any[]) =\> void;

### Parameters

- `action` - (필수) *배열* - 커맨드 객체들의 배열로 이루어진 사용자 작업

### Example

~~~jsx
gantt.attachEvent("onAfterRedo",function(action){
    // 여기에 코드 작성
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
이벤트는 **undo** 확장에서 정의되므로 [undo](guides/extensions-list.md#undo) 플러그인을 활성화해야 합니다. 자세한 내용은 [Undo/Redo Functionality](guides/undo-redo.md) 문서를 참조하세요.
:::

**action** 매개변수는 명령 객체들의 배열을 나타내며, 각 객체에는 다음 속성 세트가 포함됩니다:

- **type** - (*string*) 명령의 유형: "add/remove/update"
- **entity** - (*string*) 변경된 객체의 유형: "task" 또는 "link"
- **value** - (*object*) 변경된 task/link 객체
- **oldValue** - (*object*) 변경되기 전의 task/link 객체

변경 사항이 적용되지 않은 경우, **action** 인수는 === null이 됩니다. 이는 [gantt.redo()](api/method/redo.md)가 호출되었지만 변경 사항이 [onBeforeRedo](api/event/onbeforeredo.md)에서 취소되었거나 스택이 비어 있었을 때 발생할 수 있습니다.

### Related API
- [redo](api/method/redo.md)
- [onBeforeRedo](api/event/onbeforeredo.md)

### Change log
- 버전 4.0에서 추가됨
- 버전 5.2에서 **action** 인자 추가