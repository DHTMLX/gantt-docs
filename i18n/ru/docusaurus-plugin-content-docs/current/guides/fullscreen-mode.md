---
title: "Полноэкранный режим"
sidebar_label: "Полноэкранный режим"
---

# Полноэкранный режим

Начиная с версии 3.3, библиотека предоставляет расширение **fullscreen**.

Это расширение позволяет переключать компонент в полноэкранный режим с использованием FullScreen API, если он поддерживается ([список поддерживаемых браузеров](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)).

<div style="text-align:center;">![full_screen](/img/full_screen.png)</div>

В старых браузерах Gantt просто растягивается на 100% размера окна.

Чтобы включить поддержку полноэкранного режима, активируйте плагин **fullscreen** через метод [gantt.plugins](api/method/plugins.md):

~~~js
gantt.plugins({
    fullscreen: true
});
~~~

Компонент не содержит встроенного элемента управления для переключения полноэкранного режима, поэтому вам нужно добавить его самостоятельно или воспользоваться приведённым примером:

~~~js
<input id="fullscreen_button" type="button" value="Toggle Fullscreen"/>

<script>
var button = document.getElementById("fullscreen_button");
     button.addEventListener("click", function(){
          if (!gantt.getState().fullscreen) {
            // развернуть gantt на весь экран
               gantt.expand();
          }
          else {
            // вернуть gantt к обычному размеру
               gantt.collapse();
          }
     }, false);
</script>
~~~

При нажатии на кнопку Gantt будет переключаться между исходным размером и полноэкранным режимом.


[Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)


## Обзор API

Существует два основных метода для управления режимом отображения Gantt:

- [expand](api/method/expand.md) - переводит Gantt в полноэкранный режим

~~~js
gantt.expand();
~~~

- [collapse](api/method/collapse.md) - возвращает Gantt из полноэкранного режима к обычному виду

~~~js
gantt.collapse();
~~~

## Поддерживаемые события

Для обработки изменений полноэкранного режима доступны следующие события:

- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

~~~js
// перед разворачиванием gantt на весь экран
gantt.attachEvent("onBeforeExpand",function(){
    // ваша логика    
    return true;
});

// перед выходом из полноэкранного режима
gantt.attachEvent("onBeforeCollapse",function(){
    // ваша логика    
    return true;
});

// после разворачивания gantt на весь экран
gantt.attachEvent("onExpand", function (){
    // ваша логика
});

// после выхода gantt из полноэкранного режима
gantt.attachEvent("onCollapse", function (){
    // ваша логика
});
~~~

## Fullscreen API

Объект [fullscreen](guides/fullscreen-ext.md) предоставляет четыре метода для управления полноэкранным поведением Gantt, а также других элементов:

- **expand()** - переводит Gantt в полноэкранный режим

~~~js
gantt.ext.fullscreen.expand();
~~~

- **collapse()** - выходит из полноэкранного режима и возвращает Gantt к обычному размеру

~~~js
gantt.ext.fullscreen.collapse();
~~~

- **toggle()** - переключает между полноэкранным и обычным режимами

~~~js
gantt.ext.fullscreen.toggle();
~~~

- **getFullscreenElement()** - возвращает DOM-элемент, который будет развёрнут на весь экран при вызове **expand()**

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

По умолчанию **getFullscreenElement()** возвращает HTML-контейнер Gantt. Вы можете переопределить этот метод, чтобы добавить дополнительные элементы в полноэкранный режим, как описано [здесь](guides/fullscreen-mode.md#ganttwithheadertoolbarinfullscreen).

## Gantt с заголовком/панелью инструментов в полноэкранном режиме

API Gantt позволяет расширить полноэкранный режим на другие элементы с помощью метода **getFullscreenElement()** объекта *fullscreen*:

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

:::note
По умолчанию этот метод возвращает HTML-контейнер Gantt, поэтому только сам Gantt будет развернут на весь экран.
:::

Если вы хотите отображать Gantt вместе с дополнительными элементами, например, заголовком или панелью инструментов, создайте на странице собственный контейнер, например:

~~~html
<div id="myCover">
    <div class="gantt_control">
        <button id="toggle_fullscreen" 
                onclick="gantt.ext.fullscreen.toggle();">toggle fullscreen</button>
    </div>
        <div id="gantt_here"></div>
</div>
~~~

Затем переопределите метод **getFullscreenElement()**, чтобы он возвращал ваш контейнер, который должен быть развёрнут на весь экран:

~~~js
gantt.ext.fullscreen.getFullscreenElement = function() {
    return document.getElementById("myCover");
}
gantt.init("gantt_here");
~~~


[Full Screen with additional elements](https://docs.dhtmlx.com/gantt/samples/02_extensions/26_full_screen_with_additional_elements.html)


## Почему полноэкранный режим может не работать?

Расширение fullscreen работает только в том случае, если Gantt разрешено переходить в полноэкранный режим.

Если Gantt находится внутри iframe, в котором:

- отсутствует атрибут **allowfullscreen** или разрешение **allow="fullscreen"**
- или атрибут **allow** не содержит "fullscreen"

то Gantt не сможет перейти в полноэкранный режим (проверьте это в нашем snippet tool ([Example 1](https://snippet.dhtmlx.com/k72wjyzl), [Example 2](https://snippet.dhtmlx.com/7jdrk6q5))).

### Полноэкранный режим в Salesforce

Расширение Fullscreen не работает в приложениях Salesforce, использующих [Locker Service](https://developer.salesforce.com/docs/atlas.en-us.238.0.lightning.meta/lightning/security_code.htm), поскольку Locker блокирует перевод элементов в полноэкранный режим.

В частности, расширение не будет работать с **Lightning Aura** или **Lightning Web Components**, но может работать с фреймворком **Visualforce**.

Вы можете проверить, доступен ли полноэкранный режим в вашем приложении, добавив этот фрагмент в вашу конфигурацию:

~~~js
console.log("document.body.requestFullscreen", document.body.requestFullscreen)
~~~

Если в выводе будет `undefined`, полноэкранный режим отключён и Gantt не сможет перейти в полноэкранный режим.


:::note
Если поддержка полноэкранного режима включена в среде, которая его не поддерживает, могут возникать ошибки, но Gantt продолжит работать в обычном режиме.
:::

