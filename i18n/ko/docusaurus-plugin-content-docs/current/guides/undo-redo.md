---
title: "Undo/Redo 기능"
sidebar_label: "Undo/Redo 기능"
---

# Undo/Redo 기능

dhtmlxGantt 차트는 차트 내에서 이루어진 변경 사항을 되돌리기(Undo) 및 다시 실행(Redo)하는 기능을 지원합니다. 이 기능을 활성화하려면 [gantt.plugins](api/method/plugins.md) 메서드를 사용하여 **undo** 플러그인을 활성화하세요.

~~~js
gantt.plugins({
    undo: true
});
~~~

기본적으로 Undo와 Redo 모두 활성화되어 있습니다. Undo/Redo 동작은 [undo](api/config/undo.md) 및 [redo](api/config/redo.md) 구성 옵션을 통해 관리할 수 있습니다.

Undo와 Redo는 각각 독립적으로 사용할 수 있으며, 아래와 같이 한 가지만 비활성화할 수 있습니다:

~~~js
// 여기서는 Redo만 활성화됨
gantt.config.undo = false;
gantt.config.redo = true;
~~~


[Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)


## Undo/Redo API

Gantt 차트에서 변경 사항을 되돌리려면 [undo](api/method/undo.md) 메서드를 사용하세요:

~~~js
gantt.undo();
~~~

되돌린 변경 사항을 다시 실행하려면 [redo](api/method/redo.md) 메서드를 사용하세요:

~~~js
gantt.redo();
~~~

버전 6.3부터는 **undo()/redo()** 메서드가 **gantt.ext.undo** 객체를 통해서도 접근 가능합니다. 자세한 내용은 [Undo Extension](guides/undo-ext.md) 문서를 참고하세요.

## 저장된 Undo/Redo 작업 스택 가져오기

Gantt 차트에서의 사용자 동작은 명령 객체 배열로 저장됩니다. Gantt는 최근 실행된 명령들의 스택을 유지하며, **undo** 확장 기능이 이러한 명령을 처리하여 역작업을 수행합니다.

Undo 또는 Redo 시, 확장 기능은 가장 최근의 명령 객체를 가져와 적절한 메서드를 실행합니다.

Undo 작업 스택을 가져오려면 [getUndoStack](api/method/getundostack.md) 메서드를 사용하세요:

~~~js
var stack = gantt.getUndoStack();
~~~

Redo 작업 스택을 가져오려면 [getRedoStack](api/method/getredostack.md) 메서드를 사용하세요:

~~~js
var stack = gantt.getRedoStack();
~~~

반환되는 스택은 사용자 동작의 배열입니다. 각 동작은 여러 명령을 포함합니다:

- <span class="subproperty">**UndoRedoAction**</span> - (*object*) - Undo 또는 Redo 동작과 관련된 명령들을 저장
    - **_commands_** - (*UndoRedoCommand[]*) - Undo 또는 Redo 동작에 대한 변경(명령) 배열

각 명령은 다음과 같은 속성을 가진 객체입니다:

- <span class="subproperty">**UndoRedoCommand**</span> - (*object*) - **Task** 또는 **Link** 객체의 초기 및 변경 상태를 저장
    - **_type_** - (*string*) - 명령 유형: "add", "remove", "update"
    - **_entity_** - (*string*) - 변경된 객체 유형: "task" 또는 "link"
    - **_value_** - (*Task | Link*) - 변경된 task 또는 link 객체
    - **_oldValue_** - (*Task | Link*) - 변경 전의 task 또는 link 객체

다음은 예시 설명입니다:

![get_undo_stack](/img/get_undo_stack.png)

**getUndoStack()** 메서드는 2개의 undo 작업이 포함된 스택을 반환합니다. 첫 번째는 3개의 명령을, 두 번째는 1개의 명령을 포함합니다.

버전 6.3부터는 **getUndoStack()/getRedoStack()** 메서드도 **gantt.ext.undo** 객체를 통해 사용할 수 있습니다. 자세한 내용은 [Undo Extension](guides/undo-ext.md) 문서를 참고하세요.

## 저장된 Undo/Redo 명령 스택 비우기

