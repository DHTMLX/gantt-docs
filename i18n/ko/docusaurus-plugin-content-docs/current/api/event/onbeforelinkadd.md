---
sidebar_label: onBeforeLinkAdd
title: onBeforeLinkAdd 이벤트
description: "새로운 링크가 Gantt 차트에 추가되기 전에 발생합니다"
---

# onBeforeLinkAdd

### 설명

@short: 새로운 링크가 Gantt 차트에 추가되기 전에 발생합니다

@signature: onBeforeLinkAdd: (id: string | number, link: Link) =\> boolean;

### 매개변수

- `id` - (필수) *string | number* - 링크 ID
- `link` - (필수) *Link* - 링크 객체

### 반환 값
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 (<b>false</b>)

### 예제

~~~jsx
gantt.attachEvent("onBeforeLinkAdd", function(id,link){
    // 여기에 코드 작성
    return true;
});
~~~

### 세부 정보

이벤트는 차단 가능합니다. 링크 추가를 취소하려면 *false*를 반환하십시오.

~~~js
// "finish_to_start" 링크를 생성할 때 소스 작업이 타겟 작업과 겹치지 않도록 방지합니다.
gantt.attachEvent("onBeforeLinkAdd", function(id, link){
    if (link.type == 0){
        var sourceTask = gantt.getTask(link.source);
        var targetTask = gantt.getTask(link.target);
        if (sourceTask.end_date >= targetTask.start_date){
            alert("This link is illegal")
            return false;
        }
    }
});
~~~

### 관련 API
- [addLink](api/method/addlink.md)