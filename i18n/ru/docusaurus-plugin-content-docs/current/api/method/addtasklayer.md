---
sidebar_label: addTaskLayer
title: addTaskLayer method
description: "отображает дополнительный слой с пользовательскими элементами для задач в области timeline"
---

# addTaskLayer
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Отображает дополнительный слой с пользовательскими элементами для задач в области timeline

@signature: addTaskLayer: (func: AdditionalTaskLayer['TaskLayerRender'] | AdditionalTaskLayer['TaskLayerConfig']) =\> string

### Parameters

- `func` - (required) *TaskLayerRender | TaskLayerConfig* -        функция рендеринга или объект конфигурации

### Returns
- ` layerId` - (string) - DOM-элемент, который будет отображён в слое

### Example

~~~jsx
gantt.init("gantt_here");
gantt.addTaskLayer(function draw_deadline(task) {
    if (task.deadline) {
        var el = document.createElement('div');
        el.className = 'deadline';
        var sizes = gantt.getTaskPosition(task, task.deadline);

        el.style.left = sizes.left + 'px';
        el.style.top = sizes.top + 'px';

        el.setAttribute('title', gantt.templates.task_date(task.deadline));
        return el;
    }
    return false;
});
~~~

### Related samples
- [Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details


Аргумент может быть одного из следующих типов:


- **taskLayerRender (task, timeline, config, viewport): HTMLElement|boolean|void** - функция, которая получает объект задачи и возвращает DOM-элемент для отображения в слое.
    - **_task_** - (*Task*) - объект задачи
    - **_timeline?_** - (*any*) - вид timeline
    - **_config?_** - (*GanttConfigOptions*) - объект конфигурации Gantt
    - **_viewport?_** - (*LayerViewport*) - объект viewport слоя

- **taskLayerConfig** - (*object*) - объект конфигурации дополнительного слоя задач, который включает:
    - **_id?_** - (*string | number*) - необязательный ID слоя
    - **_renderer_** - (*object*) - обязательный объект, отвечающий за рендеринг элементов слоя
        - **_render_** - (*TaskLayerRender*) - функция, возвращающая HTML-элемент для рендеринга
        - **_update?_** - (*Function*): void - необязательная функция для обновления отрендеренных HTML-элементов
            - **_task_** - (*Task*) - объект задачи
            - **_node_** - (*HTMLElement*) - контейнер отрендеренного узла
            - **_timeline?_** - (*any*) - вид timeline
            - **_config?_** - (*GanttConfigOptions*) - объект конфигурации Gantt
            - **_viewport?_** - (*LayerViewport*) - объект viewport слоя
        - **_onrender?_** - (*Function*): void - необязательный коллбек, вызываемый после завершения рендеринга, полезен для рендеринга нативных компонентов (например, с использованием `ReactDOM.render`)
            - **_task_** - (*Task*) - объект задачи
            - **_node_** - (*HTMLElement*) - контейнер отрендеренного узла
            - **_view?_** - (*any*) - ячейка layout, куда добавлен слой (по умолчанию timeline)
        - **_getRectangle?_** - (*Function*): \{ left: number, top: number, height: number, width: number \} | void - необязательная функция, возвращающая координаты прямоугольника viewport
            - **_task_** - (*Task*) - объект задачи
            - **_view?_** - (*any*) - ячейка layout, куда добавлен слой (по умолчанию timeline)
            - **_config?_** - (*GanttConfigOptions*) - объект конфигурации Gantt
            - **_gantt?_** - (*GanttStatic*) - объект Gantt
        - **_getVisibleRange_** - (*Function*): \{start: number, end: number\} | undefined | void - необязательная функция, возвращающая объект видимого диапазона
            - **_gantt?_** - (*GanttStatic*) - объект Gantt
            - **_view?_** - (*any*) - ячейка layout, куда добавлен слой (по умолчанию timeline)
            - **_config?_** - (*GanttConfigOptions*) - объект конфигурации Gantt
            - **_datastore?_** - (*any*) - объект хранилища задач
            - **_viewport?_** - (*LayerViewport*) - объект viewport слоя
    - **_container?_** - (*HTMLElement*) - необязательный контейнер для слоя
    - **_topmost?_** - (*boolean*) - необязательный флаг, если true, элемент будет отображаться поверх задачи
    - **_filter?_** - (*Function*): boolean - необязательная функция, принимающая объект задачи и возвращающая false для пропуска рендеринга этой задачи
        - **_task_** - (*Task*) - объект задачи

  
Viewport слоя включает следующие свойства:

- **viewport** -  (*object*) - объект viewport для слоя
    - **_x_** - (*number*) - левая позиция прямоугольника
    - **_x_end_** - (*number*) - правая позиция прямоугольника
    - **_y_** - (*number*) - верхняя позиция прямоугольника
    - **_y_end_** - (*number*) - нижняя позиция прямоугольника
    - **_width_** - (*number*) - ширина прямоугольника
    - **_height_** - (*number*) - высота прямоугольника


- Учтите, что пользовательские слои будут очищены после следующего вызова [gantt.init](api/method/init.md)
- Также вызов [gantt.resetLayout()](api/method/resetlayout.md) сбрасывает пользовательские слои. Чтобы пользовательские слои оставались видимыми, нужно переопределять **gantt.addTaskLayer** после вызова [resetLayout](api/method/resetlayout.md).

## Умный рендеринг для пользовательских слоёв

[Умный рендеринг](guides/performance.md#smartrendering) направлен на отображение только тех HTML-элементов, которые видны пользователю, избегая отрисовки скрытых за скроллбаром.

Однако с [пользовательскими слоями](guides/baselines.md) Gantt не знает, где именно размещены пользовательские элементы, так как логика их рендеринга полностью контролируется пользователем.

Для решения этой задачи умный рендеринг предполагает, что пользовательский элемент расположен в той же строке, что и связанная с ним задача. Пользовательские элементы добавляются в DOM только когда строки их задач видимы на экране. При этом Gantt игнорирует положение горизонтального скроллбара, поэтому элемент может присутствовать в разметке, но быть невидимым на странице, если он прокручен по горизонтали.

Это обычно работает хорошо, но если у вас много слоёв, вы можете дополнительно оптимизировать рендеринг, предоставив Gantt точные координаты пользовательских элементов.


Для этого используйте параметр *object* метода *addTaskLayer()* и передайте объект **renderer** с такими методами:

- **render** - функция рендеринга
- **getRectangle** - функция, возвращающая координаты пользовательских элементов

~~~js
gantt.addTaskLayer({
    renderer: {
        render: function(task, timeline, viewport){
            ...
            return  HTMLElement
        },
        getRectangle: function(task, view){
            ....
            return {left, top, height, width};
        }
    }
});
~~~

Процесс рендеринга пользовательских элементов работает так:

1\. При изменении положения горизонтального скролла умный рендеринг получает координаты текущей видимой области. <br>
2\. dhtmlxGantt вызывает **getRectangle** для каждой задачи/связи, чтобы получить точные координаты пользовательского элемента. <br>
3\. Если **getRectangle** возвращает null, функция **render** пропускается, и пользовательский элемент не отображается.<br>
4\. Если **getRectangle** возвращает координаты, пересекающиеся с текущим viewport, вызывается функция **render** для отображения пользовательского элемента.<br>

~~~js
gantt.addTaskLayer({
    renderer: {
      render: function draw_planned(task) {
        if (task.planned_start && task.planned_end) {
          var sizes = gantt.getTaskPosition(task,task.planned_start,task.planned_end);
          var el = document.createElement('div');
          el.className = 'baseline';
          el.style.left = sizes.left + 'px';
          el.style.width = sizes.width + 'px';
          el.style.top = sizes.top + gantt.config.task_height + 13 + 'px';
          return el;
        }
        return false;
      },
      // определение getRectangle подключает слой к умному рендерингу
      getRectangle: function(task, view){
        return gantt.getTaskPosition(task, task.planned_start, task.planned_end);
      }
    }
});
~~~

## Рендеринг видимых частей пользовательских элементов

Объект **renderer** в *addTaskLayer()* также поддерживает обновление разметки узла, чтобы показывать только видимую часть пользовательского элемента через метод **update**:

~~~js
gantt.addTaskLayer({
    renderer: {
        render: function(task, timeline, viewport){
            ...
            return  HTMLElement
        },
        update: function(task, node, timeline, viewport){
            ...
            // обновить внутренний HTML узла, чтобы показывать только видимые части
        },
        getRectangle: function(task, view){
            ....
            return {left, top, height, width};
        }
    }
});
~~~

- **update** - позволяет обновлять внутренний HTML пользовательского элемента, например, скрывая части вне видимости и показывая видимые

Метод **update** вызывается после события [onGanttScroll](api/event/onganttscroll.md), предоставляя узел задачи, созданный функцией **render**, и текущий viewport.

## Рендеринг видимых строк задач

Начиная с версии v7.1.8 объект **renderer** поддерживает функцию **getVisibleRange** для указания видимого диапазона строк задач:

~~~js
gantt.addTaskLayer({
    renderer: {
        render: function(task, timeline, viewport){
            ...
            return  HTMLElement
        },
        getVisibleRange: function(){
            ...
            return { 
                  start: indexStart,
                  end: indexEnd
            }
        }
    }
});     
~~~

- **getVisibleRange** - возвращает объект с индексами начала и конца видимых строк задач. Задачи вне этого диапазона не будут иметь дополнительных слоёв.

Если **getVisibleRange** возвращает *false* вместо объекта, Gantt считает, что все задачи видимы и рендерит дополнительные слои для всех.

## Коллбек рендеринга элемента

Объект **renderer** также включает коллбек **onrender**:

~~~js
gantt.addTaskLayer({
    renderer: {
        render: function(task, timeline, viewport){
            ...
            return  HTMLElement
        },
        onrender: function(item, node, view){
            console.log("render", item, node)
        }
    }
});
~~~

Функция **onrender** вызывается каждый раз, когда элемент данных отрисовывается в DOM. Она предоставляет доступ к элементу данных, результату DOM-элементу и виду, который вызвал рендер (grid или timeline).

Этот коллбек можно использовать для модификации DOM-элементов после рендеринга или для инициализации сторонних виджетов внутри отрисованных элементов.

### Related API
- [getTaskPosition](api/method/gettaskposition.md)
- [removeTaskLayer](api/method/removetasklayer.md)
- [layer_attribute](api/config/layer_attribute.md)

### Related Guides
- [Пользовательские элементы в области временной шкалы](guides/baselines.md)
- [Решения](guides/how-to.md#howtoverticallyreordertasksinthetimeline) (объясняет, как вертикально переупорядочить задачи в timeline)

