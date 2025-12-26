---
title: "Перетаскивание задач вместе с их зависимыми задачами"
sidebar_label: "Перетаскивание задач вместе с их зависимыми задачами"
---

# Перетаскивание задач вместе с их зависимыми задачами

Существует несколько способов перемещения задач вместе с их зависимыми задачами.

## Использование расширения Auto Scheduling

Один из вариантов - использовать расширение [Автоматическое планирование](guides/auto-scheduling.md). Оно автоматически планирует задачи на основе их связей.

Чтобы включить авто-планирование, используйте метод [gantt.plugins](api/method/plugins.md):

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

Также установите свойство **auto_scheduling** в значение true:

~~~js
gantt.config.auto_scheduling = true;
~~~

## Ручное перемещение задач

### Содержание главы

- [Получение всех связанных задач](#linked_tasks)
- [Синхронное перемещение потомков вместе с основной задачей](#sync)
- [Перемещение потомков после завершения перемещения основной задачи](#after)


### Основная идея
Обычный способ перетаскивания зависимых задач:

- определить момент начала перемещения задачи
- найти все зависимые задачи и переместить их на такое же (или скорректированное) количество времени

Вы можете выбрать один из двух подходов:

- [синхронное перемещение потомков вместе с основной задачей](#sync)
- [перемещение потомков после завершения перемещения основной задачи](#after)

В любом случае, первым шагом будет получение всех связанных задач.


### Получение всех связанных задач {#linked_tasks}

Чтобы найти связи, связанные с задачей, используйте свойства **$source** и **$target** объекта задачи.
Они автоматически создаются и содержат идентификаторы связанных связей:

- $source - связи, исходящие из задачи
- $target - связи, входящие в задачу

~~~js
var taskObj = gantt.getTask("t1");
 
var sourceLinks = taskObj.$source;        //-> ["l1","l4"] - id исходящих связей  
var targetLinks = taskObj.$target;       //-> ["l5","l8"] - id входящих связей
~~~

Используя эти связи, вы можете найти зависимые задачи.

Чтобы собрать все связанные задачи, определите итератор следующим образом:

~~~js
gantt.eachSuccessor = function(callback, root){
  if(!this.isTaskExists(root))
    return;
  
  // отслеживаем посещённые задачи, чтобы избежать бесконечных циклов
  var traversedTasks = arguments[2] || {};
  if(traversedTasks[root])
    return;
  traversedTasks[root] = true;
  
  var rootTask = this.getTask(root);
  var links = rootTask.$source;
  if(links){
    for(var i="0;" i < links.length; i++){
      var link = this.getLink(links[i]);
      if(this.isTaskExists(link.target) && !traversedTasks[link.target]){
        callback.call(this, this.getTask(link.target));
        
        // обходим всю ветку зависимостей, а не только первый уровень
        this.eachSuccessor(callback, link.target, traversedTasks);
      }
    }
  }
};
~~~


### Синхронное перемещение потомков вместе с основной задачей {#sync}

Потомки могут перемещаться вместе с основной задачей во время её перетаскивания. То есть, когда пользователь двигает основную задачу, все зависимые задачи перемещаются одновременно. Это выглядит плавно, но может снизить производительность при большом количестве задач.

#### Шаг 1

Сначала объявите итератор, как показано выше в разделе [Получение всех связанных задач](#linked_tasks).

#### Шаг 2

Далее, добавьте обработчик на событие [onTaskDrag](api/event/ontaskdrag.md). Это событие возникает на каждом кадре перетаскивания, и здесь вы можете перемещать все связанные задачи.

~~~js
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
  var modes = gantt.config.drag_mode;
  if(mode == modes.move){
    var diff = task.start_date - original.start_date;
    gantt.eachSuccessor(function(child){
      child.start_date = new Date(+child.start_date + diff);
      child.end_date = new Date(+child.end_date + diff);
      gantt.refreshTask(child.id, true);
    },id );
  }
  return true;
});
~~~

#### Шаг 3

Наконец, когда перетаскивание завершено и пользователь отпускает мышь, округлите позиции дочерних задач по шкале. Это можно сделать с помощью события [onAfterTaskDrag](api/event/onaftertaskdrag.md):

~~~js
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
  var modes = gantt.config.drag_mode;
  if(mode == modes.move ){
    gantt.eachSuccessor(function(child){
      child.start_date = gantt.roundDate(child.start_date);
      child.end_date = gantt.calculateEndDate(child.start_date, child.duration);
      gantt.updateTask(child.id);
    },id );
  }
});
~~~

Этот способ хорошо работает, если у вас не слишком много связанных задач.


### Перемещение потомков после завершения перемещения основной задачи {#after}

В качестве альтернативы, потомки можно обновлять только после того, как основная задача была перемещена. Такой подход проще визуально и обеспечивает лучшую производительность.

Идея заключается в том, чтобы дождаться завершения drag and drop, затем вычислить, насколько была перемещена основная задача, и сместить все связанные задачи на это значение.

#### Шаг 1

Сначала объявите итератор, как показано ранее в разделе [Получение всех связанных задач](#linked_tasks).

#### Шаг 2

Когда пользователь завершает перетаскивание, зафиксируйте событие [onBeforeTaskChanged](api/event/onbeforetaskchanged.md). Это событие предоставляет как оригинальную, так и изменённую версии перемещённой задачи, что позволяет вычислить разницу в датах.

:::note
Обратите внимание, что на этом этапе drag-and-drop всё ещё может быть отменён (так как onBeforeTaskChanged поддерживает отмену, и в вашем приложении могут быть обработчики, которые это делают), поэтому зависимые задачи здесь не обновляются.
:::

Вместо этого сохраните вычисленную разницу в переменной, доступной позже.

~~~js
var diff = 0;

gantt.attachEvent("onBeforeTaskChanged", function(id, mode, originalTask){
  var modes = gantt.config.drag_mode;
  if(mode == modes.move ){
    var modifiedTask = gantt.getTask(id);
    diff = modifiedTask.start_date - originalTask.start_date;
  }
  return true;
});
~~~

#### Шаг 3

Наконец, используйте событие [onAfterTaskDrag](api/event/onaftertaskdrag.md) для обновления всех зависимых задач с использованием ранее вычисленного *diff*:

~~~js
// округляет позиции дочерних элементов по шкале
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move ){
      gantt.eachSuccessor(function(child){
        child.start_date = gantt.roundDate(new Date(child.start_date.valueOf() + diff));
        child.end_date = gantt.calculateEndDate(child.start_date, child.duration);
        gantt.updateTask(child.id);
      },id );
    }
});
~~~

Вот полный код:

~~~js
(function(){
  
  var diff = 0;
  
  gantt.attachEvent("onBeforeTaskChanged", function(id, mode, originalTask){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move ){
      var modifiedTask = gantt.getTask(id);
      diff = modifiedTask.start_date - originalTask.start_date;
    }
    return true;
  });
  
  // округляет позиции дочерних элементов по шкале
  gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move ){
      gantt.eachSuccessor(function(child){
        child.start_date = gantt.roundDate(new Date(child.start_date.valueOf() + diff));
        child.end_date = gantt.calculateEndDate(child.start_date, child.duration);
        gantt.updateTask(child.id);
      },id );
    }
  });
})();
~~~

