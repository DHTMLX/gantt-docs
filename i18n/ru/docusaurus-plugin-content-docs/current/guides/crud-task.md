--- 
title: "Основные операции с задачами"
sidebar_label: "Основные операции с задачами"
---

# Основные операции с задачами

В этой главе вы узнаете, как выполнять базовые операции с задачами: создавать или удалять задачу, динамически обновлять свойство задачи. 


## Добавление новой задачи

Чтобы добавить новую задачу к диаграмме Gantt, используйте метод [addTask](api/method/addtask.md):

~~~js
var taskId = gantt.addTask({
    id:10,
    text:"Project #1",
    start_date:"02-09-2020",
    duration:28
});
~~~


### Предотвращение добавления задач на определённых уровнях

Очень простой способ предотвратить возможность пользователям добавлять подзадачи к задаче на определённом уровне (или на основе другого условия) — скрыть кнопку 'Add' с помощью CSS.

Вы можете присвоить CSS-класс каждой строке задачи, используя шаблон [grid_row_class](api/template/grid_row_class.md):

~~~js
gantt.templates.grid_row_class = function( start, end, task ){
    if ( task.$level > 1 ){
        return "nested_task"
    }
    return "";
};
~~~

и скрыть кнопку 'Add' для таких строк:

~~~css
.nested_task .gantt_add{
    display: none !important;
}
~~~

[Предопределённая структура проекта](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)


## Обновление свойства задачи

Чтобы динамически обновить свойство объекта задачи, используйте метод [updateTask](api/method/updatetask.md):

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
 
task.text = "Task #10_1";/*!*/ 
gantt.updateTask(10); /*!*/
~~~

Если Data Processor включён, метод [updateTask()](api/method/updatetask.md) приведёт к отправке изменений на сервер. 

После обновления задачи срабатывает событие [onAfterTaskUpdate](api/event/onaftertaskupdate.md). Оно может вызывать другие изменения, например, когда включено автоматическое планирование, Gantt будет автоматически распланировать задачу и всех её последователей. 

Если нужно просто повторно отрисовать изменения, вызовите метод [refreshTask()](api/method/refreshtask.md) вместо [updateTask()](api/method/updatetask.md).

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
 
task.text = "Task #10_1"; 
gantt.refreshTask(10);
~~~


## Перерисовка задач

Чтобы заново отрисовать все задачи в диаграмме Gantt, используйте метод [refreshData](api/method/refreshdata.md):

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
var task2 = gantt.getTask(11);//->{id:11,text:"Task #11",start_date:"05-09-2020",...}
 
task.text = "Task #10_1"; /*!*/ 
task2.text = "Task #11_1";/*!*/ 
gantt.refreshData(); /*!*/ 
~~~


## Удаление задач

Чтобы удалить задачу, используйте метод [deleteTask](api/method/deletetask.md):

~~~js
gantt.deleteTask(taskId);
~~~


## Каскадное удаление вложенных задач

Существует конфигурация [cascade_delete](api/config/cascade_delete.md), которая регулирует процесс удаления задач из Gantt. По умолчанию она установлена в *true*, что означает, что при удалении задачи Gantt отправляет запрос на сервер для каждой вложенной задачи и связи удаляемой задачи.

Если вам не нужно отправлять несколько запросов на сервер, можно просто отключить конфигурацию [cascade_delete](api/config/cascade_delete.md):

~~~js
gantt.config.cascade_delete = false;
~~~

В таком случае Gantt отправит всего один запрос на сервер — на удаление только родительской задачи, тогда как вложенные задачи и связи будут удалены сервером. 

Опция [cascade_delete](api/config/cascade_delete.md) влияет на способ реализации бэкенда. Подробнее в соответствующем разделе статьи Server-side Integration (guides/server-side.md#cascade-deletion).


## Удаление всех задач из диаграммы Gantt

Чтобы очистить диаграмму Gantt от задач, вызовите метод [clearAll](api/method/clearall.md):

~~~js
gantt.clearAll();
~~~