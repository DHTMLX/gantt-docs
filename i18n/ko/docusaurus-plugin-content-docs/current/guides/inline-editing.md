---
title: "그리드에서 인라인 편집"
sidebar_label: "그리드에서 인라인 편집"
---

# 그리드에서 인라인 편집

dhtmlxGantt는 콘텐츠를 편집하는 두 가지 방법을 제공합니다:

- [Lightbox](guides/default-edit-form.md) 편집 폼 사용
- 그리드 영역 내에서 직접 인라인 에디터 사용

인라인 편집을 사용하면 그리드에서 바로 작업을 생성·수정하거나, 작업 간 연결을 설정하고, 시작/종료 날짜 또는 기간을 조정하는 등 다양한 작업을 내장 에디터만으로 수행할 수 있습니다.

![Inline grid editing](/img/inline_grid_editing.png)

인라인 편집을 활성화하려면 다음 단계를 따라야 합니다:

- 에디터 설정 목록을 정의하고, 각 에디터 객체에서 **map_to** 속성을 사용하여 해당 그리드 컬럼에 연결합니다.

~~~js
var textEditor = {type: "text", map_to: "text"};
var dateEditor = {type: "date", map_to: "start_date", min: new Date(2018, 0, 1), 
    max: new Date(2019, 0, 1)};
var durationEditor = {type: "number", map_to: "duration", min:0, max: 100};
~~~

- 컬럼 설정에서 **editor** 속성을 지정하여 각 컬럼에 에디터를 할당합니다.

~~~js
gantt.config.columns = [
    {name: "text", tree: true, width: '*', resize: true, editor: textEditor},
    {name: "start_date", align: "center", resize: true, editor: dateEditor},
    {name: "duration", align: "center", editor: durationEditor},
    {name: "add", width: 44}
];
~~~


