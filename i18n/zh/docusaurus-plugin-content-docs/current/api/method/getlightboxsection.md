---
sidebar_label: getLightboxSection
title: getLightboxSection method
description: "返回 lightbox 中某个 section 的对象"
---

# getLightboxSection

### Description

@short: 返回 lightbox 中某个 section 的对象

@signature: getLightboxSection: (name: string | number) =\> LightboxSectionState

### Parameters

- `name` - (required) *string | number* -    section 的名称

### Returns
- ` obj` - (LightboxSectionState) - section 对象

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

## 属性

- **section** - (*object*) - section 的配置对象
    - **_id_** - (*string*) - section 的 id
    - **_name_** - (*string*) - section 的名称。gantt 会基于此名称从 **locale.labels** 集合中获取对应的标签。例如，对于 'description' section，标签取自 **gantt.locale.labels.section_description**
    - **_height_** - (*number*) - section 的高度
    - **_map_to_** - (*string*) - 绑定到编辑器的属性名
    - **_type_** - (*string*) - 编辑器的类型
    - **_focus_** - (*boolean*) - 若为 true，当 lightbox 打开时该字段将获得焦点
- **node** - (*HTMLElement*) - 包含 section 内容的 div 元素
- **header** - (*HTMLElement*) - 包含 section 头部的 div 元素
- **control** - (*HTMLCollection*) - section 中使用的控件集合

## 方法

- **getValue (): any** - 返回 section 的数据对象
- **setValue (value, valueObject): any** - 给 section 赋值。参数可以是单个值，也可以是包含多个值的对象（当 section 包含多个控件时）
    - **_value_** - (*any*) - 要设置的值
    - **_valueObject?_** - (*CustomObject*) - 可选，包含额外属性的对象
