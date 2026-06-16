---
title: "줌"
sidebar_label: "줌"
---

# 줌

dhtmlxGantt는 시간 축의 확대/축소를 편리하게 관리할 수 있는 내장 모듈을 제공합니다. 기본 줌 동작을 커스터마이즈하고 싶다면, 시간 축의 설정을 동적으로 변경하는 기능을 구현할 수 있게 해주는 [유연한 API](guides/zoom.md)가 있습니다.

## 내장 줌 모듈

내장된 [줌 모듈](guides/zoom.md)은 `gantt.ext.zoom` 확장에 선언되어 있습니다. 모듈을 활성화하려면 `gantt.ext.zoom.init(zoomConfig)`를 호출하고, 축 확대 수준 배열을 포함하는 구성 설정을 가진 `zoomConfig` 객체를 전달해야 합니다. 예시는 아래와 같습니다:

~~~js
const zoomConfig = {
    levels: [
        {
            name: "day",
            scale_height: 27,
            min_column_width: 80,
            scales: [
                { unit: "day", step: 1, format: "%d %M" }
            ]
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
                        const formatDate = gantt.date.date_to_str("%d %M");
                        const endDate = gantt.date.add(date, 6, "day");
                        const weekNumber = gantt.date.date_to_str("%W")(date);
                        return `#${weekNumber}, ${formatDate(date)} - ${formatDate(endDate)}`;
                    }
                },
                { unit: "day", step: 1, format: "%j %D" }
            ]
        },
        {
            name: "month",
            scale_height: 50,
            min_column_width: 120,
            scales: [
                { unit: "month", format: "%F, %Y" },
                { unit: "week", format: "Week #%W" }
            ]
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
                        const formatDate = gantt.date.date_to_str("%M");
                        const endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
                        return `${formatDate(date)} - ${formatDate(endDate)}`;
                    }
                }
            ]
        },
        {
            name: "year",
            scale_height: 50,
            min_column_width: 30,
            scales: [
                { unit: "year", step: 1, format: "%Y" }
            ]
        }
    ]
};

gantt.ext.zoom.init(zoomConfig);
~~~  

:::note
The detailed information about the zooming module and its API is given in the article [Zoom Extension](guides/zoom.md).
:::

