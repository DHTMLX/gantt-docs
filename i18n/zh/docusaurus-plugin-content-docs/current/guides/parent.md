---
title: "父任务选择控件"
sidebar_label: "父任务选择控件"
---

# 父任务选择控件

一个用于更改任务父级的下拉框控件。该控件会加载甘特图中显示的所有任务，但你可以设置过滤规则和可显示值的模板。其他方面与 [Select Control](guides/select.md) 相同。

![parent_control](/img/parent_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"}, /*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

[Parent selector](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)

## 初始化

要在 lightbox 中添加 **parent** 控件，请执行以下步骤：

1) 向 lightbox 配置中添加一个段：

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
       {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"},   /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

2) 为该段设置标签：

~~~js
gantt.locale.labels["section_parent"] = "Parent task";
~~~

[Parent selector](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)

## 属性

以下属性对 **parent** 控件最为重要且常被设置（完整列表请参阅 [这里](api/config/lightbox.md)）：

- **name** - (*string*) 该段的名称
- **height** - (*number*) 段的高度
- **map_to** - (*string*) 将映射到该段的数据属性名
- **type** - (*string*) [该段控件的类型](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) 如果设置为 true，打开 lightbox 时该段将获得焦点
- **allow_root** - (*boolean*) 如果设置为 "true"，选项列表将包含一个额外的选项，允许用户将根级别设为任务的父级。与 **root_label** 属性配合使用
- **root_label** - (*string*) 为根级父级设置标签。与 **allow_root** 属性配合使用
- **filter** - (*function*) 为下拉选项设置筛选函数（参见 [选项筛选](guides/parent.md#options-filtering)）。接收任务 id 和任务对象作为参数
- **sort** - (*function*) 为下拉选项设置排序函数（参见 [选项排序](guides/parent.md#options-sorting)）
- **template** - (*function*) 为下拉选项设置模板

## 选项过滤

若要过滤在 **parent** 控件中展示的选项，请使用 **filter** 属性：

**过滤：仅显示第一级任务**
~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent",  filter:function(id, task){ /*!*/
         if(task.$level > 1){         /*!*/
            return false;     /*!*/
        }else{  /*!*/
            return true; /*!*/
        } /*!*/
    }},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

[Parent selector](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)

**filter** 属性定义一个接收 2 个参数的筛选函数：

- **id**  - (*string, number*) 任务的 id
- **task** - (*object*) 任务对象

并返回：

- true，表示应显示该任务
- false，表示应从选项列表中移除该任务


## 选项排序

要对在 **parent** 控件中显示的选项进行排序，请使用 **sort** 属性：

**按标题长度对任务排序**
~~~js
function sortByLength(a,b){
    a = a.text.length();
    b = b.text.length();
    return a>b?1:(a<b?-1:0);
};
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent",  sort:sortByLength}, /*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

**sort** 属性为每对相邻的值调用一个排序函数，返回 1、-1 或 0：

- 1 - 第一对中前面的对象应在第二对象前面
- -1 - 第二个对象应在第一个对象前面
- 0 - 两个对象的顺序不变


## 选项模板

要设置 **parent** 控件中选项的模板，请使用 **template** 属性：

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent",  template(start,end,ev){/*!*/
        var title = ev.id+"."+ev.text;/*!*/
        return title;/*!*/
    }}, /*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

**template** 属性设置一个接收 3 个参数的函数：

- **start** - (*Date*) 事件计划开始的日期
- **end** - (*Date*) 事件计划完成的日期
- **ev** - (*object*) 事件对象

并返回控件中选项的模板。

:::note
如果未指定 'template' 属性，选项的格式将由 [task_text](api/template/task_text.md) 模板定义。
:::