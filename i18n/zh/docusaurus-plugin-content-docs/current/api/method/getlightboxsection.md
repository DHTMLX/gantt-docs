---
sidebar_label: getLightboxSection
title: getLightboxSection 方法
description: "返回光箱分区的对象"
---

# getLightboxSection

### Description

@short: 返回光箱分区的对象

@signature: getLightboxSection: (name: string | number) =\> LightboxSectionState

### Parameters

- `name` - (required) *string | number* - 该分区的名称

### Returns
- ` obj` - (LightboxSectionState) - 该分区对象

### Example

~~~jsx
const time = gantt.getLightboxSection('time');
const descr = gantt.getLightboxSection('description');
 
//获取值
const value = time.getValue();
const value1 = descr.getValue();
 
//更新值
descr.setValue('New Task'); //适用于只有单个控件的 section
time.setValue(null,{
    start_date:new Date(2020,03,10), 
    end_date:new Date(2022,03,10), 
    duration:5
}); //适用于包含多个控件的 section：第一个参数为 'null'，第二个参数是数据对象
~~~

### Details

该 section 对象包含以下成员:

## Properties

- **section** - (*object*) - 该分区的配置对象
    - **_id_** - (*string*) - 该分区的 id
    - **_name_** - (*string*) - 该分区的名称。根据名称，gantt 会从 **locale.labels** 集合中获取该分区的标签。例如，对于 'description' 分区，标签将被取为 **gantt.locale.labels.section_description**
    - **_height_** - (*number*) - 该分区的高度
    - **_map_to_** - (*string*) - 映射到编辑器的属性名称
    - **_type_** - (*string*) - 编辑器类型
    - **_focus_** - (*boolean*) - 如果设置为 *true*，在打开光箱时相关字段将获得焦点
- **node** - (*HTMLElement*) - 一个包含分区主体的 div
- **header** - (*HTMLElement*) - 一个包含分区头部的 div
- **control** - (*HTMLCollection*) - 分区中使用的控件集合


  
## Methods

- **getValue (): any** - 返回该分区的数据对象
- **setValue (value, valueObject): any** - 为该分区设置值。作为参数，该方法接收一个值（如果分区有多个控件，则为包含各值的对象），需要被设置
    - **_value_** - (*any*) - 该分区的一个值
    - **_valueObject?_** - (*CustomObject*) - 可选，是一个具有任意属性的对象