---
title: "이전 버전에서의 마이그레이션"
sidebar_label: "이전 버전에서의 마이그레이션"
---

# 이전 버전에서의 마이그레이션

## 8.0 -> 9.0

v9.0 업데이트에서는 여러 가지 호환성 깨짐(breaking changes)이 도입되었습니다.

### 스킨이 CSS 변수로 전환됨

CSS 스킨(테마)이 완전히 재작업되어 이제 CSS 변수를 사용합니다. 컴포넌트의 HTML 구조와 CSS 클래스 이름은 대부분 변경되지 않았으나, 이전 버전의 Gantt용으로 작성된 CSS 스타일은 v9.0에서 의도한 대로 동작하지 않을 수 있습니다.

예를 들어, 다음과 같은 스타일은 작업의 우선순위에 따라 색상을 지정하는 데 사용되었습니다:

~~~html
<style>
    /* 테두리/진행률 색상 오버라이드를 위한 공통 스타일 */
    .gantt_task_line{
        border-color: rgba(0, 0, 0, 0.25);
    }
    .gantt_task_line .gantt_task_progress {
        background-color: rgba(0, 0, 0, 0.25);
    }

    /* high */
    .gantt_task_line.high {
        background-color: #03A9F4;
    }
    .gantt_task_line.high .gantt_task_content {
        color: #fff;
    }

    /* medium */
    .gantt_task_line.medium {
        background-color: #f57730;
    }
    .gantt_task_line.medium .gantt_task_content {
        color: #fff;
    }

    /* low */
    .gantt_task_line.low {
        background-color: #e157de;
    }
    .gantt_task_line.low .gantt_task_content {
        color: #fff;
    }
</style>
~~~

v9.0부터는 아래와 같은 스타일로 동일한 효과를 얻을 수 있습니다:

~~~html
<style>
    /* high */
    .gantt_task_line.high {
        --dhx-gantt-task-background: #d96c49;
        --dhx-gantt-task-color: #fff;
    }

    /* medium */
    .gantt_task_line.medium {
        --dhx-gantt-task-background: #f57730;
        --dhx-gantt-task-color: #fff;
    }

    /* low */
    .gantt_task_line.low {
        --dhx-gantt-task-background: #fff;
        --dhx-gantt-task-color: #fff;
    }
</style>
~~~

사용 가능한 변수는 [스킨 커스터마이제이션](guides/custom-skins.md) 페이지에서 확인할 수 있습니다.

:::note
마이그레이션 시 원하는 디자인을 얻기 위해 기존 CSS를 업데이트해야 할 수 있습니다.
:::

### 단일 CSS 파일

모든 테마가 이제 하나의 **dhtmlxgantt.css** 파일에 포함되어 있습니다.

특정 스킨을 활성화하려면 `gantt.skin` 속성을 사용하세요:

~~~js
gantt.skin = "material";
~~~

또는 [setSkin](api/method/setskin.md) 메서드를 사용할 수 있습니다:

~~~js
gantt.setSkin("material");
~~~

:::note
`gantt.setSkin()`을 사용하면 Gantt가 다시 그려집니다.
:::

**terrace** 외의 스킨을 사용할 경우 다음과 같은 마이그레이션 절차가 필요합니다:

1) 스킨의 CSS 파일을 `dhtmlxgantt.css` 파일로 교체하세요:

~~~html
<!-- OLD -->
<link rel="stylesheet" href="./codebase/dhtmlxgantt_material.css" type="text/css">
<!-- NEW -->
<link rel="stylesheet" href="./codebase/dhtmlxgantt.css" type="text/css">
~~~

2) 자바스크립트에서 필요한 스킨을 활성화하세요:

~~~js
gantt.setSkin("material");
gantt.init("gantt_here");
~~~

### 내장 베이스라인, 데드라인 및 제약조건 지원

이전에는 베이스라인을 추가하려면 `gantt.addTaskLayer` API를 사용하여 직접 코딩해야 했습니다. Gantt 9.0에서는 베이스라인 엔티티와 함께 데드라인 및 작업 제약조건에 대한 내장 지원이 추가되었습니다.

기본 설정을 끄고 베이스라인이나 데드라인을 수동으로 렌더링하려면, 해당 설정 옵션([baselines](api/config/baselines.md) 및 [deadlines](api/config/deadlines.md))을 사용할 수 있습니다:

~~~js
// 내장 베이스라인 기능 비활성화
gantt.config.baselines = false;

// 내장 데드라인 기능 비활성화
gantt.config.deadlines = false;
~~~

작업 제약조건의 내장 표시 역시 확장된 [auto_scheduling](api/config/auto_scheduling.md) 설정을 통해 비활성화할 수 있습니다:

~~~js
gantt.config.auto_scheduling = {
  enabled: true, 
  show_constraints: false /*!*/
};
~~~

이렇게 하면 자동 스케줄링 기능은 유지하면서 기본 작업 제약조건 표시만 비활성화됩니다.

