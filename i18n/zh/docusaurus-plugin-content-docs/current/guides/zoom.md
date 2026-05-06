---
title: "Zoom Extension"
sidebar_label: "Zoom Extension"
---

# Zoom Extension

你可以在 [Zooming](guides/zooming.md) 文章中阅读关于 Zoom 扩展的详细信息。本篇文章提供了 **zoom** 对象的 API 参考：


## 缩放级别

Zoom 扩展使用一组比例设置，并允许在它们之间快速切换。

**ZoomLevel** 是一个包含缩放设置的对象。它具有以下属性：

- <span class="subproperty">**name**</span> - (*string*) - 该级别的名称
- <span class="subproperty">**scale_height?**</span> - (*number*) - 该刻度的高度
- <span class="subproperty">**height?**</span> - (*number*) - 该标尺的高度
- <span class="subproperty">**min_column_width?**</span> - (*number*) - 列的最小宽度。它的优先级高于 minColumnWidth 和 maxColumnWidth
- <span class="subproperty">**scales**</span> - (*Scales*) - 在此级别放大/缩小时可切换的比例数组


## 方法

- <span class="submethod">**init (zoomConfig): void**</span> - 使用提供的配置初始化扩展。
    - **_zoomConfig_** - (*object*) - 一个包含配置设置的对象，其中包含 *levels* zooming levels 的数组以及若干附加属性：
        - **_levels_** - (*ZoomLevel[]*) - 必需，缩放级别的数组
        - **_handler?_** - (*Function*): void - 允许指定一个自定义的鼠标滚轮处理程序以手动进行缩放
            - **_e_** - (*Event*) - 原生事件对象
        - **_startDate?_** - (*Date*) - 时间刻度缩放的起始值
        - **_endDate?_** - (*Date*) - 时间刻度缩放的结束值
        - **_activeLevelIndex?_** - (*number*) - 默认活动级别的编号
        - **_widthStep?_** - (*number*) - 切换到下一个/上一个缩放级别时，刻度宽度的增加/减少步长
        - **_minColumnWidth?_** - (*number*) - 允许切换到前一个缩放级别的列的最小宽度
        - **_maxColumnWidth?_** - (*number*) - 允许切换到下一个缩放级别的列的最大宽度
        - **_useKey?_** - (*string*) - 通过滚动鼠标滚轮实现缩放的按键： "ctrlKey" | "altKey" | "shiftKey"
        - **_trigger?_** - (*string | null | undefined*) - 缩放的触发方式： "wheel" | null | undefined 
        - **_element?_** - (*HTMLElement | Function*): HTMLElement - 触发缩放的 DOM 元素，或返回 DOM 元素的函数

以下是设置 **zoom** 配置的两个示例：

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


// 或者，以更简单的方式，levels 可以表示为刻度数组
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

- <span class="submethod">**getCurrentLevel (): number**</span> - 返回当前缩放级别的编号（索引）

~~~js
gantt.ext.zoom.getCurrentLevel();
~~~

- <span class="submethod">**setLevel (level): void**</span> - 切换到指定的缩放级别。
    - **_level_** - (*number | string*) - 级别要么通过配置中的名称（如 "year"），要么通过它在缩放级别数组中的编号来定义

~~~js
gantt.ext.zoom.setLevel("year");
// 或者 
gantt.ext.zoom.setLevel(5);
~~~

- <span class="submethod">**getLevels (): ZoomLevel[]**</span> - 允许获取所有缩放级别

~~~js
gantt.ext.zoom.getLevels();
~~~

返回传递给 **init()** 方法、用于初始化扩展的缩放级别数组。

- <span class="submethod">**zoomIn (): void**</span> - 增加当前缩放级别

~~~js
gantt.ext.zoom.zoomIn();
~~~

若要达到同样的目的，你也可以使用：

~~~js
gantt.ext.zoom.setLevel(zoom.getCurrentLevel() - 1)
~~~

- <span class="submethod">**zoomOut (): void**</span> - 减少当前缩放级别

~~~js
gantt.ext.zoom.zoomOut();
~~~

若要达到同样的目的，你也可以使用：

~~~js
gantt.ext.zoom.setLevel(zoom.getCurrentLevel() + 1)
~~~

- <span class="submethod">**attachEvent (name, handler): string**</span> - 绑定事件处理程序
    - **_name_** - (*string*) - 事件处理程序的名称
    - **_handler_** - (*Function*) - 当事件触发时将调用的函数

- <span class="submethod">**detachEvent (id): void**</span> - 从事件中移除处理程序
    - **_id_** - (*string*) - 已绑定事件处理程序的标识符

- <span class="submethod">**callEvent (name, params): boolean**</span> - 调用内部事件
    - **_name_** - (*string*) - 事件的名称，忽略大小写
    - **_params_** - (*Array&lt;any&gt;*) - 可选，事件相关数据的数组

- <span class="submethod">**checkEvent (name): boolean**</span> - 检查某个事件是否已为其指定了处理程序
    - **_name_** - (*string*) - 事件的名称

如果为该事件指定了某个处理程序，则返回 <i>true</i>。

## 事件

- **<span class="eventname">onAfterZoom</span>** - 在切换缩放级别时触发。
参数为：
<span class="eventarguments">
    - **_level_** - (*number | string*) - 级别的编号
    - **_config_** - (*ZoomLevel*) - 该级别的配置
</span>

~~~js
gantt.ext.zoom.attachEvent("onAfterZoom", function(level, config){ 
    document.querySelector(".gantt_radio[value='" +config.name+ "']").checked = true;
}); 
~~~