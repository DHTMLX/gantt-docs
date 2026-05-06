---
title: "甘特图布局"
sidebar_label: "甘特图布局"
---

# 甘特图布局

从版本 5.0 开始，甘特图提供了可配置布局的能力，可以将组件的元素作为布局的内部视图来排列。  
它允许你使用附加的时间线和网格来实现灵活的甘特图结构，并定义多种元素排列方案。

例如，你可以在时间线的右侧再放置一个网格：

![gantt_two_grids](/img/gantt_two_grids.png)

**相关示例**: [Gantt 右侧网格列](https://docs.dhtmlx.com/gantt/samples/10_layout/01_rightside_columns.html)

或者在默认网格和时间线下方再添加一个网格和一个时间线。

![gantt_resource_panel](/img/gantt_resource_panel.png)

**相关示例**: [带资源面板的甘特图](https://docs.dhtmlx.com/gantt/samples/10_layout/02_resource_panel.html)


## 默认布局

布局通过 [gantt.config.layout](api/config/layout.md) 配置选项设置。布局的默认配置如下：

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        {
          // the default grid view
          view: "grid",
          scrollX: "scrollHor",
          scrollY: "scrollVer"
        },
        { resizer: true, width: 1 },
        {
          // the default timeline view
          view: "timeline",
          scrollX: "scrollHor",
          scrollY: "scrollVer"
        },
        {
          view: "scrollbar",
          id: "scrollVer"
        }
      ]
    },
    {
      view: "scrollbar",
      id: "scrollHor"
    }
  ]
}
~~~

甘特图的布局由被视图占据的单元格组成。主要和辅助的甘特图元素由 **views**（视图）来呈现，具体包括：

- **grid** - 定义甘特图的网格部分。用于显示任务的主网格的预定义 id 为 *id:"grid"*；  
- **timeline** - 定义甘特图的时间线部分。用于显示任务的主时间线的预定义 *id:"timeline"*；  
- **resizer** - 定义调整大小线。要启用调整大小器，需要将 **resizer** 属性设置为 *true*。**仅在 PRO 版可用**；  
- **scrollbar** - 定义甘特图中使用的滚动条。网格和时间线视图可以绑定到特定滚动条。下面将有详细说明。  
- **resourceGrid** - 为资源面板预配置的网格。**仅在 PRO 版可用**。更多细节请参见 [此处](guides/resource-management.md)。  
- **resourceTimeline** - 为资源面板预配置的时间线。**仅在 PRO 版可用**。更多细节请参见 [此处](guides/resource-management.md)。

视图配置被指定为具有相应属性的对象。你可以为 **grid** 和 **timeline** 视图设置自定义配置选项 [自定义配置选项](#configs-and-templates-of-views) 。默认选项取自全局对象 [gantt.config](guides/common-configuration.md#ganttconfigobject)。

:::note
请注意，在初始化 Gantt 之前应指定布局的配置。如果对布局进行了修改，需要使用 [resetLayout](api/method/resetlayout.md) 进行刷新。
:::

## 滚动条

布局的滚动条由 **"scrollbar"** 视图指定。你可以设置水平和垂直滚动条。

若要在布局中使用滚动条，需要通过必要滚动条的 ID，借助 **scrollX** 或 **scrollY** 属性，将其绑定到相应的视图。

### 为一个视图绑定滚动条

可以将多个视图绑定到同一个滚动条。要将视图绑定到滚动条：

- 设置一个具有必要滚动方向的滚动条并给它分配一个 ID  
- 在视图配置对象中，将滚动条的 ID 作为 **scrollX/scrollY** 的值

在 **cols** 数组中定义滚动条将创建一个垂直滚动条，在 **rows** 数组中定义滚动条将创建一个水平滚动条。或者，你可以通过显式设置 **scroll** 参数来定义滚动模式：

~~~js
{ view: "scrollbar", id: "scroller", scroll: "x" } // horizontal
~~~

或：

~~~js
{ view: "scrollbar", id: "scroller", scroll: "y" } // vertical
~~~

让我们将自定义网格和时间线视图绑定到垂直滚动条：

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        { view: "grid", scrollY: "scrollVer" },
        { resizer: true, width: 1 },
        { view: "timeline", scrollY: "scrollVer" },
        { view: "scrollbar", id: "scrollVer" }
      ]
    }
  ]
}
~~~