### 타임라인에서 스티키 라벨

v9.0부터 타임스케일 라벨이 기본적으로 스크롤 시 화면에 고정되어 표시됩니다. 즉, 라벨이 뷰포트를 따라 움직이며 자연스럽게 사라질 때까지 계속 보입니다. 이전 버전에서는 라벨이 셀 중앙에 고정되어 스크롤 시 보이지 않았습니다.

이전 동작으로 되돌리고 싶다면 [scale](guides/configuring-time-scale.md) 객체의 `sticky` 속성을 false로 설정하세요:

~~~js
gantt.config.scales = [
  {unit: "year", step: 1, format: "%Y", sticky: false},
  {unit: "month", step: 1, format: "%F", sticky: false},
  {unit: "day", step:1, format: "%j", sticky: false}
];
~~~

### Promise 구현

**Bluebird** 라이브러리가 Gantt 번들에서 제외되었습니다. [Promise](api/method/promise.md)는 이제 네이티브 Promise 구현을 사용합니다.

### Lightbox 크기 조정

v9.0부터 [resizeLightbox](api/method/resizelightbox.md) 메서드는 더 이상 필요하지 않으므로 Gantt 코드에서 삭제되었습니다. Lightbox 크기 조정이 자동으로 동작하므로, 설정에 **resizeLightbox()** 메서드가 있다면 오류를 방지하기 위해 제거해야 합니다.

## 7.1 -> 8.0

### 리소스 할당

이전 DHTMLX Gantt 버전에서는 리소스 할당 변경 사항이 작업 객체의 속성으로 백엔드에 전송되어, 백엔드 API와의 통합이 다소 복잡해질 수 있었습니다.

DHTMLX Gantt v8.0부터는 리소스 및 리소스 할당 변경 사항을 dataProcessor를 통해 라우팅할 수 있습니다. 자세한 내용은 [Routing CRUD actions of resources and resource assignments](guides/server-side.md#resources_crud) 섹션을 참고하세요.

### 내보내기 서비스

v8.0부터 가져오기/내보내기 기능이 gantt 라이브러리에 포함되어 있습니다.

따라서, 온라인 내보내기 서비스를 활성화하기 위해 **https://export.dhtmlx.com/gantt/api.js**를 페이지에 포함했다면, 예를 들어:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

이 파일을 제거하고 **gantt.plugins** 메서드를 사용하여 **export_api** 확장을 활성화해야 합니다:

~~~js
gantt.plugins({
    export_api: true
});
~~~

### 더 이상 사용되지 않는 클래스 이름

v8.0부터 아래의 더 이상 사용되지 않는 클래스 이름이 제거되고 새로운 이름으로 대체되었습니다:

- ".dhtmlx-info" -> **".gantt-info"**
- ".dhtmlx-error" -> **".gantt-info"**
- ".dhtmlx_popup_title" -> **".gantt_popup_title"**
- ".dhtmlx_popup_text" -> **".gantt_popup_text"**
- ".dhtmlx_popup_controls" -> **".gantt_popup_controls"**
- ".dhtmlx_ok_button" -> **".gantt_ok_button"**
- ".dhtmlx_click_me_button" -> **".gantt_click_me_button"**
- ".dhtmlx_popup_button" -> **".gantt_popup_button"**
- ".dhtmlx_modal_box" -> **".gantt_modal_box"**
- ".dhtmlx-" + config.type -> **".gantt-" + config.type**
- ".dhtmlx_" + btn.label.toLowerCase() + "_button" -> **".gantt_" + btn.label.toLowerCase() + "_button"**

## 7.0 -> 7.1

버전 7.1은 기존 코드를 수정해야 하는 호환성 깨짐(breaking changes)이 없습니다.

마일스톤 렌더링 방식에 사소한 시각적 변화가 있으며, 필요하다면 코드로 이전 방식으로 되돌릴 수 있습니다.
리소스 패널을 사용하는 대형 프로젝트에서는 리소스 할당의 새로운 로직으로 인해 성능 저하가 발생할 수 있으며, 불필요한 로직을 비활성화하여 이를 완화할 수 있습니다.

### 마일스톤

이전 버전에 비해 마일스톤 요소의 크기가 변경되어 일반 바(bar)와 동일한 높이를 갖게 되었습니다.

이전 버전과 동일하게 보이길 원한다면, **bar_height** 속성을 사용하여 마일스톤 요소의 높이를 조정할 수 있습니다:

~~~js
{
    id:23, text:"Mediate milestone", start_date:"13-04-2018", 
    type:"milestone", parent:"15", bar_height: 35
}
~~~

### 리소스 할당

버전 7.1에서는 리소스 할당에 날짜를 지정하고 DataStore를 통해 리소스 할당을 관리할 수 있는 복잡한 로직이 추가되었습니다.
기존 코드에는 영향을 주지 않으나, 변경 사항으로 인해 리소스 계산에 성능 부담이 생길 수 있습니다.

작업의 특정 날짜에 리소스를 할당할 필요가 없다면, **process_resource_assignments** 설정을 비활성화하여 성능을 향상시킬 수 있습니다:

~~~js
gantt.config.process_resource_assignments = false;
~~~

### Task 객체의 새로운 선택적 속성

이제 gantt가 아래 작업 객체 속성을 처리하며, 작업의 표시 방식에 영향을 미칩니다:

- "task.row_height"
- "task.bar_height"
- "task.hide_bar"
- "task.rollup"
  
동일한 이름의 사용자 정의 속성을 사용 중이라면, 충돌을 피하기 위해 이름을 변경해야 합니다.

### 데이터 파싱 시 딥 카피(Deep copy)

Gantt는 [v6.3.2](whats-new.md#632)부터 v7.1까지 데이터 파싱 시 데이터 객체를 딥 카피했습니다.


v7.1부터는 기본적으로 이 기능이 비활성화됩니다.

기존 동작을 원한다면 [gantt.config.deepcopy_on_parse](api/config/deepcopy_on_parse.md)를 *true*로 설정하세요:

~~~js
gantt.config.deepcopy_on_parse = true;
~~~

### 더 이상 사용되지 않는 config

**gantt.config.task_height** 속성은 v7.1부터 더 이상 사용되지 않습니다. 해당 속성은 계속 동작하지만, 새로운 [gantt.config.bar_height](api/config/bar_height.md) 옵션을 사용하는 것이 좋습니다:

~~~js
gantt.config.bar_height = 50;
~~~


## 6.3 -> 7.0

### 확장 및 로케일 파일

최신 업데이트 v7.0에서는 Gantt 패키지 구조에 두 가지 주요 변경 사항이 있습니다:

1) 모든 확장 파일이 이제 *dhtmlxgantt.js* 파일에 번들로 포함됩니다.
따라서, dhtmlxGantt에서 제공하는 추가 확장을 활성화하려면 API 호출을 사용해야 합니다.

- 내장 패키지에서 확장 파일을 이미 페이지에 포함한 경우, 예를 들어:

~~~js
<script src="../codebase/dhtmlxgantt.js"></script>
<script src="../codebase/ext/dhtmlxgantt_auto_scheduling.js"></script>
~~~

또는

~~~js
import "dhtmlx-gantt";
import "dhtmlx-gantt/ext/dhtmlxgantt_auto_scheduling";
~~~

확장 파일을 제거하고 **gantt.plugins** 메서드를 사용하여 확장을 활성화해야 합니다:

~~~js
gantt.plugins({
   auto_scheduling: true
});
~~~

전체 확장 목록은 [여기](guides/extensions-list.md)에서 확인할 수 있습니다.

- 확장 파일을 수정했거나 커스텀 확장을 개발한 경우, 해당 파일을 페이지에 포함하면 그대로 동작합니다.

- **참고:** **dhtmlxgantt_smart_rendering.js** 및 **dhtmlxgantt_csp.js** 확장은 완전히 제거되었으며, 별도로 활성화할 필요가 없습니다.


2) 모든 로케일이 이제 *dhtmlxgantt.js* 파일에 포함되어 있습니다. 활성화하려면 API 호출을 사용하세요.

