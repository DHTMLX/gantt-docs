---
sidebar_label: onBeforeRedo
title: onBeforeRedo 이벤트
description: "redo() 메서드가 호출되기 전에 발생합니다"
---

# onBeforeRedo

### Description

@short: redo() 메서드가 호출되기 전에 발생합니다

@signature: onBeforeRedo: (action: any[]) => boolean;

### Parameters

- `action` - (required) *array* - 커맨드 객체 배열로 구성된 사용자 동작

### Returns
- ` result` - (boolean) - 기본 동작이 트리거될지 여부를 정의합니다(true) 또는 취소됩니다(false)

### Example

~~~jsx
gantt.attachEvent("onBeforeRedo",function(action){
    // 여기에 코드 작성
    return true;
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 이 이벤트는 **undo** 확장 기능에서 제공되므로, [undo](guides/extensions-list.md#undo) 플러그인이 활성화되어 있는지 확인하세요. 자세한 내용은 [Undo/Redo 기능](guides/undo-redo.md) 문서를 참고하시기 바랍니다. 
:::

이벤트는 차단 가능합니다. *false*를 반환하면 추가 처리가 취소됩니다.

**action** 파라미터는 명령 객체들의 배열이며, 각 객체는 다음 속성을 포함합니다:
 
- **type** - (*string*) 커맨드의 유형: "add/remove/update"
- **entity** - (*string*) 변경된 객체의 유형: "task" 또는 "link"
- **value** - (*object*) 변경된 task/link 객체
- **oldValue** - (*object*) 변경 전의 task/link 객체

### Related API
- - [redo](api/method/redo.md)
- - [onAfterRedo](api/event/onafterredo.md)
- - [onBeforeRedoStack](api/event/onbeforeredostack.md)

### Related Guides
- [Undo/Redo 기능](guides/undo-redo.md)

### Change log
- 버전 4.0에서 추가됨