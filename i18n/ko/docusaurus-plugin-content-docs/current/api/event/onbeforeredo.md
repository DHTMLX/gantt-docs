---
sidebar_label: onBeforeRedo
title: onBeforeRedo event
description: "redo() 메서드가 실행되기 직전에 트리거됩니다."
---

# onBeforeRedo

### Description

@short: Redo() 메서드가 실행되기 직전에 트리거됩니다.

@signature: onBeforeRedo: (action: any[]) =\> boolean;

### Parameters

- `action` - (required) *array* - 사용자 작업을 나타내는 배열로, 명령 객체들로 구성됩니다.

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 진행될지(true) 또는 중단될지(false)를 결정합니다.

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


이 이벤트는 차단할 수 있습니다. *false*를 반환하면 이후 작업이 진행되지 않습니다.

**action** 파라미터는 명령 객체들의 배열이며, 각 객체는 다음 속성을 포함합니다:
 
- **type** - (*string*) 명령 유형: "add", "remove", "update"
- **entity** - (*string*) 변경된 객체 종류: "task" 또는 "link"
- **value** - (*object*) 변경 후의 task 또는 link 객체
- **oldValue** - (*object*) 변경 전의 task 또는 link 객체

### Related API
- [redo](api/method/redo.md)
- [onAfterRedo](api/event/onafterredo.md)
- [onBeforeRedoStack](api/event/onbeforeredostack.md)

### Related Guides
- [Undo/Redo 기능](guides/undo-redo.md)

### Change log
- 버전 4.0에 추가됨