当你滚动垂直滚动条时，网格和时间线会一起滚动。在默认布局中，网格和时间线视图绑定到水平和垂直滚动条。

同样，也可以为 Grid 视图指定一个单独的水平滚动条。[阅读详情](guides/specifying-columns.md#horizontal-scrollbar) 在相应部分。

### 视图的滚动条

在上面的子节中，我们已经介绍了如何为必要的视图添加一个特定的滚动条。为此，只需创建一个简单的布局配置，如下所示：

~~~js
{ cols: [ { rows: [ {}, {} ] }, { rows: [ {}, {} ] } ] }
~~~

或：

~~~js
{ rows: [ { cols: [ {}, {} ] }, { cols: [ {}, {} ] } ] }
~~~

如果你需要将一个视图绑定到垂直和水平滚动条，请在 `cols` 与 `rows` 数组中创建一个复杂的布局配置，嵌套多层，例如：

~~~js
{ cols: [
  {
    rows: [
      {
        cols: [ {}, {} ]
      }, 
      {
        cols: [ {}, {} ]
      }
    ]
  },
  {
    rows: [
      {
        cols: [ {}, {} ]
      }, 
      {
        cols: [
          {
            rows: [ {}, {} ]
          }, 
          {	
            rows: [ {}, {} ]
          }
        ]
      }
    ]
  }
]}
~~~

请参阅以下示例：

- [Gantt. Layout views with own scrollbars](https://snippet.dhtmlx.com/cv9w37tu)
- [Gantt. Universal Layout configuration](https://snippet.dhtmlx.com/uqejdyqc)

## 布局自定义

你可以更改默认布局配置，并使用附加布局视图来指定甘特图在页面上的元素排列方案。

例如，你可以创建额外的网格和时间线视图，为主甘特图创建一个底部资源面板。实现这样一个自定义布局的步骤如下：

- 创建一个多行布局  
- 在布局的第一行添加默认网格和时间线  
- 在下一行添加额外的网格和时间线，并绑定到自定义数据源  
- 在这些行之间添加一个调整大小器  
- 在最后一行添加一个滚动条，并将其绑定到默认和资源时间线

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      // the default layout
      cols: [
        { view: "grid", config: mainGridConfig, scrollY: "scrollVer" },
        { resizer: true, width: 1 },
        { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
        { view: "scrollbar", id: "scrollVer" }
      ]
    },
    { resizer: true, width: 1 },
    {
      // a custom layout
      cols: [
        { view: "grid", id: "resourceGrid", bind: "resource",
          config: resourceGridConfig, scrollY: "resourceVScroll"
        },
        { resizer: true, width: 1 },
        { view: "timeline", id: "resourceTimeline", scrollX: "scrollHor",
          bind: "resource", bindLinks: null, layers: resourceLayers,
          scrollY: "resourceVScroll"
        },
        { view: "scrollbar", id: "resourceVScroll" }
      ]
    },
    { view: "scrollbar", id: "scrollHor" }
  ]
};
~~~

在上述示例中，添加了一个额外的网格视图。它包含资源清单及其工作负载。同时还有一个额外的时间线视图，用于显示一个月内的工作小时分布，并指示标准工时与加班工时。

### 自定义网格和时间线的属性

自定义网格和时间线具有额外的属性：

#### 对于网格和时间线视图

- **bind** - (*string*) 设置要从中获取数据的数据存储的 id（示例中的 "resource"）；

#### 对于时间线视图

- **bindLinks** - (*string*) 指向链接的来源。若没有相关链接，则为 *null*；  
- **layers** - (*array*) 配置选项，定义为一组 **addLayer()** 函数，用来描述数据的样式。

### 为自定义视图添加数据存储

要用相应的数据填充自定义视图，需要添加一个单独的数据存储。要创建新的数据存储，请使用 [createDatastore](api/method/createdatastore.md) 方法并指定数据存储的配置：

~~~js
const resourcesStore = gantt.createDatastore({
  name: "resource",
  initItem: (item) => {
    item.id = item.key || gantt.uid();
    return item;
  }
});
~~~

在上述示例中，添加了名为 "resource" 的数据存储。

要从数据存储加载数据到自定义视图，请使用 [parse](api/method/parse.md) 方法：

~~~js
resourcesStore.parse([ // resources
  { key: '0', label: "N/A" },
  { key: '1', label: "John" },
  { key: '2', label: "Mike" },
  { key: '3', label: "Anna" }
]);
~~~

要返回必要数据存储的配置对象，请使用 [getDatastore](api/method/getdatastore.md) 方法：

~~~js
const tasksStore = gantt.getDatastore("task");
~~~

该方法将数据存储的名称作为参数。

:::note
如果你使用内置的资源视图，甘特图可以自动为它们创建数据存储。[阅读详细信息](guides/resource-management.md#working-with-resource-view-panel)。
:::

### 动态禁用/启用调整大小器 {#enable_disable_resizers}

在某些情况下，你可能需要动态地禁用甘特图单元格之间的调整大小器。最简单的解决方案是通过 CSS 将它们隐藏。

为此，你需要如下规则：

~~~css
.no_resizers .gantt_resizer {
  display: none;
}
~~~

然后你就可以通过在甘特图容器上附加该类来隐藏调整大小器：

~~~js
gantt.$container.classList.add("no_resizers");
~~~

若要重新显示调整大小器，只需移除该类：

~~~js
gantt.$container.classList.remove("no_resizers");
~~~

## 将 HTML 作为 Inner View

你也可以将自定义 HTML 用作甘特图布局的内部视图。例如：

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        { view: "grid", scrollX: "scrollHor", scrollY: "scrollVer" },
        { html: "<div class='custom-content'>custom content</div>",
          css: "custom-content", width: 50
        },
        { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
        { html: "<div class='custom-content'>custom content</div>",
          css: "custom-content", width: 50
        },
        { view: "scrollbar", id: "scrollVer" }
      ]
    },
    { view: "scrollbar", scroll: "x", id: "scrollHor" }
  ]
}
~~~

