---
sidebar_label: getLightboxSection
title: getLightboxSection method
description: "возвращает объект раздела lightbox"
---

# getLightboxSection

### Description

@short: Возвращает объект раздела lightbox

@signature: getLightboxSection: (name: string | number) =\> LightboxSectionState

### Parameters

- `name` - (required) *string | number* - имя раздела

### Returns
- ` obj` - (LightboxSectionState) - объект раздела

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

The section object contains the following members:

## Properties

- **section** - (*object*) - конфигурационный объект раздела
    - **_id_** - (*string*) - идентификатор раздела
    - **_name_** - (*string*) - имя раздела. Согласно имени, gantt берет метку для раздела из коллекции **locale.labels**. Например, для раздела 'description' метка будет взята как **gantt.locale.labels.section_description**
    - **_height_** - (*number*) - высота раздела
    - **_map_to_** - (*string*) - имя свойства, сопоставленного редактору
    - **_type_** - (*string*) - тип редактора
    - **_focus_** - (*boolean*) - если установить в *true*, соответствующее поле получит фокус при открытии lightbox
- **node** - (*HTMLElement*) - div с телом раздела
- **header** - (*HTMLElement*) - div с заголовком раздела
- **control** - (*HTMLCollection*) - коллекция элементов управления, используемых в разделе


  
## Methods

- **getValue (): any** - возвращает объект с данными раздела
- **setValue (value, valueObject): any** - устанавливает значение(я) для раздела. В качестве параметра метод принимает значение (или объект значений, если раздел содержит несколько контролов), которое нужно установить
    - **_value_** - (*any*) - значение раздела
    - **_valueObject?_** - (*CustomObject*) - необязательный, объект с любыми свойствами