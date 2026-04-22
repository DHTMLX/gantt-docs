---
title: "전체 화면 모드"
sidebar_label: "전체 화면 모드"
---

# 전체 화면 모드

버전 3.3부터 라이브러리에는 **fullscreen** 확장이 포함됩니다. 

이 확장은 가능하면 FullScreen API를 사용하여 컴포넌트를 전체 화면 모드로 확장하는 API를 제공합니다
([지원되는 브라우저 목록](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)).

<div style="text-align:center;">![full_screen](/img/full_screen.png)</div>

구형 브라우저의 경우 Gantt를 창 크기의 100%로 확장하는 기능만 제공합니다.

전체 화면 지원을 활성화하려면 [gantt.plugins](api/method/plugins.md) 메서드를 통해 **fullscreen** 플러그인을 활성화합니다:

~~~js
gantt.plugins({
    fullscreen: true
});
~~~

컴포넌트 자체에는 이 모드를 토글하는 UI 컨트롤이 없으므로 페이지 어디에나 추가하거나 예제에서 가져온 컨트롤을 사용해야 합니다:

~~~js
<input id="fullscreen_button" type="button" value="Toggle Fullscreen"/>

<script>
var button = document.getElementById("fullscreen_button");
     button.addEventListener("click", function(){
          if (!gantt.getState().fullscreen) {
            // 확장하여 gantt를 전체 화면으로
               gantt.expand();
          }
          else {
            // 일반 모드로 축소
               gantt.collapse();
          }
     }, false);
</script>
~~~

준비 아이콘을 클릭하면 원래 크기에서 '전체 화면'으로, 그 반대로 Gantt의 크기가 변경됩니다.


[Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)


## API 개요

Gantt의 표시 모드를 조작하는 데 사용되는 두 가지 메서드가 있습니다:

- [expand](api/method/expand.md) - Gantt를 전체 화면 모드로 확장

~~~js
gantt.expand();
~~~

- [collapse](api/method/collapse.md) - 전체 화면 모드에서 일반 모드로 Gantt를 축소

~~~js
gantt.collapse();
~~~

## 지원 이벤트 목록

다음 이벤트가 지원됩니다:

- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

~~~js
// Gantt가 전체 화면으로 확장되기 전에
gantt.attachEvent("onBeforeExpand",function(){
    // 커스텀 로직 작성
    return true;
});

// Gantt가 전체 화면 모드에서 벗어나기 전에
gantt.attachEvent("onBeforeCollapse",function(){
    // 커스텀 로직 작성
    return true;
});

// Gantt가 전체 화면으로 확장되었을 때
gantt.attachEvent("onExpand", function (){
    // 커스텀 로직 작성
});

// Gantt가 전체 화면 모드에서 벗어났을 때
gantt.attachEvent("onCollapse", function (){
    // 커스텀 로직 작성
});
~~~

## Fullscreen API

[fullscreen](guides/fullscreen-ext.md) 객체의 네 가지 메서드가 추가 요소와 함께 gantt의 표시 모드를 조작하는 데 사용됩니다:

- **expand()** - gantt를 전체 화면 모드로 확장합니다

~~~js
gantt.ext.fullscreen.expand();
~~~

- **collapse()** - gantt를 전체 화면 모드에서 일반 모드로 축소합니다

~~~js
gantt.ext.fullscreen.collapse();
~~~

- **toggle()** -  gantt가 전체 화면으로 확장되었을 때는 **collapse()** 메서드를, 그렇지 않으면 **expand()** 메서드를 호출합니다

~~~js
gantt.ext.fullscreen.toggle();
~~~

- **getFullscreenElement()** - **expand()** 메서드에 의해 전체 화면으로 확장될 DOM 요소를 반환합니다. 

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

기본적으로 **getFullscreenElement()** 메서드는 Gantt 차트의 HTML 컨테이너를 반환합니다. 이 메서드를 [헤더/툴바가 있는 전체 화면 모드로 gannt를 확장하는 것](guides/fullscreen-mode.md#gantt-with-the-headertoolbar-in-the-fullscreen)으로 확장하도록 재정의할 수 있습니다.

## 헤더/툴바를 포함한 전체 화면의 Gantt

Gantt API는 *fullscreen* 객체의 **getFullscreenElement()** 메서드를 통해 Gantt를 전체 화면 모드로 확장하는 기능을 제공합니다:

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

:::note
기본적으로 이 메서드는 Gantt 차트의 HTML 컨테이너를 반환합니다. 이는 Gantt만 전체 화면으로 확장된다는 것을 의미합니다.
:::

전체 화면 모드에서 헤더나 툴바와 같은 추가 요소를 함께 표시하려면, 페이지에 커스텀 컨테이너를 추가해야 합니다. 예는 다음과 같습니다:

~~~html
<div id="myCover">
    <div class="gantt_control">
        <button id="toggle_fullscreen" 
                onclick="gantt.ext.fullscreen.toggle();">toggle fullscreen</button>
    </div>
        <div id="gantt_here"></div>
</div>
~~~


그런 다음 **getFullscreenElement()** 메서드를 재정의하여 전체 화면으로 확장될 커스텀 루트 노드를 반환하도록 합니다:

~~~js
gantt.ext.fullscreen.getFullscreenElement = function() {
    return document.getElementById("myCover");
}
gantt.init("gantt_here");
~~~


[Full Screen with additional elements](https://docs.dhtmlx.com/gantt/samples/02_extensions/26_full_screen_with_additional_elements.html)


## 왜 전체 화면 모드가 작동하지 않나요?

Fullscreen 확장 기능은 Gantt가 전체 화면으로 확장되는 것을 금지하지 않는 경우에만 작동할 수 있습니다.

프레임 내에 Gantt가 배치된 경우에는 다음과 같은 경우에 작동하지 않을 수 있습니다:

- **allowfullscreen** 속성이 없거나
- 또는 **allow** 속성에 "fullscreen" 값이 지정되지 않은 경우

이 경우 Gantt는 전체 화면으로 확장될 수 없습니다(저희 Snippet 도구에서 예제 1([Example 1](https://snippet.dhtmlx.com/k72wjyzl), [Example 2](https://snippet.dhtmlx.com/7jdrk6q5))를 시도해 보세요).

### Salesforce에서의 전체 화면 모드

FullScreen 확장은 Locker Service를 사용하는 Salesforce 애플리케이션에서는 작동하지 않습니다. Locker가 요소를 전체 화면 모드로 전환하는 기능을 차단하기 때문입니다.

더 구체적으로, Fullscreen 확장은 **Lightning Aura** 프레임워크와 **Lightning Web Components**에서는 작동하지 않을 수 있지만 **Visualforce** 프레임워크에서는 작동할 수 있습니다.

앱에서 전체 화면 사용 가능 여부를 확인하려면 구성 코드에 다음 코드 조각을 추가하면 됩니다:

~~~js
console.log("document.body.requestFullscreen", document.body.requestFullscreen)
~~~

출력에서 `undefined` 값을 보면 이 기능이 비활성화되어 있으며 Gantt를 확장할 수 없다는 뜻입니다.


:::note
If you activate the [fullscreen support](guides/extensions-list.md#fullscreen) in the environment which does not support this functionality, errors might appear but Gantt will continue working.
:::