## 必需的视图和设置

甘特对象的公共 API 包含来自特定布局视图的方法，例如 [getTaskPosition](api/method/gettaskposition.md)、[getTaskNode](api/method/gettasknode.md)、[getScrollState](api/method/getscrollstate.md)。  
为了让这些方法按预期工作，布局必须包含默认网格、时间线、滚动条，并且甘特图应能够定位它们。这可以通过为默认视图分配特定的 ID 来实现：

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        { view: "grid", id: "grid", scrollX: "scrollHor",
          scrollY: "scrollVer"
        },
        { view: "timeline", id: "timeline", scrollX: "scrollHor",
          scrollY: "scrollVer"
        },
        { view: "scrollbar", id: "scrollVer" }
      ]
    },
    { view: "scrollbar", id: "scrollHor" }
  ]
};
~~~

必需的视图及其 ID 为：

- view: "grid", id: "grid"
- view: "timeline", id: "timeline"
- view: "scrollbar", id: "scrollHor"
- view: "scrollbar", id: "scrollVer"

请注意，如果未指定 ID，gantt 将使用视图名称作为默认视图 ID，或自动生成唯一 ID。因此，在默认网格和时间线的情况下，可以省略 "id" 参数：

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        { view: "grid", scrollX: "scrollHor", scrollY: "scrollVer" },
        { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
        { view: "scrollbar", id: "scrollVer" }
      ]
    },
    { view: "scrollbar", id: "scrollHor" }
  ]
};
~~~

