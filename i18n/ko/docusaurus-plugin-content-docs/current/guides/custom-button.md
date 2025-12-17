---
title: "라이트박스의 버튼 변경하기"
sidebar_label: "라이트박스의 버튼 변경하기"
---

라이트박스의 버튼 변경하기
============================================
라이트박스의 기본 버튼을 사용자 정의할 수 있습니다. 예를 들어, 작업을 보기만 하는 사용자에게는 'Edit' 버튼을 숨기거나, 작업 설명을 인쇄할 수 있도록 새로운 "Print" 버튼을 추가할 수 있습니다.

![complete_button](/img/complete_button.png)


[Custom button in the lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)






기본적으로 라이트박스에는 3개의 버튼('Save', 'Cancel', 'Delete')이 포함되어 있습니다. 이 버튼들은 [buttons_left](api/config/buttons_left.md) 및 [buttons_right](api/config/buttons_right.md)의 설정 옵션으로 정의됩니다.

~~~js
gantt.config.buttons_left = ["gantt_save_btn", "gantt_cancel_btn"];
gantt.config.buttons_right = ["gantt_delete_btn"];
~~~

기본 버튼을 수정하려면 아래 단계를 따르세요.

- <b>buttons_left</b> 또는 <b>buttons_right</b> 배열에 원하는 버튼 식별자를 추가하거나 변경합니다.

:::note
[Material skin](guides/skins.md#materialskin)을 사용하는 경우, 버튼 설정이 무시될 수 있습니다. 
이 경우, 버튼 설정을 [onGanttReady](api/event/onganttready.md) 이벤트 핸들러 내부에서 지정해야 합니다:
:::

~~~js
gantt.attachEvent("onGanttReady", function(){
   gantt.config.buttons_left = ["gantt_save_btn","gantt_cancel_btn","complete_button"];   
   gantt.config.buttons_right = ["gantt_delete_btn"];               
});
~~~

- 새로운 버튼의 레이블을 정의합니다:

~~~js
gantt.locale.labels["complete_button"] = "Complete";
~~~

- 버튼에 아이콘을 지정하거나 스타일을 적용하려면 아래와 같이 CSS 클래스를 추가합니다:

~~~css
.complete_button{
    margin-top: 1px;
    background-image:url("common/v_complete.png");
    width: 20px;
}
~~~

- 버튼 클릭을 처리하려면 [onLightboxButton](api/event/onlightboxbutton.md) 이벤트 핸들러를 구현하세요:

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


[Custom button in the lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)


버튼 레이블 변경하기
-----------------------

버튼 레이블은 Gantt를 초기화하기 전에 아래와 같은 구문으로 재정의할 수 있습니다:

~~~js
gantt.locale.labels.icon_save = "New Label";
gantt.locale.labels.icon_cancel = "New Label";
gantt.locale.labels.icon_delete= "New Label";

gantt.init("gantt_here");
~~~

또는, Gantt 초기화 후에 레이블을 업데이트할 수도 있습니다:

~~~js
gantt.attachEvent("onGanttReady", function(){
  gantt.locale.labels.gantt_save_btn = "New Label";
  gantt.locale.labels.gantt_cancel_btn = "New Label";
  gantt.locale.labels.gantt_delete_btn = "New Label";
});
~~~

버전 7.0부터는 [i18n](api/other/i18n.md) 객체를 사용해 레이블을 변경할 수도 있습니다:

~~~js
gantt.i18n.setLocale({
   labels: {
      gantt_save_btn: "New Label",
      gantt_cancel_btn: "New Label",
      gantt_delete_btn: "New Label"
   }
});
~~~

