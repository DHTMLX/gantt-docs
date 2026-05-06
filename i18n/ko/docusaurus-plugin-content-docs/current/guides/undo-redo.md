---
title: "Undo/Redo 기능"
sidebar_label: "Undo/Redo 기능"
---

# Undo/Redo 기능

dhtmlxGantt 차트는 만든 변경 사항을 실행 취소(undo) / 다시 실행(redo)할 수 있도록 해줍니다. 이 기능을 활성화하려면 [gantt.plugins](api/method/plugins.md) 메서드를 사용하여 **undo** 플러그인을 활성화해야 합니다.

~~~js
gantt.plugins({
    undo: true;
});
~~~

기본적으로 Undo와 Redo 기능이 모두 활성화되어 있습니다. Undo/Redo 기능을 제어하려면 [undo](api/config/undo.md) / [redo](api/config/redo.md) 구성 옵션을 활용하세요.

다음 옵션 중 하나를 끄고 두 기능을 개별적으로 사용할 수도 있습니다.

~~~js
// Redo 기능만 활성화되어 있음
gantt.config.undo = false;
gantt.config.redo = true;
~~~

[Undo/Redo 변경 사항 in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)


## Undo/Redo API

Gantt 차트에서 변경 사항을 되돌리려면 [undo](api/method/undo.md) 메서드를 사용합니다:

~~~js
gantt.undo();
~~~

이전에 실행 취소된 변경 사항을 다시 적용하려면 [redo](api/method/redo.md) 메서드를 사용합니다:

~~~js
gantt.redo();
~~~

v6.3부터는 **undo()/redo()** 메서드가 **gantt.ext.undo** 객체에서도 제공됩니다. [Undo Extension](guides/undo-ext.md) 문서를 참조하세요.

## 저장된 Undo/Redo 작업의 스택 가져오기

Gantt 차트의 모든 사용자 작업은 명령 객체 세트를 포함하는 배열 형태로 구현되어 있습니다. Gantt는 가장 최근에 실행된 명령들의 스택을 저장합니다.  
**undo** 확장은 이들로부터 역작업을 만들어 Gantt에서 실행할 수 있습니다.

명령을 Undo 또는 Redo하려고 할 때, 확장은 가장 최근의 명령 객체를 가져와 해당 메서드를 실행합니다.

저장된 Undo 액션의 스택을 얻으려면 [getUndoStack](api/method/getundostack.md) 메서드를 사용하세요:

~~~js
var stack = gantt.getUndoStack();
~~~

저장된 Redo 액션의 스택을 반환하려면 [getRedoStack](api/method/getredostack.md) 메서드를 적용하세요:

~~~js
var stack = gantt.getRedoStack();
~~~

반환된 스택은 사용자 작업의 배열입니다. 각 사용자 작업은 일련의 명령으로 구성된 세트를 포함합니다:

- <span class="subproperty">**UndoRedoAction**</span> - (*object*) - Undo 또는 Redo 액션의 명령을 저장하는 객체
    - **_commands_** - (*UndoRedoCommand[]*) - Undo 또는 Redo 액션의 변경(명령)을 저장하는 배열


명령은 다음 속성들을 갖는 객체입니다:

- <span class="subproperty">**UndoRedoCommand**</span> - (*object*) - 초기 상태와 변경된 상태를 저장하는 **Task** 또는 **Link** 객체의 상태를 나타내는 객체
    - **_type_** - (*string*) - 명령의 유형: "add/remove/update"
    - **_entity_** - (*string*) - 변경된 객체의 유형: "task" 또는 "link"
    - **_value_** - (*Task | Link*) - 변경된 task/link 객체
    - **_oldValue_** - (*Task | Link*) - 변경 전의 task/link 객체


다음 예시를 참고하세요:

![get_undo_stack](/img/get_undo_stack.png)

**getUndoStack()** 메서드는 2개의 Undo 사용자 작업이 있는 스택을 반환합니다. 첫 번째 작업은 3개의 명령을 포함하고, 두 번째 작업은 1개의 명령을 포함합니다.

v6.3부터는 **getUndoStack()/getRedoStack()** 메서드도 **gantt.ext.undo** 객체를 통해 제공됩니다. [Undo Extension](guides/undo-ext.md) 문서를 참조하세요.

