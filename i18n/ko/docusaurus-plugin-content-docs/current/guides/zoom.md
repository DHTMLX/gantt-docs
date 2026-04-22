---
title: "줌 확장"
sidebar_label: "줌 확장"
---

# 줌 확장



더 자세한 내용은 [Zooming](guides/zooming.md) 문서를 참조하십시오. 본 문서는 **zoom** 객체의 API 레퍼런스를 제공합니다:


## 줌 레벨

줌 확장은 스케일 설정의 집합을 사용하고 이들 간의 빠른 전환을 가능하게 합니다.

**ZoomLevel**은 스케일 설정을 포함하는 객체입니다. 아래 속성을 가집니다:

- <span class="subproperty">**name**</span> - (*string*) - 레벨의 이름
- <span class="subproperty">**scale_height?**</span> - (*number*) - 스케일의 높이
- <span class="subproperty">**height?**</span> - (*number*) - 스케일의 높이
- <span class="subproperty">**min_column_width?**</span> - (*number*) - 칼럼의 최소 너비. minColumnWidth와 maxColumnWidth보다 우선순위가 높습니다
- <span class="subproperty">**scales**</span> - (*Scales*) - 이 레벨에서 확대/축소 중 전환할 스케일의 배열


## 메서드

- <span class="submethod">**init (zoomConfig): void**</span> - 제공된 구성으로 확장을 초기화합니다.
    - **_zoomConfig_** - (*object*) - 구성 설정을 담고 있으며 *levels* 배열의 줌 레벨과 추가 속성들을 포함하는 객체
        - **_levels_** - (*ZoomLevel[]*) - 필수, 줌 레벨의 배열
        - **_handler?_** - (*Function*): void - 마우스 휠의 커스텀 핸들러를 지정하여 수동으로 확대/축소를 제어할 수 있습니다
            - **_e_** - (*Event*) - 네이티브 이벤트 객체
        - **_startDate?_** - (*Date*) - 시간 축 줌의 시작 값
        - **_endDate?_** - (*Date*) - 시간 축 줌의 종료 값
        - **_activeLevelIndex?_** - (*number*) - 기본 활성 레벨의 번호
        - **_widthStep?_** - (*number*) - 다음/이전 줌 레벨로 전환할 때 스케일 너비를 증가시키는 단계
        - **_minColumnWidth?_** - (*number*) - 이전 줌 레벨로 전환을 허용하는 칼럼의 최소 너비
        - **_maxColumnWidth?_** - (*number*) - 다음 줌 레벨로 전환을 허용하는 칼럼의 최대 너비
        - **_useKey?_** - (*string*) - 마우스 휠 스크롤로 확대/축소를 가능하게 하는 키: "ctrlKey" | "altKey" | "shiftKey"
        - **_trigger?_** - (*string | null | undefined*) - 확대/축소의 트리거: "wheel" | null | undefined 
        - **_element?_** - (*HTMLElement | Function*): HTMLElement - 확대/축소가 트리거되는 DOM 요소 또는 DOM 요소를 반환하는 함수

다음은 **zoom** 구성 설정의 두 가지 예시입니다:

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


// 또는 좀 더 단순한 방식으로 레벨을 스케일 배열로 표현할 수도 있습니다
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

- <span class="submethod">**getCurrentLevel (): number**</span> - 현재 줌 레벨의 번호(인덱스)를 반환합니다

~~~js
gantt.ext.zoom.getCurrentLevel();
~~~

- <span class="submethod">**setLevel (level): void**</span> - 지정된 줌 레벨로 전환합니다
    - **_level_** - (*number | string*) - 레벨은 구성을 구성하는 이름(예: "year")의 문자열이거나 배열의 번호로 정의됩니다

~~~js
gantt.ext.zoom.setLevel("year");
// 또는 
gantt.ext.zoom.setLevel(5);
~~~

- <span class="submethod">**getLevels (): ZoomLevel[]**</span> - 모든 줌 레벨을 가져옵니다

~~~js
gantt.ext.zoom.getLevels();
~~~

초기에 **init()** 메서드에 전달된 줌 레벨의 배열(*ZoomLevels[]*)을 반환합니다.

- <span class="submethod">**zoomIn (): void**</span> - 현재 줌 레벨을 증가시킵니다

~~~js
gantt.ext.zoom.zoomIn();
~~~

동일한 목적의 다른 방법으로도 사용 가능합니다:

~~~js
gantt.ext.zoom.setLevel(zoom.getCurrentLevel() - 1)
~~~

- <span class="submethod">**zoomOut (): void**</span> - 현재 줌 레벨을 감소시킵니다

~~~js
gantt.ext.zoom.zoomOut();
~~~

동일한 목적의 다른 방법으로도 사용 가능합니다:

~~~js
gantt.ext.zoom.setLevel(zoom.getCurrentLevel() + 1)
~~~

- <span class="submethod">**attachEvent (name, handler): string**</span> - 이벤트 핸들러를 연결합니다
    - **_name_** - (*string*) - 이벤트 핸들러의 이름
    - **_handler_** - (*Function*) - 이벤트가 발생했을 때 호출되는 함수

- <span class="submethod">**detachEvent (id): void**</span> - 이벤트에서 핸들러를 분리합니다
    - **_id_** - (*string*) - 연결된 이벤트 핸들러의 id

- <span class="submethod">**callEvent (name, params): boolean**</span> - 내부 이벤트를 호출합니다
    - **_name_** - (*string*) - 이벤트의 이름, 대소문자 구분 없이
    - **_params_** - (*Array&lt;any&gt;*) - 선택적, 이벤트 관련 데이터의 배열

- <span class="submethod">**checkEvent (name): boolean**</span> - 이벤트에 핸들러가 지정되어 있는지 확인합니다
    - **_name_** - (*string*) - 이벤트의 이름

참으면 <i>true</i>를 반환합니다. 해당 이벤트에 핸들러가 지정되어 있으면 참입니다.

## 이벤트

- **<span class="eventname">onAfterZoom</span>** - 줌 레벨 변경 시점에 발생합니다.
인수:
<span class="eventarguments">
    - **_level_** - (*number | string*) - 레벨의 번호
    - **_config_** - (*ZoomLevel*) - 레벨의 구성
</span>

~~~js
gantt.ext.zoom.attachEvent("onAfterZoom", function(level, config){ 
    document.querySelector(".gantt_radio[value='" +config.name+ "']").checked = true;
}); 
~~~