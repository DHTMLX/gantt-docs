---
title: "clickDrag Расширение"
sidebar_label: "clickDrag Расширение"
---

# clickDrag Расширение


Более подробную информацию о расширении clickDrag можно найти в статье [Создание/Выделение задач с помощью DnD](guides/advanced-dnd.md).

## Объект конфигурации


Чтобы включить расширенные функции drag-and-drop, установите опцию конфигурации [click_drag](api/config/click_drag.md) и добавьте нужные свойства из списка ниже в данный объект:

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
};
~~~

- <span class="subproperty">**className?**</span> -  (*string*) - применяет пользовательский CSS-класс к выбранному элементу
- <span class="subproperty">**viewPort?**</span> - (*HTMLElement*) - элемент, на который будет навешено событие и в котором происходит выделение
- <span class="subproperty">**useRequestAnimationFrame?**</span> - (*boolean*) - определяет, используется ли requestAnimationFrame во время рендеринга
- <span class="submethod">**callback? (startPoint, endPoint, startDate, endDate, tasksBetweenDates, tasksInRows): any**</span> - функция, вызываемая при отпускании кнопки мыши. Принимает 6 параметров:
    - **_startPoint?_** - (*object*) - содержит следующие свойства:
        - **_absolute_** - (*object*) - координаты относительно левого верхнего угла документа
            - **_left_** - (*number*) - горизонтальная позиция
            - **_top_** - (*number*) - вертикальная позиция
        - **_relative_** - (*object*) - координаты относительно левого верхнего угла элемента viewPort
            - **_left_** - (*number*) - горизонтальная позиция
            - **_top_** - (*number*) - вертикальная позиция
    - **_endPoint?_** - (*object*) - структура аналогична startPoint и представляет конечную позицию drag'а
        - **_absolute_** - (*object*) - координаты относительно левого верхнего угла документа
            - **_left_** - (*number*) - горизонтальная позиция
            - **_top_** - (*number*) - вертикальная позиция
        - **_relative_** - (*object*) - координаты относительно элемента viewPort
            - **_left_** - (*number*) - горизонтальная позиция
            - **_top_** - (*number*) - вертикальная позиция
    - **_startDate?_** - (*Date*) - дата, соответствующая startPoint
    - **_endDate?_** - (*Date*) - дата, соответствующая endPoint
    - **_tasksBetweenDates?_** - (*Array&lt;Task&gt;*) - задачи, попадающие между начальной и конечной датой
    - **_tasksInRows?_** - (*Array&lt;Task&gt;*) - задачи, выделенные вертикально между стартовыми и конечными координатами
- <span class="subproperty">**singleRow?**</span> - (*boolean*) - если true, выделение ограничено одной строкой по высоте задачи
- <span class="subproperty">**ignore?**</span> - (*string*) - CSS-селектор для элементов, которые не должны активировать drag-and-drop
- <span class="subproperty">**useKey?**</span> - (*string | boolean*) - drag-and-drop активируется только при удерживании указанной клавиши-модификатора. Поддерживаемые клавиши: "ctrlKey", "shiftKey", "metaKey", "altKey"
- <span class="submethod">**render? (startPoint, endPoint): any**</span> - функция, возвращающая элемент, отображаемый во время перетаскивания. Принимает два параметра:
    - **_startPoint?_** - (*object*) - включает:
        - **_absolute_** - (*object*) - координаты относительно левого верхнего угла документа
            - **_left_** - (*number*) - горизонтальная позиция
            - **_top_** - (*number*) - вертикальная позиция
        - **_relative_** - (*object*) - координаты относительно элемента viewPort
            - **_left_** - (*number*) - горизонтальная позиция
            - **_top_** - (*number*) - вертикальная позиция
    - **_endPoint?_** - (*object*) - структура аналогична startPoint, представляет текущую позицию drag'а
        - **_absolute_** - (*object*) - координаты относительно документа
            - **_left_** - (*number*) - горизонтальная позиция
            - **_top_** - (*number*) - вертикальная позиция
        - **_relative_** - (*object*) - координаты относительно элемента viewPort
            - **_left_** - (*number*) - горизонтальная позиция
            - **_top_** - (*number*) - вертикальная позиция


## События


Следующие события могут быть привязаны к элементу, используемому как viewPort (по умолчанию gantt.$task_data, то есть область временной шкалы, содержащая бары задач):

- **onBeforeDrag** - срабатывает сразу после нажатия кнопки мыши, до начала перетаскивания
- **onDrag** - срабатывает многократно во время перетаскивания, до отпускания кнопки мыши
- **onBeforeDragEnd** - срабатывает после отпускания кнопки мыши, но до удаления элемента рендера drag'а и определения задач в выделенной области
- **onDragEnd** - срабатывает после удаления элемента drag'а и нахождения задач в выделении, но до вызова callback-функции (если она задана)

