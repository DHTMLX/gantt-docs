---
sidebar_label: autosize
title: autosize config
description: "Автоматически подстраивает размер диаграммы Ганта для отображения всех задач без прокрутки"
---

# autosize

### Description

@short: Автоматически подстраивает размер диаграммы Ганта для отображения всех задач без прокрутки

@signature: autosize: boolean | string

### Example

~~~jsx
gantt.config.autosize = "xy";

gantt.init("gantt_here");
~~~

**Default value:** false

### Details

Настройка 'autosize' управляет тем, будет ли диаграмма Ганта подстраиваться под данные внутри контейнера с использованием внутренних скроллбаров или изменять размер контейнера для отображения всех данных без внутренней прокрутки:

- [пример с размерами div диаграммы Ганта, заданными через CSS](https://snippet.dhtmlx.com/5/b4d4d1b80) - внутренние скроллбары появляются при необходимости
- [пример, где размеры div диаграммы Ганта рассчитываются компонентом](https://snippet.dhtmlx.com/5/c278b3859) - внутренние скроллбары отключены

Если диаграмма Ганта должна вписываться в определённую область на странице, размер контейнера должен управляться вручную:

- autosize должен быть отключен
- ширина и высота div должны задаваться либо через HTML-верстку при использовании адаптивного решения, либо с помощью кастомного кода.

## Прокрутка к скрытым элементам

По умолчанию, Gantt автоматически прокручивается при использовании методов [showTask](api/method/showtask.md) или [showDate](api/method/showdate.md).
Однако, когда **autosize** активен, Gantt расширяет размер контейнера, чтобы сделать элемент видимым на странице, вместо прокрутки к нему.

Универсального решения для этого нет, так как на странице могут быть и другие элементы, требующие прокрутки. Поэтому решение зависит от конкретной страницы или настройки приложения.

В *простом* варианте Gantt может располагаться до или после других элементов, и прокрутка страницы работает корректно.

В *сложном* варианте контейнер Gantt может находиться внутри других контейнеров, которые сами вложены друг в друга. 
В таких случаях необходимо вручную прокручивать только нужные элементы.

Один из способов прокрутить страницу к нужному элементу - использовать метод **element.scrollIntoView**:

~~~js
var attr = gantt.config.task_attribute;
var timelineElement = document.querySelector(".gantt_task_line["+attr+"='"+id+"']");
if(timelineElement)
    timelineElement.scrollIntoView({block:"center"});
~~~

Здесь `id` - это ID задачи, которую нужно показать.

Другой вариант - переопределить метод [showTask](api/method/showtask.md) или [showDate](api/method/showdate.md) Gantt:

~~~js
var showTask = gantt.showTask;

gantt.showTask = function(id){
  showTask.apply(this, [id]);
  var attr = gantt.config.task_attribute;
  var timelineElement = document.querySelector(".gantt_task_line["+attr+"='"+id+"']");
  if(timelineElement)
    timelineElement.scrollIntoView({block:"center"});
};
~~~

Также можно создать кастомную функцию для показа задачи:

~~~js
function showTask(id){
  gantt.showTask(id);
  var attr = gantt.config.task_attribute;
  var timelineElement = document.querySelector(".gantt_task_line["+attr+"='"+id+"']");
    if(timelineElement)
      timelineElement.scrollIntoView({block:"center"});
}
~~~

:::note
Sample: [Прокрутка к указанному элементу](https://snippet.dhtmlx.com/or73u6a5) 
:::

### Related API
- [autosize_min_width](api/config/autosize_min_width.md)

