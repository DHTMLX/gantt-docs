---
sidebar_label: getLabel
title: getLabel method
description: "получает label элемента select внутри lightbox"
---

# getLabel

### Description

@short: Получает label элемента select внутри lightbox

@signature: getLabel: (property: string, key: string | number) =\> string

### Parameters

- `property` - (required) *string* - имя свойства данных, к которому относится элемент управления
- `key` - (required) *string | number* -     идентификатор опции. Это значение сопоставляется с данными задачи для <br> связывания опции select с задачей

### Returns
- ` label` - (string) - label, связанный с элементом select в lightbox

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

Этот метод работает исключительно с элементами 'select' в lightbox для получения label для заданной опции.
 
:::

<br>
