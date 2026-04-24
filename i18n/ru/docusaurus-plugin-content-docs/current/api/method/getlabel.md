---
sidebar_label: getLabel
title: Метод getLabel
description: "возвращает ярлык элемента управления select во всплывающем окне"
---

# getLabel

### Description

@short: Получает ярлык элемента управления select во всплывающем окне lightbox

@signature: getLabel: (property: string, key: string | number) => string

### Parameters

- `property` - (required) *string* - название свойства данных, к которому привязан управляющий элемент
- `key` - (required) *string | number* - идентификатор варианта. Этот параметр сравнивается со свойством данных задачи, чтобы присвоить вариант выпадающего списка к задаче

### Returns
- ` label` - (string) - ярлык элемента управления select во всплывающем окне lightbox

### Example

~~~jsx
gantt.config.lightbox.sections=[
    {name:"custom", type:"select", map_to:"unit_id", options:[
        {key:1, label:"James Smith"}, 
        {key:2, label:"John Williams"}]}
];

const holder2 = gantt.getLabel("unit_id", 2);// ->"John Williams"
~~~

### Details

:::note
Метод применяется только к элементам управления 'select' во всплывающем окне lightbox, чтобы получить ярлык конкретного варианта.
:::