**Related sample**: [마우스 휠 확대/축소](https://docs.dhtmlx.com/gantt/samples/03_scales/14_scale_zoom_by_wheelmouse.html)

### 기본 줌 레벨

만약 `levels` 설정 없이 `gantt.ext.zoom.init()`를 호출하면, 확장 기능은 준비된 이름이 있는 기본 레벨 세트를 사용합니다. - **"hour"**, **"day"**, **"week"**, **"month"**, 및 **"year"**. 이를 통해 한 번의 호출로 줌을 활성화하고 이름으로 축을 전환할 수 있습니다:

~~~js
gantt.ext.zoom.init();

gantt.ext.zoom.setLevel("week");
~~~

사용자 정의 스케일 또는 레이블이 필요하면 `levels` 배열을 제공합니다.

## 화면에 맞추기(Zoom to fit)

Zoom 확장은 모든 작업이 수평 스크롤 없이 타임라인 너비에 맞게 들어갈 수 있는 가장 상세한 줌 레벨을 자동으로 선택할 수 있습니다. [`gantt.ext.zoom.zoomToFit()`](guides/zoom.md#methods)를 호출하고, 이전 배율로 돌아가고 싶을 때는 [`gantt.ext.zoom.resetZoom()`](guides/zoom.md#methods)를 호출합니다:

~~~js
gantt.ext.zoom.init();

// 화면에 보이는 타임라인에 로드된 모든 작업 맞추기
gantt.ext.zoom.zoomToFit();

// 첫 번째 zoomToFit() 호출 이전에 활성화된 스케일로 복원
gantt.ext.zoom.resetZoom();
~~~

`zoomToFit()`은 적합한 레벨이 적용되면 `true`를 반환하고, 그렇지 않으면 (예: 빈 차트) `false`를 반환합니다.

기본적으로 `zoomToFit()`은 **로드된 모든 작업**에 맞춥니다. 피팅 대상이나 선택 로직을 바꿀 수 있으며, init()의 `fit` 설정이나 `zoomToFit()`에 전달된 옵션을 통해 재정의할 수 있습니다:

~~~js
gantt.ext.zoom.init({
    levels: [ /* interactive zoom levels */ ],
    fit: {
        scope: "all", // "all" (기본값) 모든 로드된 작업에 맞춤, "visible" - 확장된 행만
        levels: [ /* optional, a set of scales used only for fitting */ ],
        handler: (context) => {
            // context: { range, viewportWidth, levels, padding, defaultLevel }
            return context.defaultLevel; // 레벨 이름/인덱스를 반환하거나, 중단하려면 false
        }
    }
});

// per-call options override the init() defaults
gantt.ext.zoom.zoomToFit({ scope: "visible" });               // 확장된 행만 맞추기
gantt.ext.zoom.zoomToFit({ taskId: 5 });                      // 태스크와 하위 트리를 맞추기
gantt.ext.zoom.zoomToFit({ range: { start_date, end_date } });// 명시적 날짜 범위 맞춤
~~~

옵션의 전체 목록은 [Zoom Extension](guides/zoom.md#zoom-to-fit) 문서에 있습니다.

**Related sample**: [화면에 맞추기](https://docs.dhtmlx.com/gantt/samples/03_scales/13_zoom_to_fit.html)

## 맞춤형 줌 설정

줌 모듈을 사용하지 않고 축 설정을 수동으로 제어하는 방식을 원한다면, 해당 구성 옵션을 통해 구현할 수 있습니다.

사실, 줌 기능을 구현하려면 시간 축 구성의 여러 프리셋(줌 레벨)을 정의하고 사용자가 이들 사이를 전환할 수 있는 기능을 제공하는 것을 의미합니다.

시간 축을 구성하는 데 필요한 설정은 다음과 같습니다:

- [`gantt.config.scales`](api/config/scales.md) - 원하는 수 만큼의 시간 축 행을 설정할 수 있음
- [`gantt.config.min_column_width`](api/config/min_column_width.md), [`gantt.config.scale_height`](api/config/scale_height.md) - 시간 축 칸의 너비와 시간 축의 전체 높이

다음 프리셋을 고려해 보십시오:

~~~js
/* global gantt */
const setScaleConfig = (level) => {
    switch (level) {
        case "day":
            gantt.config.scales = [
                { unit: "day", step: 1, format: "%d %M" }
            ];
            gantt.config.scale_height = 27;
            break;
        case "week": {
            const formatWeekScale = (date) => {
                const formatDate = gantt.date.date_to_str("%d %M");
                const endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
                return `${formatDate(date)} - ${formatDate(endDate)}`;
            };

            gantt.config.scales = [
                { unit: "week", step: 1, format: formatWeekScale },
                { unit: "day", step: 1, format: "%D" }
            ];
            gantt.config.scale_height = 50;
            break;
        }
        case "month":
            gantt.config.scales = [
                { unit: "month", step: 1, format: "%F, %Y" },
                { unit: "day", step: 1, format: "%j, %D" }
            ];
            gantt.config.scale_height = 50;
            break;
        case "year":
            gantt.config.scales = [
                { unit: "year", step: 1, format: "%Y" },
                { unit: "month", step: 1, format: "%M" }
            ];
            gantt.config.scale_height = 90;
            break;
    }
};
~~~

설명된 함수는 위의 "day"부터 "year"까지의 시간 축 중 네 가지 미리 정의된 구성 중 하나로 gantt 객체를 구성할 수 있습니다.
구성 변경을 화면에 반영하려면 Gantt를 다시 그려야 합니다:

~~~js
setScaleConfig("year");
gantt.init("gantt_here");
~~~

그런 다음 사용자가 줌 레벨을 전환할 수 있는 UI를 구현할 수 있습니다:

~~~html
<label><input type="radio" name="scale" value="day" checked/>일 축</label>
<label><input type="radio" name="scale" value="week"/>주 축</label>
<label><input type="radio" name="scale" value="month"/>월 축</label>
<label><input type="radio" name="scale" value="year"/>연도 축</label>
~~~

~~~js
const scaleInputs = document.querySelectorAll("input[name='scale']");

scaleInputs.forEach((input) => {
    input.onclick = (event) => {
        const selectedScale = event.target.value;
        setScaleConfig(selectedScale);
        gantt.render();
    };
});
~~~

**Related sample**: [동적 스케일](https://docs.dhtmlx.com/gantt/samples/03_scales/05_dynamic_scales.html)