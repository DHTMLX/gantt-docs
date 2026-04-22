---
title: "Отмена и повтор изменений (Undo/Redo)"
sidebar_label: "Отмена и повтор изменений (Undo/Redo)"
---

# Функциональность Undo/Redo

dhtmlxGantt Chart позволяет отменять/повторять сделанные изменения. Чтобы включить эту функциональность, необходимо включить плагин **undo** с помощью метода [gantt.plugins](api/method/plugins.md).

~~~js
gantt.plugins({
    undo: true
});
~~~

По умолчанию включены обе функции Undo и Redo. Чтобы управлять функциональностью Undo/Redo, используйте конфигурационные параметры [undo](api/config/undo.md) / [redo](api/config/redo.md). 

Вы можете использовать Undo и Redo по отдельности, отключив одну из опций:

~~~js
// just the Redo functionality is enabled
gantt.config.undo = false;
gantt.config.redo = true;
~~~


[Изменения Undo/Redo в Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)


## API Undo/Redo


Чтобы отменить сделанные в диаграмме Ганта изменения, используйте метод [undo](api/method/undo.md):

~~~js
gantt.undo();
~~~

Чтобы повторно применить ранее отменённые изменения, используйте метод [redo](api/method/redo.md):

~~~js
gantt.redo();
~~~

Начиная с версии v6.3 методы **undo()/redo()** также доступны через объект **gantt.ext.undo**. См. статью [Расширение Undo](guides/undo-ext.md).

## Получение стека сохранённых действий Undo/Redo


Все действия пользователя в диаграмме Ганта реализованы как массивы, содержащие наборы объектов-команд. Gantt хранит стек недавно выполненных команд.
Расширение **undo** может выполнять обратные операции над ними и исполнять их в Gantt. 

Когда нужно отменить или повторить команду, расширение берёт самый последний объект команды и выполняет соответствующий метод.

Чтобы получить стек сохранённых действий Undo, используйте метод [getUndoStack](api/method/getundostack.md):

~~~js
var stack = gantt.getUndoStack();
~~~

Чтобы вернуть стек сохранённых действий Redo, применяйте метод [getRedoStack](api/method/getredostack.md):

~~~js
var stack = gantt.getRedoStack();
~~~

Возвращаемый стек представляет собой массив действий пользователя. Каждое действие содержит набор команд:

- <span class="subproperty">**UndoRedoAction**</span> - (*object*) - объект, который хранит команды действия Undo или Redo
    - **_commands_** - (*UndoRedoCommand[]*) - массив, который хранит изменения (команды) действия Undo или Redo


Команда — это объект со следующими атрибутами:

- <span class="subproperty">**UndoRedoCommand**</span> - (*object*) - объект, который хранит исходное и обновлённое состояние объектов **Task** или **Link**:
    - **_type_** - (*string*) - тип команды: "add/remove/update"
    - **_entity_** - (*string*) - тип изменённого объекта: "task" или "link"
    - **_value_** - (*Task | Link*) - изменённый объект задачи/ссылки
    - **_oldValue_** - (*Task | Link*) - исходный объект задачи/ссылки до изменений


Посмотрите пример ниже:

![get_undo_stack](/img/get_undo_stack.png)

Метод **getUndoStack()** возвращает стек из 2 действий Undo. Первое действие содержит 3 команды, второе — 1 команду.

Начиная с версии v6.3 методы **getUndoStack()/getRedoStack()** также доступны через объект **gantt.ext.undo**. См. статью [Расширение Undo](guides/undo-ext.md). 

## Очистка стека сохранённых команд Undo/Redo


Существует возможность очистить стек Undo/Redo команд через соответствующий API Gantt. 

Чтобы очистить стек сохранённых команд Undo, используйте метод [clearUndoStack](api/method/clearundostack.md):

~~~js
gantt.clearUndoStack();
~~~

Чтобы очистить стек сохранённых команд Redo, используйте метод [clearRedoStack](api/method/clearredostack.md):

~~~js
gantt.clearRedoStack();
~~~

Начиная с версии v6.3 методы **clearUndoStack()/clearRedoStack()** также доступны через объект **gantt.ext.undo**. См. статью [Расширение Undo](guides/undo-ext.md).

## Отмена/Повтор изменений, сделанных в коде {#undoingredoingchangesmadefromcode}

Можно отменять/повторять изменения, сделанные в вашем коде. Для этого нужно использовать методы **undo()/redo()** в сочетании с методом **saveState()** объекта **gantt.ext.undo**. 

Сам по себе Gantt не отслеживает изменения, которые вы вносите напрямую в код. Поэтому Gantt не может сохранить предыдущее состояние задачи/ссылки. Чтобы указать Gantt сохранить исходное значение задачи/ссылки до внесения изменений в код, необходимо применить метод **saveState()**. Метод следует вызывать до того, как вы начнёте изменять задачу.

Однако Gantt не может самостоятельно определить, когда вы закончите вносить изменения через API. Чтобы сообщить Gantt, что обновления задачи или ссылки завершены, нужно применить методы **updateTask()** или **updateLink()**. Тогда предыдущее и новое состояния будут сохранены в стек действий Undo.

Например, вот как можно вернуть исходный текст задачи после того, как он был переназначен в коде на другое значение:

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

Метод **saveState()** сохранил текст задачи "task 1" задачи с id = 1 до того, как он был обновлён текстом "modified". Затем метод **gantt.ext.undo.undo()** откатил изменения, внесённые в код, к начальному значению. 

Подробности о методе **saveState()** смотрите в статьe [Расширение Undo](guides/undo-ext.md).

## Настройка функциональности Undo


Существует несколько настроек, которые помогают подстроить операцию Undo.

Чтобы указать действия, к которым будет применяться Undo, используйте параметр [undo_actions](api/config/undo_actions.md):

~~~js
gantt.config.undo_actions = {
    update:"update",
    remove:"remove", // remove an item from the datastore
    add:"add"
};
~~~

Чтобы определить, сколько шагов можно вернуть, применяйте параметр [undo_steps](api/config/undo_steps.md):

~~~js
gantt.config.undo_steps = 10;
~~~

По умолчанию можно отменить 10 действий.

Вы также можете указать сущности, к которым будет применяться операция Undo, в параметре [undo_types](api/config/undo_types.md):

~~~js
gantt.config.undo_types = {
    link:"link",
    task:"task"
};
~~~


## Список API-событий


Существует набор полезных событий, связанных с Undo/Redo:

- [onBeforeUndo](api/event/onbeforeundo.md) - срабатывает перед вызовом метода [undo](api/method/undo.md)
- [onAfterUndo](api/event/onafterundo.md) - срабатывает после вызова метода [undo](api/method/undo.md)
- [onBeforeRedo](api/event/onbeforeredo.md) - срабатывает перед вызовом метода [redo](api/method/redo.md)
- [onAfterRedo](api/event/onafterredo.md) - срабатывает после вызова метода [redo](api/method/redo.md)
- [onBeforeRedoStack](api/event/onbeforeredostack.md) - срабатывает перед добавлением действия в стек redo
- [onBeforeUndoStack](api/event/onbeforeundostack.md) - срабатывает перед добавлением действия в стек undo