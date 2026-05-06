---
sidebar_label: json
title: json 설정
description: "JSON 직렬화 및 구문 분석을 지정합니다"
---

# json

### Description

@short: JSON 직렬화 및 구문 분석을 지정합니다

@signature: json: any

### Example

~~~jsx
const obj = gantt.json; // -> { parse(data){... }}
~~~

### Details

JSON 객체에는 유일한 멤버인 - **parse()** 메서드가 있으며, 이 메서드는 dhtmlxGantt가 JSON 형식의 데이터를 어떻게 파싱할지 정의합니다.