---
sidebar_label: getUndoStack
title: getUndoStack 메서드
description: "저장된 실행 취소 사용자 작업 스택을 반환합니다"
---

# getUndoStack

### Description

@short: 저장된 실행 취소 사용자 작업 스택을 반환합니다

@signature: getUndoStack: () =\> UndoRedoAction[]

### Returns
- `stack` - (UndoRedoAction[]) - Undo 사용자 작업의 배열

### Example

~~~jsx
var stack = gantt.getUndoStack();
~~~

### Related samples
- [Gantt에서의 Undo/Redo 변경](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
이 메서드는 **undo** 확장에 정의되어 있으므로 [undo](guides/extensions-list.md#undo) 플러그인을 활성화해야 합니다. 자세한 내용은 [Undo/Redo 기능](guides/undo-redo.md) 문서를 참고하세요.
:::

반환된 스택은 Undo 사용자 작업의 배열입니다. 각 사용자 작업은 일련의 명령을 포함합니다. 명령은 다음 속성을 가진 객체입니다:
 
- **type** - (*string*) 명령의 유형: "add/remove/update"
- **entity** - (*string*) 변경된 객체의 유형: "task" 또는 "link"
- **value** - (*object*) 변경된 task/link 객체 
- **oldValue** - (*object*) 변경 전의 task/link 객체

아래 예제를 참고하십시오:
![get_undo_stack](/img/get_undo_stack.png)

The **getUndoStack()** 메서드는 2개의 Undo 사용자 작업이 포함된 스택을 반환합니다. 첫 번째 작업은 3개의 명령을 포함하고, 두 번째 작업은 1개의 명령을 포함합니다.

### Related API
- [getRedoStack](api/method/getredostack.md)
- [undo](api/method/undo.md)
- [clearUndoStack](api/method/clearundostack.md)

### Related Guides
- [Undo/Redo 기능](guides/undo-redo.md)

### Change log
- 버전 4.0에서 추가됨