Gantt API의 해당 메서드를 사용하여 Undo/Redo 명령 스택을 비울 수 있습니다.

Undo 스택을 비우려면 [clearUndoStack](api/method/clearundostack.md) 메서드를 사용하세요:

~~~js
gantt.clearUndoStack();
~~~

Redo 스택을 비우려면 [clearRedoStack](api/method/clearredostack.md) 메서드를 사용하세요:

~~~js
gantt.clearRedoStack();
~~~

버전 6.3부터는 **clearUndoStack()/clearRedoStack()** 메서드도 **gantt.ext.undo** 객체를 통해 사용할 수 있습니다. 자세한 내용은 [Undo Extension](guides/undo-ext.md) 문서를 참고하세요.

## 코드에서 이루어진 변경 사항 Undo/Redo 처리

코드로 변경된 내용을 Undo/Redo 하려면 **gantt.ext.undo** 객체의 **undo()/redo()** 메서드와 **saveState()** 메서드를 함께 사용해야 합니다.

Gantt는 코드에서 직접 변경된 사항을 자동으로 추적하지 않으므로, 변경 전 상태를 저장하도록 알려주어야 합니다. 이를 위해 변경 전 **saveState()**를 호출해야 합니다.

또한, Gantt는 업데이트가 완료되었음을 알려주는 신호가 필요하므로 **updateTask()** 또는 **updateLink()**를 호출해야 합니다. 이렇게 하면 이전 상태와 새로운 상태가 undo 스택에 저장됩니다.

예를 들어, 아래 코드는 프로그래밍적으로 변경된 task의 text를 되돌립니다:

~~~js
const undoExtension = gantt.ext.undo;
const task = gantt.getTask(1);

console.log(task.text);
// ->  "task 1";

undoExtension.saveState(task.id, "task"); /*!*/

task.text = "modified"; /*!*/
gantt.updateTask(1); /*!*/

console.log(task.text);
// ->  "modified";

undoExtension.undo();

console.log(task.text);
// ->  "task 1";
~~~

여기서 **saveState()** 메서드는 text가 "modified"로 바뀌기 전의 원래 값 "task 1"을 저장합니다. 그 후 **gantt.ext.undo.undo()**를 호출하면 text가 원래 값으로 되돌아갑니다.

**saveState()**에 대한 자세한 내용은 [Undo Extension](guides/undo-ext.md) 문서를 참고하세요.

## Undo 기능 설정하기

Undo 동작을 맞춤 설정할 수 있는 여러 설정이 있습니다.

[undo_actions](api/config/undo_actions.md) 파라미터를 사용하여 Undo로 처리할 동작을 지정할 수 있습니다:

~~~js
gantt.config.undo_actions = {
    update:"update",
    remove:"remove", // 데이터스토어에서 항목 제거
    add:"add"
};
~~~

Undo 단계의 최대 개수를 지정하려면 [undo_steps](api/config/undo_steps.md) 파라미터를 사용하세요:

~~~js
gantt.config.undo_steps = 10;
~~~

기본적으로 최대 10단계까지 Undo가 가능합니다.

Undo가 적용될 엔터티를 정의하려면 [undo_types](api/config/undo_types.md) 파라미터를 사용하세요:

~~~js
gantt.config.undo_types = {
    link:"link",
    task:"task"
};
~~~

## API 이벤트 목록

Undo/Redo 기능과 관련된 여러 이벤트가 있습니다:

- [onBeforeUndo](api/event/onbeforeundo.md) - [undo](api/method/undo.md) 메서드 실행 전 발생
- [onAfterUndo](api/event/onafterundo.md) - [undo](api/method/undo.md) 메서드 실행 후 발생
- [onBeforeRedo](api/event/onbeforeredo.md) - [redo](api/method/redo.md) 메서드 실행 전 발생
- [onAfterRedo](api/event/onafterredo.md) - [redo](api/method/redo.md) 메서드 실행 후 발생
- [onBeforeRedoStack](api/event/onbeforeredostack.md) - redo 스택에 동작이 추가되기 전 발생
- [onBeforeUndoStack](api/event/onbeforeundostack.md) - undo 스택에 동작이 추가되기 전 발생

