---
sidebar_label: rtl
title: rtl config
description: "간트를 오른쪽에서 왼쪽으로 표시하는 모드로 전환합니다."
---

# rtl

### Description

@short: 간트를 오른쪽에서 왼쪽으로 표시하는 모드로 전환합니다.

@signature: rtl: boolean

### Example

~~~jsx
gantt.config.rtl = true;
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
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Right to left gantt](https://docs.dhtmlx.com/gantt/samples/10_layout/04_rtl.html)

### Details

이 옵션을 **true**로 설정하면 타임라인의 시간 스케일 방향과 그리드의 행 순서가 오른쪽에서 왼쪽으로 변경됩니다.

이 설정은 간트 레이아웃 구성을 자동으로 업데이트하지 않으므로, 그리드와 타임라인 위치를 교환하려면 레이아웃을 직접 조정해야 합니다.

또한 [간트의 레이블 텍스트 방향을 조정하는 것](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)도 고려할 수 있습니다.

### Related Guides
- [RTL (오른쪽-왼쪽) 모드](guides/rtl-mode.md)