[Inline editing](https://docs.dhtmlx.com/gantt/samples/07_grid/11_inline_edit_basic.html)


:::note
*inlineEditors* 객체 API에 대한 자세한 내용은 [Inline Editors Extension](guides/inline-editors-ext.md) 문서를 참고하세요.
:::

그리드에서 인라인 편집 구현 방법을 보여주는 동영상 가이드도 있습니다.

<iframe width="704" height="400" src="https://www.youtube.com/embed/0rIPrC0GtME" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 에디터 유형 {#typesofeditors}

인라인 에디터는 [editor_types](api/config/editor_types.md) 설정 객체에서 정의됩니다.

여러 가지 인라인 에디터가 기본 제공됩니다:

- **text** 에디터 - 작업 이름 등 텍스트 컬럼용
- **number** 에디터 - 작업 기간, 순서 등 숫자 컬럼용
- **duration** 에디터 - **map_to: "duration"** 및 에디터 타입이 **"duration"**일 때 기간 컬럼에 사용:

~~~js
{ type: "duration", map_to: "duration", formatter: formatter }
~~~

이 에디터는 숫자와 [기간 단위](api/config/duration_unit.md)가 함께 포함된 기간(예: `5 days`)을 지정할 때 유용합니다. 기본적으로 [Duration Formatter](guides/formatters-ext.md#durationformatter)를 사용하며, 설정을 커스터마이즈하거나 [사용자 정의 포매터](guides/formatters-ext.md#customformatter)를 지정할 수 있습니다.

- **date** 에디터 - 시작일, 종료일 등 날짜 컬럼용
- **select** 에디터 - 목록에서 옵션을 선택할 때
- **predecessor** 에디터 - 현재 작업의 선행 작업을 지정할 때 사용합니다. 이 에디터는 [작업의 WBS 코드](guides/specifying-columns.md#wbscode)를 사용하여 선행 작업과의 연결을 설정합니다.

~~~js
var editors = {
    text: {type: "text", map_to: "text"},
    start_date: {type: "date", map_to: "start_date", min: new Date(2018, 0, 1), 
        max: new Date(2019, 0, 1)},
    end_date: {type: "date", map_to: "end_date", min: new Date(2018, 0, 1), 
        max: new Date(2019, 0, 1)},
    duration: {type: "number", map_to: "duration", min:0, max: 100},
    priority: {type:"select", map_to:"priority", options:gantt.serverList("priority")},
    predecessors: {type: "predecessor", map_to: "auto"}
};
~~~


### 날짜 에디터의 날짜 제한 {#dateslimits}

v6.3부터 **date** 인라인 에디터에는 기본 최소값 또는 최대값이 지정되어 있지 않습니다.

타임스케일에 표시되는 날짜를 **date** 인라인 에디터의 min/max 값으로 동적으로 지정하려면(별도의 min/max 값을 지정하지 않은 경우), 동적 **min/max** 함수를 사용할 수 있습니다:

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

### 종료일 포함 형식용 에디터 {#inclusiveenddate}

작업에 [종료일 포함 형식](api/template/task_end_date.md)을 사용하고, 그리드에서 인라인 편집을 제대로 지원하려면 다음과 같이 종료일 포함 에디터를 별도로 구현해야 합니다:

~~~js
// 종료일 포함 에디터 구현
// 기본 에디터를 사용하되 set_value/get_value 메서드만 오버라이드
var dateEditor = gantt.config.editor_types.date;
gantt.config.editor_types.end_date = gantt.mixin({
   set_value: function(value, id, column, node){
        var correctedValue = gantt.date.add(value, -1, "day");
        return dateEditor.set_value.apply(this, [correctedValue, id, column, node]);
   },
   get_value: function(id, column, node) {
        var selectedValue = dateEditor.get_value.apply(this, [id, column, node]);
        return gantt.date.add(selectedValue, 1, "day");
   },
}, dateEditor);

var textEditor = {type: "text", map_to: "text"};
var startDateEditor = {type: "date", map_to: "start_date"};
var endDateEditor = {type: "end_date", map_to: "end_date"};
var durationEditor = {type: "number", map_to: "duration", min:0, max: 100};

gantt.config.columns = [
    {name: "text", label: "Name", tree: true, width: 200, editor: textEditor, 
        resize: true},
    {name: "duration", label: "Duration", width:80, align: "center", 
        editor: durationEditor, resize: true},
    {name: "start_date", label: "Start", width:140, align: "center", 
        editor: startDateEditor, resize: true},
    {name: "end_date", label: "Finish", width:140, align: "center", 
        editor: endDateEditor, resize: true}
];

// lightbox 및 그리드 템플릿도 종료일 포함 형식으로 표시
gantt.templates.task_end_date = function(date){
    return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};


var gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");
gantt.templates.grid_date_format = function(date, column){
    if(column === "end_date"){
        return gridDateToStr(new Date(date.valueOf() - 1)); 
    }else{
        return gridDateToStr(date); 
    }
}
~~~


**Related example:** [종료일 포함 에디터](https://snippet.dhtmlx.com/ds28tk3c)


종료일 포매팅에 대한 자세한 내용은 [작업 종료일 표시 & 종료일 포함](guides/loading.md#taskenddatedisplayampinclusiveenddates) 문서를 참고하세요.

### 선행 작업 에디터 값 포매팅 {#linkformatter}

:::info
이 기능은 PRO 에디션에서만 제공됩니다.
:::

v6.3부터 Gantt는 인라인 에디터에서 링크 유형 및 지연/선행 값을 직접 지정할 수 있습니다.

이를 위해 [Link Formatter](guides/formatters-ext.md#linkformatter) 모듈을 사용하고, *LinksFormatter* 인스턴스를 **predecessor** 에디터에 전달합니다:

~~~js
var formatter = gantt.ext.formatters.durationFormatter({
    enter: "day", 
    store: "day", 
    format: "auto"
});
var linksFormatter = gantt.ext.formatters.linkFormatter({durationFormatter: formatter});
 
var editors = {
    text: {type: "text", map_to: "text"},
    start_date: {type: "date", map_to: "start_date", 
                min: new Date(2018, 0, 1), max: new Date(2019, 0, 1)},
    end_date: {type: "date", map_to: "end_date", 
                min: new Date(2018, 0, 1), max: new Date(2019, 0, 1)},
    duration: {type: "duration", map_to: "duration", 
                min:0, max: 100, formatter: formatter},
    priority: {type: "select", map_to: "priority", 
                options:gantt.serverList("priority")},
    predecessors: {type: "predecessor", map_to: "auto", formatter: linksFormatter} /*!*/
};
 
gantt.config.columns = [
    {name: "wbs", label: "#", width: 60, align: "center", template: gantt.getWBSCode},
    {name: "text", label: "Name", tree: true, width: 200, editor: editors.text, 
        resize: true},
    {name: "start_date", label: "Start", width:80, align: "center", 
      editor: editors.start_date, resize: true},
    {name: "predecessors", label: "Predecessors",width:80, align: "left", 
      editor: editors.predecessors, resize: true, template: function(task){
            var links = task.$target;
            var labels = [];
            for(var i = 0; i < links.length; i++){
                var link = gantt.getLink(links[i]);
                labels.push(linksFormatter.format(link)); /*!*/
            }
            return labels.join(", ")
        }},
    {name:"add"}
];
~~~


[Inline editing - keyboard navigation mode](https://docs.dhtmlx.com/gantt/samples/07_grid/12_inline_edit_key_nav.html)


아래는 사용자 정의 에디터에 대한 코드 예시입니다:

- [간단한 숫자 입력](guides/inline-editing.md#custominlineeditor)
- [JQuery Datepicker 입력](guides/inline-editing.md#jquery_datepicker)

## 사용자 정의 인라인 에디터 {#custominlineeditor}

새로운 에디터 객체를 정의하여 사용자 정의 인라인 에디터를 만들 수 있습니다:

~~~js
gantt.config.editor_types.custom_editor = {
  show: function (id, column, config, placeholder) {
    // 입력 표시 시 호출, placeholder에 HTML 마크업 삽입 및 에디터 초기화
    var html = "<div><input type='text' name='" + column.name + "'></div>";
       placeholder.innerHTML = html;
  },
  hide: function () {
    // 입력 숨김 시 호출, 복잡한 에디터 정리나 이벤트 리스너 해제
  },
  
  set_value: function (value, id, column, node) {
    // 입력값 설정
  },
  
  get_value: function (id, column, node) {
    // 입력값 반환
  },
  
  is_changed: function (value, id, column, node) {
    // 저장/닫기 전 호출. 값이 변경되었으면 true 반환
    // true면 변경 저장, false면 저장 건너뜀
  },
  
  is_valid: function (value, id, column, node) {
    // 입력값 검증, false 반환 시 변경 무시
    return true/false;
  },

  save: function (id, column, node) {
     // map_to:auto인 입력용. 복잡한 저장 로직 작성
  },
  focus: function (node) {
  }
}
~~~

각 메서드의 역할은 다음과 같습니다:

- <span class="submethod">**show (id, column, config, placeholder): void**</span> - 인라인 에디터가 열릴 때 트리거됩니다. DOM 요소 추가 및 라이브러리 초기화. 파라미터:
    - **_id_** - (*string | number*) - 작업 ID
    - **_column_** - (*GridColumn*) - 컬럼 설정 객체
    - **_config_** - (*any*) - 사용자 정의 에디터 설정 객체
    - **_placeholder_** - (*HTMLElement*) - 인라인 에디터 DOM 요소
- <span class="submethod">**hide? (): void**</span> - 선택적, 에디터가 닫힐 때 호출
- <span class="submethod">**set_value (value, id, column, node): void**</span> - **show** 후에 호출되어 작업 객체에서 값을 설정합니다. 파라미터:
    - **_value_** - (*any*) - 작업 속성 값
    - **_id_** - (*string | number*) - 작업 ID
    - **_column_** - (*GridColumn*) - 컬럼 설정 객체
    - **_node_** - (*HTMLElement*) - 인라인 에디터 DOM 요소
- <span class="submethod">**get_value (id, column, node): any**</span> - 닫기 전 호출되어 에디터에서 값을 가져옵니다. 파라미터:
    - **_id_** - (*string | number*) - 작업 ID
    - **_column_** - (*GridColumn*) - 컬럼 설정 객체
    - **_node_** - (*HTMLElement*) - 인라인 에디터 DOM 요소
- <span class="submethod">**is_changed? (value, id, column, node): boolean**</span> - 선택적, 닫기 전 트리거. **true** 반환 시 변경 저장, **false**면 무시. 파라미터:
    - **_value_** - (*any*) - 작업 속성 값
    - **_id_** - (*string | number*) - 작업 ID
    - **_column_** - (*GridColumn*) - 컬럼 설정 객체
    - **_node_** - (*HTMLElement*) - 인라인 에디터 DOM 요소
- <span class="submethod">**is_valid? (value, id, column, node): boolean**</span> - 선택적 검증 메서드. **false** 반환 시 변경 거부. 파라미터:
    - **_value_** - (*any*) - 작업 속성 값
    - **_id_** - (*string | number*) - 작업 ID
    - **_column_** - (*GridColumn*) - 컬럼 설정 객체
    - **_node_** - (*HTMLElement*) - 인라인 에디터 DOM 요소
- <span class="submethod">**save? (id, column, node): void**</span> - 선택적, `map_to:auto`와 함께 복잡한 저장에 사용. 파라미터:
    - **_id_** - (*string | number*) - 작업 ID
    - **_column_** - (*GridColumn*) - 컬럼 설정 객체
    - **_node_** - (*HTMLElement*) - 작업 객체
- <span class="submethod">**focus? (node): void**</span> - 선택적, 에디터에 포커스가 올 때 호출.
    - **_node_** - (*HTMLElement*) - 인라인 에디터 DOM 요소

재사용 가능한 에디터를 위한 주요 포인트:

- 일반적으로 **`get_value`**는 현재 에디터의 값을 반환만 하고 작업 객체를 직접 수정하지 않아야 합니다. 값이 유효하면 Gantt가 자동으로 작업을 업데이트합니다.
- **`map_to`** 옵션을 사용하여 어떤 작업 속성을 업데이트할지 지정하면, 에디터 내부에서 하드코딩하지 않아 재사용성이 높아집니다.
- **`hide`** 메서드는 복잡한 위젯이나 이벤트 해제가 필요하지 않다면 비워둘 수 있습니다.
- **`is_changed`** 및 **`is_valid`** 메서드를 구현하세요:
  - **`is_changed`**는 값이 실제로 변경된 경우에만 true를 반환해 불필요한 업데이트를 방지합니다.
  - **`is_valid`**는 잘못된 입력값을 막아줍니다.
- 속성 변경 외의 추가 작업이 필요한 에디터(예: 내장 [predecessor 에디터](guides/inline-editing.md#typesofeditors))는 **`save`**에 로직을 작성하고, **`map_to`**를 *"auto"*로 설정합니다. 이 경우 gantt는 작업을 직접 수정하지 않고 **`save`**를 호출해 변경을 적용합니다.

아래는 간단한 숫자 입력 에디터 예시입니다. **`hide`**는 비워두고, **`save`**는 생략했습니다.

~~~js
var getInput = function(node){
    return node.querySelector("input");
};

gantt.config.editor_types.simpleNumber = {
    show: function (id, column, config, placeholder) {
        var min = config.min || 0,
        max = config.max || 100;

        var html = "<div><input type='number' min='" + min + 
                      "' max='" + max + "' name='" + column.name + "'></div>";
        placeholder.innerHTML = html;
    },
    hide: function () {
      // 에디터 제거 후 별도 정리가 필요 없으므로 비워둠
    },
    set_value: function (value, id, column, node) {
        getInput(node).value = value;
    },
    get_value: function (id, column, node) {
        return getInput(node).value || 0;
    },
    is_changed: function (value, id, column, node) {
        var currentValue = this.get_value(id, column, node);
        return Number(value) !== Number(currentValue);
    },
    is_valid: function (value, id, column, node) {
        return !isNaN(parseInt(value, 10));
    },
    focus: function (node) {
        var input = getInput(node);
        if (!input) {
            return;
        }
        if (input.focus) {
            input.focus();
        }

        if (input.select) {
          input.select();
        }
    }
};
~~~

아래와 같이 내장 에디터처럼 사용할 수 있습니다:

~~~js
var numberEditor = {type: "simpleNumber", map_to: "quantity", min:0, max: 50}; 

gantt.config.columns = [
    ...
    {name: "quantity", label: "Quantity", width: 80, editor: numberEditor, 
        resize: true},
    ...
];
~~~

Gantt가 에디터 DOM 요소를 자동으로 제거하므로, **`hide`**에서 추가 정리가 필요하지 않습니다.

### editor.hide {#jquery_datepicker}

인라인 에디터에서 더 복잡한 위젯을 사용할 경우, 정리를 위한 **`hide`** 메서드 구현이 필요할 수 있습니다.

예를 들어, jQuery UI의 DatePicker 위젯을 사용하는 DatePicker 입력 구현은 에디터가 DOM에서 제거될 때 위젯을 destroy해야 합니다.

사전 준비:

~~~js
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
~~~

에디터 예시:

~~~js
gantt.config.editor_types.custom_datepicker_editor = {
    show: function (id, column, config, placeholder) {
        placeholder.innerHTML = "<div><input type='text' id='datepicker' name='" + 
                                  column.name + "'></div>";
        $("#datepicker").datepicker({
            dateFormat: "yy-mm-dd",
            onSelect: function(dateStr){
                gantt.ext.inlineEditors.save()
            }
        });
    },
    hide: function (node) {
        $("#datepicker").datepicker( "destroy" );
    },

    set_value: function (value, id, column, node) {
        $("#datepicker").datepicker("setDate", value);
    },

    get_value: function (id, column, node) {
        return $("#datepicker").datepicker( "getDate" );
    },

    is_changed: function (value, id, column, node) {
        return (+$("#datepicker").datepicker( "getDate" ) !== +value);
    },
    is_valid: function (value, id, column, node) {
        return !(isNaN(+$("#datepicker").datepicker( "getDate" )))
    },
    save: function (id, column, node) {
    },
    focus: function (node) {
    }
};

let dateEditor = {
    type: "custom_datepicker_editor",
    map_to: "start_date"
};

gantt.config.columns = [
    {name: "text", tree: true, width: '*', resize: true},
    {name: "start_date", align: "center", resize: true, editor: dateEditor},
    {name: "duration", align: "center"},
    {name: "add", width: 44}
];
~~~


**Related example:** [에디터에서 jQuery Datepicker 사용](https://plnkr.co/edit/U3vHJvleRBJ1Js0N?preview)


### editor.save

**`save`** 함수는 에디터가 여러 작업(Task)의 속성을 동시에 업데이트해야 하거나, 작업 이외의 객체를 수정해야 할 때 유용하게 사용됩니다.

이러한 경우에도 내장 유효성 검사를 위해 **`get_value`** 를 구현할 수 있지만, gantt는 에디터의 값을 작업에 직접 적용하지 않습니다. 대신 **`save`** 함수를 호출하게 됩니다.

**`save`** 가 호출되면, 입력된 값을 해석하여 필요한 변경사항을 직접 커스텀 코드로 gantt에 적용해야 합니다. **`save`** 메서드 실행이 끝나면, Gantt는 [onSave](guides/inline-editors-ext.md#events) 이벤트를 발생시키지만, 갱신된 행에 대해 [gantt.updateTask](api/method/updatetask.md) 는 호출하지 않습니다.

**참고!** **`save`** 메서드는 에디터 구성에서 **`map_to:"auto"`** 를 설정한 경우에만 호출됩니다:

~~~js
var editors = {
    ...
    predecessors: {type: "predecessor", map_to: "auto"}
};
~~~

이 기능의 좋은 예시는 내장된 predecessor 에디터입니다. 관련 샘플에서 간략화된 구현을 확인할 수 있습니다:


**Related example:** [Built-in predecessor editor](https://snippet.dhtmlx.com/xz6192wd)



## 인라인 편집 모드 {#inlineeditingmodes}

### 기본 인라인 편집

이 모드는 마우스를 이용해 셀에 포커스를 이동하고, 단축키로 셀 간 이동을 지원합니다:

- Tab - 다음 에디터로 포커스 이동
- Shift+Tab - 이전 에디터로 포커스 이동


[Inline editing](https://docs.dhtmlx.com/gantt/samples/07_grid/11_inline_edit_basic.html)


### 키보드 내비게이션 모드

이 모드에서는 키보드로 그리드 셀을 이동하거나, 미리 지정된 키 조합으로 편집할 수 있습니다:

- Enter - 에디터 열기/닫기
- Space bar - 에디터 열기
- 방향키 - 그리드 셀 간 이동
- Shift+오른쪽 방향키 - 작업을 오른쪽으로 이동(하위로 중첩), 위 작업이 프로젝트로 변경
- Shift+왼쪽 방향키 - 프로젝트를 일반 작업으로 변경
- Shift+위쪽 방향키 - 작업 브랜치 접기
- Shift+아래쪽 방향키 - 작업 브랜치 펼치기

키보드 내비게이션을 통한 편집을 활성화하려면 다음을 수행해야 합니다:

- [gantt.plugins](api/method/plugins.md) 메서드로 **keyboard_navigation** 플러그인 활성화:

~~~js
gantt.plugins({
    keyboard_navigation: true
});
~~~

- [keyboard navigation](guides/keyboard-navigation.md) 및 셀 내비게이션 활성화:

~~~js
gantt.config.keyboard_navigation = true;
gantt.config.keyboard_navigation_cells = true;
~~~

또한, [placeholder row](api/config/placeholder_task.md) (작업 목록 끝에 표시되는 빈 행)를 활성화해, 사용자가 이 행을 편집하여 새로운 작업을 추가할 수 있습니다.

~~~js
gantt.config.placeholder_task = true;
~~~

또는, 새 작업 추가 후 즉시 placeholder task로 포커스를 이동하려면 다음과 같이 설정합니다:

~~~js
gantt.config.placeholder_task = {
    focusOnCreate: true
};
~~~

필요하다면 [automatic detection of task types](api/config/auto_types.md) 도 활성화할 수 있습니다:

~~~js
gantt.config.auto_types = true;
~~~


[Inline editing - keyboard navigation mode](https://docs.dhtmlx.com/gantt/samples/07_grid/12_inline_edit_key_nav.html)


### 커스텀 인라인 편집

직접 키보드 매핑을 정의하여, 에디터가 어떻게 열리고, 에디터 관련 이벤트(열기, 닫기, 편집 시작/종료 등)를 어떻게 처리할지 지정할 수 있습니다. 이를 위해 별도의 객체를 생성하고, 해당 매핑을 적용하는 특수 메서드에 전달합니다:

~~~js
var mapping = {
 init: function(inlineEditors){
  // inlineEditor 모듈 초기화
  // 편집 시작/종료에 대한 글로벌 리스너 추가
 },

 onShow: function(inlineEditors, node){
  // 에디터 표시됨
 },

 onHide: function(inlineEditors, node){
  // 에디터 숨김
  // 필요시 onShow에서의 변경사항 정리
 }
};

gantt.ext.inlineEditors.setMapping(mapping);
~~~


[Inline editing - Custom keyboard mapping](https://docs.dhtmlx.com/gantt/samples/07_grid/13_custom_mapping.html)


### placeholder task를 위한 커스텀 매핑

키보드 내비게이션, 인라인 에디터, placeholder task를 함께 사용할 때 자주 발생하는 두 가지 시나리오가 있습니다.

**시나리오 1.** 새 placeholder task에 이름을 입력하고 Tab을 누르면, Gantt가 해당 작업의 다음 셀을 열어줄 것으로 기대됩니다. 그러나 실제로는 포커스가 아래의 다음 placeholder task로 이동하며, 인라인 에디터는 열리지 않습니다.

**시나리오 2.** 새 placeholder task에 이름을 입력한 후 다음 셀을 클릭하면, Gantt는 클릭한 셀이 아니라 다음 placeholder task로 포커스를 이동시킵니다.

커스텀 매핑을 사용하면 마우스 및 키보드 동작에 대해 인라인 에디터가 어떻게 반응할지 지정하여 이러한 문제를 해결할 수 있습니다. 예시는 다음과 같습니다:


**Related example:** [Gantt. Custom mapping for placeholder task](https://snippet.dhtmlx.com/xcgiommu)

))

## 입력값 검증 {#validationofinputvalues}

그리드에서 셀을 편집하다 보면 실수가 발생할 수 있습니다.

잘못된 값이 저장되는 것을 방지하려면, 에디터를 닫기 전에 입력값을 검증해야 합니다. 방법은 두 가지가 있습니다:

- [custom editor object](guides/inline-editing.md#custominlineeditor) 의 **is_valid** 메서드 사용
- [inlineEditors object](guides/inline-editors-ext.md) 의 **onBeforeSave** 이벤트 사용

검증이 에디터 동작에 미치는 영향은 다음과 같습니다:

그리드 셀에서 마우스로 에디터를 열었을 때:

- Escape를 누르면 변경사항을 저장하지 않고 에디터를 닫습니다.
- Enter를 누르면 값이 유효한 경우 저장 후 에디터를 닫고, 유효하지 않으면 입력이 무시됩니다.
- Tab을 누르거나 다른 곳을 클릭하면, 유효한 값은 저장하고 포커스를 다른 셀로 이동합니다. 유효하지 않은 값은 리셋되고 에디터가 닫힙니다.

:::note
클라이언트/서버 측 검증에 대한 자세한 내용은 [Validation](guides/validation.md) 문서를 참고하세요.
:::

### 에디터 닫힘 방지

검증이 활성화되면, Gantt는 잘못된 입력을 리셋하고 에디터를 닫습니다. 사용자가 값을 수정하려면 셀을 다시 열어야 합니다.

이런 불편을 줄이기 위해, 사용자에게 값을 수정할 수 있도록 알림(alert)을 표시하는 방법이 있습니다. 예를 들어, 커스텀 키보드 매핑을 활용할 수 있습니다:

~~~js
function editAnotherCell(inlineEditors){
  var value = inlineEditors.getValue();
  if(confirm(`does '${value}' look ok to you?`)){
    inlineEditors.save();
  }
}

var mapping = {
  init: function(inlineEditors){
    gantt.attachEvent("onTaskClick", function (id, e) {
      var cell = inlineEditors.locateCell(e.target);
      if (cell && inlineEditors.getEditorConfig(cell.columnName)) {
        if (inlineEditors.isVisible()) editAnotherCell(inlineEditors)
        else inlineEditors.startEdit(cell.id, cell.columnName);
        return false;
      }
      return true;
    });
    gantt.attachEvent("onEmptyClick", function () {
      inlineEditors.hide();
      return true;
    });
  },

  onShow: function(inlineEditors, node){

    node.onkeydown = function (e) {
      e = e || window.event;
      if(e.defaultPrevented){
        return;
      }

      var keyboard = gantt.constants.KEY_CODES;

      var shouldPrevent = true;
      switch (e.keyCode) {
        case gantt.keys.edit_save:
          var value = inlineEditors.getValue();
          if(confirm(`does '${value}' look ok to you?`)){
            inlineEditors.save();
          }
          
          break;
        case gantt.keys.edit_cancel:
          inlineEditors.hide();
          break;
        case keyboard.TAB:
          if(e.shiftKey){
            if (inlineEditors.isVisible()) editAnotherCell(inlineEditors)
            else inlineEditors.editPrevCell(true);
          }else{
            if (inlineEditors.isVisible()) editAnotherCell(inlineEditors)
            else inlineEditors.editNextCell(true);
          }
          break;
        default:
          shouldPrevent = false;
          break;
      }

      if(shouldPrevent){
        e.preventDefault();
      }
    };
  },

  onHide: function(inlineEditors, node){}
};

gantt.ext.inlineEditors.setMapping(mapping);

gantt.init("gantt_here");
~~~


**Related example:** [Custom keyboard mapping](https://snippet.dhtmlx.com/5/5da351260)


## 한 번의 클릭으로 에디터 열기 {#openingeditorwithoneclick}

싱글 선택 모드에서는 작업을 클릭하면 인라인 에디터가 즉시 열립니다.

[다중 선택](guides/multiselection.md) 모드에서는 선택되지 않은 작업을 클릭하면 해당 작업이 선택되고, 인라인 에디터는 두 번째 클릭 시에만 열립니다. 만약 첫 번째 클릭에 바로 에디터가 열리게 하려면, [inline_editors_multiselect_open](api/config/inline_editors_multiselect_open.md) 설정을 활성화하세요:

~~~js
gantt.plugins({
  multiselect: true
});

...

gantt.config.inline_editors_multiselect_open = true;
~~~

