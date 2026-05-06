---
title: "Расширение clickDrag"
sidebar_label: "Расширение clickDrag"
---

# Расширение clickDrag

Подробнее об расширении clickDrag можно узнать в статье [Создание/Выбор задач с DnD](guides/advanced-dnd.md).

## Объект конфигурации

Чтобы включить расширенное drag-n-drop, укажите конфигурационный параметр [click_drag](api/config/click_drag.md) и задайте необходимые свойства из списка ниже внутри его объекта: 

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
};
~~~

- <span class="subproperty">**className?**</span> -  (*string*) - устанавливает пользовательский CSS-класс для выбранного элемента
- <span class="subproperty">**viewPort?**</span> - (*HTMLElement*) - элемент, к которому привязывается событие и который используется как область просмотра
- <span class="subproperty">**useRequestAnimationFrame?**</span> - (*boolean*) - определяет, используется ли requestAnimationFrame во время отрисовки
- <span class="submethod">**callback? (startPoint, endPoint, startDate, endDate, tasksBetweenDates, tasksInRows): any**</span> - функция, которая будет вызываться после отпускания кнопки мыши. Принимает 6 параметров:
    - <span class="subproperty">_startPoint?_</span> - (*object*) - объект со следующими атрибутами:
        - <span class="subproperty">_absolute_</span> - (*object*) - координаты левого верхнего угла документа
            - <span class="subproperty">_left_</span> - (*number*) - левая координата
            - <span class="subproperty">_top_</span> - (*number*) - верхняя координата
        - <span class="subproperty">_relative_</span> - (*object*) - координаты левого верхнего элемента, который используется как viewPort
            - <span class="subproperty">_left_</span> - (*number*) - левая координата
            - <span class="subproperty">_top_</span> - (*number*) - верхняя координата
    - <span class="subproperty">_endPoint?_</span> - (*object*) - объект со следующими атрибутами:
        - <span class="subproperty">_absolute_</span> - (*object*) - координаты левого верхнего угла документа
            - <span class="subproperty">_left_</span> - (*number*) - левая координата
            - <span class="subproperty">_top_</span> - (*number*) - верхняя координата
        - <span class="subproperty">_relative_</span> - (*object*) - координаты левого верхнего элемента, который используется как viewPort
            - <span class="subproperty">_left_</span> - (*number*) - левая координата
            - <span class="subproperty">_top_</span> - (*number*) - верхняя координата
    - <span class="subproperty">_startDate?_</span> - (*Date*) - дата, соответствующая стартовой точке
    - <span class="subproperty">_endDate?_</span> - (*Date*) - дата, соответствующая конечной точке
    - <span class="subproperty">_tasksBetweenDates?_</span> - (*Array&lt;Task&gt;*) - массив задач между точками начала и конца по времени
    - <span class="subproperty">_tasksInRows?_</span> - (*Array&lt;Task&gt;*) - массив задач, выбранных между начальной и конечной координатами по вертикали
- <span class="subproperty">**singleRow?**</span> - (*boolean*) - true, чтобы выделение происходило только в одной строке, равной высоте задачи
- <span class="subproperty">**ignore?**</span> - (*string*) - CSS-селектор. Drag-n-drop не будет активировано для элементов, которые соответствуют селектору
- <span class="subproperty">**useKey?**</span> - (*string | boolean*) - если свойство указано, drag-n-drop будет активирован только при нажатии указанной клавиши-модификатора. Поддерживаемые значения: "ctrlKey", "shiftKey", "metaKey", "altKey"
- <span class="submethod">**render? (startPoint, endPoint): any**</span> - функция, которая создает элемент, отображаемый во время перетаскивания. Принимает два параметра:
    - <span class="subproperty">_startPoint?_</span> - (*object*) - объект со следующими атрибутами:
        - <span class="subproperty">_absolute_</span> - (*object*) - координаты левого верхнего угла документа
            - <span class="subproperty">_left_</span> - (*number*) - левая координата
            - <span class="subproperty">_top_</span> - (*number*) - верхняя координата
        - <span class="subproperty">_relative_</span> - (*object*) - координаты левого верхнего элемента, который используется как viewPort
            - <span class="subproperty">_left_</span> - (*number*) - левая координата
            - <span class="subproperty">_top_</span> - (*number*) - верхняя координата
    - <span class="subproperty">_endPoint?_</span> - (*object*) - объект со следующими атрибутами:
        - <span class="subproperty">_absolute_</span> - (*object*) - координаты левого верхнего угла документа
            - <span class="subproperty">_left_</span> - (*number*) - левая координата
            - <span class="subproperty">_top_</span> - (*number*) - верхняя координата
        - <span class="subproperty">_relative_</span> - (*object*) - координаты левого верхнего элемента, который используется как viewPort
            - <span class="subproperty">_left_</span> - (*number*) - левая координата
            - <span class="subproperty">_top_</span> - (*number*) - верхняя координата


## События

Вы можете привязать следующие события к элементу, переданному в качестве viewPort (Gantt.$task_data по умолчанию — часть временной шкалы с задачами):

- onBeforeDrag - вызывается после нажатия кнопки мыши до начала перетаскивания
- onDrag - вызывается каждый раз после начала перетаскивания, но до отпускания кнопки мыши
- onBeforeDragEnd - вызывается после отпускания кнопки мыши, но до удаления отрисованного элемента и до поиска задач, попадающих под выделение
- onDragEnd - вызывается после удаления отрисованного элемента и нахождения задач, попадающих под выделение, но перед вызовом функции обратного вызова (если она задана)