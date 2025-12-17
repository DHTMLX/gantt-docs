---
sidebar_label: getUndoStack
title: getUndoStack method
description: "사용자가 수행한 undo 작업들의 스택을 제공합니다"
---

# getUndoStack

### Description

@short: 사용자가 수행한 undo 작업들의 스택을 제공합니다

@signature: getUndoStack: () =\> UndoRedoAction[]

### Returns
- ` stack` - (UndoRedoAction[]) - undo 사용자 작업들을 포함하는 배열

### Example

~~~jsx
var stack = gantt.getUndoStack();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 이 메서드는 **undo** 확장의 일부로, [undo](guides/extensions-list.md#undo) 플러그인이 활성화되어 있어야 합니다. 자세한 내용은 [Undo/Redo 기능](guides/undo-redo.md) 문서를 참고하세요. 
:::


반환되는 스택은 undo 사용자 작업들로 구성되며, 각 작업은 여러 명령(command)으로 이루어져 있습니다. 명령은 다음 속성을 가진 객체입니다:
 
- **type** - (*string*) 명령 유형: "add/remove/update"
- **entity** - (*string*) 변경된 객체 유형: "task" 또는 "link"
- **value** - (*object*) 변경 후의 task 또는 link 객체
- **oldValue** - (*object*) 변경 전의 task 또는 link 객체

아래는 예시 이미지입니다:

![get_undo_stack](/img/get_undo_stack.png)

**getUndoStack()** 메서드는 2개의 undo 사용자 작업이 포함된 스택을 반환합니다. 첫 번째 작업은 3개의 명령을, 두 번째 작업은 1개의 명령을 포함하고 있습니다.

### Related API
- [getRedoStack](api/method/getredostack.md)
- [undo](api/method/undo.md)
- [clearUndoStack](api/method/clearundostack.md)

### Related Guides
- [Undo/Redo 기능](guides/undo-redo.md#gettingthestackofstoredundoredocommands)

### Change log
- 버전 4.0에 추가됨

