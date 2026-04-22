---
title: "Обработка событий"
sidebar_label: "Обработка событий"
---

# Обработка событий

События помогают взаимодействовать с пользователями и добавлять интерактивность на страницу.

Когда пользователь выполняет какое-либо действие в диаграмме Gantt, dhtmlxGantt вызывает событие. Вы можете использовать это событие для определения действия и выполнения нужного кода.

## Подключение обработчиков событий

Чтобы подключить обработчик события, используйте метод [`attachEvent()`](api/method/attachevent.md).

~~~js
gantt.attachEvent("onTaskClick", (id, e) => {
    alert(`Вы только что кликнули по элементу с id=${id}`);
});
~~~

**Связанный пример**: [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)


**Примечание:**

- Названия событий не чувствительны к регистру.
- Вы можете привязать несколько обработчиков к одному и тому же событию.

## Отключение обработчиков

Чтобы отключить обработчик события, используйте метод [`detachEvent()`](api/method/detachevent.md):

~~~jsx {6} title="Общий способ подключения/отключения обработчика события"
// чтобы подключить обработчик
const eventId = gantt.attachEvent("onTaskClick", (id, e) => {
    alert(`Вы только что кликнули по элементу с id=${id}`);
});
// чтобы отключить обработчик
gantt.detachEvent(eventId);
~~~

Чтобы отключить все обработчики сразу, можно использовать следующую логику:

~~~js {13}
// сохраняем идентификаторы обработчиков при подключении событий
const eventIds = [];

// подключаем обработчики
eventIds.push(gantt.attachEvent("onTaskClick", (id, e) => {
    alert(`Вы только что кликнули по элементу с id=${id}`);
}));
eventIds.push(gantt.attachEvent("onTaskDblClick", (id, e) => {
    alert(`Вы дважды кликнули по элементу с id=${id}`);
}));

// отключаем все сохраненные события
while (eventIds.length) {
    gantt.detachEvent(eventIds.pop());
}
~~~

## Проверка существования обработчика

Чтобы проверить, прикреплены ли к конкретному событию какие-либо обработчики, используйте метод [`checkEvent()`](api/method/checkevent.md):

~~~js {5}
gantt.attachEvent("onTaskClick", (id, e) => {
    alert(`Вы кликнули по задаче с id=${id}`);
});

gantt.checkEvent("onTaskClick"); // возвращает 'true'
~~~

## Отменяемые события

Все события с префиксом 'onBefore' можно отменить.

Чтобы отменить некоторое событие, верните **false** из соответствующего обработчика события.

~~~jsx {6} title="Отмена обработчика события"
gantt.attachEvent("onBeforeTaskChanged", (id, mode, oldTask) => {
    const task = gantt.getTask(id);
    if (mode === gantt.config.drag_mode.progress) {
        if (task.progress < oldTask.progress) {
            dhtmlx.message(`${task.text} прогресс не может быть отменен!`);
            return false;
        }
    }
    return true;
});
~~~

**Связанный пример**: [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

## Доступ к объекту gantt внутри обработчика

Внутри обработчика события вы можете ссылаться на объект gantt через ключевое слово `this`.

~~~jsx title="Обращение внутри обработчика события"
gantt.attachEvent("onTaskClick", function(id, e) {
    const parentId = this.getTask(id).parent;
});
~~~