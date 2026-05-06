---
sidebar_label: scale_offset_minimal
title: scale_offset_minimal 설정
description: "여러 스케일이 사용되는 경우 최소 스케일 단위를 시작/종료 빈 공간의 간격으로 설정합니다"
---

# scale_offset_minimal

### Description

@short: 다중 스케일이 사용되는 경우 최소 스케일 단위를 시작/종료 빈 공간의 간격으로 설정합니다

@signature: scale_offset_minimal: boolean

### Example

~~~jsx
gantt.config.scale_offset_minimal = false;
~~~

**기본값:** true

### Details

스케일 간격이 명확하게 지정되지 않은 경우([start_date](api/config/start_date.md), [end_date](api/config/end_date.md) 옵션에 의해), dhtmlxGantt는 가장 이른 작업과 가장 늦은 작업의 날짜를 기준으로 이를 계산합니다.
또한 스케일의 시작과 끝에 빈 간격을 추가합니다. 기본적으로 이 '빈' 간격은 사용된 스케일의 최소 단위와 같습니다(다중 스케일이 사용되는 경우).

옵션을 비활성화하면, dhtmlxGantt는 [scales](api/config/scales.md) 옵션의 **unit** 속성 값과 동일한 빈 간격을 추가합니다.