---
title: "되돌리기 확장"
sidebar_label: "되돌리기 확장"
---

# 되돌리기 확장

*Undo* 객체에는 만든 변경 사항을 되돌리거나 다시 실행할 수 있는 여러 메서드가 있습니다.

Undo 확장 기능에 대한 자세한 내용은 [Undo/Redo Functionality](guides/undo-redo.md) 문서를 참조하십시오.

## 메서드

다음 메서드는 **gantt.ext.undo** 객체를 통해 사용할 수 있습니다:

### Undo() / Redo()

- <span class="submethod">**undo (): void**</span> - 간트 차트에서 이뤄진 변경 사항을 되돌립니다.

~~~js
gantt.ext.undo.undo();
~~~

- <span class="submethod">**redo (): void**</span> - 되돌린 변경 사항을 다시 간트 차트에 적용합니다.

~~~js
gantt.ext.undo.redo();
~~~

### getUndoStack() / getRedoStack()

- <span class="submethod">**getUndoStack (): UndoRedoAction[]**</span> - 저장된 undo 사용자 작업의 스택을 반환합니다.

~~~js
var stack = gantt.ext.undo.getUndoStack();
~~~

- <span class="submethod">**getRedoStack (): UndoRedoAction[]**</span> - 저장된 redo 사용자 작업의 스택을 반환합니다.

~~~js
var stack = gantt.ext.undo.getRedoStack();
~~~

반환된 스택은 undo 사용자 작업의 배열입니다. 각 사용자 작업은 명령의 집합을 포함합니다. 명령은 다음 속성을 가진 객체입니다:

- **_type_** - (*string*) 명령의 유형: "add/remove/update"
- **_entity_** - (*string*) 변경된 객체의 유형: "task" 또는 "link"
- **_value_** - (*object*) 변경된 task/link 객체
- **_oldValue_** - (*object*) 변경 전의 task/link 객체

### setUndoStack() / setRedoStack()

- <span class="submethod">**setUndoStack (stack): void**</span> - 저장된 undo 사용자 동작의 스택을 설정합니다
  - **_stack_** - (*UndoRedoAction[]*) - undo 스택

~~~js
gantt.ext.undo.setUndoStack(stack);
~~~

- <span class="submethod">**setRedoStack (stack): void**</span> - 저장된 redo 사용자 동작의 스택을 설정합니다
  - **_stack_** - (*UndoRedoAction[]*) - redo 스택

~~~js
gantt.ext.undo.setRedoStack(stack);
~~~

### clearUndoStack() / clearRedoStack()

- <span class="submethod">**clearUndoStack (): void**</span> - 저장된 undo 명령의 스택을 지웁니다

~~~js
gantt.ext.undo.clearUndoStack();
~~~

- <span class="submethod">**clearRedoStack (): void**</span> - 저장된 redo 명령의 스택을 지웁니다

~~~js
gantt.ext.undo.clearRedoStack();
~~~

### saveState()

- <span class="submethod">**saveState (id, entityType): boolean**</span> - 변경이 이루어지기 전에 작업(task) 또는 링크(link)의 현재 상태를 저장합니다
    - **_id_** - (*string | number*) - 작업/링크의 ID
    - **_type_** - (*string*) - 첫 번째 인수로 ID가 제공된 항목의 유형

지원 값: "task", "link".

~~~js
gantt.ext.undo.saveState(1, "task");
gantt.ext.undo.saveState(1, "link");
~~~

자세한 내용은 [Undoing/Redoing changes made from code](guides/undo-redo.md#undoingredoingchangesmadefromcode) 문서를 참조하십시오.