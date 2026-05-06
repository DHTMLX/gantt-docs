---
sidebar_label: rtl
title: rtl 설정
description: "간트 차트를 RTL 모드로 전환합니다"
---

# rtl

### Description

@short: 간트 차트를 오른쪽에서 왼쪽(RTL) 모드로 전환합니다

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

구성 옵션을 **true**로 설정하면 타임라인의 시간 눈금 방향과 그리드의 행 순서가 오른쪽에서 왼쪽으로 변경됩니다.

간트 차트의 [layout](api/config/layout.md)에는 영향을 주지 않으므로 그리드와 타임라인의 위치를 바꾸려면 레이아웃을 다시 정의해야 합니다.

또한 간트 차트에서 사용되는 레이블의 텍스트 방향을 설정하고 싶을 수 있습니다 [to set the direction of text for labels used in the gantt](https://developer.mozilla.org/en-US/docs/Web/CSS/direction).

### Related Guides
- [RTL (Right-to-left) Mode](guides/rtl-mode.md)