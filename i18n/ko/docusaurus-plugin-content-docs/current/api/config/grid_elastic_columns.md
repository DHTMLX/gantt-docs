---
sidebar_label: grid_elastic_columns
title: grid_elastic_columns config
description: "스크롤 가능한 그리드 내 컬럼의 너비를 조정합니다."
---

# grid_elastic_columns

### Description

@short: 스크롤 가능한 그리드 내 컬럼의 너비를 조정합니다.

@signature: grid_elastic_columns: boolean | string

### Example

~~~jsx
gantt.config.grid_elastic_columns = true;
...
gantt.init("gantt_here");
~~~

**Default value:** false

### Details

:::note
 이 속성은 [그리드에 가로 스크롤바가 있을 때만 작동합니다](guides/specifying-columns.md#horizontalscrollbar). 
:::

기본적으로 dhtmlxGantt는 전체 그리드 크기가 변경되어도 컬럼 크기를 변경하지 않습니다.

따라서 그리드의 너비가 증가하면 컬럼은 원래 너비를 유지하여 오른쪽에 빈 공간이 생기고, 그리드 너비가 감소하면 가로 스크롤바가 나타납니다.

![elastic_false](/img/elastic_false.png)

컬럼이 그리드 크기에 맞춰 자동 조정되도록 하려면 **grid_elastic_columns**를 *true*로 설정하세요:

~~~js
gantt.config.grid_elastic_columns = true;
~~~

:::note

**Related example:** [Elastic columns of Grid](https://snippet.dhtmlx.com/k0qqj5w5)

:::

이 설정을 적용하면 그리드 너비 변경 시 컬럼 크기도 함께 변경됩니다:

- 그리드가 넓어지면 컬럼들이 남는 공간을 채우기 위해 확장됩니다.
- 특정 컬럼의 너비를 늘리면 그리드 전체 너비가 커지고(가로 스크롤바가 나타날 수 있음), 다른 컬럼은 변하지 않습니다.
- 특정 컬럼의 너비를 줄이면 그리드 전체 너비가 줄어들고(스크롤바가 사라질 수 있음), 다른 컬럼이 커질 수 있습니다.

![elastic_true](/img/elastic_true.png)

또 다른 옵션으로 속성 값을 "min_width"로 설정할 수 있습니다:

~~~js
gantt.config.grid_elastic_columns = "min_width";
~~~

이 경우 동작 방식은 다음과 같습니다:

- 그리드가 넓어지면 컬럼들이 사용 가능한 공간을 채우기 위해 늘어납니다.
- 그리드가 좁아지면 컬럼들이 각각의 [최소 너비](guides/specifying-columns.md#width)까지 줄어듭니다. 모든 컬럼이 최소 너비에 도달하면 가로 스크롤바가 나타납니다.

### Change log
- v7.0에 추가됨
