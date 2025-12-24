---
title: "간트 레이아웃"
sidebar_label: "간트 레이아웃"
---

# 간트 레이아웃


버전 5.0부터 Gantt는 컴포넌트의 요소들을 레이아웃 내의 내부 뷰로 배치할 수 있는 커스터마이즈 가능한 레이아웃을 정의하는 기능을 지원합니다. 이 기능을 통해 추가 타임라인 및 그리드를 삽입하여, 다양한 방식으로 간트 차트의 구조를 유연하게 구성할 수 있습니다.

예를 들어, 타임라인의 오른쪽에 추가 그리드를 넣을 수 있습니다.

![gantt_two_grids](/img/gantt_two_grids.png)


[Grid columns rightside of gantt](https://docs.dhtmlx.com/gantt/samples/10_layout/01_rightside_columns.html)


또는, 기본 그리드와 타임라인 아래에 다른 그리드와 타임라인을 추가할 수도 있습니다.

![gantt_resource_panel](/img/gantt_resource_panel.png)


[Gantt chart with resource panel](https://docs.dhtmlx.com/gantt/samples/10_layout/02_resource_panel.html)


## 기본 레이아웃 {#defaultlayout}


레이아웃은 [gantt.config.layout](api/config/layout.md) 설정을 통해 제어됩니다. 아래는 기본 레이아웃 구성 예시입니다:

~~~js
gantt.config.layout = {
    css: "gantt_container",
      rows:[
           {
           cols: [
             {
              // 기본 그리드 뷰    
              view: "grid",  
              scrollX:"scrollHor", 
              scrollY:"scrollVer"
             },
             { resizer: true, width: 1 },
             {
              // 기본 타임라인 뷰
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

간트 레이아웃은 뷰로 채워진 셀들로 구성됩니다. 이 뷰들은 다음과 같은 주요 및 보조 Gantt 요소를 나타냅니다:

- **grid** - 간트 차트의 그리드 영역. 작업을 표시하는 기본 그리드는 *id:"grid"*를 가집니다.
- **timeline** - 간트 차트의 타임라인 영역. 작업용 기본 타임라인은 *id:"timeline"*을 가집니다.
- **resizer** - 리사이저 라인. 활성화하려면 **resizer** 속성을 *true*로 설정하세요. **이 기능은 PRO 에디션에서만 사용 가능합니다.**
- **scrollbar** - 간트 차트에서 사용되는 스크롤바. 그리드 및 타임라인 뷰는 특정 스크롤바와 연결할 수 있습니다(아래에서 자세히 설명).
- **resourceGrid** - 리소스 패널용으로 사전 구성된 그리드. **PRO 에디션에서만 사용 가능**. 자세한 내용은 [여기](guides/resource-management.md) 참고.
- **resourceTimeline** - 리소스 패널용으로 사전 구성된 타임라인. **PRO 에디션에서만 사용 가능**. 자세한 내용은 [여기](guides/resource-management.md) 참고.

각 뷰는 관련 속성을 가진 객체로 구성됩니다. 
**grid**와 **timeline** 뷰에 대해 [설정을 커스터마이즈](#configsandtemplatesofviews)할 수 있습니다. 
기본적으로 옵션은 전역 [gantt.config](guides/common-configuration.md#ganttconfigobject) 객체에서 가져옵니다.

:::note
레이아웃 구성은 Gantt를 초기화하기 전에 설정해야 합니다. 이후에 레이아웃을 변경했다면, [resetLayout](api/method/resetlayout.md)를 사용하여 새로고침해야 합니다.
:::

## 스크롤바 {#scrollbar}


레이아웃 내의 스크롤바는 **"scrollbar"** 뷰로 정의됩니다. 수평 및 수직 스크롤바 모두 사용할 수 있습니다.

스크롤바를 추가하려면, 해당 뷰에 **scrollX** 또는 **scrollY** 속성에 스크롤바의 id를 지정하여 연결합니다.

### 뷰에 스크롤바 연결하기

여러 뷰가 동일한 스크롤바를 공유할 수 있습니다. 뷰를 스크롤바에 연결하려면:

- 원하는 스크롤 방향으로 스크롤바를 정의하고 ID를 할당합니다.
- 뷰의 **scrollX** 또는 **scrollY** 속성에 해당 스크롤바 ID를 참조합니다.

`cols` 배열 내부에 스크롤바를 배치하면 수직 스크롤바가 생성되고, `rows` 배열에 배치하면 수평 스크롤바가 생성됩니다. 또는 **scroll** 속성을 사용해 스크롤 방향을 명시적으로 지정할 수 있습니다:

~~~js
{ view: "scrollbar", id:"scroller", scroll: "x"    } // 수평
~~~
또는:
~~~js
{ view: "scrollbar", id:"scroller", scroll: "y"    } // 수직
~~~

아래는 커스텀 그리드와 타임라인 뷰를 수직 스크롤바에 연결하는 예시입니다:

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

수직 스크롤바를 스크롤하면 그리드와 타임라인이 함께 이동합니다.
기본 레이아웃에서는 그리드와 타임라인 뷰가 수평 및 수직 스크롤바 모두와 연결되어 있습니다.

Grid 뷰 전용의 별도 수평 스크롤바도 지정할 수 있습니다. 관련 내용은 [여기](guides/specifying-columns.md#horizontalscrollbar)에서 확인하세요.

### 뷰의 스크롤바

이전에 단순한 레이아웃 구성으로 뷰에 단일 스크롤바를 추가하는 방법을 살펴보았습니다:

~~~js
{cols: [ {rows: [{}, {}]}, {rows: [{}, {}]}]}
~~~

또는

~~~js
{rows: [ {cols: [{}, {}]}, {cols: [{}, {}]}]}
~~~

만약 뷰를 수직 및 수평 스크롤바 모두에 연결하려면, `cols`와 `rows` 배열을 여러 번 중첩하는 더 복잡한 레이아웃이 필요합니다. 예를 들어:

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

아래 예시도 참고하세요:

- [Gantt. Layout views with own scrollbars](https://snippet.dhtmlx.com/cv9w37tu)
- [Gantt. Universal Layout configuration](https://snippet.dhtmlx.com/uqejdyqc)

## 레이아웃 커스터마이즈 {#layoutcustomization}


기본 레이아웃을 수정하여, Gantt 차트에 추가 뷰를 넣는 방식으로 원하는 레이아웃을 구성할 수 있습니다.

예를 들어, 메인 간트 차트 아래에 리소스 패널을 추가하고, 그리드와 타임라인 뷰를 추가하려면 다음과 같이 하면 됩니다:

- 다중 행 레이아웃을 생성합니다.
- 첫 번째 행에 기본 그리드와 타임라인을 배치합니다.
- 두 번째 행에 추가 그리드와 타임라인을 넣고, 이들을 커스텀 데이터 소스에 바인딩합니다.
- 행 사이에 리사이저를 추가합니다.
- 마지막 행에 스크롤바를 넣고, 기본 타임라인과 리소스 타임라인 모두에 연결합니다.

구성 예시는 다음과 같습니다:

~~~js
gantt.config.layout = {
    css: "gantt_container",
    rows:[
        {
          // 기본 레이아웃
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
          // 커스텀 레이아웃
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

이 예시에서 추가된 그리드 뷰는 리소스 및 작업량을 표시하고, 추가된 타임라인은 한 달 동안의 근무 시간 분포를 보여주며, 표준 및 초과 근무 시간을 강조합니다.

### 커스텀 그리드 및 타임라인의 속성

커스텀 그리드와 타임라인 뷰에는 몇 가지 추가 속성이 있습니다:

#### 그리드, 타임라인 공통

- **bind** - (*string*) 데이터를 가져올 데이터스토어의 ID를 지정합니다(예시에서는 "resource").

#### 타임라인 뷰

- **bindLinks** - (*string*) 연결 소스를 지정합니다; 관련 링크가 없으면 *null*로 설정합니다.
- **layers** - (*array*) 데이터의 스타일링 방식을 정의하는 **addLayer()** 함수들의 집합입니다.

### 커스텀 뷰를 위한 데이터스토어 추가

커스텀 뷰에 적합한 데이터를 채우기 위해서는 별도의 데이터스토어를 추가해야 합니다. 새로운 데이터스토어를 생성하려면  
[createDatastore](api/method/createdatastore.md) 메서드를 사용하며, 이때 데이터스토어의 설정을 지정합니다:

~~~js
var resourcesStore = gantt.createDatastore({
    name:"resource",
    initItem: function(item){
        item.id = item.key || gantt.uid();
        return item;
    }
});
~~~

이 예제에서는 "resource"라는 이름의 데이터스토어가 생성됩니다.

커스텀 뷰에 데이터스토어에서 데이터를 로드하려면 [parse](api/method/parse.md) 메서드를 사용합니다:

~~~js
resourcesStore.parse([// resources
    {key:'0', label: "N/A"},
    {key:'1', label: "John"},
    {key:'2', label: "Mike"},
    {key:'3', label: "Anna"}
]);
~~~

특정 데이터스토어의 설정 객체를 얻으려면 [getDatastore](api/method/getdatastore.md) 메서드를 사용하세요:

~~~js
var tasksStore = gantt.getDatastore("task");
~~~

이 메서드는 데이터스토어의 이름을 파라미터로 받습니다.

:::note
내장된 리소스 뷰를 사용할 때는 gantt가 데이터스토어를 자동으로 생성할 수 있습니다. [자세한 내용은 여기](guides/resource-management.md#workingwithresourceviewpanel)를 참고하세요.
:::

### 리사이저 동적 비활성화/활성화 {#enable_disable_resizers}

때때로 gantt 셀 사이의 리사이저를 동적으로 비활성화해야 할 필요가 있습니다. 가장 쉬운 방법은 CSS로 리사이저를 숨기는 것입니다.

다음과 같은 CSS 규칙을 사용할 수 있습니다:

~~~css
.no_resizers .gantt_resizer{
    display:none;
}
~~~

이후, gantt 컨테이너에 클래스를 추가하여 리사이저를 숨깁니다:

~~~js
gantt.$container.classList.add("no_resizers");
~~~

리사이저를 다시 표시하려면 클래스를 제거하면 됩니다:

~~~js
gantt.$container.classList.remove("no_resizers");
~~~

## HTML을 Inner View로 사용하기 {#htmlasinnerview}


커스텀 HTML도 Gantt 레이아웃 내에서 inner view로 사용할 수 있습니다. 다음은 예시입니다:

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


## 필수 뷰 및 설정 {#requiredviewsandsettings}


gantt 객체의 public API에는 [getTaskPosition](api/method/gettaskposition.md), [getTaskNode](api/method/gettasknode.md), [getScrollState](api/method/getscrollstate.md) 등 특정 레이아웃 뷰와 연결된 메서드가 포함되어 있습니다.

이 메서드들이 제대로 동작하려면, 레이아웃에 기본 grid, timeline, 스크롤바가 포함되어 있어야 하며 gantt가 이들을 찾을 수 있어야 합니다. 이를 위해 기본 뷰에 특정 id를 할당합니다:

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

필수 뷰와 그 id는 다음과 같습니다:

- view: "grid", id: "grid"
- view: "timeline", id: "timeline"
- view: "scrollbar", id: "scrollHor"
- view: "scrollbar", id: "scrollVer"

id를 설정하지 않으면, gantt는 기본적으로 뷰 이름을 id로 사용하거나 자동으로 고유 id를 생성합니다. 따라서 기본 grid와 timeline의 경우 "id" 파라미터를 생략할 수 있습니다:

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

레이아웃에 원하는 만큼 추가 뷰를 넣을 수 있습니다.

## 뷰의 설정과 템플릿 {#configsandtemplatesofviews}


Grid와 Timeline 뷰는 전역 [gantt.config/gantt.templates](guides/common-configuration.md)에서 템플릿 및 설정을 사용합니다. 하지만, 레이아웃 레벨에서 특정 뷰에 대해 이를 오버라이드할 수 있습니다.

예시:

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

뷰는 부모 레이아웃의 설정과 템플릿을 상속받을 수도 있습니다:

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

자세한 내용은 [Resource Management](guides/resource-management.md) 문서를 참고하세요.


## Visibility 그룹 {#visibilitygroups}


특정 레이아웃 요소들의 표시 상태를 동기화해야 할 때가 있습니다. 예를 들어, 인접한 셀에 수평 스크롤바가 있다면, 두 스크롤바가 함께 표시되거나 숨겨지길 원할 수 있습니다.

![scrollable_grid](/img/scrollable_grid.png)


[Horizontal scroll inside Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/10_scrollable_grid.html)






또 다른 예는, 서로 다른 타임라인 행에 여러 grid가 있고, 이 grid들이 같은 너비를 공유해야 하는 경우입니다. 한 grid의 크기가 조정되면 다른 grid도 함께 조정됩니다.

![grid_group_width](/img/grid_group_width.png)


[Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)


이러한 시나리오는 뷰의 **group** 속성을 통해 해결할 수 있습니다. 이 속성은 임의의 문자열을 받을 수 있으며, 동일한 group 값을 가진 뷰들은 동기화됩니다.

- 스크롤바의 경우, 그룹 내 스크롤바 중 하나라도 표시되면 모두 표시됩니다.
- 기타 셀의 경우, 레이아웃에 따라 동일한 너비 또는 높이를 공유하게 됩니다.

스크롤바 표시 동기화 예시:

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

grid 너비 동기화 예시:

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

## Gantt 레이아웃 파트 크기 조정 {#sizingofganttlayoutparts}


Gantt 레이아웃 셀의 상대적인 크기는 각 셀 설정의 **gravity** 속성으로 제어할 수 있습니다. 이 값은 셀 간 크기 비율을 지정합니다.

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

이 예시에서는 Gantt 차트와 리소스 차트가 2:1 비율로 공간을 나눕니다. 즉, Gantt 차트가 약 66%, 리소스 차트가 약 33%를 차지합니다. 1:1 비율을 사용하면 공간이 동일하게 분배됩니다.

### 셀 최소/최대 너비/높이

리사이즈 시 레이아웃 파트의 크기를 제한하려면 **cols** 배열 내 셀에 **minWidth/maxWidth** 속성을 사용하세요. 마찬가지로 **rows** 배열의 셀에는 **minHeight/maxHeight**를 설정해 높이 제한이 가능합니다.

다음은 column 설정에서 **minWidth/maxWidth**를 사용하는 예시입니다:

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


## 부모 레이아웃 뷰 숨기기 {#hidingparentlayoutviews}


레이아웃 뷰의 모든 자식 뷰가 보이지 않을 때, 해당 레이아웃 셀의 설정에 **hide_empty:true**를 지정하면 부모 뷰를 숨길 수 있습니다:

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


## 뷰 전환 {#switchingbetweenviews}


서로 다른 레이아웃 뷰를 전환하려면 [How to toggle grid/chart](guides/how-to.md#howtotogglegridchart) 및 [How to toggle the resource view](guides/how-to.md#howtotoggletheresourceview) 섹션을 참고하세요.

## 그리드 뷰에서 컬럼 고정 {#freezingcolumnsinthegridview}


Gantt 차트를 하나 이상의 고정 컬럼과 함께 초기화할 수 있습니다. 방법은 [How to freeze/fix columns in the grid](guides/how-to.md#howtofreezefixcolumnsinthegrid) 섹션에서 확인하세요.