- 페이지에 로케일을 포함한 경우, 해당 파일을 제거하고 **gantt.i18n.setLocale**을 사용하여 원하는 로케일을 활성화해야 합니다:

~~~js
gantt.i18n.setLocale("de");
~~~

- 커스텀 로케일 파일을 사용하는 경우, 이전과 동일하게 로드할 수 있습니다.

### 기본 근무 시간 설정 변경

7.0 이전 모든 버전에서는 기본 근무 시간이 8:00~17:00(일 9시간)였습니다.


v7.0부터는 8:00~12:00, 13:00~17:00(일 8시간)로 변경되었습니다.

이전 설정으로 되돌리려면 수동으로 설정해야 합니다:

~~~js
gantt.setWorkTime({hours: [8, 17]});
~~~

### Content Security Policy

**ext/dhtmlxgantt_csp.js** 확장 기능은 더 이상 필요하지 않으며, 삭제되고 [csp config](api/config/csp.md)로 대체되었습니다. 이 설정은 기본적으로 활성화되어 있으므로, 해당 확장 기능을 gantt에서 제거해야 합니다.

**csp** 속성이 dhtmlxGantt 라이브러리에 추가됨에 따라, HTML5 doctype을 지원하는 모든 브라우저에서 사용할 수 있는 유효한 HTML5 속성이 Gantt의 모든 요소에 할당됩니다.


따라서 기존 속성은 다음과 같이 새 속성으로 업데이트할 것을 권장합니다:

- "task_id" -> ["data-task-id"](api/config/task_attribute.md)
- "link_id" -> ["data-link-id"](api/config/link_attribute.md)
- "resource_id" -> ["data-resource-id"](api/config/resource_attribute.md)
- "column_index" -> ["data-column-index"](api/config/grid_resizer_column_attribute.md)

