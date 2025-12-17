---
title: "父任务控件"
sidebar_label: "父任务控件"
---

父任务控件
=====================

该控件提供一个下拉选择框，用于更改任务的父任务。它会加载甘特图中展示的所有任务，并支持应用过滤规则以及自定义选项的显示方式。除此之外，其使用方式与 [Select Control](guides/select.md) 控件相同。

![parent_control](/img/parent_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"}, /*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~


[Parent selector](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)


初始化 
-----------------

要在 lightbox 中包含 **parent** 控件，需完成以下步骤:

1) 在 lightbox 配置中添加一个 section:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
       {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"},   /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~
  
2) 为该 section 定义标签:

~~~js
gantt.locale.labels["section_parent"] = "Parent task";
~~~
  

[Parent selector](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)
  


属性
----------------

以下是 **parent** 控件常用的一些主要属性（完整列表请参见 [这里](api/config/lightbox.md)）:

- **name** - (*string*) section 的名称
- **height** - (*number*) section 的高度
- **map_to** - (*string*) 映射到该 section 的数据属性名
- **type** - (*string*) [section 控件的类型](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) 若设置为 *true*，lightbox 打开时该 section 获得焦点
- **allow_root** - (*boolean*) 若为 "true"，选项列表中会包含将根级作为父任务的选项；需与 **root_label** 配合使用
- **root_label** - (*string*) 根级父任务选项的标签；与 **allow_root** 一起使用
- **filter** - (*function*) [用于筛选下拉选项的过滤函数](guides/parent.md#xuanxiangguolu)。该函数接收任务 id 和任务对象作为参数
- **sort** - (*function*) [用于排序下拉选项的排序函数](guides/parent.md#xuanxiangpaixu)
- **template** - (*function*) 用于自定义下拉选项显示方式的模板函数
  

选项过滤
-----------------------

如需控制 **parent** 控件中显示哪些选项，可使用 **filter** 属性:

**过滤，仅显示第一级任务**
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


**filter** 函数接收两个参数:

- **id**  - (*string, number*) 任务的 id
- **task** - (*object*) 任务对象

返回值:

- *true* 表示该任务会出现在选项列表中
- *false* 表示该任务不会出现在选项列表中


选项排序
------------------

如需对 **parent** 控件中的选项进行排序，可使用 **sort** 属性:

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

**sort** 函数用于比较相邻的两个选项，并返回:

- 1 - 第一个选项排在第二个前面
- -1 - 第二个选项排在第一个前面
- 0 - 两个选项顺序不变

选项模板
-------------------------

如需自定义 **parent** 控件中选项的显示方式，可使用 **template** 属性:

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

**template** 函数接收三个参数: 

- **start** - (*Date*) 事件的开始日期
- **end** - (*Date*) 事件的结束日期
- **ev** - (*object*) 事件对象

返回值为该控件下拉选项的显示内容。


:::note
如果未设置 'template' 属性，选项将根据 [task_text](api/template/task_text.md) 中的模板进行格式化。
:::

