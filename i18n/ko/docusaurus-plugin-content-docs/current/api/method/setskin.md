---
sidebar_label: setSkin
title: setSkin method
description: "활성 스킨을 설정합니다"
---

# setSkin

### Description

@short: 활성 스킨 설정

@signature: setSkin: (skin: string) =\> void

### Parameters

- `skin` - (required) *string* - 스킨의 이름. 허용 값은 아래와 같습니다: "terrace", "dark", "material", "contrast-white", "contrast-black", "meadow", "skyblue", "broadway"

### Example

~~~jsx
gantt.setSkin("dark");
~~~

### Related samples
- [Dark skin](https://docs.dhtmlx.com/gantt/samples/06_skins/10_dark.html)

### Details

메서드가 gantt가 초기화된 후 호출되면 [render](api/method/render.md) 메서드를 실행합니다.

초기화 전에 호출되면, 이 메서드는 `gantt.skin` 속성에 값을 할당하는 것과 동일한 효과를 가집니다:

~~~js
gantt.skin = "dark";
~~~

### Related Guides
- [Skins](guides/skins.md)

### Change log
- v9.0에 추가됨