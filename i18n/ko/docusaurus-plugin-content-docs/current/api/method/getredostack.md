---
sidebar_label: getRedoStack
title: getRedoStack 메서드
description: "저장된 redo 사용자 작업의 스택을 반환합니다"
---

# getRedoStack

### Description

@short: 반환된 스택은 저장된 redo 사용자 작업의 스택을 반환합니다

@signature: getRedoStack: () => UndoRedoAction[]

### Returns
- `스택` - (UndoRedoAction[]) - redo 사용자 작업의 배열

### Example

~~~jsx
var stack = gantt.getRedoStack();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 이 메서드는 **undo** 확장에 속하므로, [undo](guides/extensions-list.md#undo) 플러그인이 활성화되어 있어야 합니다. 자세한 내용은 [Undo/Redo 기능](guides/undo-redo.md) 문서를 참고하세요. 
:::

반환된 스택은 redo 사용자 작업의 배열입니다. 각 사용자 작업은 여러 명령으로 구성되어 있습니다. 명령은 다음 속성을 가진 객체입니다:
 
- **type** - (*string*) 명령의 유형: "add/remove/update"
- **entity** - (*string*) 변경된 객체의 유형: "task" 또는 "link"
- **value** - (*object*) 변경된 task/link 객체 
- **oldValue** - (*object*) 변경되기 전의 task/link 객체

아래 예제를 참고하세요:

**getRedoStack()** 메서드는 3개의 redo 사용자 작업으로 구성된 스택을 반환합니다. 첫 번째와 두 번째 작업은 각각 1개의 명령을 포함하고, 세 번째 작업은 3개의 명령을 가집니다.

### Related API
- [getUndoStack](api/method/getundostack.md)
- [redo](api/method/redo.md)
- [clearRedoStack](api/method/clearredostack.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- 버전 4.0에 추가됨