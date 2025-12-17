---
sidebar_label: getRedoStack
title: getRedoStack method
description: "저장된 redo 사용자 작업 스택을 제공합니다."
---

# getRedoStack

### Description

@short: 저장된 redo 사용자 작업 스택을 제공합니다.

@signature: getRedoStack: () =\> UndoRedoAction[]

### Returns
- ` stack` - (UndoRedoAction[]) - redo 사용자 작업을 포함하는 배열

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


반환되는 스택은 redo 사용자 작업들로 구성됩니다. 각 작업은 여러 명령어(command)로 이루어져 있습니다. 명령어는 다음 속성을 가진 객체입니다:
 
- **type** - (*string*) 명령어 유형: "add/remove/update"
- **entity** - (*string*) 변경된 객체 종류: "task" 또는 "link"
- **value** - (*object*) 변경 후의 task/link 객체
- **oldValue** - (*object*) 변경 전의 task/link 객체

아래 예제를 참고하세요:

![get_redo_stack](/img/get_redo_stack.png)

**getRedoStack()** 메서드는 3개의 redo 사용자 작업을 포함하는 스택을 반환합니다. 첫 번째와 두 번째 작업은 각각 1개의 명령어를 가지고 있으며, 세 번째 작업은 3개의 명령어를 포함하고 있습니다.

### Related API
- [getUndoStack](api/method/getundostack.md)
- [redo](api/method/redo.md)
- [clearRedoStack](api/method/clearredostack.md)

### Related Guides
- [Undo/Redo 기능](guides/undo-redo.md#gettingthestackofstoredundoredocommands)

### Change log
- 버전 4.0에서 추가됨

