---
sidebar_label: onOptionsLoad
title: onOptionsLoad event
description: "서버에서 옵션 모음이 로드된 후 발생하지만 아직 파싱되지 않았습니다"
---

# onOptionsLoad

### Description

@short: 서버에서 옵션 모음이 로드된 직후에 발생하지만 아직 파싱되지 않았습니다

@signature: onOptionsLoad: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onOptionsLoad", function (){
    //any custom logic here
});
~~~

### Details

이벤트는 [updateCollection](api/method/updatecollection.md)가 호출되거나 [JSON with additional info](guides/supported-data-formats.md#jsonwithcollections)가 파싱될 때 발생합니다.

### Related API
- [serverList](api/method/serverlist.md)
- [updateCollection](api/method/updatecollection.md)