## 저장된 Undo/Redo 명령 스택 지우기

Undo/Redo 명령 스택을 지우는 관련 Gantt API가 있습니다.

저장된 Undo 명령 스택을 지우려면 [clearUndoStack](api/method/clearundostack.md) 메서드를 사용하세요:

~~~js
gantt.clearUndoStack();
~~~

저장된 Redo 명령 스택을 지우려면 [clearRedoStack](api/method/clearredostack.md) 메서드를 사용하세요:

~~~js
gantt.clearRedoStack();
~~~

v6.3부터는 **clearUndoStack()/clearRedoStack()** 메서드도 **gantt.ext.undo** 객체를 통해 사용할 수 있습니다. [Undo Extension](guides/undo-ext.md) 문서를 참조하세요.

## 코드에서 수행된 변경의 Undo/Redo

코드에서 수행된 변경을 Undo/Redo하는 것이 가능합니다. 이를 위해서는 **undo()/redo()** 메서드를 **gantt.ext.undo** 객체의 **saveState()** 메서드와 함께 사용해야 합니다.

그 자체로는 Gantt가 코드에 직접 적용된 변경을 추적하지 못합니다. 따라서 코드 변경 전에 Task 또는 Link의 초기 값을 저장되도록 하려면 **saveState()** 메서드를 적용해야 합니다. 이 메서드는 Task를 수정하기 시작하기 전에 호출되어야 합니다.

다만 Gantt는 API를 통해 변경이 끝났는지 자체적으로 식별할 수 없습니다. Task나 Link를 업데이트를 완료했다는 신호를 Gantt에 전달하려면 **updateTask()** 또는 **updateLink()** 메서드를 적용해야 합니다. 그러면 이전 상태와 새로운 상태가 Undo 사용자 작업의 스택에 저장됩니다.

예를 들어, 코드에서 작업의 초기 텍스트를 다른 값으로 재할당한 후 이를 되돌리는 방법은 아래와 같습니다:

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

saveState() 메서드는 id가 1인 Task의 "task 1" 텍스트를 초기 값으로 저장했습니다. 그런 다음 gantt.ext.undo.undo() 메서드는 코드에서 수행된 변경을 시작 값으로 되돌렸습니다.

saveState() 메서드에 대한 자세한 내용은 [Undo Extension](guides/undo-ext.md) 문서를 참조하세요.

## Undo 기능 구성

Undo 동작을 조정하는 데 도움이 되는 몇 가지 설정이 있습니다.

Undo가 적용될 작업을 지정하려면 [undo_actions](api/config/undo_actions.md) 매개변수를 사용하세요:

~~~js
gantt.config.undo_actions = {
    update:"update",
    remove:"remove", // datastore에서 항목 제거
    add:"add"
};
~~~

되돌릴 수 있는 단계의 수를 정의하려면 [undo_steps](api/config/undo_steps.md) 매개변수를 적용하세요:

~~~js
gantt.config.undo_steps = 10;
~~~

기본적으로는 10개의 작업을 Undo할 수 있습니다.

Undo 작업이 적용될 엔티티를 지정하려면 [undo_types](api/config/undo_types.md) 매개변수를 사용할 수 있습니다:

~~~js
gantt.config.undo_types = {
    link:"link",
    task:"task"
};
~~~

## API 이벤트 목록

Undo/Redo 관련 이벤트 목록이 있습니다:

- [onBeforeUndo](api/event/onbeforeundo.md) - [undo](api/method/undo.md) 메서드가 호출되기 전 실행
- [onAfterUndo](api/event/onafterundo.md) - [undo](api/method/undo.md) 메서드가 호출된 후 실행
- [onBeforeRedo](api/event/onbeforeredo.md) - [redo](api/method/redo.md) 메서드가 호출되기 전 실행
- [onAfterRedo](api/event/onafterredo.md) - [redo](api/method/redo.md) 메서드가 호출된 후 실행
- [onBeforeRedoStack](api/event/onbeforeredostack.md) - redo 스택에 액션이 추가되기 전 실행
- [onBeforeUndoStack](api/event/onbeforeundostack.md) - Undo 스택에 액션이 추가되기 전 실행