---
title: "전체 화면 모드"
sidebar_label: "전체 화면 모드"
---

# 전체 화면 모드


버전 3.3부터 라이브러리는 **fullscreen** 확장 기능을 제공합니다.

이 확장 기능을 사용하면, 컴포넌트가 지원되는 경우 FullScreen API를 활용하여 전체 화면 모드로 전환할 수 있습니다  
([지원 브라우저 목록](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)).

<div style="text-align:center;">![full_screen](/img/full_screen.png)</div>

구형 브라우저의 경우, Gantt 차트를 단순히 창 크기에 맞춰 100%로 늘려 표시합니다.

전체 화면 지원을 활성화하려면, [gantt.plugins](api/method/plugins.md) 메서드를 통해 **fullscreen** 플러그인을 활성화하세요:

~~~js
gantt.plugins({
    fullscreen: true
});
~~~

컴포넌트 자체에는 전체 화면 모드를 토글하는 내장 UI 컨트롤이 포함되어 있지 않으므로, 직접 추가하거나 아래 예시를 사용할 수 있습니다:

~~~js
<input id="fullscreen_button" type="button" value="Toggle Fullscreen"/>

<script>
var button = document.getElementById("fullscreen_button");
     button.addEventListener("click", function(){
          if (!gantt.getState().fullscreen) {
            // gantt를 전체 화면으로 확장
               gantt.expand();
          }
          else {
            // gantt를 원래 크기로 축소
               gantt.collapse();
          }
     }, false);
</script>
~~~

버튼을 클릭하면 Gantt 차트가 원래 크기와 전체 화면 모드 사이에서 전환됩니다.


[Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)


## API 개요

Gantt의 표시 모드를 제어하는 주요 메서드는 두 가지입니다:

- [expand](api/method/expand.md) - Gantt 차트를 전체 화면 모드로 전환

~~~js
gantt.expand();
~~~

- [collapse](api/method/collapse.md) - Gantt 차트를 전체 화면에서 원래 크기로 복귀

~~~js
gantt.collapse();
~~~

## 지원 이벤트


전체 화면 전환을 처리할 수 있는 다음 이벤트들이 제공됩니다:

- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

~~~js
// gantt를 전체 화면으로 확장하기 전
gantt.attachEvent("onBeforeExpand",function(){
    // 사용자 정의 로직
    return true;
});

// 전체 화면 모드에서 나가기 전
gantt.attachEvent("onBeforeCollapse",function(){
    // 사용자 정의 로직
    return true;
});

// gantt가 전체 화면으로 확장된 후
gantt.attachEvent("onExpand", function (){
    // 사용자 정의 로직
});

// gantt가 전체 화면 모드에서 나온 후
gantt.attachEvent("onCollapse", function (){
    // 사용자 정의 로직
});
~~~

## Fullscreen API


[fullscreen](guides/fullscreen-ext.md) 객체는 Gantt 차트와 기타 요소의 전체 화면 동작을 제어할 수 있는 네 가지 메서드를 제공합니다:

- **expand()** - Gantt 차트를 전체 화면으로 전환

~~~js
gantt.ext.fullscreen.expand();
~~~

- **collapse()** - 전체 화면을 종료하고 Gantt 차트를 원래 크기로 복귀

~~~js
gantt.ext.fullscreen.collapse();
~~~

- **toggle()** - 전체 화면과 일반 모드 사이를 전환

~~~js
gantt.ext.fullscreen.toggle();
~~~

- **getFullscreenElement()** - **expand()** 호출 시 전체 화면으로 확장될 DOM 요소를 반환

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

기본적으로 **getFullscreenElement()**는 Gantt 차트의 HTML 컨테이너를 반환합니다. 이 메서드를 재정의하여 전체 화면 모드에 추가 요소를 포함할 수 있습니다. 자세한 내용은 [여기](guides/fullscreen-mode.md#ganttwithheadertoolbarinfullscreen)를 참고하세요.

## 헤더/툴바와 함께 전체 화면으로 Gantt 표시


Gantt API는 *fullscreen* 객체의 **getFullscreenElement()** 메서드를 통해 전체 화면 모드에 다른 요소를 포함할 수 있도록 지원합니다:

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

:::note
기본적으로 이 메서드는 Gantt 차트의 HTML 컨테이너만 반환하므로, 전체 화면으로 진입 시 Gantt 차트만 확장됩니다.
:::

헤더나 툴바 등 추가 요소와 함께 Gantt 차트를 전체 화면에 표시하려면, 예를 들어 다음과 같이 페이지에 사용자 정의 컨테이너를 만드세요:

~~~html
<div id="myCover">
    <div class="gantt_control">
        <button id="toggle_fullscreen" 
                onclick="gantt.ext.fullscreen.toggle();">toggle fullscreen</button>
    </div>
        <div id="gantt_here"></div>
</div>
~~~

그런 다음 **getFullscreenElement()** 메서드를 오버라이드하여 전체 화면으로 확장할 사용자 정의 컨테이너를 반환하도록 합니다:

~~~js
gantt.ext.fullscreen.getFullscreenElement = function() {
    return document.getElementById("myCover");
}
gantt.init("gantt_here");
~~~


[Full Screen with additional elements](https://docs.dhtmlx.com/gantt/samples/02_extensions/26_full_screen_with_additional_elements.html)



## 전체 화면 모드가 동작하지 않는 이유


전체 화면 확장 기능은 Gantt가 전체 화면 모드로 전환할 수 있을 때만 동작합니다.

만약 Gantt 차트가 iframe 내부에 있고:

- **allowfullscreen** 속성이나 **allow="fullscreen"** 권한이 누락되어 있거나
- **allow** 속성에 "fullscreen"이 포함되지 않은 경우

Gantt는 전체 화면 모드로 진입할 수 없습니다 (우리의 snippet tool에서 직접 확인해보세요: [Example 1](https://snippet.dhtmlx.com/k72wjyzl), [Example 2](https://snippet.dhtmlx.com/7jdrk6q5)).

### Salesforce에서의 전체 화면 모드

[Locker Service](https://developer.salesforce.com/docs/atlas.en-us.238.0.lightning.meta/lightning/security_code.htm)를 사용하는 Salesforce 앱에서는 Fullscreen 확장 기능이 동작하지 않습니다. Locker는 요소의 전체 화면 전환을 차단합니다.

특히, **Lightning Aura** 또는 **Lightning Web Components**에서는 확장 기능이 동작하지 않으며, **Visualforce** 프레임워크에서는 동작할 수 있습니다.

아래 코드를 추가하여 앱에서 전체 화면 사용 가능 여부를 테스트할 수 있습니다:

~~~js
console.log("document.body.requestFullscreen", document.body.requestFullscreen)
~~~

출력 결과가 `undefined`이면 전체 화면이 비활성화되어 있으며, Gantt는 전체 화면 모드로 전환할 수 없습니다.




:::note
전체 화면 지원이 되지 않는 환경에서 활성화하면 오류가 발생할 수 있으나, Gantt는 정상적으로 동작을 계속합니다.
:::

