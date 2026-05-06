---
sidebar_label: dataProcessor
title: dataProcessor 메서드
description: "dataProcessor 생성자"
---

# dataProcessor

### Description

@short: DataProcessor 생성자

@signature: dataProcessor: (url: string) => void

### Parameters

- `url` - (required) *string* - 데이터 피드의 URL

### Example

~~~jsx
const dp = new gantt.dataProcessor("api/");
~~~

### Details

dataProcessor에 대한 자세한 정보와 API는 [여기](guides/server-side.md#resources_crud)에서 확인할 수 있습니다.

### Change log
- 버전 4.0에서 추가됨