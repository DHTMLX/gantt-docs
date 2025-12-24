---
title: "Zoom Extension"
sidebar_label: "Zoom Extension"
---

# Zoom Extension


Zoom 확장 기능에 대한 자세한 내용은 [줌(Zooming)](guides/zooming.md) 문서에서 확인할 수 있습니다. 본 문서는 **zoom** 객체의 API 레퍼런스에 중점을 두고 있습니다.

## Zoom Levels

Zoom 확장 기능은 여러 배율 설정을 사용하여 손쉽게 배율을 전환할 수 있도록 합니다.

**ZoomLevel**은 다음과 같은 속성을 가진 배율 설정을 나타내는 객체입니다:

- <span class="subproperty">**name**</span> - (*string*) - 해당 레벨에 할당된 이름
- <span class="subproperty">**scale_height?**</span> - (*number*) - 배율의 높이
- <span class="subproperty">**height?**</span> - (*number*) - 배율의 높이
- <span class="subproperty">**min_column_width?**</span> - (*number*) - 컬럼의 최소 너비; minColumnWidth 및 maxColumnWidth보다 우선 적용됨
- <span class="subproperty">**scales**</span> - (*Scales*) - 이 레벨에서 확대/축소 시 전환할 수 있는 scale의 배열

## Methods

- <span class="submethod">**init (zoomConfig): void**</span> - 주어진 설정을 사용하여 확장 기능을 초기화합니다.
    - **_zoomConfig_** - (*object*) - *levels* 배열을 포함하여 확대/축소 레벨을 정의하는 설정 객체 및 여러 선택적 속성:
        - **_levels_** - (*ZoomLevel[]*) - 필수, 확대/축소 레벨을 정의하는 배열
        - **_handler?_** - (*Function*): void - 수동 확대/축소 제어를 위한 커스텀 마우스 휠 핸들러 지정
            - **_e_** - (*Event*) - 네이티브 이벤트 객체
        - **_startDate?_** - (*Date*) - 타임 스케일 확대/축소의 시작 지점
        - **_endDate?_** - (*Date*) - 타임 스케일 확대/축소의 종료 지점
        - **_activeLevelIndex?_** - (*number*) - 기본 활성화된 확대/축소 레벨의 인덱스
        - **_widthStep?_** - (*number*) - 확대/축소 시 scale 너비의 증감 단위
        - **_minColumnWidth?_** - (*number*) - 이전 확대/축소 레벨로 전환을 허용하는 최소 컬럼 너비
        - **_maxColumnWidth?_** - (*number*) - 다음 확대/축소 레벨로 전환을 허용하는 최대 컬럼 너비
        - **_useKey?_** - (*string*) - 마우스 휠 스크롤을 통한 확대/축소를 활성화하는 키 지정: "ctrlKey" | "altKey" | "shiftKey"
        - **_trigger?_** - (*string | null | undefined*) - 확대/축소 트리거 지정: "wheel" | null | undefined 
        - **_element?_** - (*HTMLElement | Function*): HTMLElement - 확대/축소를 트리거하는 DOM 요소 또는 해당 요소를 반환하는 함수

아래는 **zoom** 확장 기능을 설정하는 두 가지 예시입니다:

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


// 또는, levels를 scale 배열로 간단히 정의할 수도 있습니다
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

- <span class="submethod">**getCurrentLevel (): number**</span> - 현재 확대/축소 레벨의 인덱스를 반환합니다

~~~js
gantt.ext.zoom.getCurrentLevel();
~~~

- <span class="submethod">**setLevel (level): void**</span> - 지정한 레벨로 확대/축소 레벨을 변경합니다.
    - **_level_** - (*number | string*) - 레벨의 이름(예: "year") 또는 levels 배열 내의 인덱스

~~~js
gantt.ext.zoom.setLevel("year");
// 또는 
gantt.ext.zoom.setLevel(5);
~~~

- <span class="submethod">**getLevels (): ZoomLevel[]**</span> - 정의된 모든 확대/축소 레벨을 반환합니다

~~~js
gantt.ext.zoom.getLevels();
~~~

이 메서드는 **init()** 메서드에 전달된 zoom 레벨 배열(*ZoomLevels[]*)을 반환합니다.

- <span class="submethod">**zoomIn (): void**</span> - 더 높은 확대/축소 레벨로 이동합니다

~~~js
gantt.ext.zoom.zoomIn();
~~~

또는 다음과 같이 사용할 수도 있습니다:

~~~js
gantt.ext.zoom.setLevel(zoom.getCurrentLevel() - 1)
~~~

- <span class="submethod">**zoomOut (): void**</span> - 더 낮은 확대/축소 레벨로 이동합니다

~~~js
gantt.ext.zoom.zoomOut();
~~~

또는 다음과 같이 사용할 수도 있습니다:

~~~js
gantt.ext.zoom.setLevel(zoom.getCurrentLevel() + 1)
~~~

- <span class="submethod">**attachEvent (name, handler): string**</span> - 이벤트 핸들러를 추가합니다
    - **_name_** - (*string*) - 감지할 이벤트 이름
    - **_handler_** - (*Function*) - 이벤트 발생 시 실행할 함수

- <span class="submethod">**detachEvent (id): void**</span> - 이전에 등록한 이벤트 핸들러를 제거합니다
    - **_id_** - (*string*) - 제거할 이벤트 핸들러의 식별자

- <span class="submethod">**callEvent (name, params): boolean**</span> - 내부 이벤트를 트리거합니다
    - **_name_** - (*string*) - 이벤트 이름(대소문자 무관)
    - **_params_** - (*Array&lt;any&gt;*) - 이벤트 관련 데이터의 선택적 배열

- <span class="submethod">**checkEvent (name): boolean**</span> - 특정 이벤트에 등록된 핸들러가 있는지 확인합니다
    - **_name_** - (*string*) - 이벤트 이름

이벤트에 하나 이상의 핸들러가 등록되어 있으면 <i>true</i>를 반환합니다.

## Events

- **<span class="eventname">onAfterZoom</span>** - 확대/축소 레벨이 변경될 때 발생합니다.
이벤트는 다음과 같은 인자를 제공합니다: 
<span class="eventarguments">
    - **_level_** - (*number | string*) - 확대/축소 레벨의 인덱스 또는 이름
    - **_config_** - (*ZoomLevel*) - 해당 확대/축소 레벨의 설정 객체
</span>

~~~js
gantt.ext.zoom.attachEvent("onAfterZoom", function(level, config){ 
    document.querySelector(".gantt_radio[value='" +config.name+ "']").checked = true;
}); 
~~~
