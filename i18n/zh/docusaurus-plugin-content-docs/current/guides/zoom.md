---
title: "Zoom 扩展"
sidebar_label: "Zoom 扩展"
---

# Zoom 扩展

有关 Zoom 扩展的更多详细信息，请参阅 [줌(Zooming)](guides/zooming.md) 文章。本文档主要介绍 **zoom** 对象的 API 参考:

## 缩放级别

Zoom 扩展通过一组缩放级别设置进行操作，支持在这些级别间快速切换。

**ZoomLevel** 是一个表示缩放设置的对象，包含以下属性:

- <span class="subproperty">**name**</span> - (*string*) - 分配给该级别的名称
- <span class="subproperty">**scale_height?**</span> - (*number*) - 缩放级别的高度
- <span class="subproperty">**height?**</span> - (*number*) - 缩放级别的高度
- <span class="subproperty">**min_column_width?**</span> - (*number*) - 列的最小宽度；此属性优先于 minColumnWidth 和 maxColumnWidth
- <span class="subproperty">**scales**</span> - (*Scales*) - 在此缩放级别下可切换的缩放刻度数组

## 方法

- <span class="submethod">**init (zoomConfig): void**</span> - 使用给定的配置初始化扩展。
    - **_zoomConfig_** - (*object*) - 配置对象，其中包含定义缩放级别的 *levels* 数组及多个可选属性:
        - **_levels_** - (*ZoomLevel[]*) - 必填，定义缩放级别的数组
        - **_handler?_** - (*Function*): void - 允许自定义鼠标滚轮处理函数以手动控制缩放
            - **_e_** - (*Event*) - 原生事件对象
        - **_startDate?_** - (*Date*) - 时间刻度缩放的起始日期
        - **_endDate?_** - (*Date*) - 时间刻度缩放的结束日期
        - **_activeLevelIndex?_** - (*number*) - 默认活动缩放级别的索引
        - **_widthStep?_** - (*number*) - 切换缩放级别时缩放宽度的增减步长
        - **_minColumnWidth?_** - (*number*) - 允许切换到上一级缩放的最小列宽
        - **_maxColumnWidth?_** - (*number*) - 允许切换到下一级缩放的最大列宽
        - **_useKey?_** - (*string*) - 指定通过鼠标滚轮缩放时需要按下的按键:"ctrlKey" | "altKey" | "shiftKey"
        - **_trigger?_** - (*string | null | undefined*) - 定义缩放触发方式:"wheel" | null | undefined 
        - **_element?_** - (*HTMLElement | Function*): HTMLElement - 触发缩放的 DOM 元素，或返回该元素的函数

以下是两个配置 **zoom** 扩展的示例:

~~~js
var zoomConfig = {
    levels: [
      {
        name:"day",
        scale_height: 27,
        min_column_width:80,
        scales:[
            {unit: "day", step: 1, format: "%d %M"}
        ]
      },
      {
         name:"week",
         scale_height: 50,
         min_column_width:50,
         scales:[
          {unit: "week", step: 1, format: function (date) {
           var dateToStr = gantt.date.date_to_str("%d %M");
           var endDate = gantt.date.add(date, 6, "day");
           var weekNum = gantt.date.date_to_str("%W")(date);
           return "#" + weekNum + ", " + dateToStr(date) + " - " + dateToStr(endDate);
           }},
           {unit: "day", step: 1, format: "%j %D"}
         ]
       },
       {
         name:"month",
         scale_height: 50,
         min_column_width:120,
         scales:[
             {unit: "month", format: "%F, %Y"},
             {unit: "week", format: "Week #%W"}
         ]
        },
        {
         name:"quarter",
         height: 50,
         min_column_width:90,
         scales:[
          {unit: "month", step: 1, format: "%M"},
          {
           unit: "quarter", step: 1, format: function (date) {
            var dateToStr = gantt.date.date_to_str("%M");
            var endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
            return dateToStr(date) + " - " + dateToStr(endDate);
           }
         }
          ]},
        {
          name:"year",
          scale_height: 50,
          min_column_width: 30,
          scales:[
              {unit: "year", step: 1, format: "%Y"}
        ]}
    ]
};