하지만, 이전 속성들도 마크업에 포함되어 있으므로 속성 이름을 변경하지 않아도 기존 코드가 계속 작동합니다.

### 그리드 셀 스타일링

이전에는 `display:inline-block`을 통해 그리드 셀의 정렬을 처리했습니다. v7.0부터는 `display:flex`가 사용되며, 셀은 flex 컨테이너 내부에 배치됩니다.

이 변경은 사용자에게 보이는 UI에는 영향을 주지 않으며(100% 동일하게 유지됨), 마이그레이션 이슈를 일으키지 않아야 합니다. 그러나, 그리드 셀 스타일링과 관련된 일부 회귀가 이 업데이트와 관련이 있을 수 있습니다.

### "xml_date" 설정 및 템플릿, 그리고 "xml_format" 템플릿 삭제

v6.2에서 deprecated 되었던 설정 및 템플릿이 v7.0에서 삭제되고 새로운 것으로 대체되었습니다:

- gantt.config.xml_date →  [gantt.config.date_format](api/config/date_format.md)
- gantt.templates.xml_date → [gantt.templates.parse_date](api/template/parse_date.md)
- gantt.templates.xml_format → [gantt.templates.format_date](api/template/format_date.md)

이미 코드에서 이전 이름을 정의했다면 계속 동작합니다. 그렇지 않은 경우, 최신 API 버전을 사용하세요.

## 6.2 -> 6.3

### 다중 작업 선택

v6.3부터 **ext/dhtmlxgantt_multiselect.js** 확장 기능을 통해 한 번에 선택된 여러 작업을 수평으로 드래그할 수 있습니다.
이 기능을 비활성화하려면 [drag_multiple](api/config/drag_multiple.md) 속성을 *false*로 설정하세요(기본값은 활성화).

~~~js
gantt.config.drag_multiple = false;
~~~

### Google Roboto 폰트가 Material 스킨에 더 이상 포함되지 않음

