---
sidebar_label: onOptionsLoad
title: onOptionsLoad event
description: "서버에서 옵션 세트가 로드된 직후, 파싱되기 전에 트리거됩니다."
---

# onOptionsLoad

### Description

@short: 서버에서 옵션 세트가 로드된 직후, 파싱되기 전에 트리거됩니다.

@signature: onOptionsLoad: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onOptionsLoad", function (){
    //여기에 커스텀 로직 작성
});
~~~

### Details

이 이벤트는 [updateCollection](api/method/updatecollection.md)가 호출되거나 [추가 정보가 포함된 JSON](guides/supported-data-formats.md#jsonwithcollections)이 파싱될 때 발생합니다.

### Related API
- [serverList](api/method/serverlist.md)
- [updateCollection](api/method/updatecollection.md)

