---
title: "Lightbox에서 버튼 변경"
sidebar_label: "Lightbox에서 버튼 변경"
---

# 라이트박스에서 버튼 변경

라이트박스의 기본 버튼을 변경할 수 있는 방법이 있습니다. 예를 들어, 작업을 보기만 할 수 있는 사용자 그룹에 대해 'Edit' 버튼을 숨기거나 사용자가 작업 설명을 인쇄할 수 있도록 하는 새 버튼 "Print"를 추가할 수 있습니다.

![complete_button](/img/complete_button.png)

[라이트박스의 커스텀 버튼](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)

기본적으로 라이트박스에는 3개의 버튼('저장', '취소', '삭제')가 포함되어 있으며, 이는 [buttons_left](api/config/buttons_left.md) 및 [buttons_right](api/config/buttons_right.md) 구성 옵션에 의해 지정됩니다.

~~~js
gantt.config.buttons_left = ["gantt_save_btn", "gantt_cancel_btn"];
gantt.config.buttons_right = ["gantt_delete_btn"];
~~~

기본 버튼 세트를 변경하려면 아래의 단계를 따르십시오:

- <b>buttons_left</b> 또는 <b>buttons_right</b> 배열의 새로운 멤버를 지정합니다.

:::note
Material 스킨을 사용하는 경우 버튼 구성이 재정의됩니다. 이를 방지하려면 [onGanttReady](api/event/onganttready.md) 이벤트 핸들러 안에서 버튼 구성을 지정해야 합니다:
:::

~~~js
gantt.attachEvent("onGanttReady", function(){
   gantt.config.buttons_left = ["gantt_save_btn","gantt_cancel_btn","complete_button"];   
   gantt.config.buttons_right = ["gantt_delete_btn"];               
});
~~~

- 버튼의 레이블을 설정합니다:

~~~js
gantt.locale.labels["complete_button"] = "완료";
~~~

- 버튼의 아이콘을 설정하고(또는 다른 스타일링을 적용) CSS 클래스를 아래와 같이 지정합니다:

~~~js
.complete_button{
    margin-top: 1px;
    background-image:url("common/v_complete.png");
    width: 20px;
}
~~~

- 버튼 클릭을 처리할 [onLightboxButton](api/event/onlightboxbutton.md) 핸들러를 지정합니다:

~~~js
gantt.attachEvent("onLightboxButton", function(button_id, node, e){
    if(button_id == "complete_button"){
        var id = gantt.getState().lightbox;
        gantt.getTask(id).progress = 1;
        gantt.updateTask(id);
        gantt.hideLightbox();
    }
});
~~~

[라이트박스의 커스텀 버튼](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)


## 버튼 레이블 변경

버튼의 라벨을 다음 구문을 사용하여 Gantt를 초기화하기 전에 재정의할 수 있습니다:

~~~js
gantt.locale.labels.icon_save = "새 레이블";
gantt.locale.labels.icon_cancel = "새 레이블";
gantt.locale.labels.icon_delete= "새 레이블";

gantt.init("gantt_here");
~~~

또한 Gantt를 초기화한 후에도 다음 구문으로 레이블을 변경할 수 있습니다:

~~~js
gantt.attachEvent("onGanttReady", function(){
  gantt.locale.labels.gantt_save_btn = "새 레이블";
  gantt.locale.labels.gantt_cancel_btn = "새 레이블";
  gantt.locale.labels.gantt_delete_btn = "새 레이블";
});
~~~

버전 7.0부터는 레이블을 [i18n](api/other/i18n.md) 객체를 사용하여 변경할 수도 있습니다:

~~~js
gantt.i18n.setLocale({
   labels: {
      gantt_save_btn: "새 레이블",
      gantt_cancel_btn: "새 레이블",
      gantt_delete_btn: "새 레이블"
   }
});
~~~