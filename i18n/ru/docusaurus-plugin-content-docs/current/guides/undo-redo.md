---
title: "Отмена и повтор изменений (Undo/Redo)"
sidebar_label: "Отмена и повтор изменений (Undo/Redo)"
---

# Отмена и повтор изменений (Undo/Redo)

Gantt-диаграмма dhtmlxGantt поддерживает отмену и повтор изменений, внесённых в диаграмму. Для активации этой функции включите плагин **undo** с помощью метода [gantt.plugins](api/method/plugins.md).

~~~js
gantt.plugins({
    undo: true
});
~~~

По умолчанию Undo и Redo включены. Управлять поведением Undo/Redo можно с помощью параметров конфигурации [undo](api/config/undo.md) и [redo](api/config/redo.md).

Undo и Redo также могут использоваться отдельно, если отключить одну из функций:

~~~js
// здесь включён только Redo
gantt.config.undo = false;
gantt.config.redo = true;
~~~


[Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)


## API Undo/Redo

Для отмены изменений, сделанных в Gantt, используйте метод [undo](api/method/undo.md):

~~~js
gantt.undo();
~~~

Для повтора отменённых изменений используйте метод [redo](api/method/redo.md):

~~~js
gantt.redo();
~~~

Начиная с версии 6.3, методы **undo()/redo()** также доступны через объект **gantt.ext.undo**. Подробнее см. в статье [Undo Extension](guides/undo-ext.md).

## Получение стека сохранённых действий Undo/Redo

Действия пользователя в Gantt сохраняются в виде массивов, содержащих объекты команд. Gantt хранит стек последних выполненных команд. Расширение **undo** обрабатывает эти команды для выполнения обратных операций.

При отмене или повторе изменений расширение берёт последний объект команды и выполняет соответствующий метод.

Для получения стека действий отмены используйте метод [getUndoStack](api/method/getundostack.md):

~~~js
var stack = gantt.getUndoStack();
~~~

Для получения стека действий повтора используйте метод [getRedoStack](api/method/getredostack.md):

~~~js
var stack = gantt.getRedoStack();
~~~

Возвращаемый стек - это массив пользовательских действий. Каждое действие содержит набор команд:

- <span class="subproperty">**UndoRedoAction**</span> - (*object*) - хранит команды, связанные с действием Undo или Redo
    - **_commands_** - (*UndoRedoCommand[]*) - массив изменений (команд) для действия Undo или Redo.

Каждая команда - это объект со следующими свойствами:

- <span class="subproperty">**UndoRedoCommand**</span> - (*object*) - содержит исходное и изменённое состояние объектов **Task** или **Link**:
    - **_type_** - (*string*) - тип команды: "add", "remove" или "update"
    - **_entity_** - (*string*) - тип изменённого объекта: "task" или "link"
    - **_value_** - (*Task | Link*) - изменённый объект задачи или связи
    - **_oldValue_** - (*Task | Link*) - объект задачи или связи до изменения

Пример иллюстрации:

![get_undo_stack](/img/get_undo_stack.png)

Метод **getUndoStack()** возвращает стек из 2 действий отмены. Первое содержит 3 команды, второе - 1 команду.

Начиная с версии 6.3, методы **getUndoStack()/getRedoStack()** также доступны через объект **gantt.ext.undo**. Подробнее см. в статье [Undo Extension](guides/undo-ext.md).

## Очистка стека сохранённых команд Undo/Redo

Очистить стеки команд Undo/Redo можно с помощью соответствующих методов API Gantt.

Для очистки стека undo используйте метод [clearUndoStack](api/method/clearundostack.md):

~~~js
gantt.clearUndoStack();
~~~

Для очистки стека redo используйте метод [clearRedoStack](api/method/clearredostack.md):

~~~js
gantt.clearRedoStack();
~~~

Начиная с версии 6.3, методы **clearUndoStack()/clearRedoStack()** также доступны через объект **gantt.ext.undo**. Подробнее - в статье [Undo Extension](guides/undo-ext.md).

## Отмена/повтор изменений, внесённых из кода

Отменять или повторять изменения, внесённые программно, можно, комбинируя методы **undo()/redo()** с методом **saveState()** из объекта **gantt.ext.undo**.

Поскольку Gantt не отслеживает изменения, внесённые напрямую в коде, ему необходимо явно указать сохранить предыдущее состояние перед модификацией. Для этого вызывается **saveState()** перед изменением задачи или связи.

Также Gantt требуется сигнал о завершении обновлений - это делается через вызов **updateTask()** или **updateLink()**. Таким образом, предыдущее и новое состояния сохраняются в стеке undo.

Например, следующий код возвращает текст задачи после его программного изменения:

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

Здесь метод **saveState()** сохраняет исходный текст "task 1" до изменения его на "modified". Затем вызов **gantt.ext.undo.undo()** возвращает текст к исходному значению.

Подробнее о **saveState()** см. в статье [Undo Extension](guides/undo-ext.md).

## Настройка функциональности Undo

Существует несколько настроек для кастомизации работы Undo.

Используйте параметр [undo_actions](api/config/undo_actions.md), чтобы указать, какие действия будет обрабатывать Undo:

~~~js
gantt.config.undo_actions = {
    update:"update",
    remove:"remove", // удаление элемента из хранилища данных
    add:"add"
};
~~~

Для задания количества доступных шагов отмены используйте параметр [undo_steps](api/config/undo_steps.md):

~~~js
gantt.config.undo_steps = 10;
~~~

По умолчанию можно отменить до 10 действий.

Также можно определить, к каким сущностям применяется Undo, с помощью параметра [undo_types](api/config/undo_types.md):

~~~js
gantt.config.undo_types = {
    link:"link",
    task:"task"
};
~~~


## Список событий API

Существует несколько событий, связанных с функциональностью Undo/Redo:

- [onBeforeUndo](api/event/onbeforeundo.md) - срабатывает перед выполнением метода [undo](api/method/undo.md)
- [onAfterUndo](api/event/onafterundo.md) - срабатывает после выполнения метода [undo](api/method/undo.md)
- [onBeforeRedo](api/event/onbeforeredo.md) - срабатывает перед выполнением метода [redo](api/method/redo.md)
- [onAfterRedo](api/event/onafterredo.md) - срабатывает после выполнения метода [redo](api/method/redo.md)
- [onBeforeRedoStack](api/event/onbeforeredostack.md) - срабатывает перед добавлением действия в стек redo
- [onBeforeUndoStack](api/event/onbeforeundostack.md) - срабатывает перед добавлением действия в стек undo

