---
title: "Настраиваемый Lightbox"
sidebar_label: "Настраиваемый Lightbox"
---

# Настраиваемый Lightbox

## Способы создания настраиваемого Lightbox

Вы можете создать полностью настраиваемый Lightbox для Gantt и заменить им стандартный. Есть два возможных способа сделать это:

1. Переопределив метод [`showLightbox()`](api/method/showlightbox.md):

~~~js
gantt.showLightbox = (id) => {
    // code of the custom form
};
~~~

- `id` - (string/number) - идентификатор задачи

Есть также метод [`hideLightbox()`](api/method/hidelightbox.md), который поможет в реализации Lightbox.

Давайте создадим HTML-контейнер "my-form", в который поместим настраиваемый Lightbox:

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

Затем, чтобы создать настраиваемый Lightbox, можно использовать конфигурацию, подобную следующей:

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

2. Используйте событие [`onBeforeLightbox`](api/event/onbeforelightbox.md). В этом случае алгоритм действий следующий:

- определить момент, когда Lightbox будет показан
- заблокировать Lightbox по умолчанию
- показать пользовательскую форму и заполнить данные задачи

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

## Обработка действий в пользовательской форме

Когда пользователь сохраняет форму, вам нужно вручную получить значения формы и обновить соответствующую задачу с использованием публичного API: [`addTask()`](api/method/addtask.md), [`updateTask()`](api/method/updatetask.md) и [`deleteTask()`](api/method/deletetask.md).

Обратите внимание, что когда Lightbox вызывается для новой задачи, например, при нажатии кнопки 'плюс', и она должна быть удалена, если пользователь нажимает 'Cancel' для отмены создания задачи, объект задачи будет иметь установленное свойство '$new'.

Вы можете обработать закрытие Lightbox, как показано в примере ниже. Тип действия, "save", "cancel" или "delete", передается как параметр "action":

~~~js
switch (action) {
    case "save":
        task.text = ""; // apply values from form

        // Add a new task or update an existing one.
        if (task.$new) {
            delete task.$new;
            gantt.addTask(task, task.parent);
        } else {
            gantt.updateTask(id);
        }

        break;
    case "cancel":
        // If the user cancels creation of a new task, delete it.
        if (task.$new) {
            gantt.deleteTask(id);
        }

        break;
    case "delete":
        gantt.deleteTask(id);
        break;
}
~~~