布局可以包含任意数量的其他视图。

## 视图的配置与模板

网格和时间线视图复用全局 [gantt.config/gantt.templates](guides/common-configuration.md) 的模板和配置。但是，这些设置可以在布局层级覆盖到特定视图。

例如：

~~~js
const secondGridColumns = {
  columns: [
    { name: "status", label: "Status", width: 60, align: "center", 
      template: (task) => {
        const progress = task.progress || 0;
        return Math.floor(progress * 100) + "";
      }
    },
    { name: "impact", width: 80, label: "Impact",
      template: (task) => {
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
        { view: "grid", id: "grid", width: 320, scrollY: "scrollVer" },
        { resizer: true, width: 1 },
        { view: "timeline", id: "timeline", scrollX: "scrollHor",
          scrollY: "scrollVer"
        },
        { resizer: true, width: 1 },
        { view: "grid", width: 120, bind: "task", scrollY: "scrollVer",
          config: secondGridColumns /*!*/
        },
        { view: "scrollbar", scroll: "y", id: "scrollVer" }
      ]
    },
    { view: "scrollbar", id: "scrollHor", height: 20 }
  ]
};
~~~

视图可以从父布局继承配置和模板：

~~~js
const resourceConfig = {  /*!*/
  scale_height: 30      /*!*/
};                        /*!*/

gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        { view: "grid", group: "grids", scrollY: "scrollVer" },
        { resizer: true, width: 1 },
        { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
        { view: "scrollbar", id: "scrollVer", group: "vertical" }
      ],
      gravity: 2
    },
    { resizer: true, width: 1 },
    {
      config: resourceConfig,   /*!*/
      cols: [
        { view: "resourceGrid", group: "grids", width: 435,
          scrollY: "resourceVScroll"
        },
        { resizer: true, width: 1 },
        { view: "resourceTimeline", scrollX: "scrollHor",
          scrollY: "resourceVScroll"
        },
        { view: "scrollbar", id: "resourceVScroll", group: "vertical" }
      ],
      gravity: 1
    },
    { view: "scrollbar", id: "scrollHor" }
  ]
};
~~~

请参考 [Resource Management](guides/resource-management.md) 文章。

## 可见性分组

有时候你需要同步布局中某些元素的可见性。例如，如果相邻单元格中有水平滚动条，你可能希望它们同时显示或隐藏。

![scrollable_grid](/img/scrollable_grid.png)

**相关示例**: [Grid 内的水平滚动](https://docs.dhtmlx.com/gantt/samples/07_grid/10_scrollable_grid.html)

再看一个示例。你在时间线的不同行有若干网格，想让它们具有相同的宽度。如果其中一个网格被调整大小，其他网格应匹配其大小。

![grid_group_width](/img/grid_group_width.png)

**相关示例**: [资源负载图](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)

这两个问题都可以通过视图的 **group** 属性来解决。该属性接受任意字符串值，具有相同 group 值的视图将被同步。

- 对滚动条而言，这意味着它们的可见性将被同步。如果该组中至少一个滚动条可见，那么该组中的所有滚动条都将可见。  
- 对其他单元格而言，这意味着它们将具有相同的宽度/高度，取决于布局。

同步滚动条的可见性：

~~~js
gantt.config.layout = {
  css: "gantt_container",
  cols: [
    {
      width: 400,
      minWidth: 200,
      maxWidth: 600,
      rows: [
        { view: "grid", scrollX: "gridScroll", scrollable: true,
          scrollY: "scrollVer"
        },
        { view: "scrollbar", id: "gridScroll", group: "horizontal" }    /*!*/
      ]
    },
    { resizer: true, width: 1 },
    {
      rows: [
        { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
        { view: "scrollbar", id: "scrollHor", group: "horizontal" }      /*!*/
      ]
    },
    { view: "scrollbar", id: "scrollVer" }
  ]
};
~~~

同步网格的宽度：

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        { view: "grid", group: "grids", scrollY: "scrollVer" },
        { resizer: true, width: 1 },
        { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
        { view: "scrollbar", id: "scrollVer", group: "vertical" }    /*!*/
      ],
      gravity: 2
    },
    { resizer: true, width: 1 },
    {
      config: resourceConfig,
      cols: [
        { view: "resourceGrid", group: "grids", width: 435,
          scrollY: "resourceVScroll"
        },
        { resizer: true, width: 1 },
        { view: "resourceTimeline", scrollX: "scrollHor",
          scrollY: "resourceVScroll"
        },
        { view: "scrollbar", id: "resourceVScroll", group: "vertical" }   /*!*/
      ],
      gravity: 1
    },
    { view: "scrollbar", id: "scrollHor" }
  ]
};
~~~