gantt.ext.zoom.init(zoomConfig);


// 或者，也可以仅将 levels 定义为刻度数组
var hourToStr = gantt.date.date_to_str("%H:%i");
var hourRangeFormat = function(step){
    return function(date){
        var intervalEnd = new Date(gantt.date.add(date, step, "hour") - 1)
        return hourToStr(date) + " - " + hourToStr(intervalEnd);
    };
};
var zoomConfig = {
    levels: [
        [
            { unit: "month", format: "%M %Y", step: 1},
        ],
        [
            { unit: "month", format: "%M %Y", step: 1},
            { unit: "day", format: "%d %M", step: 1}
        ],
        [
            { unit: "day", format: "%d %M", step: 1},
            { unit: "hour", format: hourRangeFormat(12), step: 12}
        ],
        [
            {unit: "day", format: "%d %M",step: 1},
            {unit: "hour",format: hourRangeFormat(6),step: 6}
        ],
        [
            { unit: "day", format: "%d %M", step: 1 },
            { unit: "hour", format: "%H:%i", step: 1}
        ]
    ]
}

gantt.ext.zoom.init(zoomConfig);
~~~

- <span class="submethod">**getCurrentLevel (): number**</span> - 获取当前缩放级别的索引

~~~js
gantt.ext.zoom.getCurrentLevel();
~~~

- <span class="submethod">**setLevel (level): void**</span> - 切换到指定的缩放级别。
    - **_level_** - (*number | string*) - 可以是级别名称（如 "year"），也可以是 levels 数组中的索引

~~~js
gantt.ext.zoom.setLevel("year");
// 或者 
gantt.ext.zoom.setLevel(5);
~~~

- <span class="submethod">**getLevels (): ZoomLevel[]**</span> - 获取所有已定义的缩放级别

~~~js
gantt.ext.zoom.getLevels();
~~~

该方法返回传递给 **init()** 方法的缩放级别数组（*ZoomLevels[]*）。

- <span class="submethod">**zoomIn (): void**</span> - 切换到更高一级的缩放级别

~~~js
gantt.ext.zoom.zoomIn();
~~~

或者，也可以这样实现:

~~~js
gantt.ext.zoom.setLevel(zoom.getCurrentLevel() - 1)
~~~

- <span class="submethod">**zoomOut (): void**</span> - 切换到更低一级的缩放级别

~~~js
gantt.ext.zoom.zoomOut();
~~~

或者，也可以这样实现:

~~~js
gantt.ext.zoom.setLevel(zoom.getCurrentLevel() + 1)
~~~

- <span class="submethod">**attachEvent (name, handler): string**</span> - 添加事件处理函数
    - **_name_** - (*string*) - 要监听的事件名称
    - **_handler_** - (*Function*) - 事件触发时执行的函数

- <span class="submethod">**detachEvent (id): void**</span> - 移除之前添加的事件处理函数
    - **_id_** - (*string*) - 要移除的事件处理函数的标识符

- <span class="submethod">**callEvent (name, params): boolean**</span> - 触发内部事件
    - **_name_** - (*string*) - 事件名称，不区分大小写
    - **_params_** - (*Array&lt;any&gt;*) - 可选，事件相关的数据数组

- <span class="submethod">**checkEvent (name): boolean**</span> - 检查是否有为指定事件注册的处理函数
    - **_name_** - (*string*) - 事件名称

如果有至少一个事件处理函数，返回 <i>true</i>。

## 事件

- **<span class="eventname">onAfterZoom</span>** - 当缩放级别发生变化时触发。
该事件提供如下参数:
<span class="eventarguments">
    - **_level_** - (*number | string*) - 缩放级别的索引或名称
    - **_config_** - (*ZoomLevel*) - 缩放级别的配置对象
</span>

~~~js
gantt.ext.zoom.attachEvent("onAfterZoom", function(level, config){ 
    document.querySelector(".gantt_radio[value='" +config.name+ "']").checked = true;
}); 
~~~
