---
title: "줌"
sidebar_label: "줌"
---

# 줌

dhtmlxGantt은 시간 축척의 확대/축소를 편리하게 관리하기 위한 내장 모듈을 제공합니다. 기본 확대/축소 동작을 사용자 정의하려는 경우, 시간 축척 설정을 동적으로 변경하는 기능을 구현할 수 있는 [유연한 API](guides/zoom.md)가 있습니다.

## 내장 줌 모듈

임베디드 [줌 모듈](guides/zoom.md)은 `gantt.ext.zoom` 확장에서 선언되어 있습니다. 모듈을 활성화하려면 `gantt.ext.zoom.init(zoomConfig)`를 호출하고 구성 설정을 담은 `zoomConfig` 객체를 전달해야 하며, 이 객체에는 확대/축소 수준의 배열이 포함되어 있습니다. 예를 들면:

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
The detailed information about the zooming module and its API is given in the article [Zoom 확장](guides/zoom.md).
:::

**Related sample**: [마우스 휠 확대](https://docs.dhtmlx.com/gantt/samples/03_scales/14_scale_zoom_by_wheelmouse.html)

## 맞춤형 줌 설정

줌 모듈을 사용하지 않고 스케일 설정을 수동으로 제어하려는 경우, 해당 구성 옵션을 통해 가능합니다.

사실 줌 기능을 구현한다는 것은 시간 축척 구성(zoom levels)의 여러 프리셋을 정의하고 사용자가 이를 전환할 수 있도록 하는 것을 의미합니다.

다음과 같은 설정이 필요합니다:

- [`gantt.config.scales`](api/config/scales.md) - 임의의 수의 시간 축척 행을 설정할 수 있게 해 줍니다
- [`gantt.config.min_column_width`](api/config/min_column_width.md), [`gantt.config.scale_height`](api/config/scale_height.md) - 시간 축척의 열 너비 및 전체 높이

다음 프리셋을 살펴보겠습니다:

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

설명된 함수는 네 가지 미리 정의된 구성 중 하나를 통해 gantt 객체를 구성할 수 있으며, 구성 변경을 표시하려면 Gantt를 전체 다시 그려야 합니다:

~~~js
setScaleConfig("year");
gantt.init("gantt_here");
~~~

그런 다음 사용자가 줌 레벨을 전환할 수 있는 UI를 구현할 수 있습니다:

~~~html
<label><input type="radio" name="scale" value="day" checked/>Day scale</label>
<label><input type="radio" name="scale" value="week"/>Week scale</label>
<label><input type="radio" name="scale" value="month"/>Month scale</label>
<label><input type="radio" name="scale" value="year"/>Year scale</label>
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

**Related sample**: [동적 축척](https://docs.dhtmlx.com/gantt/samples/03_scales/05_dynamic_scales.html)