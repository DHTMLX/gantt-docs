---
sidebar_label: setSkin
title: setSkin method
description: "활성 스킨을 변경합니다"
---

# setSkin

### Description

@short: 활성 스킨을 변경합니다

@signature: setSkin: (skin: string) =\> void

### Parameters

- `skin` - (required) *string* - 스킨 이름입니다. 사용 가능한 옵션은 다음과 같습니다: "terrace", "dark", "material", "contrast-white", "contrast-black", "meadow", "skyblue", "broadway"

### Example

~~~jsx
gantt.setSkin("dark");
~~~

### Related samples
- [Dark skin](https://docs.dhtmlx.com/gantt/samples/06_skins/10_dark.html)

### Details

gantt가 초기화된 후 이 메서드를 호출하면 [render](api/method/render.md) 메서드가 실행됩니다.

초기화 전에 사용하면 `gantt.skin` 속성을 직접 설정하는 것과 동일하게 작동합니다:

~~~js
gantt.skin = "dark";
~~~

### Related Guides
- [스킨(Skins)](guides/skins.md)

### Change log
- v9.0에 추가됨

