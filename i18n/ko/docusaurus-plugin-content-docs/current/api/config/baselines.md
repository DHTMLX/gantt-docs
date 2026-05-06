---
sidebar_label: baselines
title: baselines config
description: "간트 차트에서 baselines 작동 방식을 설정합니다."
---

# baselines

### Description

@short: 간트 차트에서 기준선의 기능을 구성합니다

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

이 설정은 간트 차트에서 기준선이 처리되고 표시되는 방법을 정의합니다. 표시를 사용자 정의하기 위해 객체로 설정하거나 기능을 활성화/비활성화하기 위해 불리언으로 설정할 수 있습니다. 객체 구성에는 다음 속성이 포함됩니다:

-  **datastore** - (*string*) - 기준선 항목을 저장하는 데 사용되는 데이터스토어의 이름. 관련 기능에 대해서는
`getDatastore` 메서드를 참조하십시오.
-  **render_mode** - (*boolean | string*) - 기준선이 표시되는 방식을 결정합니다:
  - **_false_** - 기준선이 표시되지 않습니다.
  - **_"taskRow"_** - 태스크 바와 같은 행에 기준선이 표시됩니다.
  - **_"separateRow"_** - 별도 서브 행으로, 태스크 행의 높이가 확장되며 기준선이 표시됩니다.
  - **_"individualRow"_** - 각 기준선이 태스크 아래의 자체 서브 행에 표시됩니다.
- **dataprocessor_baselines** - (*boolean*) - baseline 업데이트가 DataProcessor를 개별 항목으로 트리거하는지 여부를 지정합니다.
- **row_height** - (*number*) - 기준선의 서브 행 높이를 정의합니다. `render_mode`가 `"separateRow"` 또는 `"individualRow"`로 설정된 경우에 한해 적용됩니다.
- **bar_height** -  (*number*) - 기준선 바의 높이를 설정합니다.

### Related API
- [getDatastore](api/method/getdatastore.md)

### Related Guides
- [타임라인의 추가 요소](guides/inbuilt-baselines.md)

### Change log
- v9.0에 추가됨