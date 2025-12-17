---
title: "Базовые операции с задачами"
sidebar_label: "Базовые операции с задачами"
---

Базовые операции с задачами
========================================

В этой главе рассматривается, как выполнять основные операции с задачами: создание, удаление и динамическое обновление свойств задачи.


Добавление новой задачи
----------------------------

Чтобы добавить новую задачу в Gantt, используйте метод [addTask](api/method/addtask.md):

~~~js
var taskId = gantt.addTask({
    id:10,
    text:"Project #1",
    start_date:"02-09-2020",
    duration:28
});
~~~

### Предотвращение добавления задач на определённые уровни

Простой способ запретить пользователям добавлять подзадачи к задачам определённого уровня (или по другим критериям) - скрыть кнопку 'Add' с помощью CSS.

Вы можете назначить CSS-класс каждой строке грида с помощью шаблона [grid_row_class](api/template/grid_row_class.md):

~~~js
gantt.templates.grid_row_class = function( start, end, task ){
    if ( task.$level > 1 ){
        return "nested_task"
    }
    return "";
};
~~~

Затем скройте кнопку 'Add' для этих строк:

~~~css
.nested_task .gantt_add{
    display: none !important;
}
~~~

[Predefined Project Structure](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)


Обновление свойства задачи
------------------------------

Чтобы оперативно обновить свойство объекта задачи, используйте метод [updateTask](api/method/updatetask.md):

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
 
task.text = "Task #10_1";/*!*/ 
gantt.updateTask(10); /*!*/
~~~

Когда включён Data Processor, вызов [updateTask()](api/method/updatetask.md) отправит изменения на сервер.

После обновления задачи срабатывает событие [onAfterTaskUpdate](api/event/onaftertaskupdate.md). Это может привести к другим обновлениям, например, к автоматическому пересчёту задачи и её последователей, если эта функция включена.

Если требуется только визуальное обновление без отправки данных на сервер, используйте метод [refreshTask()](api/method/refreshtask.md) вместо [updateTask()](api/method/updatetask.md):

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
 
task.text = "Task #10_1"; 
gantt.refreshTask(10);
~~~

Перерисовка задач
----------------------

Чтобы перерисовать все задачи в Gantt, используйте метод [refreshData](api/method/refreshdata.md):

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
var task2 = gantt.getTask(11);//->{id:11,text:"Task #11",start_date:"05-09-2020",...}
 
task.text = "Task #10_1"; /*!*/ 
task2.text = "Task #11_1";/*!*/ 
gantt.refreshData(); /*!*/ 
~~~

Удаление задач
-------------------------------

Чтобы удалить задачу, используйте метод [deleteTask](api/method/deletetask.md):

~~~js
gantt.deleteTask(taskId);
~~~

Каскадное удаление вложенных задач
---------------------------

Параметр [cascade_delete](api/config/cascade_delete.md) управляет тем, как происходит удаление задач. По умолчанию он установлен в *true*, то есть при удалении задачи отправляются запросы на сервер для каждой вложенной задачи и связи, связанной с ней.

Если не требуется отправлять несколько запросов, отключите опцию [cascade_delete](api/config/cascade_delete.md):

~~~js
gantt.config.cascade_delete = false;
~~~

С этим параметром Gantt отправляет только один запрос на удаление родительской задачи, а сервер обрабатывает удаление вложенных задач и связей.

Эта опция влияет на реализацию на сервере. Подробнее см. в 
[соответствующем разделе статьи по серверной интеграции](guides/server-side.md#cascadedeletion).

Удаление всех задач из Gantt
-------------------------------------------

Чтобы очистить все задачи из Gantt, вызовите метод [clearAll](api/method/clearall.md):

~~~js
gantt.clearAll();
~~~

