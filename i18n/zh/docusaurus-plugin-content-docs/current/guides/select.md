--- 
title: "选择控件" 
sidebar_label: "选择控件" 
---

# 选择控件

一个下拉列表框。

![select_control](/img/select_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", height:22, map_to:"priority", type:"select", options: [ /*!*/
        {key:1, label: "High"},                                               /*!*/
        {key:2, label: "Normal"},                                             /*!*/
        {key:3, label: "Low"}                                                 /*!*/
     ]},                                                                      /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];

gantt.locale.labels.section_priority = "Priority";
~~~

[选择控件](https://docs.dhtmlx.com/gantt/samples/05_lightbox/12_select.html)

## 初始化

要将 **select** 控件添加到 lightbox，请按以下步骤：

1) 向 lightbox 配置中添加一个部分：

~~~js
var opts = [
    {key:1, label: "High"},                                            
    {key:2, label: "Normal"},                                         
    {key:3, label: "Low"}                                            
];

gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
    {name:"priority", height:22, map_to:"priority",type:"select",options:opts},      /*!*/                                                                 
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~


2) 为该部分设置标签：

~~~js
gantt.locale.labels.section_priority = "Priority";
~~~

[选择控件](https://docs.dhtmlx.com/gantt/samples/05_lightbox/12_select.html)

## 属性

以下属性对 **select** 控件最为重要且常用，请参阅完整列表 [此处](api/config/lightbox.md)：

- **name** - (*string*) 该部分名称
- **height** - (*number*) 该部分高度
- **map_to** - (*string*) 将映射到该部分的数据属性的名称
- **type** - (*string*) [section control](guides/default-edit-form.md#lightboxcontrols) 的类型
- **focus** - (*boolean*) 如果设置为 *true*，打开 lightbox 时该部分将获得焦点
- **options** - (*array*) 一个对象数组。定义控件的选择选项（用于 **select**, **checkbox** 和 **radio** 控件）。数组中的每个对象指定一个选项，并具有以下属性：
    - **key** - (*string*) 选项 id。此属性将与任务数据属性进行比较，以将选项分配给任务
    - **label** - (*string*) 选项标签
- **default_value** - (*any*) 该部分控件的默认值。仅在输入值为 underfined 时应用
- **onchange** - (*function*) 指定该部分控件的 ['onChange' 事件处理函数](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) 用于该部分控件 


## 用数据填充控件

通常，要为 **select** 控件设置值，请使用 [options](api/config/lightbox.md) 参数：

~~~js
gantt.config.lightbox.sections = [
    { name:"priority",height:22, map_to:"priority",type:"select",
      options: [ 
        {key:1, label: "High"},                                               
        {key:2, label: "Normal"},                                             
        {key:3, label: "Low"}                                                
    ]}                                                                    
];
~~~


[options] 参数中的项有两个必需属性：

- **key** - 选项 id
- **label** - 选项标签


## 用服务器的数据填充控件

要从服务器填充控件，请将 [options](api/config/lightbox.md) 选项设置为由 [serverList](api/method/serverlist.md) 方法返回的值：

~~~js
gantt.config.lightbox.sections = [
    {name:"description", ...},
    { name:"priority",map_to:"priority",type:"select",
        options:gantt.serverList("priority")}, /*!*/
    {name:"category", map_to:"category", type:"select", 
        options:gantt.serverList("category")}, /*!*/
    {name:"time", ...}
];
gantt.init("gantt_here");
gantt.load("/data");
~~~

**/data** 接口返回的数据格式如下:

~~~js
{
  "tasks":[
    {"id":1,"text":"Project #2","start_date":"01-04-2020","duration":18,"parent":0},
    {"id":2,"text":"Task #1","start_date":"02-04-2020","duration":8,"parent":1},
    {"id":3,"text":"Task #2","start_date":"11-04-2020","duration":8,"parent":1}
  ],
  "links":[
    {"id":1,"source":1,"target":2,"type":"1"},
    {"id":2,"source":2,"target":3,"type":"0"}
  ],
  "collections": { /*!*/
    "priority":[
        {"value":"1","label":"Low"},
        {"value":"2","label":"Medium"},
        {"value":"3","label":"High"}
    ],
    "category":[
        {"value":"1","label":"Simple"},
        {"value":"2","label":"Complex"},
        {"value":"3","label":"Unknown"}
    ]
  }
}
~~~

### 通过 dhtmlxConnector 加载选项

下面是 [dhtmlxConnector](integrations/php/howtostart-connector.md) 初始化的示例：

~~~php
//data.php
<?php
    include('connector-php/codebase/gantt_connector.php');
 
    $res = new PDO("mysql:host=localhost;dbname=gantt", "root", "");

    $list = new OptionsConnector($res);
    $list->render_table("priorities","id","id(value),name(label)");
    
    $gantt = new JSONGanttConnector($res);
    $gantt->set_options("priority", $list);
    $gantt->render_links("gantt_links","id","source_task(source),
                    target_task(target),type");    
    $gantt->render_table("gantt_tasks","id","start_date,duration,text,progress,
                    sortorder,parent");
?>
~~~