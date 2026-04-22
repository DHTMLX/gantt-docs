---
title: "간트 차트 레이아웃"
sidebar_label: "간트 차트 레이아웃"
---

# 간트 차트 레이아웃

버전 5.0부터 Gantt는 구성 가능한 레이아웃을 지정하고 컴포넌트의 요소를 레이아웃의 내부 뷰로 배치하는 기능을 제공합니다. 이를 통해 추가 타임라인과 그리드를 사용하여 유연한 간트 차트 구조를 만들고 요소를 배치하는 다양한 구성 방식을 정의할 수 있습니다.

예를 들어 타임라인의 오른쪽에 한 칸 더 그리드를 배치할 수 있습니다:

![gantt_two_grids](/img/gantt_two_grids.png)


**관련 샘플**: [Grid 열을 간트 차트의 오른쪽에 배치](https://docs.dhtmlx.com/gantt/samples/10_layout/01_rightside_columns.html)


또는 기본 뷰 아래에 또 다른 그리드와 타임라인을 추가할 수 있습니다.

![gantt_resource_panel](/img/gantt_resource_panel.png)


**관련 샘플**: [리소스 패널이 있는 간트 차트](https://docs.dhtmlx.com/gantt/samples/10_layout/02_resource_panel.html)


## 기본 레이아웃

레이아웃은 [gantt.config.layout](api/config/layout.md) 구성 옵션을 통해 설정됩니다. 기본 레이아웃 구성은 아래와 같습니다:

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        {
          // 기본 그리드 뷰
          view: "grid",
          scrollX: "scrollHor",
          scrollY: "scrollVer"
        },
        { resizer: true, width: 1 },
        {
          // 기본 타임라인 뷰
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

Gantt의 레이아웃은 뷰로 채워지는 셀로 구성됩니다. 주요 및 보조 Gantt 요소는 **views**로 제시되며, 이는 다음과 같습니다:

- **grid** - 간트 차트의 그리드 부분을 정의합니다. 작업 표시를 위한 기본 그리드는 *id:"grid"*를 가집니다;
- **timeline** - 간트 차트의 타임라인 부분을 정의합니다. 작업 표시를 위한 기본 타임라인은 *id:"timeline"*를 가집니다;
- **resizer** - 리사이저 선을 정의합니다. 리사이저를 활성화하려면 **resizer** 속성을 *true*로 설정해야 합니다. **PRO 에디션에서만 가능**;
- **scrollbar** - 간트 차트에서 사용되는 스크롤바를 정의합니다. 그리드와 타임라인 뷰는 특정 스크롤바에 바인딩될 수 있습니다. 아래 내용을 참조하세요.
- **resourceGrid** - 리소스 패널을 위한 미리 구성된 그리드. **PRO 에디션에서만 가능**. 자세한 내용은 [여기](guides/resource-management.md)를 참조.
- **resourceTimeline** - 리소스 패널을 위한 미리 구성된 타임라인. **PRO 에디션에서만 가능**. 자세한 내용은 [여기](guides/resource-management.md)를 참조.

뷰 구성은 해당 속성을 가진 객체로 지정됩니다. **grid** 및 **timeline** 뷰에 대한 사용자 정의 구성 옵션을 설정할 수 있습니다. 기본 옵션은 전역 [gantt.config](guides/common-configuration.md#ganttconfigobject) 객체에서 가져옵니다.

:::note
참고: Gantt 초기화 이전에 레이아웃 구성을 지정해야 합니다. 레이아웃에 변경을 가한 경우 [resetLayout](api/method/resetlayout.md)으로 새로 고쳐야 합니다.
:::

## 스크롤바

레이아웃의 스크롤바는 **"scrollbar"** 뷰에 의해 지정됩니다. 수평 스크롤바와 수직 스크롤바를 모두 설정할 수 있습니다.

레이아웃에서 스크롤바를 사용하려면 필요한 스크롤바의 ID를 통해 해당 뷰에 바인딩하기 위해 **scrollX** 또는 **scrollY** 속성을 사용해야 합니다.

### 뷰용 스크롤바

하나의 특정 스크롤바를 필요한 뷰에 여러 개 뷰를 바인딩하는 것이 가능합니다. 뷰를 스크롤바에 바인딩하려면:

- 필요한 스크롤 방향으로 스크롤바를 설정하고 ID를 할당합니다
- 뷰 구성 객체 안에서 **scrollX/scrollY** 속성의 값으로 스크롤바의 ID를 사용합니다

`cols` 배열 안에 스크롤바를 정의하면 수직 스크롤바가 생성되고, `rows` 배열에 정의하면 수평 스크롤바가 생성됩니다. 또한 **scroll** 매개변수를 사용해 스크롤 모드를 명시적으로 정의할 수 있습니다:

~~~js
{ view: "scrollbar", id: "scroller", scroll: "x" } // 수평
~~~
또는:
~~~js
{ view: "scrollbar", id: "scroller", scroll: "y" } // 수직
~~~

다음과 같이 수직 스크롤에 맞춰 커스텀 그리드 및 타임라인 뷰를 바인딩해 보겠습니다:

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

수직 스크롤바를 스크롤하면 그리드와 타임라인이 함께 스크롤됩니다. 기본 레이아웃에서 그리드 및 타임라인 뷰는 수평 및 수직 스크롤에 모두 바인딩됩니다.

그리드 뷰에 대해 별도의 수평 스크롤바를 지정하는 것도 가능합니다. 해당 섹션의 자세한 내용은 [여기](guides/specifying-columns.md#horizontal-scrollbar)에서 확인하십시오.

### 뷰용 스크롤바들

위의 하위 섹션에서는 필요한 뷰에 하나의 특정 스크롤바를 추가하는 방법을 살펴보았습니다. 이를 위해서는 다음과 같이 간단한 레이아웃 구성을 만들면 충분했습니다:

~~~js
{ cols: [ { rows: [ {}, {} ] }, { rows: [ {}, {} ] } ] }
~~~

또는

~~~js
{ rows: [ { cols: [ {}, {} ] }, { cols: [ {}, {} ] } ] }
~~~

뷰를 수직 및 수평 스크롤바 모두에 바인딩해야 하는 경우, `cols`와 `rows` 배열이 여러 번 중첩된 복잡한 레이아웃 구성을 만들어야 합니다. 예를 들면:

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

다음 예제들을 참고하십시오:

- [Gantt. Layout views with own scrollbars](https://snippet.dhtmlx.com/cv9w37tu)
- [Gantt. Universal Layout configuration](https://snippet.dhtmlx.com/uqejdyqc)

## 레이아웃 커스터마이징

기본 레이아웃 구성을 바꾸고 페이지의 Gantt 차트 요소 배치를 위한 필요한 스키마를 추가 레이아웃 뷰를 사용해 지정할 수 있습니다.

예를 들어 추가 그리드와 타임라인 뷰를 만들어 메인 간트 차트 아래에 하단의 리소스 패널을 만들 수 있습니다. 이러한 커스텀 레이아웃을 구현하기 위한 절차는 다음과 같습니다:

- 다중 행 레이아웃 생성
- 레이아웃의 첫 번째 행에 기본 그리드와 타임라인 추가
- 다음 행에 추가 그리드와 타임라인을 추가하고 커스텀 데이터 소스에 바인딩
- 이들 행 사이에 리사이저 추가
- 마지막 행에 스크롤바를 추가하고 기본 타임라인과 리소스 타임라인에 바인딩

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      // 기본 레이아웃
      cols: [
        { view: "grid", config: mainGridConfig, scrollY: "scrollVer" },
        { resizer: true, width: 1 },
        { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
        { view: "scrollbar", id: "scrollVer" }
      ]
    },
    { resizer: true, width: 1 },
    {
      // 커스텀 레이아웃
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

위 예제에서 추가 그리드 뷰가 추가되었습니다. 이 뷰는 리소스 목록과 그들의 작업 부하를 표시합니다. 또한 한 달 동안의 근무 시간을 분배하고 표준 및 초과 시간을 표시하는 추가 타임라인 뷰가 있습니다.

### 커스텀 그리드 및 타임라인의 속성

커스텀 그리드와 타임라인은 추가 속성을 가지게 됩니다:

#### 그리드 및 타임라인 뷰용

- **bind** - (*string*) 데이터 저장소의 ID를 설정합니다(예시의 경우 "resource");

#### 타임라인 뷰용

- **bindLinks** - (*string*) 연결의 원본을 가리킵니다. 관련 링크가 없으면 *null*;
- **layers** - (*array*) 데이터를 스타일링하는 방법을 설명하는 **addLayer()** 함수들의 집합으로 정의된 구성 옵션.

### 커스텀 뷰용 데이터 저장소 추가하기

커스텀 뷰에 해당 데이터를 채우려면 별도의 데이터 저장소를 추가해야 합니다. 새 데이터 저장소를 만들려면 [createDatastore](api/method/createdatastore.md) 메서드를 사용하고 데이터 저장소의 구성을 지정합니다:

~~~js
const resourcesStore = gantt.createDatastore({
  name: "resource",
  initItem: (item) => {
    item.id = item.key || gantt.uid();
    return item;
  }
});
~~~

위 예제에서 "resource"라는 데이터 저장소가 추가됩니다.

데이터 저장소에서 커스텀 뷰로 데이터를 로드하려면 [parse](api/method/parse.md) 메서드를 사용합니다:

~~~js
resourcesStore.parse([ // resources
  { key: '0', label: "N/A" },
  { key: '1', label: "John" },
  { key: '2', label: "Mike" },
  { key: '3', label: "Anna" }
]);
~~~

필요한 데이터 저장소의 구성 객체를 반환하려면 [getDatastore](api/method/getdatastore.md) 메서드를 사용합니다:

~~~js
const tasksStore = gantt.getDatastore("task");
~~~

메서드는 데이터 저장소의 이름을 매개변수로 받습니다.

:::note
내장 리소스 뷰를 사용하는 경우, gantt가 해당 데이터 저장소를 자동으로 생성해 줄 수 있습니다. [자세한 내용](guides/resource-management.md#working-with-resource-view-panel)을 확인하십시오.
:::

### 동적으로 리사이저 비활성화/활성화 {#enable_disable_resizers}

일부 경우에 간트 차트의 셀 사이에 있는 리사이저를 동적으로 비활성화해야 할 수 있습니다. 가장 간단한 해결책은 CSS를 통해 이를 숨기는 것입니다.

다음과 같은 규칙이 필요합니다:

~~~css
.no_resizers .gantt_resizer {
  display: none;
}
~~~

그런 다음 gantt 컨테이너에 클래스를 적용해 리사이저를 숨길 수 있습니다:

~~~js
gantt.$container.classList.add("no_resizers");
~~~

다시 리사이저를 보이게 하려면 클래스를 제거하면 됩니다:

~~~js
gantt.$container.classList.remove("no_resizers");
~~~

## Inner View로서의 HTML

또한 Gantt 레이아웃의 내부 뷰로 일부 커스텀 HTML을 사용할 수 있습니다. 예를 들어:

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


## 필수 뷰 및 설정

gantt 객체의 공개 API에는 특정 레이아웃 뷰에서 파생된 메서드들이 포함됩니다. 예: [getTaskPosition](api/method/gettaskposition.md), [getTaskNode](api/method/gettasknode.md), [getScrollState](api/method/getscrollstate.md). 

이들 메서드가 예상대로 작동하려면 레이아웃에 기본 그리드, 타임라인, 스크롤바가 포함되어 있어야 하며, gantt가 이를 찾아야 합니다. 이를 위해 기본 뷰에 특정 ID를 할당합니다:

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

필수 뷰와 해당 ID는 다음과 같습니다:

- view: "grid", id: "grid"
- view: "timeline", id: "timeline"
- view: "scrollbar", id: "scrollHor"
- view: "scrollbar", id: "scrollVer"

참고로 ID가 지정되지 않으면 gantt는 뷰 이름을 기본 뷰 ID로 사용하거나 고유 ID를 자동으로 생성합니다. 따라서 기본 그리드 및 타임라인의 경우 "id" 매개변수를 생략할 수 있습니다:

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

레이아웃은 필요한 추가 뷰를 얼마든지 포함할 수 있습니다.

## 뷰의 구성 및 템플릿

Grid와 Timeline 뷰는 전역 [gantt.config/gantt.templates](guides/common-configuration.md) 의 템플릿과 구성(configuration)을 재사용합니다. 다만 이러한 설정은 레이아웃 레벨에서 특정 뷰에 대해 재정의할 수 있습니다.

예를 들어:

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


뷰는 부모 레이아웃으로부터 구성 및 템플릿을 상속받을 수 있습니다:

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

자원 관리(Resource Management) 문서를 확인하십시오.


## 가시성 그룹

레이아웃의 일부 요소의 가시성을 동기화해야 하는 경우가 있습니다. 예를 들어 인접 셀에 수평 스크롤바가 있다면 두 스크롤바를 동시에 표시하거나 숨기고 싶을 수 있습니다.

![scrollable_grid](/img/scrollable_grid.png)


**관련 샘플**: [Grid 안의 가로 스크롤](https://docs.dhtmlx.com/gantt/samples/07_grid/10_scrollable_grid.html)


다른 예를 살펴보겠습니다. 타임라인의 서로 다른 여러 행에 여러 그리드가 있고 이들의 너비를 같게 만들고 싶습니다. 그리드 중 하나의 크기를 조정하면 다른 그리드도 같은 크기가 되어야 합니다.

![grid_group_width](/img/grid_group_width.png)


**관련 샘플**: [리소스 로드 다이어그램](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)


두 가지 문제 모두 뷰의 **group** 속성으로 해결할 수 있습니다. 이 속성은 임의의 문자열 값을 가지며, 같은 group 값을 가진 뷰들은 서로 동기화됩니다. 

- 스크롤바의 경우 그룹의 하나 이상이 보이면 그룹의 모든 스크롤바가 보입니다. 

- 다른 셀의 경우 레이아웃에 따라 같은 너비/높이를 가지게 됩니다.

스롤바 가시성 동기화:

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

그리드의 너비 동기화:

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

## 간트 레이아웃 부분의 크기 지정

레이아웃 셀의 상대적 크기를 구성 속성인 **gravity**로 제어할 수 있습니다. 이 매개변수는 서로에 대한 셀 크기를 정의합니다.

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        // 열 구성
      ],
      gravity: 2     /*!*/
    },
    { resizer: true, width: 1 },
    {
      config: resourceConfig,
      cols: [
        // 열 구성
      ],
      gravity: 1       /*!*/
    },
    { view: "scrollbar", id: "scrollHor" }
  ]
};
~~~

위 예제에서 간트 차트와 리소스 차트의 크기 비가 2:1이 됩니다. 즉, 간트 차트가 66%를 차지하고 리소스 차트가 33%를 차지합니다. 비율을 1:1로 사용하면 두 차트가 각각 50%를 차지하게 됩니다.

### 최소/최대 셀 너비

minWidth/maxWidth 속성은 resize 작업 시 레이아웃 부분의 너비를 제한하는 데 사용할 수 있습니다. 이 설정은 cols 배열 내부의 셀에만 적용될 수 있다는 점을 유의하십시오. 또한 rows 배열의 셀에 minHeight/maxHeight 속성을 적용하여 레이아웃 셀의 최소/최대 높이를 정의할 수 있습니다.

아래 예제는 columns 구성에 **minWidth/maxWidth** 속성을 추가하는 방법을 보여 줍니다:

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

## 부모 레이아웃 뷰 숨기기

모든 자식 항목이 보이지 않는 경우 레이아웃 뷰를 숨겨야 할 필요가 있을 때가 있습니다. 관련 레이아웃 셀 구성에서 **hide_empty:true**를 지정하면 됩니다. 예:

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

**관련 샘플**: [Hiding grid/timeline views](https://snippet.dhtmlx.com/5/157c0db66)

## 뷰 간 전환

다른 레이아웃 뷰 사이를 전환해야 하는 경우 더 자세한 내용은 [How to toggle grid/chart](guides/how-to.md#how-to-toggle-gridchart) 및 [How to toggle the resource view](guides/how-to.md#how-to-toggle-the-resource-view) 섹션을 확인하십시오.

## 그리드 뷰에서 열 고정

하나 이상의 열이 고정되는 Gantt 차트를 초기화할 수 있습니다. 이를 구현하려면 [How to freeze/fix columns in the grid](guides/how-to.md#how-to-freezefix-columns-in-the-grid) 섹션의 지침을 따라 주십시오.