## 甘特图布局部分的尺寸

你可以通过在每个单元的配置中设置 **gravity** 属性来调控甘特图布局单元格的相对大小。该参数定义单元格彼此之间的大小比例。

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        // columns config
      ],
      gravity: 2     /*!*/
    },
    { resizer: true, width: 1 },
    {
      config: resourceConfig,
      cols: [
        // columns config
      ],
      gravity: 1       /*!*/
    },
    { view: "scrollbar", id: "scrollHor" }
  ]
};
~~~

在上面的示例中，甘特图和资源图的尺寸比例为 2:1。这意味着甘特图将占用 66%，资源图将占用 33%。  
使用 1:1 的比例时，两个图表各占 50%。

### 最小/最大单元格宽度

可以使用 **minWidth/maxWidth** 属性来限制布局部分在调整大小时的宽度。请注意，这些设置只能应用于在 **cols** 数组中的单元格。你也可以将 **minHeight/maxHeight** 属性应用于 **rows** 数组中的单元格，以定义布局单元格的最小/最大高度。

下面的示例展示如何将 **minWidth/maxWidth** 属性添加到列配置中：

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
        { view: "grid", scrollable: true, scrollX: "scrollHor1",
          scrollY: "scrollVer"
        },
        { view: "scrollbar", id: "scrollHor1", scroll: 'x', group: 'hor' }
      ]
    },
    { resizer: true, width: 1 },
    {
      rows: [
        { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
        { view: "scrollbar", id: "scrollHor", scroll: 'x', group: 'hor' }
      ]
    },
    {
      view: "scrollbar", id: "scrollVer"
    }
  ]
};
~~~

## 隐藏父布局视图

如果你需要在所有子项不可见时隐藏某个布局视图，请在相关布局单元的配置中指定 **hide_empty:true**，例如：

~~~js
gantt.config.layout = {
  css: "gantt_container",
  cols: [
    {
      hide_empty: true, /*!*/
      rows: [
        { view: "grid" }
      ]
    },
    { resizer: true },
    {
      hide_empty: true, /*!*/
      rows: [
        { view: "timeline" }
      ]
    }
  ]
};
~~~

**相关示例**: [隐藏网格/时间线视图](https://snippet.dhtmlx.com/5/157c0db66)

## 在视图之间切换

如果你需要在不同的布局视图之间切换，请参考 [How to toggle grid/chart](guides/how-to.md#how-to-toggle-gridchart) 和 [How to toggle the resource view](guides/how-to.md#how-to-toggle-the-resource-view) 小节以获取更多详细信息。

## 在网格视图中冻结列

你可以初始化一个甘特图，其中一个或多个列会被冻结。要实现这一点，请按照 [How to freeze/fix columns in the grid](guides/how-to.md#how-to-freezefix-columns-in-the-grid) 小节中的说明进行操作。