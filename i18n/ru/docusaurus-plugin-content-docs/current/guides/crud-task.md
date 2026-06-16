---
title: "Основные операции с задачами"
sidebar_label: "Основные операции с задачами"
---

# Основные операции с задачами

В этой главе вы изучите, как выполнять базовые операции с задачами: создавать или удалять задачу и динамически обновлять её свойство.

## Добавление новой задачи

Чтобы добавить новую задачу в диаграмму Gantt, используйте метод [`addTask()`](api/method/addtask.md):

~~~js
const taskId = gantt.addTask({
    id: 10,
    text: "Project #1",
    start_date: "2027-09-02",
    duration: 28
});
~~~

### Предотвращение добавления задач на определённых уровнях

Простой способ запретить пользователям добавлять подзадачи к задаче на определённом уровне или на основе другого условия — скрыть кнопку «Добавить» с помощью CSS.

Вы можете назначить CSS-класс для каждой строки задачи, используя шаблон [`grid_row_class`](api/template/grid_row_class.md):

~~~js
gantt.templates.grid_row_class = (start, end, task) => {
    if (task.$level > 1) {
        return "nested_task";
    }
    return "";
};
~~~

и скрыть кнопку «Добавить» для таких строк:

~~~css
.nested_task .gantt_add {
    display: none !important;
}
~~~

[Структура проекта по умолчанию](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)

## Обновление свойства задачи

Чтобы динамически обновить свойство объекта задачи, используйте метод [`updateTask()`](api/method/updatetask.md):

~~~js {3-4}
const task = gantt.getTask(10); // -> { id: 10, text: "Task #10", start_date: "2027-09-02", ... }

task.text = "Task #10_1";
gantt.updateTask(10);
~~~

Если включён Data Processor, метод [`updateTask()`](api/method/updatetask.md) будет передавать изменения на сервер.

После обновления задачи срабатывает событие [`onAfterTaskUpdate`](api/event/onaftertaskupdate.md). Оно может вызвать другие изменения. Например, при включённом автоматическом планировании Gantt автоматически распланирует задачу и всех её последователей.

Если нужно просто повторно отрисовать изменения, вызывайте метод [`refreshTask()`](api/method/refreshtask.md) вместо [`updateTask()`](api/method/updatetask.md).

~~~js
const task = gantt.getTask(10); // -> { id: 10, text: "Task #10", start_date: "2027-09-02", ... }

task.text = "Task #10_1";
gantt.refreshTask(10);
~~~

## Перерисовка задач

Чтобы перерисовать все задачи на диаграмме Gantt, используйте метод [`refreshData()`](api/method/refreshdata.md):

~~~js {4-6}
const firstTask = gantt.getTask(10); // -> { id: 10, text: "Task #10", start_date: "2027-09-02", ... }
const secondTask = gantt.getTask(11); // -> { id: 11, text: "Task #11", start_date: "2027-09-05", ... }

firstTask.text = "Task #10_1";
secondTask.text = "Task #11_1";
gantt.refreshData();
~~~

## Удаление задач

Чтобы удалить задачу, используйте метод [`deleteTask()`](api/method/deletetask.md):

~~~js
gantt.deleteTask(taskId);
~~~

## Каскадное удаление вложенных задач

Существует конфигурация [cascade_delete](api/config/cascade_delete.md), которая регулирует процесс удаления задач из Gantt. По умолчанию она установлена в true,
что означает, что при удалении задачи Gantt отправляет запрос на сервер для каждой вложенной задачи и каждой связи удаляемой задачи.

Если вам не нужно отправлять несколько запросов на сервер, можно просто отключить конфигурацию [cascade_delete](api/config/cascade_delete.md):

~~~js
gantt.config.cascade_delete = false;
~~~

В таком случае Gantt отправит на сервер только один запрос для удаления родительской задачи, тогда как вложенные задачи и связи будут удалаться сервером.

Опция [cascade_delete](api/config/cascade_delete.md) влияет на способ реализации бэкенда. Подробнее читайте в
соответствующем разделе статьи Server-side Integration: cascade deletion.

## Удаление всех задач из диаграммы Gantt

Чтобы очистить диаграмму Gantt от задач, вызовите метод [`clearAll()`](api/method/clearall.md):

~~~js
gantt.clearAll();
~~~