---
sidebar_label: scale_offset_minimal
title: scale_offset_minimal config
description: "여러 스케일을 사용할 때 최소 스케일 단위를 선행 및 후행 빈 공간의 크기로 사용할지 여부를 제어합니다."
---

# scale_offset_minimal

### Description

@short: 여러 스케일을 사용할 때 최소 스케일 단위를 선행 및 후행 빈 공간의 크기로 사용할지 여부를 제어합니다.

@signature: scale_offset_minimal: boolean

### Example

~~~jsx
gantt.config.scale_offset_minimal = false;
~~~

**Default value:** true

### Details

스케일 간격이 명시적으로 설정되지 않은 경우([start_date](api/config/start_date.md) 및 [end_date](api/config/end_date.md) 옵션 사용), dhtmlxGantt는 가장 이른 작업 날짜와 가장 늦은 작업 날짜를 기준으로 간격을 결정합니다. 또한 스케일의 시작과 끝에 빈 간격을 추가합니다. 기본적으로 이 빈 간격은 사용 중인 스케일 중 가장 작은 단위와 일치합니다(여러 스케일이 적용된 경우).

이 옵션이 꺼져 있으면, dhtmlxGantt는 [scales](api/config/scales.md) 옵션에 정의된 **unit** 속성을 기준으로 빈 간격을 추가합니다.

