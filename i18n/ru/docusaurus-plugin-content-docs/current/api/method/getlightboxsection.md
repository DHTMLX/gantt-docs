---
sidebar_label: getLightboxSection
title: getLightboxSection method
description: "возвращает объект секции лайтбокса"
---

# getLightboxSection

### Description

@short: Возвращает объект секции лайтбокса

@signature: getLightboxSection: (name: string | number) =\> LightboxSectionState

### Parameters

- `name` - (required) *string | number* -     имя секции

### Returns
- ` obj` - (LightboxSectionState) - объект секции

### Example

~~~jsx
const time = gantt.getLightboxSection('time');
const descr = gantt.getLightboxSection('description');
 
//получение значения
const value = time.getValue();
const value1 = descr.getValue();
 
//обновление значения
descr.setValue('New Task'); //для секций с одним контролом
time.setValue(null,{
    start_date:new Date(2020,03,10), 
    end_date:new Date(2022,03,10), 
    duration:5
}); //для секций с несколькими контролами: первый аргумент - 'null', второй - объект с данными
~~~

### Details

Этот объект секции включает следующие элементы:

## Свойства


- **section** - (*object*) - объект конфигурации секции
    - **_id_** - (*string*) - идентификатор секции
    - **_name_** - (*string*) - имя секции. По этому имени gantt получает label для секции из коллекции **locale.labels**. Например, для секции 'description' label берётся из **gantt.locale.labels.section_description**
    - **_height_** - (*number*) - высота секции
    - **_map_to_** - (*string*) - имя свойства, связанного с редактором
    - **_type_** - (*string*) - тип редактора
    - **_focus_** - (*boolean*) - если true, соответствующее поле будет сфокусировано при открытии лайтбокса
- **node** - (*HTMLElement*) - div элемент, содержащий тело секции
- **header** - (*HTMLElement*) - div элемент, содержащий заголовок секции
- **control** - (*HTMLCollection*) - коллекция контролов, используемых в секции


  
## Методы

- **getValue (): any** - возвращает объект данных секции
- **setValue (value, valueObject): any** - задаёт значение(я) для секции. Принимает значение (или объект с несколькими значениями, если секция содержит несколько контролов)
    - **_value_** - (*any*) - значение для установки в секцию
    - **_valueObject?_** - (*CustomObject*) - необязательный параметр, объект с дополнительными свойствами
