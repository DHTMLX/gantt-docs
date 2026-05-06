---
title: "링크 추가/업데이트/삭제" 
sidebar_label: "링크 추가/업데이트/삭제" 
---

# 간트 차트의 링크 추가/수정/삭제

이 챕터에서는 의존성 링크를 사용한 기본 작업을 배우게 됩니다: 링크를 생성하거나 삭제하는 방법, 링크의 속성을 동적으로 업데이트하는 방법. 


## 새로운 링크 추가

간트 차트에 새 링크를 추가하려면 [addLink](api/method/addlink.md) 메서드를 사용하세요:

~~~js
var linkId = gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:"1"
});
~~~

## 링크의 속성 업데이트

링크 객체의 속성을 동적으로 업데이트하려면 [refreshLink](api/method/refreshlink.md) 메서드를 사용하세요:

~~~js
var links= gantt.config.links;
var link = gantt.getLink(1);//->{id:1,source:1, target:2, type:"1"}

if (link.type == links.finish_to_start){/*!*/ 
    link.type = links.finish_to_finish;/*!*/ 
    gantt.refreshLink(1); /*!*/ 
}/*!*/ 
~~~

참고로, 간트 차트의 모든 링크를 한꺼번에 업데이트하려면 [refreshData](api/method/refreshdata.md) 메서드를 사용하세요:

~~~js
var links= gantt.config.links;

var link1 = gantt.getLink(1);//->{id:1,source:1, target:2, type:"1"}
var link2 = gantt.getLink(2);//->{id:2,source:4, target:5, type:"0"}

if (link1.type == links.finish_to_finish){/*!*/ 
    gantt.refreshData()/*!*/ 
}/*!*/ 
~~~

:::note
참고: 모든 유형의 링크 의존성은 [links](api/config/links.md) 객체에 저장됩니다.
:::

## 링크 삭제

링크를 삭제하려면 [deleteLink](api/method/deletelink.md) 메서드를 사용하세요:

~~~js
gantt.deleteLink(linkId);
~~~

## 간트 차트에서 모든 링크 제거

간트 차트에서 모든 태스크와 링크를 제거하려면 [clearAll](api/method/clearall.md) 메서드를 호출하세요:

~~~js
gantt.clearAll();
~~~

## UI에서 링크 값 편집

링크의 lag 또는 다른 속성을 편집할 수 있는 내장 UI는 제공되지 않습니다. 따라서 UI가 필요하면 수동으로 구현해야 합니다.

일반적인 접근 방식은 아래 단계를 따르는 것을 전제로 합니다:

- [onLinkDblClick](api/event/onlinkdblclick.md) 이벤트를 캡처합니다; 
- 기본 핸들러를 취소합니다; 
- 이벤트 핸들러에서 팝업을 표시합니다.

마지막 단계에서는 [built-in popups ](guides/message-boxes.md) 중 하나를 사용할 수도 있고, 커스텀 솔루션을 구현할 수도 있습니다.

다음은 edit-lag 팝업 구현의 예시 코드입니다:

~~~js
(function(){
    var modal;
    var editLinkId;

    function endPopup(){
        modal = null;
        editLinkId = null;
    }
    function cancelEditLink(){
        endPopup();
    }

    function deleteLink(){
        gantt.deleteLink(editLinkId);
        endPopup();
    }

    function saveLink(){
        var link = gantt.getLink(editLinkId);

        var lagValue = modal.querySelector(".lag-input").value;
        if(!isNaN(parseInt(lagValue, 10))){
            link.lag = parseInt(lagValue, 10);
        }

        gantt.updateLink(link.id);
        if(gantt.autoSchedule){
            gantt.autoSchedule(link.source);
        }
        endPopup();
    }
    gantt.attachEvent("onLinkDblClick", function(id,e){
        editLinkId = id;
        var link = gantt.getLink(id);
        var linkTitle = gantt.getTask(link.source).text + " -> " + 
            gantt.getTask(link.target).text;

        modal = gantt.modalbox({
            title: linkTitle,
            text: "<div>" +
                    "<label>Lag <input type='number' class='lag-input' /></label>" +
                "</div>",
            buttons: [
                {label:"Save", value:"save"},
                {label:"Cancel", value:"cancel"},
                {label:"Delete", value:"delete"}
            ],
            width: "500px",
            callback: function(result){
                switch(result){
                    case "save":
                        saveLink();
                        break;
                    case "cancel":
                        cancelEditLink();
                        break;

                    case "delete":
                        deleteLink();
                        break;
                }
            }
        });

        modal.querySelector(".lag-input").value = link.lag || 0;

        return false;
    });
})();
~~~

**관련 샘플** [Edit-lag Popup](https://snippet.dhtmlx.com/2208ic0t)