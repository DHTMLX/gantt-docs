---
sidebar_label: baselines
title: baselines config
description: "간트 차트에서 baselines 작동 방식을 설정합니다."
---

# baselines

### Description

@short: 간트 차트에서 baselines 작동 방식을 설정합니다.

@signature: baselines: BaselineConfig | boolean

### Example

~~~jsx
gantt.config.baselines = {
  datastore: "baselines",
  render_mode: false,
  dataprocessor_baselines: false,
  row_height: 16,
  bar_height: 8
};
gantt.init("gantt_here");
~~~

### Related samples
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

이 설정은 간트 차트에서 baselines가 관리되고 표시되는 방식을 제어합니다. 상세한 커스터마이징을 위해 객체로 설정할 수 있으며, 기능을 켜거나 끌 때는 단순 boolean 값을 사용할 수 있습니다. 객체에는 다음과 같은 옵션이 포함됩니다:

-  **datastore** - (*string*) - baseline 항목이 저장되는 datastore의 이름입니다. 자세한 내용은 `getDatastore` 메서드를 참조하세요.
-  **render_mode** - (*boolean | string*) - baselines가 나타나는 방식을 정의합니다:
  - **_false_** - baselines가 표시되지 않습니다.
  - **_"taskRow"_** - baselines가 작업 바와 같은 행에 표시됩니다.
  - **_"separateRow"_** - baselines가 별도의 서브행에 표시되어 작업 행이 더 높아집니다.
  - **_"individualRow"_** - 각 baseline이 작업 아래에 개별 서브행으로 렌더링됩니다.
- **dataprocessor_baselines** - (*boolean*) - baseline 변경 시 각 항목에 대해 DataProcessor가 작동할지 여부를 결정합니다.
- **row_height** - (*number*) - baseline 서브행의 높이를 설정하며, `render_mode`가 `"separateRow"` 또는 `"individualRow"`일 때만 사용됩니다.
- **bar_height** -  (*number*) - baseline 바의 높이를 제어합니다.

### Related API
- [getDatastore](api/method/getdatastore.md)

### Related Guides
- [타임라인의 추가 요소](guides/inbuilt-baselines.md)

### Change log
- v9.0에 추가됨

