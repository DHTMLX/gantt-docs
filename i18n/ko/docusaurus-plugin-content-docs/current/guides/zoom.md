---
title: "줌 확장"
sidebar_label: "줌 확장"
---

# 줌 확장

다음 문서에서 Zoom 확장에 대한 세부 정보를 확인할 수 있습니다. [Zooming](guides/zooming.md) 문서에 있는 내용도 참고하십시오. 현재 문서는 `zoom` 객체의 API 참조를 제공합니다:

## 줌 레벨

Zoom 확장은 일련의 스케일 설정을 사용하며 이들 사이를 빠르게 전환할 수 있습니다.

`ZoomLevel`은 스케일 설정을 담고 있는 객체입니다. 아래 속성을 포함합니다:

- <span class="subproperty">**name**</span> - (*string*) - 레벨의 이름
- <span class="subproperty">**scale_height?**</span> - (*number*) - 스케일의 높이
- <span class="subproperty">**height?**</span> - (*number*) - 스케일의 높이
- <span class="subproperty">**min_column_width?**</span> - (*number*) - 칼럼의 최소 너비. 이는 minColumnWidth 및 maxColumnWidth보다 높은 우선순위를 가집니다
- <span class="subproperty">**scales**</span> - (*Scales*) - 이 레벨에서 확대/축소 시 전환할 스케일 배열


## 메서드

