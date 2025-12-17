---
title: "Undo Extension"
sidebar_label: "Undo Extension"
---

Undo Extension
=================

*Undo* 객체는 이미 적용된 변경 사항을 실행 취소(undo)하거나 다시 실행(redo)할 수 있는 다양한 메서드를 제공합니다. 


Undo 확장에 대한 자세한 내용은 [Undo/Redo 기능](guides/undo-redo.md) 문서를 참고하세요.

메서드
----------

**gantt.ext.undo** 객체는 다음과 같은 메서드를 제공합니다:

### Undo() / Redo() 

- <span class="submethod">**undo (): void**</span> - gantt에서 적용된 변경 사항을 되돌립니다.

~~~js
gantt.ext.undo.undo();
~~~

- <span class="submethod">**redo (): void**</span> - 이전에 실행 취소된 변경 사항을 다시 적용합니다.

~~~js
gantt.ext.undo.redo();
~~~

### getUndoStack() / getRedoStack() 

- <span class="submethod">**getUndoStack (): UndoRedoAction[]**</span> - 사용자가 실행 취소한 작업의 스택을 반환합니다.

~~~js
var stack = gantt.ext.undo.getUndoStack();
~~~

- <span class="submethod">**getRedoStack (): UndoRedoAction[]**</span> - 다시 실행할 수 있는 작업의 스택을 반환합니다.

~~~js
var stack = gantt.ext.undo.getRedoStack();
~~~

반환되는 스택은 실행 취소/다시 실행 작업의 배열입니다. 각 작업은 여러 개의 명령을 포함할 수 있습니다. 명령(command)은 아래와 같은 속성을 가진 객체입니다:
 
- **_type_** - (*string*) 명령의 유형을 지정합니다: "add", "remove", 또는 "update"
- **_entity_** - (*string*) 변경된 객체의 종류를 나타냅니다: "task" 또는 "link"
- **_value_** - (*object*) 변경 후의 task 또는 link 객체
- **_oldValue_** - (*object*) 변경 전의 task 또는 link 객체

### setUndoStack() / setRedoStack()

- <span class="submethod">**setUndoStack (stack): void**</span> - 실행 취소 작업의 스택을 지정합니다.
  - **_stack_** - (*UndoRedoAction[]*) - 설정할 undo 스택

~~~js
gantt.ext.undo.setUndoStack(stack);
~~~

- <span class="submethod">**setRedoStack (stack): void**</span> - 다시 실행 작업의 스택을 지정합니다.
  - **_stack_** - (*UndoRedoAction[]*) - 설정할 redo 스택

~~~js
gantt.ext.undo.setRedoStack(stack);
~~~

### clearUndoStack() / clearRedoStack()

- <span class="submethod">**clearUndoStack (): void**</span> - 실행 취소 명령 스택을 비웁니다.

~~~js
gantt.ext.undo.clearUndoStack();
~~~

- <span class="submethod">**clearRedoStack (): void**</span> - 다시 실행 명령 스택을 비웁니다.

~~~js
gantt.ext.undo.clearRedoStack();
~~~

### saveState()

- <span class="submethod">**saveState (id, entityType): boolean**</span> - 변경이 발생하기 전에 task 또는 link의 현재 상태를 저장합니다.
    - **_id_** - (*string | number*) - task 또는 link의 식별자
    - **_type_** - (*string*) - id에 해당하는 엔트리 타입을 지정합니다. 지원되는 값은 "task" 또는 "link"입니다.

~~~js
gantt.ext.undo.saveState(1, "task");
gantt.ext.undo.saveState(1, "link");
~~~

자세한 내용은 [Undoing/Redoing changes made from code](guides/undo-redo.md#undoingredoingchangesmadefromcode) 문서에서 확인할 수 있습니다.
