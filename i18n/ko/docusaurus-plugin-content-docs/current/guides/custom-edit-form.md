---
title: "사용자 정의 라이트박스"
sidebar_label: "사용자 정의 라이트박스"
---

# 사용자 정의 라이트박스

## 사용자 정의 라이트박스를 만드는 방법

Gantt용으로 완전히 사용자 정의 라이트박스를 만들고 기본 라이트박스를 그 형태로 대체할 수 있습니다. 이를 수행하는 방법은 두 가지가 있습니다:

1. [`showLightbox()`](api/method/showlightbox.md) 메서드를 재정의하는 방법:

~~~js
gantt.showLightbox = (id) => {
    // code of the custom form
};
~~~  

- `id` - (string/number) - 작업 ID

라이트박스 구현에 도움이 되는 [`hideLightbox()`](api/method/hidelightbox.md) 메서드도 있습니다.

다음과 같이 커스텀 라이트박스를 넣을 HTML 컨테이너 "my-form"을 만들어 보겠습니다:

~~~html
<div id="my-form">
    <label for="description">Task text
        <input type="text" name="description" value="">
    </label>
    <input type="button" name="save" value="Save">
    <input type="button" name="close" value="Close">
    <input type="button" name="delete" value="Delete">
</div>
~~~

그런 다음 커스텀 라이트박스를 만들려면 다음과 유사한 구성으로 사용할 수 있습니다:

~~~js
let currentTaskId = null;

gantt.showLightbox = (id) => {
    currentTaskId = id;
    const task = gantt.getTask(id);

    const form = getForm();
    const descriptionInput = form.querySelector("[name='description']");
    descriptionInput.focus();
    descriptionInput.value = task.text;

    form.style.display = "block";

    form.querySelector("[name='save']").onclick = save;
    form.querySelector("[name='close']").onclick = cancel;
    form.querySelector("[name='delete']").onclick = remove;
};

gantt.hideLightbox = () => {
    getForm().style.display = "";
    currentTaskId = null;
};

function getForm() {
    return document.getElementById("my-form");
}

function save() {
    const task = gantt.getTask(currentTaskId);

    task.text = getForm().querySelector("[name='description']").value;

    if (task.$new) {
        delete task.$new;
        gantt.addTask(task, task.parent);
    } else {
        gantt.updateTask(task.id);
    }

    gantt.hideLightbox();
}

function cancel() {
    const task = gantt.getTask(currentTaskId);

    if (task.$new) {
        gantt.deleteTask(task.id);
    }

    gantt.hideLightbox();
}

function remove() {
    gantt.deleteTask(currentTaskId);
    gantt.hideLightbox();
}
~~~

2. [`onBeforeLightbox`](api/event/onbeforelightbox.md) 이벤트를 사용하는 방법. 이 경우 작업 흐름은 다음과 같습니다:

- 라이트박스가 표시되려 할 때를 감지합니다
- 기본 라이트박스를 차단합니다
- 사용자 정의 양식을 표시하고 작업 데이터를 채웁니다

~~~js
gantt.attachEvent("onBeforeLightbox", (id) => {
    const task = gantt.getTask(id);

    if (task.$new) {
        dhtmlx.confirm({
            text: "Create task?",
            callback: (confirmed) => {
                if (confirmed) {
                    //..apply values
                    delete task.$new;
                    gantt.addTask(task);
                } else {
                    gantt.deleteTask(task.id);
                }
            }
        });

        return false;
    }

    return true;
});
~~~

## 커스텀 양식에서의 동작 처리

사용자가 양식을 저장하면 양식 값을 수동으로 가져와 공용 API를 사용해 해당 작업을 업데이트해야 합니다: [`addTask()`](api/method/addtask.md), [`updateTask()`](api/method/updatetask.md), 및 [`deleteTask()`](api/method/deletetask.md).

참고로 새 작업으로 인해 라이트박스가 트리거되고 예를 들어 'plus' 버튼을 클릭해 생성 중일 때 'Cancel'을 클릭해 작업 생성을 되돌리면 task 객체에 '$new' 속성이 설정됩니다.

다음 예시에서와 같이 라이트박스를 닫는 처리를 할 수 있습니다. 동작 유형은 "save", "cancel" 또는 "delete"이며, "action" 매개변수로 전달됩니다:

~~~js
switch (action) {
    case "save":
        task.text = ""; // 양식에서 값을 적용

        // 새 작업을 추가하거나 기존 작업을 업데이트합니다.
        if (task.$new) {
            delete task.$new;
            gantt.addTask(task, task.parent);
        } else {
            gantt.updateTask(id);
        }

        break;
    case "cancel":
        // 사용자가 새 작업 생성을 취소하면 삭제합니다.
        if (task.$new) {
            gantt.deleteTask(id);
        }

        break;
    case "delete":
        gantt.deleteTask(id);
        break;
}
~~~