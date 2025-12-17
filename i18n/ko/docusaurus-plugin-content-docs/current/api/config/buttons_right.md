---
sidebar_label: buttons_right
title: buttons_right config
description: "라이트박스의 오른쪽 하단에 위치한 버튼 세트를 보유합니다."
---

# buttons_right

### Description

@short: 라이트박스의 오른쪽 하단에 위치한 버튼 세트를 보유합니다.

@signature: buttons_right: string[]

### Example

~~~jsx
<style>
    .complete_button{
        margin-top: 2px;
        background-image:url("common/v_complete.png");
        width: 20px;
    }
</style>
<script>
    gantt.locale.labels["complete_button"] = "Complete";
    gantt.attachEvent("onGanttReady", function(){                               /*!*/ 
        gantt.config.buttons_right = ["gantt_delete_btn","complete_button"];   /*!*/                              
    });                                                                           /*!*/ 
    gantt.init("gantt_here");

    gantt.attachEvent("onLightboxButton", function(button_id, node, e){
        if(button_id == "complete_button"){
            var id = gantt.getState().lightbox;
            gantt.getTask(id).progress = 1;
            gantt.updateTask(id);
            gantt.hideLightbox();
        }
    });
</script>
~~~

**Default value:** ["gantt_delete_btn"];

### Related samples
- [Custom button in the lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/06_custom_button.html)

### Details

:::note

[Material skin](guides/skins.md#materialskin)이 적용된 경우, buttons 설정이 무시될 수 있음을 유의하세요. 
이를 방지하려면, buttons 설정을 [onGanttReady](api/event/onganttready.md) 이벤트 핸들러 내에서 정의해야 합니다.
 
:::

<br>
![property_buttons_left](/img/property_buttons_left.png)

Gantt 초기화 전에 다음 구문을 사용하여 오른쪽 버튼들의 라벨을 업데이트할 수 있습니다:

~~~js
gantt.locale.labels.icon_delete= "New Label";

gantt.init("gantt_here");
~~~

또는 Gantt가 초기화된 이후 다음과 같이 라벨을 수정할 수도 있습니다:

~~~js
gantt.attachEvent("onGanttReady", function(){
  gantt.locale.labels.gantt_delete_btn = "New Label";
});
~~~

버전 7.0부터는 [i18n](api/other/i18n.md) 객체를 통해서도 라벨을 변경할 수 있습니다:

~~~js
gantt.i18n.setLocale({
   labels: {
      gantt_delete_btn: "New Label"
   }
});
~~~

### Related API
- [buttons_left](api/config/buttons_left.md)
- [locale](api/other/locale.md)
- [i18n](api/other/i18n.md)

### Related Guides
- [라이트박스의 버튼 변경하기](guides/custom-button.md)

