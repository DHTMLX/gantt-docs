---
sidebar_label: onBeforeLightbox
title: onBeforeLightbox event
description: "срабатывает непосредственно перед открытием lightbox (формы редактирования)"
---

# onBeforeLightbox

### Description

@short: Срабатывает непосредственно перед открытием lightbox (формы редактирования)

@signature: onBeforeLightbox: (id: string | number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи

### Returns
- ` result` - (boolean) - определяет, должно ли стандартное действие события выполняться (<b>true</b>) или быть остановлено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLightbox", function(id) {
      const task = gantt.getTask(id);
       task.my_template = `<span id='title1'>Holders: </span>${task.users}
    <span id='title2'>Progress: </span>${task.progress*100}%`;
    return true;
});
~~~

### Related samples
- [Template control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/05_template.html)
- [Custom button in the lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)

### Details

- Это событие можно заблокировать. Возврат *false* предотвратит открытие lightbox.
- Удобный способ внести пользовательские изменения в lightbox перед его появлением.
