---
sidebar_label: baseline_text
title: baseline_text template
description: "baseline 요소 내부에 표시될 텍스트를 지정합니다"
---

# baseline_text
:::info
이 기능은 PRO 에디션에서만 사용 가능합니다.
:::
### Description

@short: baseline 요소 내부에 표시되는 텍스트를 지정합니다

@signature: baseline_text: (task: Task, baseline: Baseline, index: number) =\> string | number | void;

### Parameters

- `task` - (required) *Task* - baseline과 연관된 Task 객체
- `baseline` - (required) *Baseline* - baseline 객체
- `index` - (required) *number* - Task의 baselines 배열에서 baseline의 인덱스

### Returns
- ` text` - (string | number | void) - baseline 요소의 innerHTML으로 주입될 HTML 콘텐츠. 기본 템플릿은 빈 문자열을 반환합니다.

### Example

~~~jsx
gantt.templates.baseline_text = function(task, baseline, index) {
    return "Baseline #" + (index + 1);
};
~~~

### Related samples
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Related API
- [baselines](api/config/baselines.md)

### Related Guides
- [타임라인의 추가 요소](guides/inbuilt-baselines.md)

### Change log
- v9.0에서 추가됨