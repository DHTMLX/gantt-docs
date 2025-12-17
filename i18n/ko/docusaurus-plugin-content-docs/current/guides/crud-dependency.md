---
title: "링크 추가/수정/삭제"
sidebar_label: "링크 추가/수정/삭제"
---

링크 추가/수정/삭제
=========================================
이 섹션에서는 의존성 링크 작업의 기본 사항(링크 생성, 삭제, 속성 실시간 수정)에 대해 다룹니다.

## 새 링크 추가하기 {#addinganewlink}
----------------------------
Gantt 차트에 새 링크를 추가하려면 [addLink](api/method/addlink.md) 메서드를 사용하세요:

~~~js
var linkId = gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:"1"
});
~~~

## 링크 속성 수정하기 {#updatingalinksproperty}
------------------------------
링크의 속성을 동적으로 변경하려면 [refreshLink](api/method/refreshlink.md) 메서드를 사용할 수 있습니다:

~~~js
var links= gantt.config.links;
var link = gantt.getLink(1);//->{id:1,source:1, target:2, type:"1"}

if (link.type == links.finish_to_start){/*!*/ 
    link.type = links.finish_to_finish;/*!*/ 
    gantt.refreshLink(1); /*!*/ 
}/*!*/ 
~~~

Gantt 차트의 모든 링크를 한 번에 새로고침하려면 [refreshData](api/method/refreshdata.md) 메서드를 사용하세요:

~~~js
var links= gantt.config.links;

var link1 = gantt.getLink(1);//->{id:1,source:1, target:2, type:"1"}
var link2 = gantt.getLink(2);//->{id:2,source:4, target:5, type:"0"}

if (link1.type == links.finish_to_finish){/*!*/ 
    gantt.refreshData()/*!*/ 
}/*!*/ 
~~~

:::note
모든 유형의 링크 의존성은 [links](api/config/links.md) 객체에서 정의되어 있습니다.
:::

## 링크 삭제하기 {#deletingalink}
-------------------------------
링크를 제거하려면 [deleteLink](api/method/deletelink.md) 메서드를 사용하세요:

~~~js
gantt.deleteLink(linkId);
~~~

## Gantt 차트에서 모든 링크 제거하기 {#removingalllinksfromtheganttchart}
-------------------------------------------
Gantt 차트에서 모든 태스크와 링크를 제거하려면 [clearAll](api/method/clearall.md) 메서드를 호출하세요:

~~~js
gantt.clearAll();
~~~

## UI에서 링크 값 편집하기 {#editinglinkvaluesfromui}
------------------------------

지연(lag) 또는 기타 링크 속성을 편집할 수 있는 기본 제공 UI는 없습니다. 인터페이스가 필요하다면 직접 구현해야 합니다.

일반적인 구현 절차는 다음과 같습니다:

- [onLinkDblClick](api/event/onlinkdblclick.md) 이벤트를 감지합니다;
- 기본 동작을 방지합니다;
- 이벤트 핸들러에서 팝업을 표시합니다.

팝업은 [내장 팝업](guides/message-boxes.md)을 사용하거나 직접 구현할 수 있습니다.

아래는 지연(lag) 편집 팝업을 구현하는 예시입니다:

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


**Related example:** [Edit-lag Popup](https://snippet.dhtmlx.com/2208ic0t)


