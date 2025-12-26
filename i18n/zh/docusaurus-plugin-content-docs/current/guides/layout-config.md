---
title: "Gantt 布局"
sidebar_label: "Gantt 布局"
---

# Gantt 布局

从 5.0 版本开始，Gantt 支持自定义布局，允许您将组件的各个元素作为内部视图在布局中进行排列。该功能使您可以添加额外的时间线和表格，实现灵活的 Gantt 图结构，并以多种方式组织其各个部分。

例如，您可以在时间线右侧添加一个额外的表格:

![gantt_two_grids](/img/gantt_two_grids.png)


[Grid columns rightside of gantt](https://docs.dhtmlx.com/gantt/samples/10_layout/01_rightside_columns.html)


或者在默认表格和时间线下方再添加一个表格和时间线。

![gantt_resource_panel](/img/gantt_resource_panel.png)


[Gantt chart with resource panel](https://docs.dhtmlx.com/gantt/samples/10_layout/02_resource_panel.html)


## 默认布局

布局通过 [gantt.config.layout](api/config/layout.md) 设置进行控制。以下是默认布局配置:

~~~js
gantt.config.layout = {
    css: "gantt_container",
      rows:[
           {
           cols: [
             {
              // 默认的 grid 视图    
              view: "grid",  
              scrollX:"scrollHor", 
              scrollY:"scrollVer"
             },
             { resizer: true, width: 1 },
             {
              // 默认的 timeline 视图
              view: "timeline", 
              scrollX:"scrollHor", 
              scrollY:"scrollVer"
            },
             {
              view: "scrollbar", 
              id:"scrollVer"
               }
        ]},
            {
            view: "scrollbar", 
            id:"scrollHor"
        }
      ]
}
~~~

Gantt 布局由由视图填充的单元格组成。这些视图代表 Gantt 的主要和辅助元素，例如:

- **grid** - Gantt 图的表格部分。用于显示任务的主表格视图的 *id:"grid"*；
- **timeline** - Gantt 图的时间线部分。用于显示任务的主时间线视图的 *id:"timeline"*；
- **resizer** - 调整分隔线。要激活它，需要将 **resizer** 属性设置为 *true*。**此功能仅在 PRO 版本中提供**；
- **scrollbar** - 用于 Gantt 图的滚动条。grid 和 timeline 视图可以与特定滚动条关联（详见下文）。
- **resourceGrid** - 资源面板的预配置表格。**仅 PRO 版本可用**。详细信息见 [这里](guides/resource-management.md)。
- **resourceTimeline** - 资源面板的预配置时间线。**仅 PRO 版本可用**。详细信息见 [这里](guides/resource-management.md)。

每个视图通过包含相关属性的对象进行配置。
您可以[自定义 grid 和 timeline 视图的设置](#configsandtemplatesofviews)。
默认情况下，选项来源于全局 [gantt.config](guides/common-configuration.md#ganttconfigduixiang) 对象。

:::note
请注意，布局配置应在初始化 Gantt 之前设置。如果后续更新布局，请使用 [resetLayout](api/method/resetlayout.md) 进行刷新。
:::

## 滚动条

布局中的滚动条通过 **"scrollbar"** 视图定义。可以使用水平和垂直滚动条。

要添加滚动条，需要通过设置 **scrollX** 或 **scrollY** 属性，并指定滚动条的 id，将其绑定到相应视图。

### 将滚动条绑定到视图

多个视图可以共享同一个滚动条。要将视图与滚动条关联:

- 定义所需滚动方向的滚动条，并为其分配一个 ID
- 在视图的 **scrollX** 或 **scrollY** 属性中引用该滚动条 ID

将滚动条放在 `cols` 数组中会创建垂直滚动条，而放在 `rows` 数组中则会创建水平滚动条。也可以通过 **scroll** 属性显式指定滚动方向:

~~~js
{ view: "scrollbar", id:"scroller", scroll: "x"    } // 水平
~~~
或:
~~~js
{ view: "scrollbar", id:"scroller", scroll: "y"    } // 垂直
~~~

以下是将自定义 grid 和 timeline 视图绑定到垂直滚动条的示例:

~~~js
gantt.config.layout = {
    css: "gantt_container",
      rows:[
           {
           cols: [
             {             
              view: "grid", 
              scrollY:"scrollVer"
             },
             { resizer: true, width: 1 },
             {
              view: "timeline", 
              scrollY:"scrollVer"
            },
             {
              view: "scrollbar", 
              id:"scrollVer"
               }
        ]}
      ]
}
~~~

滚动垂直滚动条会同时移动 grid 和 timeline。
在默认布局中，grid 和 timeline 视图同时绑定了水平和垂直滚动条。

您还可以为 Grid 视图单独指定一个水平滚动条。详细信息请参见[相关章节](guides/specifying-columns.md#shuipinggundongtiao)。

### 视图的滚动条

之前我们介绍了如何通过简单布局配置为视图添加单个滚动条，例如:

~~~js
{cols: [ {rows: [{}, {}]}, {rows: [{}, {}]}]}
~~~

或

~~~js
{rows: [ {cols: [{}, {}]}, {cols: [{}, {}]}]}
~~~

如果您希望将视图同时关联到垂直和水平滚动条，则需要更复杂的布局，即多层嵌套 `cols` 和 `rows` 数组，例如:

~~~js
{cols: [ 
    {
        rows: [
            {
                cols: [{}, {}]
            }, 
            {
                cols: [{}, {}]
            }
        ]
    }, 
    {
        rows: [
            {
                cols: [{}, {}]
            }, 
            {
                cols: [
                    {
                        rows: [{}, {}]
                    }, 
                    {    
                        rows: [{}, {}]
                    }
                ]
            }
        ]
    }
]}
~~~

您可以参考以下示例:

- [Gantt. 布局视图拥有各自的滚动条](https://snippet.dhtmlx.com/cv9w37tu)
- [Gantt. 通用布局配置](https://snippet.dhtmlx.com/uqejdyqc)

## 布局自定义

您可以修改默认布局，通过添加额外视图为 Gantt 图定义适合需求的布局方案。

例如，如果需要在主 Gantt 图下方创建一个资源面板，并包含额外的 grid 和 timeline 视图，可按如下步骤操作:

- 创建一个多行布局
- 将默认的 grid 和 timeline 放在第一行
- 在第二行添加额外的 grid 和 timeline，并绑定到自定义数据源
- 在两行之间插入 resizer
- 为最后一行添加滚动条，并将其同时关联到默认和资源时间线

配置示例如下:

~~~js
gantt.config.layout = {
    css: "gantt_container",
    rows:[
        {
          // 默认布局
          cols: [
            {view: "grid",
                config: mainGridConfig, scrollY:"scrollVer"},
            {resizer: true, width: 1},
            {view: "timeline", 
                scrollX:"scrollHor", scrollY:"scrollVer"},
            {view: "scrollbar", id:"scrollVer"}
          ]
        },
        {resizer: true, width: 1},
        {
          // 自定义布局
          cols: [
            {view: "grid", id: "resourceGrid", bind:"resource", 
                config:resourceGridConfig, scrollY:"resourceVScroll"},
            {resizer: true, width: 1},
            {view:"timeline", id:"resourceTimeline", scrollX:"scrollHor", 
                bind:"resource", bindLinks: null, layers: resourceLayers, 
                scrollY:"resourceVScroll"},
            {view: "scrollbar", id:"resourceVScroll"}
          ]
        },
        {view: "scrollbar", id:"scrollHor"}
    ]
};
~~~

在此示例中，额外的表格视图用于显示资源及其工作量，额外的时间线则用于展示一个月内的工作小时分布，突出显示标准工时和加班工时。

### 自定义 grid 和 timeline 的属性

自定义 grid 和 timeline 视图包含一些额外属性:

#### 针对 grid 和 timeline 视图

- **bind** - (*string*) 指定数据源的 ID（如示例中的 "resource"）

#### 针对 timeline 视图

- **bindLinks** - (*string*) 指定链接数据源；若无相关链接则设为 *null*
- **layers** - (*array*) 一组 **addLayer()** 函数，用于定义数据的样式

### 为自定义视图添加数据存储

为了让自定义视图填充正确的数据，需要添加一个单独的数据存储。可以通过 [createDatastore](api/method/createdatastore.md) 方法创建新的数据存储，在这里你需要指定数据存储的配置:

~~~js
var resourcesStore = gantt.createDatastore({
    name:"resource",
    initItem: function(item){
        item.id = item.key || gantt.uid();
        return item;
    }
});
~~~

在本例中，创建了一个名为 "resource" 的数据存储。

要将数据加载到自定义视图中，可使用 [parse](api/method/parse.md) 方法:

~~~js
resourcesStore.parse([// resources
    {key:'0', label: "N/A"},
    {key:'1', label: "John"},
    {key:'2', label: "Mike"},
    {key:'3', label: "Anna"}
]);
~~~

要获取特定数据存储的配置对象，请使用 [getDatastore](api/method/getdatastore.md) 方法:

~~~js
var tasksStore = gantt.getDatastore("task");
~~~

该方法的参数为数据存储的名称。

:::note
当使用内置资源视图时，gantt 可以自动创建数据存储。[更多详情见此处](guides/resource-management.md#shiyongziyuanshitumianban)。
:::

### 动态禁用/启用分隔条 {#enable_disable_resizers}

有时需要动态禁用 gantt 单元格之间的分隔条。最简单的方法是通过 CSS 隐藏它们。

可以使用如下 CSS 规则:

~~~css
.no_resizers .gantt_resizer{
    display:none;
}
~~~

然后，在 gantt 容器上添加该类即可隐藏分隔条:

~~~js
gantt.$container.classList.add("no_resizers");
~~~

要恢复分隔条，只需移除该类:

~~~js
gantt.$container.classList.remove("no_resizers");
~~~

## HTML 作为内部视图

自定义 HTML 也可以作为 Gantt 布局的内部视图使用。以下是一个示例:

~~~js
gantt.config.layout = {
 css: "gantt_container",
  rows: [
      {
         cols: [
        {view: "grid",scrollX: "scrollHor", scrollY: "scrollVer"},
        { html:"<div class='custom-content'>custom content</div>", 
            css:"custom-content", width:50},
        {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
        { html:"<div class='custom-content'>custom content</div>", 
            css:"custom-content", width:50},
        {view: "scrollbar", id: "scrollVer"}
         ]
    },
    {view: "scrollbar", scroll: "x", id: "scrollHor"}
 ]
}
~~~


## 必需的视图和设置

gantt 对象的公共 API 包含了一些与特定布局视图相关的方法，如 [getTaskPosition](api/method/gettaskposition.md)、[getTaskNode](api/method/gettasknode.md) 和 [getScrollState](api/method/getscrollstate.md)。

要使这些方法正常工作，布局中必须包含默认的 grid、timeline、滚动条，并且 gantt 需要能找到它们。实现方式是为默认视图分配特定的 id:

~~~js
gantt.config.layout = {
 css: "gantt_container",
  rows: [
  {
   cols: [
    {view: "grid", id: "grid", scrollX: "scrollHor", scrollY: "scrollVer"},
    {view: "timeline", id: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
    {view: "scrollbar", id: "scrollVer"}
   ]
  },
  {view: "scrollbar", id: "scrollHor"}
 ]
};
~~~

必需的视图及其 id 如下:

- view: "grid", id: "grid"
- view: "timeline", id: "timeline"
- view: "scrollbar", id: "scrollHor"
- view: "scrollbar", id: "scrollVer"

如果未设置 id，gantt 会使用视图名称作为默认 id，或自动生成唯一 id。因此，对于默认的 grid 和 timeline，可以省略 "id" 参数:

~~~js
gantt.config.layout = {
 css: "gantt_container",
  rows: [
  {
   cols: [
    {view: "grid", scrollX: "scrollHor", scrollY: "scrollVer"},
    {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
    {view: "scrollbar", id: "scrollVer"}
   ]
  },
  {view: "scrollbar", id: "scrollHor"}
 ]
};
~~~

你可以在布局中添加任意数量的额外视图。

## 视图的配置和模板

Grid 和 Timeline 视图默认使用全局 [gantt.config/gantt.templates](guides/common-configuration.md) 的模板和配置。但这些可以在布局级别为特定视图进行覆盖。

例如:

~~~js
var secondGridColumns = {
  columns: [
    {
        name: "status", label: "Status", width: 60, align: "center", 
        template: function (task) {
            var progress = task.progress || 0;
            return Math.floor(progress * 100) + "";
        }
    },
    {
        name: "impact", width: 80, label: "Impact", template: function (task) {
            return (task.duration * 1000).toLocaleString("en-US", {
              style: 'currency', currency: 'USD'
          });
        }
    }
  ]
};

gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        {view: "grid", id: "grid", width: 320, scrollY: "scrollVer"},
        {resizer: true, width: 1},
        {view: "timeline", id: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
        {resizer: true, width: 1},
        {view: "grid", width: 120, bind:"task", 
            scrollY:"scrollVer", config:secondGridColumns},   /*!*/
        {view: "scrollbar", scroll: "y", id: "scrollVer"}
      ]
    },
    {view: "scrollbar", id: "scrollHor", height: 20}
  ]
};
~~~


视图也可以继承其父布局的配置和模板:

~~~js
var resourceConfig = {    /*!*/
    scale_height: 30      /*!*/
};                          /*!*/

gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        {view: "grid", group:"grids", scrollY: "scrollVer"},
        {resizer: true, width: 1},
        {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
        {view: "scrollbar", id: "scrollVer", group:"vertical"}
      ],
      gravity:2
    },
    {resizer: true, width: 1},
    {
      config: resourceConfig,   /*!*/
      cols: [
        {view: "resourceGrid", group:"grids", width: 435, scrollY: "resourceVScroll" },
        {resizer: true, width: 1},
        {view: "resourceTimeline", scrollX: "scrollHor", scrollY: "resourceVScroll"},
        {view: "scrollbar", id: "resourceVScroll", group:"vertical"}
      ],
      gravity:1
    },
    {view: "scrollbar", id: "scrollHor"}
  ]
};
~~~

更多信息请参阅 [资源管理](guides/resource-management.md) 文章。


## 可见性分组

有时需要同步某些布局元素的可见性。例如，如果相邻单元格中有水平滚动条，可能希望它们一起显示或隐藏。

![scrollable_grid](/img/scrollable_grid.png)


[Horizontal scroll inside Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/10_scrollable_grid.html)


另一个例子是，不同 timeline 行中有多个 grid 时，希望它们宽度保持一致。当一个 grid 被调整大小时，其他的也会相应调整。

![grid_group_width](/img/grid_group_width.png)


[Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)


这两种场景都可通过视图的 **group** 属性实现。该属性可设置任意字符串，具有相同 group 值的视图将同步。

- 对于滚动条，意味着它们的可见性被联动。如果组内任意一个滚动条可见，则所有都可见。

- 对于其他单元格，则保证它们宽度或高度一致，具体取决于布局。

同步滚动条可见性的示例:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  cols: [
    {
       width:400,
       minWidth: 200,
       maxWidth: 600,
       rows:[
         {view: "grid", scrollX: "gridScroll", scrollable: true, scrollY: "scrollVer"},
         {view: "scrollbar", id: "gridScroll", group:"horizontal"}    /*!*/
        ]
    },
    {resizer: true, width: 1},
    {
      rows:[
        {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
        {view: "scrollbar", id: "scrollHor", group:"horizontal"}      /*!*/
      ]
    },
    {view: "scrollbar", id: "scrollVer"}
  ]
};
~~~

同步 grid 宽度的示例:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        {view: "grid", group:"grids", scrollY: "scrollVer"},
        {resizer: true, width: 1},
        {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
        {view: "scrollbar", id: "scrollVer", group:"vertical"}    /*!*/
      ],
      gravity:2
    },
    {resizer: true, width: 1},
    {
      config: resourceConfig,
      cols: [
        {view: "resourceGrid", group:"grids", width: 435, scrollY: "resourceVScroll" },
        {resizer: true, width: 1},
        {view: "resourceTimeline", scrollX: "scrollHor", scrollY: "resourceVScroll"},
        {view: "scrollbar", id: "resourceVScroll", group:"vertical"}   /*!*/
      ],
      gravity:1
    },
    {view: "scrollbar", id: "scrollHor"}
  ]
};
~~~

## Gantt 布局部分的尺寸设置

Gantt 布局单元格的相对大小可通过各单元格配置中的 **gravity** 属性控制。该值用于设置单元格之间的比例关系。

~~~js
gantt.config.layout = {
      css: "gantt_container",
      rows: [
        {
              cols: [
                // columns config
            ],
              gravity:2     /*!*/
        },
        { resizer: true, width: 1 },
        {
            config: resourceConfig,
              cols: [
                // columns config
              ],
              gravity:1       /*!*/
        },
    {view: "scrollbar", id: "scrollHor"}
      ]
};
~~~

在本例中，Gantt 图与资源图的空间分配比例为 2:1。即 Gantt 图占约 66%，资源图占约 33%。若为 1:1，则空间均分。

### 最小/最大单元格宽度/高度

在调整大小时，若需限制布局部分的尺寸，可为 **cols** 内的单元格设置 **minWidth/maxWidth** 属性。类似地，可为 **rows** 内的单元格设置 **minHeight/maxHeight** 属性来限制高度。

以下示例演示了如何在列配置中使用 **minWidth/maxWidth**:

~~~js
gantt.config.grid_elastic_columns = true;

gantt.config.layout = {
  css: "gantt_container",
  cols: [
    {
      width: 400,
      minWidth: 200, /*!*/
      maxWidth: 600, /*!*/
      rows: [
        {
          view: "grid", scrollable: true, scrollX: "scrollHor1", scrollY: "scrollVer"
        },
        {
          view: "scrollbar", id: "scrollHor1", scroll: 'x', group: 'hor'
        },
      ]
    },
    { resizer: true, width: 1 },
    {
      rows: [
        {
          view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"
        },
        {
          view: "scrollbar", id: "scrollHor", scroll: 'x', group: 'hor'
        },
      ]
    },
    {
      view: "scrollbar", id: "scrollVer"
    }
  ]
}
~~~


## 隐藏父布局视图

如果希望当所有子视图都不可见时，父布局视图也自动隐藏，可在该布局单元配置中设置 **hide_empty:true**，如下所示:

~~~js
gantt.config.layout = {
    css: "gantt_container",
    cols: [
          {
            hide_empty: true, /*!*/
            rows:[
                  {view: "grid"}
            ]
          },
          {resizer: true},
          {
            hide_empty: true, /*!*/
            rows:[
                  {view: "timeline"}
            ]
          }
    ]
};
~~~


**Related example:** [Hiding grid/timeline views](https://snippet.dhtmlx.com/5/157c0db66)


## 切换视图

如需在不同布局视图之间切换，请参阅 [如何切换 grid/chart](guides/how-to.md#ruheqiehuanwanggetubiao) 和 [如何切换资源视图](guides/how-to.md#ruheqiehuanziyuanshitu) 章节获取详细说明。

## 冻结 grid 视图中的列

可以初始化 Gantt 图时冻结一列或多列。具体操作方法请参阅 [如何冻结/固定 grid 中的列](guides/how-to.md#ruhezaiwanggezhongdongjiegudinglie) 章节。

