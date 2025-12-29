---
title: "Validation"
sidebar_label: "Validation"
---

# Validation

Validation(유효성 검사)는 사용자가 입력한 데이터가 정확한지 확인하고 잘못된 값이 저장되는 것을 방지합니다. 예를 들어, 동시에 두 개의 작업을 같은 사람에게 할당하는 것을 막을 수 있습니다.

일반적으로 데이터 유효성 검사는 [dhtmlxGantt API](api/overview/events-overview.md)의 이벤트를 사용하여 입력 데이터를 가로채고 올바른지 확인하는 방식으로 수행됩니다.

## 클라이언트 측 유효성 검사

다음 이벤트들은 데이터 유효성 검증에 핵심적으로 자주 사용됩니다:

- [onLightboxSave](api/event/onlightboxsave.md) - 사용자가 라이트박스에서 'Save' 버튼을 클릭할 때 발생
- [onBeforeTaskAdd](api/event/onbeforetaskadd.md) - 새로운 작업이 Gantt 차트에 추가되기 전에 발생
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md) - 작업이 업데이트되기 전에 발생
- [onBeforeLinkAdd](api/event/onbeforelinkadd.md) - 새로운 링크가 Gantt 차트에 추가되기 전에 발생
- [onBeforeLinkUpdate](api/event/onbeforelinkupdate.md) - 링크가 업데이트되기 전에 발생

유효성 검사를 구현하는 가장 간단한 방법은 [onLightboxSave](api/event/onlightboxsave.md) 이벤트를 사용하는 것입니다. 이 이벤트는 사용자가 폼에서 'Save'를 클릭할 때 발생합니다. *true*를 반환하면 변경사항이 저장되고, *false*를 반환하면 저장이 취소되며 라이트박스가 그대로 유지됩니다.

예를 들어, 사용자가 할당되지 않은 작업이 저장되지 않도록 하려면 다음과 같은 코드를 사용할 수 있습니다:

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

위 방법의 한계는 인라인 편집이나 Gantt 차트에서 작업을 드래그하여 변경할 때 이벤트가 발생하지 않는다는 점입니다.

모든 변경 사항(편집, 생성, 삭제 등)을 포함하려면 [dataProcessor](guides/server-side.md) 객체, 특히 [onBeforeUpdate](https://docs.dhtmlx.com/api__dataprocessor_onbeforeupdate_event.html) 이벤트를 사용해야 합니다. 이 이벤트는 Gantt 차트에서 어떤 방식으로든 데이터가 수정된 후, 서버로 데이터를 전송하기 전에 발생합니다.

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
 
각 파라미터의 의미는 다음과 같습니다:

- **id** - (*string*) 작업의 식별자
- **status** - (*'updated', 'inserted', 'deleted'*) 작업의 작업 상태
- **data** - (*object*) 전송될 데이터

참고로, 필드가 유효성 검사에 실패하면 변경 사항은 서버로 전송되지 않고 클라이언트에 남아 추가 처리를 할 수 있습니다.

