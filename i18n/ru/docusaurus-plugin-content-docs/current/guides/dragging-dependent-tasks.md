---
title: "Перемещение задач вместе с их зависимыми задачами"
sidebar_label: "Перемещение задач вместе с их зависимыми задачами"
---

# Перемещение задач вместе с их зависимыми задачами

Существует несколько способов реализации перемещения задач вместе с зависимыми задачами.

## Использование расширения Auto Scheduling

Во‑первых, вы можете воспользоваться расширением [Auto Scheduling](guides/auto-scheduling.md).
Оно позволяет автоматически планировать задачи в зависимости от связей между ними.

Чтобы использовать функциональность авто-планирования, следует включить её с помощью метода [gantt.plugins](api/method/plugins.md):

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

И установить свойство **auto_scheduling** в значение true:

~~~js
gantt.config.auto_scheduling = true;
~~~

## Перемещение задач вручную

### Содержание главы

- [Получение всех связанных задач](#linked_tasks)
- [Перемещение потомков синхронно с основной задачей](#sync)
- [Перемещение потомков после завершения перемещения основной задачи](#after)


### Основная идея
Общий подход к перемещению зависимых задач следующий:

- вы фиксируете момент, когда задача перемещается;
- вы перебираете все зависимые задачи и перемещаете их на ту же величину (или другую, в зависимости от того, что вам нужно).

Таким образом, можно выбрать один из двух способов:

- [Перемещение потомков синхронно с основной задачей](#sync)
- [Перемещение потомков после завершения перемещения основной задачи](#after)

В обоих случаях сначала необходимо получить все связанные задачи.


### Получение всех связанных задач {#linked_tasks}

Чтобы получить связанные ссылки задачи, используйте свойства **$source** и **$target** объекта задачи.
Эти свойства генерируются автоматически и сохраняют идентификаторы связанных ссылок:

- $source - ссылка, которая исходит из задачи;
- $target - ссылка, которая входит в задачу.

~~~js
var taskObj = gantt.getTask("t1");
 
var sourceLinks = taskObj.$source;        //-> ["l1","l4"] - ids of coming-out links  
var targetLinks = taskObj.$target;       //-> ["l5","l8"] - ids of coming-into links
~~~

и из связей можно получить зависимые задачи.

Итак, чтобы получить связанные задачи, нужно объявить итератор:

~~~js
gantt.eachSuccessor = function(callback, root){
  if(!this.isTaskExists(root))
    return;
  
  // запоминаем задачи, по которым уже прошли, чтобы избежать бесконечных циклов
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
        
        // обходим всю ветку целиком, не только зависимости первого уровня
        this.eachSuccessor(callback, link.target, traversedTasks);
      }
    }
  }
};
~~~


### Перемещение потомков синхронно с основной задачей {#sync}

Потомки можно перемещать синхронно с перемещаемыми основными задачами, т.е. когда пользователь начинает перемещать задачи, все зависимые ветви будут перемещаться вместе. Это будет выглядеть корректно, однако недостатком может стать снижение производительности, если перемещать много задач одновременно.


#### Шаг 1

Сначала объявите итератор, как показано выше в разделе [Получение всех связанных задач](#linked_tasks).

#### Шаг 2

Затем необходимо привязать обработчик к событию [onTaskDrag](api/event/ontaskdrag.md). Оно будет вызываться на каждом кадре перетаскивания, и отсюда мы будем перемещать все связанные задачи.

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

Наконец, когда пользователь отпускает мышь и перетаскивание завершено, нужно привести к масштабу позиции дочерних элементов. Это можно сделать с использованием события [onAfterTaskDrag](api/event/onaftertaskdrag.md):

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

Этот подход работает нормально, если у вас не слишком много связанных задач.


### Перемещение потомков после завершения перемещения основной задачи {#after}

Потомки можно обновлять после того, как пользователь завершил перемещение основной задачи. Результат будет выглядеть проще, но производительность будет выше.

Подход таков: когда перетаскивание завершено, мы выясняем величину смещения задачи, и перемещаем все связанные задачи на ту же величину.

#### Шаг 1

Сначала объявите итератор, как показано ранее в разделе [Получение всех связанных задач](#linked_tasks).

#### Шаг 2

Когда пользователь отпускает мышь и перетаскивание завершено, можно перехватить событие [onBeforeTaskChanged](api/event/onbeforetaskchanged.md), где доступны и изменённый, и оригинальный экземпляры перемещаемой задачи, и вычислить разницу дат между ними.

:::note
Замечание: на этом этапе перетаскивание может быть отменено (поскольку onBeforeTaskChanged позволяет отменить его, и ваше приложение может иметь обработчики, которые могут это сделать),
поэтому на этом шаге мы не модифицируем зависимые задачи.
:::

Вместо этого сохраним вычисленное значение diff в переменной в той же области видимости, чтобы можно было обратиться к нему позже.

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

Наконец, перехватываем событие [onAfterTaskDrag](api/event/onaftertaskdrag.md), которое сообщает, что перетаскивание выполнено. На этом этапе можно обновить все зависимые задачи, используя *diff*, вычисленное на предыдущем шаге:

~~~js
//округляет позиции дочерних элементов под масштаб
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

Полный код будет выглядеть следующим образом:

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
  
  //округляет позиции дочерних элементов под масштаб
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