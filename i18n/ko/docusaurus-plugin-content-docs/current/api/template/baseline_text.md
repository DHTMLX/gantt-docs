---
sidebar_label: baseline_text
title: baseline_text template
description: "baseline 요소 내부에 표시되는 텍스트를 정의합니다."
---

# baseline_text

### Description

@short: Baseline 요소 내부에 표시되는 텍스트를 정의합니다.

@signature: baseline_text: (task: Task, baseline: Baseline, index: number) =\> string | number | void;

### Parameters

- `task` - (required) *Task* - 해당 baseline에 연결된 task 객체
- `baseline` - (required) *Baseline* - baseline 객체 자체
- `index` - (required) *number* - task의 baselines 배열 내에서 baseline의 위치

### Returns
- ` text` - (string | number | void) - baseline 요소의 innerHTML로 설정될 HTML 콘텐츠입니다. 기본값은 빈 문자열을 반환합니다.

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
- v9.0에 추가됨