- <span class="submethod">**init(zoomConfig): void**</span> - 제공된 구성으로 확장을 초기화합니다.
    - **_zoomConfig?_** - (*object*) - *levels* 배열의 줌 레벨과 추가 속성들을 포함하는 구성 설정 객체:
        - **_levels?_** - (*ZoomLevel[]*) - 줌 레벨의 배열. 선택적이며 생략 시 기본 명명된 레벨 모음("hour", "day", "week", "month", "year")이 사용됩니다
        - **_handler?_** - (*Function*): void - 마우스 휠로 수동으로 확대/축소를 제어하는 커스텀 핸들러를 지정할 수 있습니다
            - **_e_** - (*Event*) - 네이티브 이벤트 객체
        - **_startDate?_** - (*Date*) - 시간 축 줌의 시작 값
        - **_endDate?_** - (*Date*) - 시간 축 줌의 종료 값
        - **_activeLevelIndex?_** - (*number*) - 기본 활성 레벨의 인덱스
        - **_widthStep?_** - (*number*) - 다음/이전 줌 레벨로 전환할 때 스케일 폭을 증가시키거나 감소시키는 단위
        - **_minColumnWidth?_** - (*number*) - 이전 줌 레벨로 전환을 허용하는 칼럼의 최소 너비
        - **_maxColumnWidth?_** - (*number*) - 다음 줌 레벨로 전환을 허용하는 칼럼의 최대 너비
        - **_useKey?_** - (*string*) - 마우스 휠로 확대/축소를 가능하게 하는 키: "ctrlKey" | "altKey" | "shiftKey"
        - **_trigger?_** - (*string | null | undefined*) - 줌 작동 트리거: "wheel" | null | undefined
        - **_element?_** - (*HTMLElement | Function*): HTMLElement - 줌 작동이 트리거되는 DOM 요소 또는 DOM 요소를 반환하는 함수
        - **_fit?_** - (*object*) - 기본 [zoom-to-fit](#zoom-to-fit) 설정. 아래에 나열된 `zoomToFit` 옵션과 함께, *levels*(핏에 맞추기에만 사용되는 전용 스케일 세트)와 *handler*(레벨 선택을 재정의하는 함수)를 받아들입니다

다음은 `zoom` 구성 설정의 두 가지 예시입니다:

~~~js
const zoomConfig = {
    levels: [
        {
            name: "day",
            scale_height: 27,
            min_column_width: 80,
            scales: [{ unit: "day", step: 1, format: "%d %M" }]
        },
        {
            name: "week",
            scale_height: 50,
            min_column_width: 50,
            scales: [
                {
                    unit: "week",
                    step: 1,
                    format: (date) => {
                        const dateToStr = gantt.date.date_to_str("%d %M");
                        const endDate = gantt.date.add(date, 6, "day");
                        const weekNumber = gantt.date.date_to_str("%W")(date);

                        return `#${weekNumber}, ${dateToStr(date)} - ${dateToStr(endDate)}`;
                    }
                },
                { unit: "day", step: 1, format: "%j %D" }
            ]
        },
        {
            name: "month",
            scale_height: 50,
            min_column_width: 120,
            scales: [{ unit: "month", format: "%F, %Y" }, { unit: "week", format: "Week #%W" }]
        },
        {
            name: "quarter",
            height: 50,
            min_column_width: 90,
            scales: [
                { unit: "month", step: 1, format: "%M" },
                {
                    unit: "quarter",
                    step: 1,
                    format: (date) => {
                        const dateToStr = gantt.date.date_to_str("%M");
                        const endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");

                        return `${dateToStr(date)} - ${dateToStr(endDate)}`;
                    }
                }
            ]
        },
        {
            name: "year",
            scale_height: 50,
            min_column_width: 30,
            scales: [{ unit: "year", step: 1, format: "%Y" }]
        }
    ]
};

gantt.ext.zoom.init(zoomConfig);


// or, in a more simple way levels can be presented as scale arrays
const hourToStr = gantt.date.date_to_str("%H:%i");
const hourRangeFormat = (step) => {
    return (date) => {
        const intervalEnd = new Date(gantt.date.add(date, step, "hour") - 1);

        return `${hourToStr(date)} - ${hourToStr(intervalEnd)}`;
    };
};
const simpleZoomConfig = {
    levels: [
        [
            { unit: "month", format: "%M %Y", step: 1 }
        ],
        [
            { unit: "month", format: "%M %Y", step: 1 },
            { unit: "day", format: "%d %M", step: 1 }
        ],
        [
            { unit: "day", format: "%d %M", step: 1 },
            { unit: "hour", format: hourRangeFormat(12), step: 12 }
        ],
        [
            { unit: "day", format: "%d %M", step: 1 },
            { unit: "hour", format: hourRangeFormat(6), step: 6 }
        ],
        [
            { unit: "day", format: "%d %M", step: 1 },
            { unit: "hour", format: "%H:%i", step: 1 }
        ]
    ]
};

gantt.ext.zoom.init(simpleZoomConfig);
~~~

- <span class="submethod">**getCurrentLevel(): number**</span> - 현재 줌 레벨의 번호(인덱스)를 반환합니다

~~~js
gantt.ext.zoom.getCurrentLevel();
~~~


- <span class="submethod">**setLevel(level): void**</span> - 지정된 줌 레벨로 전환합니다.
    - **_level_** - (*number | string*) - 레벨은 구성의 이름(예: "year")으로 정의되거나, 레벨 배열에서의 번호로 정의됩니다

~~~js
gantt.ext.zoom.setLevel("year");
// 또는
gantt.ext.zoom.setLevel(5);
~~~


- <span class="submethod">**getLevels(): ZoomLevel[]**</span> - 모든 줌 레벨을 가져옵니다

~~~js
gantt.ext.zoom.getLevels();
~~~


- 반환 값은 init()에 전달된 줌 레벨 배열입니다. 이를 통해 확장이 초기화됩니다.

- <span class="submethod">**zoomIn(): void**</span> - 현재 줌 레벨을 증가시킵니다

~~~js
gantt.ext.zoom.zoomIn();
~~~


다음과 동일한 목적을 위해 아래와 같이도 사용할 수 있습니다:

~~~js
gantt.ext.zoom.setLevel(gantt.ext.zoom.getCurrentLevel() - 1);
~~~


- <span class="submethod">**zoomOut(): void**</span> - 현재 줌 레벨을 감소시킵니다

~~~js
gantt.ext.zoom.zoomOut();
~~~


다음과 동일한 목적을 위해 아래와 같이도 사용할 수 있습니다:

~~~js
gantt.ext.zoom.setLevel(gantt.ext.zoom.getCurrentLevel() + 1);
~~~


- <span class="submethod">**zoomToFit(options?): boolean**</span> - 대상 작업이 타임라인 너비에 맞아 가로 스크롤 없이 보이도록 가장 자세한(세밀한) 줌 레벨을 선택하고 이를 적용합니다. 옵션 목록은 [핏에 맞추기](#zoom-to-fit)에서 확인하십시오. 이 메서드는 멱등이며, 적합한 레벨이 적용되면 true를, 그렇지 않으면 false를 반환합니다.

~~~js
gantt.ext.zoom.zoomToFit();
// 또는 현재 보이는(확장된) 행만 맞추려면
gantt.ext.zoom.zoomToFit({ scope: "visible" });
~~~


- <span class="submethod">**resetZoom(): boolean**</span> - 최초의 `zoomToFit()` 호출 이전에 활성화되었던 줌 레벨과 시간 축을 복원합니다. 저장된 스케일이 복원되었을 때 true를, 복원할 것이 없으면 false를 반환합니다.

~~~js
gantt.ext.zoom.resetZoom();
~~~


- <span class="submethod">**attachEvent(name, handler): string**</span> - 이벤트 핸들러를 연결합니다
    - **_name_** - (*string*) - 이벤트 핸들러의 이름
    - **_handler_** - (*Function*) - 이벤트가 발생했을 때 호출될 함수

- <span class="submethod">**detachEvent(id): void**</span> - 이벤트에서 핸들러를 제거합니다
    - **_id_** - (*string*) - 연결된 이벤트 핸들러의 ID

- <span class="submethod">**callEvent(name, params): boolean**</span> - 내부 이벤트를 호출합니다
    - **_name_** - (*string*) - 이벤트의 이름(대소문자 구분 없음)
    - **_params_** - (*Array&lt;any&gt;*) - 선택적, 이벤트 관련 데이터의 배열

- <span class="submethod">**checkEvent(name): boolean**</span> - 특정 이벤트에 핸들러가 하나 이상 지정되어 있는지 확인합니다
    - **_name_** - (*string*) - 이벤트의 이름

참이면 해당 이벤트에 핸들러가 지정되어 있습니다.

## 핏에 맞추기

[`zoomToFit(options)`](#methods) 및 [`init()`의](#methods) `fit` 설정은 아래 옵션을 허용합니다:

- <span class="subproperty">**scope?**</span> - (*"all" | "visible"*) - 맞출 작업 범위: *"all"* (기본값) 은 접혀진 가지 아래의 작업을 포함한 모든 로드된 작업을 맞춥니다; *"visible"* 은 현재 확장된 행만 맞춥니다
- <span class="subproperty">**taskId?**</span> - (*string | number*) - 단일 작업과 그 하위 트리를 함께 맞춥니다
- <span class="subproperty">**range?**</span> - (*object*) - 시작 날짜와 끝 날짜를 가진 명시적 날짜 범위를 맞춥니다
- <span class="subproperty">**rangeMode?**</span> - (*"auto" | "preserve" | "target"*) - 표시된 `start_date`/`end_date`를 피팅된 범위로 덮어쓸지 여부. *"target"* 은 항상 피팅된 범위를 설정하고, *"preserve"* 는 현재 범위를 유지하며, *"auto"* (기본값) 는 명시적으로 설정된 경계값을 보존하고 그렇지 않으면 피팅된 범위를 설정합니다
- <span class="subproperty">**padding?**</span> - (*number*) - 첫 번째 피팅된 날짜 이전과 마지막 피팅된 날짜 이후에 추가되는 열의 수. 기본값: *1*
- <span class="subproperty">**minLevel?**</span> - (*string | number*) - `zoomToFit`이 선택할 수 있는 가장 자세한 줌 레벨
- <span class="subproperty">**maxLevel?**</span> - (*string | number*) - `zoomToFit`이 선택할 수 있는 가장 거친 줌 레벨

초기화 시 `fit` 속성으로 설정하면 구성은 추가로 다음을 허용합니다:

- <span class="subproperty">**levels?**</span> - (*ZoomLevel[]*) - `zoomToFit`에서만 고려되는 전용 줌 레벨의 세트. 생략 시 인터랙티브 줌 레벨이 사용됩니다
- <span class="subproperty">**handler?**</span> - (*Function*): string | number | boolean | void - 레벨 선택을 재정의합니다. 컨텍스트 객체를 받아 적용할 레벨 이름/인덱스를 반환해야 하며, 피트를 중단하려면 false, 계산된 레벨을 유지하려면 아무 것도 반환하지 않아도 됩니다
    - **_context_** - (*object*) - `{ range, viewportWidth, levels, padding, defaultLevel }` 형태의 객체이며, 여기서 *defaultLevel*은 빌트인 알고리즘이 선택한 레벨 인덱스입니다

이 옵션들은 `zoomToFit()`에 직접 전달되어 `init({ fit })`로 설정된 기본값을 덮어씁니다.

~~~js
gantt.ext.zoom.init({
    fit: {
        scope: "all",
        // 핏에 맞추기에만 사용되는 전용 스케일 세트
        levels: [
            { name: "weeks", scale_height: 50, scales: [{ unit: "week", step: 1, format: "Week #%W" }] },
            { name: "months", scale_height: 50, scales: [{ unit: "month", step: 1, format: "%F, %Y" }] }
        ],
        handler: (context) => {
            // 기본값을 적용하려면 레벨 이름/인덱스를 반환하거나, false로 피트를 중단하고, 아무 것도 반환하지 않으면 기본값을 유지합니다
            return context.defaultLevel;
        }
    }
});

gantt.ext.zoom.zoomToFit();
~~~

관련 예제: [핏에 맞추기](https://docs.dhtmlx.com/gantt/samples/03_scales/13_zoom_to_fit.html)

## 이벤트

- <span class="eventname">onAfterZoom</span> - 줌 레벨 전환 중에 발생합니다.
인수는 다음과 같습니다:
<span class="eventarguments">
    - **_level_** - (*number | string*) - 레벨의 번호
    - **_config_** - (*ZoomLevel*) - 레벨의 설정
</span>

~~~js
gantt.ext.zoom.attachEvent("onAfterZoom", (level, config) => {
    document.querySelector(`.gantt_radio[value='${config.name}']`).checked = true;
});
~~~