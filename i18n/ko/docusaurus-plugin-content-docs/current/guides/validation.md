---
title: "유효성 검사"
sidebar_label: "유효성 검사"
---

# 유효성 검사

유효성 검사는 사용자가 입력한 데이터를 제어하여 잘못된 값을 저장할 가능성을 차단합니다. 예를 들어, 유효성 검사를 사용하면 한 사람에게 두 개의 동시 작업을 할당하는 것을 거부할 수 있습니다.

일반적으로 사용자가 입력한 데이터를 검증하려면 [dhtmlxGantt API](api/overview/events-overview.md)에서 제공하는 이벤트를 사용하고, 입력 데이터를 가로채서 그 정확성에 따라 처리합니다:

## 클라이언트 측 유효성 검사

데이터 검증에 가장 중요하고 일반적으로 사용되는 이벤트는 다음과 같습니다:

- [onLightboxSave](api/event/onlightboxsave.md) - 라이트박스에서 사용자가 '저장' 버튼을 클릭할 때 발생합니다
- [onBeforeTaskAdd](api/event/onbeforetaskadd.md) - Gantt 차트에 새 작업이 추가되기 전에 발생합니다
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md) - 작업이 업데이트되기 전에 발생합니다
- [onBeforeLinkAdd](api/event/onbeforelinkadd.md) - Gantt 차트에 새 연결이 추가되기 전에 발생합니다
- [onBeforeLinkUpdate](api/event/onbeforelinkupdate.md) - 연결이 업데이트되기 전에 발생합니다

가장 간단한 유효성 검사는 [onLightboxSave](api/event/onlightboxsave.md) 이벤트의 도움으로 달성할 수 있습니다. 이 이벤트는 사용자가 양식의 '저장' 버튼을 클릭하면 호출됩니다. 이벤트에서 *true*를 반환하면 변경 사항이 저장되고, *false*를 반환하면 추가 처리가 취소되며 라이트박스가 열려 있습니다.

예를 들어, 할당된 사용자가 없으면 작업 저장을 제한하려면 아래와 같이 코드를 사용하십시오:

~~~js
gantt.attachEvent("onLightboxSave", function(id, item){
    if(!item.text){
        gantt.message({type:"error", text:"Enter task description!"});
        return false;
    }
    if(!item.user){
        gantt.message({type:"error", text:"Choose a worker for this task!"});
        return false;
    }
        return true;
});
~~~

[Validate lightbox values](https://docs.dhtmlx.com/gantt/samples/05_lightbox/03_validation.html)

## 서버 측 유효성 검사

위의 솔루션에는 단점이 있습니다 - 라이트박스의 데이터가 인라인 에디터로 변경되었거나 Gantt 차트를 드래그하여 변경되었을 때 이벤트가 발생하지 않습니다.

이를 증명하고 Gantt 차트에서 이루어진 모든 변경(편집, 생성, 삭제 등)을 포착하려면 [dataProcessor](guides/server-side.md) 객체를 사용하거나 더 정확히 말하면 그 이벤트 중 하나인 [onBeforeUpdate](https://docs.dhtmlx.com/api__dataprocessor_onbeforeupdate_event.html) 이 이벤트는 서버로 데이터를 보내기 전에 그리고 Gantt 차트에서 이루어진 변경 이후에 발생합니다.

~~~js
gantt.init("gantt_here");
gantt.load("data.php");
 
var dp = new gantt.dataProcessor("data.php");
dp.init(gantt);

dp.attachEvent("onBeforeUpdate", function (id, status, data) {
     if (!data.text) {
         gantt.message("The event's text can't be empty!");
         return false;
     }
     return true;
});
~~~

where:

- **id** - (*string*) 작업의 ID.
- **status** - (*'updated', 'inserted', deleted'*) 작업의 상태.
- **data** - (*object*) 전송할 데이터.

참고로, 필드가 유효성 검사에 실패하면 변경 내용은 서버로 전송되지 않고 클라이언트에 남아 있으며, 추가 처리에 사용할 수 있습니다.