v6.3 전까지는 Google [Roboto](https://fonts.google.com/specimen/Roboto) 폰트가 dhtmlxGantt의 ['Material' skin](guides/skins.md#materialskin)에 `import` 문을 통해 포함되어 있었습니다.
v6.3부터는 import가 제거되었으므로, `Roboto` 폰트를 직접 추가해야 합니다:

~~~html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family="Open+Sans|Roboto:regular,medium,thin,bold"">
~~~

### Require.JS와 함께 사용

이전에는 RequireJS 기반 앱에서 dhtmlxGantt 라이브러리의 여러 파일에 임의의 이름을 사용할 수 있었습니다:

~~~js
requirejs.config({
  paths: {
    "gantt": "../../codebase/dhtmlxgantt",
    "tooltip": "../../codebase/ext/dhtmlxgantt_tooltip",
    "marker": "../../codebase/ext/dhtmlxgantt_marker",
    "locale_de": "../../codebase/locale/locale_de",
  },
  shim: {
    "tooltip": ["gantt"],
    "marker": ["gantt"],
    "locale_de": ["gantt"],
  }
});
requirejs(["gantt", "tooltip", "marker", "locale_de"],
function (dhx) {
  var gantt = dhx.gantt;
 ...
});
~~~

v6.3부터는 dhtmlxGantt 라이브러리의 폴더 구조에 맞게 모듈 이름을 고정해야 합니다:

~~~js
requirejs.config({
  paths: {
    "dhtmlxgantt": "../../codebase/dhtmlxgantt",
    "ext/dhtmlxgantt_tooltip": "../../codebase/ext/dhtmlxgantt_tooltip",
    "ext/dhtmlxgantt_critical_path": "../../codebase/ext/dhtmlxgantt_critical_path",
    "locale/locale_de": "../../codebase/locale/locale_de",
  },
  shim: {
    "ext/dhtmlxgantt_tooltip": ["dhtmlxgantt"],
    "ext/dhtmlxgantt_critical_path": ["dhtmlxgantt"],
    "locale/locale_de": ["dhtmlxgantt"],
  }
});
 
requirejs(["dhtmlxgantt", "ext/dhtmlxgantt_tooltip", "ext/dhtmlxgantt_critical_path", 
            "locale/locale_de"], 
function (dhx) {
  var gantt = dhx.gantt;
...
});
~~~

패키지 내의 모든 파일에 대해 모듈 이름이 *패키지의 'codebase' 폴더 내 상대 경로*와 *파일명*으로 지정되어야 함을 확인하세요. 예시:

**코어 라이브러리:**

- "dhtmlxgantt": "./vendor/dhtmlxgantt/dhtmlxgantt"

**확장 기능:**

- "ext/dhtmlxgantt_critical_path": "./vendor/dhtmlxgantt/ext/dhtmlxgantt_critical_path"
- "ext/dhtmlxgantt_tooltip": "./vendor/dhtmlxgantt/ext/dhtmlxgantt_tooltip"

**로케일:**

- "locale/locale_de": "./vendor/dhtmlxgantt/locale/locale_de"
- "locale/locale_be": "./vendor/dhtmlxgantt/locale/locale_be"

### 인라인 에디터 {#inline_editors}

v6.3 이전에는 **date** [인라인 에디터](guides/inline-editing.md#typesofeditors)의 최소/최대 값이 타임스케일에 표시되는 날짜로 제한되었으나, 커스텀 min/max 값이 제공되지 않는 한 그랬습니다.

v6.3부터는 날짜 에디터의 최소/최대 값에 기본 제한이 없습니다.

이전 동작을 복원하려면 동적으로 **min**/**max** 값을 지정할 수 있습니다:

~~~js
const dateEditor = {type: "date", map_to: "start_date", 
  min: function(taskId){
    return gantt.getState().min_date
  },
  max: function( taskId ){
    return gantt.getState().max_date
  }
};
~~~

## 6.1 -> 6.2

v6.2로의 업데이트는 일반적으로 v6.1과 호환되며 코드 변경이 필요하지 않습니다.
하지만 일부 컴포넌트 동작이 변경되었으며(이전 동작은 config로 복원 가능), 일부 API는 deprecated 되었습니다.

### 스마트 렌더링 및 정적 배경

스마트 렌더링 기능이 업데이트되어 컴포넌트에 내장되었습니다. 이제 메인 타임라인 영역과 리소스 패널 모두에서 동작하며, 모든 타임라인은 현재 보이는 행과 셀만 렌더링합니다.

스마트 렌더링은 **smart_rendering** 설정을 통해 비활성화할 수 있으며, 이 경우 gantt는 v6.1의 기본 동작으로 돌아갑니다:

~~~js
gantt.config.smart_rendering = false;
~~~

**dhtmlxgantt_smart_rendering** 확장 기능은 더 이상 필요하지 않으므로 gantt에서 제거해야 합니다. 호환성 문제를 위해 패키지에는 여전히 포함되어 있습니다.
확장 기능이 페이지에 추가되면 gantt는 v6.1 스마트 렌더링 모드로 돌아갑니다.

**[static_background](api/config/static_background.md)** 설정의 동작도 업데이트되었습니다. v6.2부터는 PNG 배경과, 템플릿 함수로 CSS 클래스가 할당된 셀을 모두 렌더링합니다.

v6.1 동작으로 되돌리려면 **static_background_cells** 설정을 사용하세요:

~~~js
gantt.config.static_background_cells = false;
~~~

### 타임스케일 설정

타임스케일 설정이 간소화되었습니다. 각 스케일별로 여러 설정을 지정하는 대신, 하나의 설정 옵션 [scales](api/config/scales.md)에 여러 스케일 오브젝트를 포함하면 됩니다.

다음 타임스케일 API는 deprecated 되었습니다:

- gantt.config.scale_unit
- gantt.config.step
- gantt.config.date_scale
- gantt.templates.date_scale
- gantt.config.subscales

예전 코드는 다음과 같습니다:

~~~js
gantt.config.scale_unit = "day"; 
gantt.config.step = 1; 
gantt.config.date_scale = "%d %M"; 
gantt.templates.date_scale = null; 
gantt.config.subscales = [];
~~~

이제 다음과 같이 작성합니다:

~~~js
gantt.config.scales = [ { unit:"day", step: 1, format: "%d %M"} ];
~~~

#### task_cell_class 템플릿 이름 변경

타임라인 영역 셀에 적용할 CSS 클래스를 정의하는 템플릿의 이름이 다음과 같이 변경되었습니다:

- gantt.templates.task_cell_class → [gantt.templates.timeline_cell_class](api/template/timeline_cell_class.md)

이름이 변경된 템플릿 사용 예시는 다음과 같습니다:

~~~js
<style>
.weekend{ background: #f4f7f4 !important;}
</style>
 
gantt.templates.timeline_cell_class = function(task,date){
    if(date.getDay()==0||date.getDay()==6){
        return "weekend";
    }
};
~~~

### "xml_date" 설정 및 템플릿, "xml_format" 템플릿 이름 변경

아래는 이전에 사용된 API를 대체하는 방법입니다:

- gantt.config.xml_date →  [gantt.config.date_format](api/config/date_format.md)
- gantt.templates.xml_date → [gantt.templates.parse_date](api/template/parse_date.md)
- gantt.templates.xml_format → [gantt.templates.format_date](api/template/format_date.md)

v6.2부터 **xml_date** 설정과 **xml_date**, **xml_format** 템플릿의 기본값은 *undefined*입니다. 따라서 별도로 값을 할당하지 않으면 동작하지 않습니다.

그러나 Gantt는 여전히 이전 설정 및 템플릿 이름을 인식하므로, 코드에서 재정의한 경우 이전처럼 작동합니다. 예시:

~~~js
// 정상 동작
gantt.templates.xml_date = function(datestring){
    return new Date(datestring);
};
~~~

### 미사용 API 제거

**gantt.config.api_date** 설정과 **gantt.templates.api_date** 템플릿이 API에서 제거되었습니다. 만약 코드에서 사용 중이었다면, 직접 다시 선언해야 합니다.

~~~js
gantt.config.api_date = "%d-%m-%Y %H:%i";
gantt.templates.api_date = gantt.date.date_to_str(gantt.config.api_date);
~~~

## 6.0 -> 6.1 

### 작업 제약 조건 및 자동 스케줄링

**dhtmlxgantt_auto_scheduling.js** 확장 기능이 [tasks constraints](guides/auto-scheduling.md#timeconstraintsfortasks) 기능과 함께 업그레이드되었습니다. 이 기능은 자동 스케줄링의 기본 동작을 수정하므로,
Gantt는 이전 동작으로 복원하고 자동 스케줄링 중 작업 제약 조건을 무시할 수 있는 호환성 모드를 지원합니다.

호환성 모드로 전환하려면 다음 설정 옵션을 사용하세요:

~~~js
gantt.config.auto_scheduling_compatibility = true;
~~~


### 툴팁 표시 영역

버전 6.1 이전에는 [툴팁](guides/tooltips.md)이 타임라인 영역 내에서만 표시되었습니다. v6.1 이후에는 툴팁 표시가 제한되지 않으며, 마우스 포인터의 움직임을 따라 툴팁이 이동합니다.

필요하다면, Gantt 초기화 전에 아래 코드를 사용하여 이전 동작으로 복원할 수 있습니다:

~~~js
gantt.attachEvent("onGanttReady", function(){
    var tooltips = gantt.ext.tooltips;
     tooltips.tooltip.setViewport(gantt.$task_data);
});

gantt.init("gantt_here");
gantt.parse(demo_tasks);
~~~

## 5.2 -> 6.0

버전 6.0에서는 **getSlack()** 메서드가 더 이상 지원되지 않습니다. 대신 두 가지 메서드가 추가되었습니다:

- [getFreeSlack](api/method/getfreeslack.md) - 작업의 free slack 반환
- [getTotalSlack](api/method/gettotalslack.md) - 작업의 total slack 반환

v[4.0](#3x---40)에서 더 이상 지원되지 않는 것으로 표시된 메서드는 v6.0에서 동작하지 않습니다. **dhtmlx** 객체 정의는 *dhtmlxgantt.js*에서 제거되었습니다.

더 이상 지원되지 않는 메서드를 사용하는 경우, 아래 표에 따라 지원되는 구현으로 대체해야 합니다. 메서드의 인자나 동작에는 변경이 없습니다.

<table class="my_table">

<tr><td class="version_info">더 이상 지원되지 않는 메서드</td><td class="version_info">지원되는 메서드</td></tr>

<tr><td>dhtmlx.alert</td><td>gantt.alert</td></tr>
<tr><td>dhtmlx.confirm</td><td>gantt.confirm</td></tr>
<tr><td>dhtmlx.modalbox</td><td>gantt.modalbox</td></tr>
<tr><td>dhtmlx.uid</td><td>gantt.uid</td></tr>
<tr><td>dhtmlx.copy</td><td>gantt.copy</td></tr>
<tr><td>dhtmlx.mixin</td><td>gantt.mixin</td></tr>
<tr><td>dhtmlx.defined</td><td>gantt.defined</td></tr>
<tr><td>dhtmlx.bind</td><td>gantt.bind</td></tr>
<tr><td>dhtmlx.assert</td><td>gantt.assert</td></tr>
<tr><td>window.dataProcessor</td><td>gantt.dataProcessor</td></tr>
</table>


## 3.x -> 4.0

버전 4.0에서는 공개 API에 몇 가지 변경 사항이 도입되었습니다:

- 레거시 모듈 및 dhtmlxSuite 모듈과 중복되는 모듈은 더 이상 dhtmlxGantt 라이브러리에서 정의되지 않습니다.
- 자주 사용되는 모듈(dhtmlxMessage, dataProcessor, Ajax 등)은 **window.gantt** 네임스페이스로 이동되어 dhtmlxGantt 공개 API의 일부가 되었습니다.

v4.x에는 이전 API로의 폴백이 포함되어 있으므로, v3.3 및 그 이전 버전용으로 작성된 코드는 계속 작동합니다. 그러나 일부 경우에는 변경이 필요할 수 있습니다.
일반적으로 **window.gantt**와 **window.Gantt**(엔터프라이즈 버전만 해당)를 제외한 모든 전역 선언은 더 이상 지원되지 않으며, 버전 5.0에서 제거될 예정입니다.

### 더 이상 지원되지 않는 API

더 이상 지원되지 않는 메서드가 있습니다. 이 메서드들은 v4.x에서 계속 동작하지만, 호출 시마다 콘솔 경고(최종 사용자에게는 보이지 않음)가 발생합니다.

![gantt_deprecated_warning](/img/gantt_deprecated_warning.png)

개요:

- dhtmlxMessage 모듈은 **window.dhtmlx** 객체에서 **window.gantt** 객체로 이동되었습니다. Message Boxes에 대한 자세한 내용은 [여기](guides/message-boxes.md)에서 확인하세요.
- dhtmlxDataProcessor 생성자는 **window.dataProcessor**에서 **window.gantt.dataProcessor**로 이동되었습니다.
- **dhtmlx.copy**, **dhtmlx.uid**, **dhtmlx.mixin**과 같은 유틸리티 메서드는 **window.gantt** 객체로 이동되었습니다.

이러한 메서드를 사용하는 경우, v4.0으로 업데이트 후에도 애플리케이션은 즉각적인 변경 없이 계속 동작합니다. 그러나 향후에는 새로운 API 버전으로 업데이트할 것을 권장합니다.

더 이상 지원되지 않는 메서드의 전체 목록은 다음과 같습니다:

<table class="my_table">

<tr><td class="version_info">버전 3.3까지</td><td class="version_info">버전 4.0부터</td></tr>

<tr><td>dhtmlx.alert</td><td>gantt.alert</td></tr>
<tr><td>dhtmlx.confirm</td><td>gantt.confirm</td></tr>
<tr><td>dhtmlx.modalbox</td><td>gantt.modalbox</td></tr>
<tr><td>dhtmlx.uid</td><td>gantt.uid</td></tr>
<tr><td>dhtmlx.copy</td><td>gantt.copy</td></tr>
<tr><td>dhtmlx.mixin</td><td>gantt.mixin</td></tr>
<tr><td>dhtmlx.defined</td><td>gantt.defined</td></tr>
<tr><td>dhtmlx.bind</td><td>gantt.bind</td></tr>
<tr><td>dhtmlx.assert</td><td>gantt.assert</td></tr>
<tr><td>window.dataProcessor</td><td>gantt.dataProcessor</td></tr>
</table>

### 더 이상 사용되지 않는 API

일부 메서드는 더 이상 사용되지 않으며, v4.x에서 더 이상 사용할 수 없습니다.
이러한 메서드나 객체를 계속 사용하는 경우, 애플리케이션 코드를 수정하거나 **dhtmlxgantt_deprecated.js** 파일을 페이지에 포함해야 합니다.

개요:

- **window.dhx4**는 더 이상 **dhtmlxgantt.js**에서 정의되지 않습니다.
- **window.dhx4**에서 정의된 환경 변수는 이제 **gantt.env** 객체에서 사용할 수 있습니다.
- Ajax 모듈은 **dhx4.ajax**에서 **gantt.ajax**로 이동되었습니다.
- **gantt.event**, **gantt.eventRemove**를 **dhtmlxEvent/dhtmlxDetachEvent** 대신 사용해야 합니다.

더 이상 사용되지 않는 API의 전체 목록은 아래와 같습니다:

<table class="my_table">

<tr><td class="version_info">버전 3.3까지</td><td class="version_info">버전 4.0부터</td></tr>
<tr><td>window.dhtmlxEvent</td><td>gantt.event</td></tr>
<tr><td>window.dhtmlxDetachEvent</td><td>gantt.eventRemove</td></tr>
<tr><td>window.dhx4.isIE</td><td>gantt.env.isIE</td></tr>
<tr><td>window.dhx4.isIE6</td><td>gantt.env.isIE6</td></tr>
<tr><td>window.dhx4.isIE7</td><td>gantt.env.isIE7</td></tr>
<tr><td>window.dhx4.isIE8</td><td>gantt.env.isIE8</td></tr>
<tr><td>window.dhx4.isOpera</td><td>gantt.env.isOpera</td></tr>
<tr><td>window.dhx4.isChrome</td><td>gantt.env.isChrome</td></tr>
<tr><td>window.dhx4.isKHTML</td><td>gantt.env.isKHTML</td></tr>
<tr><td>window.dhx4.isFF</td><td>gantt.env.isFF</td></tr>
<tr><td>window.dhx4.isIPad</td><td>gantt.env.isIPad</td></tr>
</table>


## 2.0 -> 3.0

1) dhtmlxScheduler와의 CSS 충돌을 방지하기 위해, 두 컴포넌트에서 모두 사용되던 클래스명이 dhtmlxGantt에서 변경되었습니다(모든 클래스는 lightbox와 관련됨).
lightbox에 대한 스타일을 커스터마이징한 경우, 마이그레이션은 적절한 CSS 클래스명으로 변경하는 작업이 필요합니다.

변경된 패턴은 두 가지입니다:

- <b>'.dhx_gantt_'</b>를 <b>'.gantt_'</b>로 변경 (.dhx_gantt_duration -> .gantt_duration)
- <b>'.dhx_'</b> 접두사를 <b>'.gantt_'</b>로 변경 (.dhx_custom_button -> .gantt_custom_button)

*CSS 클래스 마이그레이션에 어려움이 있다면, 전체 변경 목록을 [여기](guides/migrating-renamedcss.md)에서 확인하세요.*


2) [buttons_right](api/config/buttons_right.md) 및 [buttons_left](api/config/buttons_left.md) 설정의 기본값이 다음과 같이 변경되었습니다:

~~~js
gantt.config.buttons_left = [
        "dhx_save_btn",
        "dhx_cancel_btn"
];
gantt.config.buttons_right = [
        "dhx_delete_btn"
],

-->

gantt.config.buttons_left = [
        "gantt_save_btn",
        "gantt_cancel_btn"
];
gantt.config.buttons_right = [
        "gantt_delete_btn"
];
~~~

기존 설정( "dhx_save_btn", "dhx_cancel_btn", "gantt_delete_btn")도 계속 작동합니다. 이 변경은 기존 동작을 깨뜨리지 않습니다.

3) 아래 기능들은 이제 컴포넌트의 Commercial 또는 Enterprise 버전에서만 사용할 수 있습니다(GPL 버전 dhtmlxGantt에서는 제공되지 않음):

- 주, 월, 타임라인 뷰에서 요일 숨기기 기능
- 프로젝트, 마일스톤 및 기타 커스텀 타입

## 1.0 -> 2.0

1) 다양한 객체(**GanttProjectInfo**, **GanttTaskInfo**, **GanttChart**, **GanttProject**, **GanttTask**)가 하나의 정적 객체 **gantt**로 대체되었습니다. 

 
**gantt** 객체는 여러 메서드와 2개의 주요 속성: [config](api/overview/properties-overview.md), [templates](api/overview/templates-overview.md)를 포함합니다.

- [gantt.config](api/overview/properties-overview.md) - 날짜, 스케일, 컨트롤 등 구성 옵션
- [gantt.templates](api/overview/templates-overview.md) - Gantt 차트에서 날짜 및 레이블 포맷 지정 템플릿


2) dhtmlxGantt는 [init](api/method/init.md) 메서드를 통해 초기화됩니다. 

 <code> var gantt = new GanttChart()</code> -> <code>gantt.init("gantt_div")</code>


3) GanttProject 및 GanttTask 대신, 데이터는 [필수 속성과 원하는 커스텀 속성을 가진 단순 객체 배열](guides/loading.md#dataproperties)로 저장됩니다: 

~~~js
{
    data:[
        {id:1, text:"Project #2", start_date:"01-04-2013", duration:18,
    progress:0.4, open: true},
        {id:2, text:"Task #1",    start_date:"02-04-2013", duration:8,
    progress:0.6, parent:1},
        {id:3, text:"Task #2",    start_date:"11-04-2013", duration:8,
    progress:0.6, parent:1}
    ],
    links:[
        { id:1, source:1, target:2, type:"1"},
        { id:2, source:2, target:3, type:"0"},
        { id:3, source:3, target:4, type:"0"},
        { id:4, source:2, target:5, type:"2"},
  ]
}
~~~


4) [XML 형식](guides/supported-data-formats.md#xmldhtmlxgantt20)이 변경되었지만, [이전 XML 형식](guides/supported-data-formats.md#xmldhtmlxganttlt20)도 [로드](api/method/load.md)할 수 있습니다.

~~~js
gantt.load("tasks.xml","oldxml");
~~~

[Loading data in Gantt 1.6 format](https://docs.dhtmlx.com/gantt/samples/01_initialization/09_backward_compatibility.html)


5) **디자인 타임 객체**:

- **<i>GanttProjectInfo</i>** 객체의 메서드는 다음과 같이 대체되었습니다:
  - addTask  -> [gantt.addTask()](api/method/addtask.md)
  - deleteTask  ->  [gantt.deleteTask()](api/method/deletetask.md)
  - getTaskById  -> [gantt.getTask()](api/method/gettask.md)
- **<i>GanttTaskInfo</i>** 객체의 메서드는 다음과 같이 대체되었습니다:
  - addChildTask -> [gantt.addTask()](api/method/addtask.md) (작업 객체의 "parent" 속성이 부모를 지정함)


6) **런타임 객체**:

dhtmlxGantt 2.0에서는 프로젝트와 작업 객체에 대해 별도의 타입을 사용하지 않습니다. 대신, 어떤 작업 객체도 1개의 부모 객체와 여러 개의 자식 작업을 가질 수 있습니다.

- **<i>GanttProject</i>** 
  - getDuration(), getId(), getName(), getPercentCompleted(), getStartDate() 대신, **gantt.getTask(projectTaskId).(name_of_property)**를 통해 접근
- **<i>GanttTask</i>** 
  - getDuration(), getId(), getName(), getParentTaskId(), getPercentCompleted(), getPredecessorTaskId(), setDuration(, ) 대신, **gantt.getTask(taskId).(name_of_property)**를 통해 접근
  
부모/자식 객체를 가져오는 메서드 목록:

- [getTask](api/method/gettask.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)

:::note
부모 작업의 id는 **gantt.getTask(task_id).parent**로 접근할 수 있습니다. 루트 엘리먼트는 'parent' 속성이 없습니다.
:::

