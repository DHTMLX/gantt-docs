---
title: "RTL (오른쪽-왼쪽) 모드"
sidebar_label: "RTL (오른쪽-왼쪽) 모드"
---

# RTL (오른쪽-왼쪽) 모드


![rtl_mode](/img/rtl_mode.png)

Gantt 차트는 오른쪽-왼쪽(RTL) 모드를 지원하며, [rtl](api/config/rtl.md) 구성 옵션을 사용하여 활성화할 수 있습니다.  
*true*로 설정하면, 타임라인의 시간 축 방향이 변경되고, 그리드의 행 순서가 오른쪽에서 왼쪽으로 반전됩니다.

~~~js
gantt.config.rtl = true;
~~~

rtl 모드를 켜도 [gantt.config.layout](api/config/layout.md)이 자동으로 업데이트되지 않으므로, 레이아웃을 조정하여 그리드와 타임라인의 위치를 교환해야 합니다. 다음과 같이 설정할 수 있습니다:

~~~js
gantt.config.layout = {
    css: "gantt_container",
    rows: [
        {
            cols: [
                {view: "scrollbar", id: "scrollVer"},
                {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
                {resizer: true, width: 1},
                {view: "grid", scrollX: "scrollHor", scrollY: "scrollVer"}
            ]
        },
        {view: "scrollbar", id: "scrollHor", height: 20}
    ]
};
~~~


[Right to left gantt](https://docs.dhtmlx.com/gantt/samples/10_layout/04_rtl.html)


또한 gantt의 레이블에 대해 텍스트 방향을 [조정](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)하는 것도 유용할 수 있습니다.

