---
title: "Полноэкранный режим"
sidebar_label: "Полноэкранный режим"
---

# Режим полного экрана

Начиная с версии 3.3, библиотека включает расширение **fullscreen**.

Это расширение предоставляет API, которое переводит компонент в полноэкранный режим, используя FullScreen API, когда это возможно ([список поддерживаемых браузеров](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)).

<div style="text-align:center;">![full_screen](/img/full_screen.png)</div>

Для устаревших браузеров это просто позволяет расширить Gantt до 100% размера окна.

Чтобы активировать полноэкранную поддержку, включите плагин **fullscreen** через метод [gantt.plugins](api/method/plugins.md):

~~~js
gantt.plugins({
    fullscreen: true
});
~~~

Сам компонент не имеет элемента управления пользовательским интерфейсом, который переключает этот режим; вам нужно разместить его на странице или скопировать тот из примера:

~~~js
<input id="fullscreen_button" type="button" value="Toggle Fullscreen"/>

<script>
var button = document.getElementById("fullscreen_button");
     button.addEventListener("click", function(){
          if (!gantt.getState().fullscreen) {
            // развёртывание Gantt до полноэкранного режима
               gantt.expand();
          }
          else {
            // сворачивание Gantt в обычный режим
               gantt.collapse();
          }
     }, false);
</script>
~~~

Щелчок по готовой иконке изменит размер Gantt с исходного на 'полноэкранный режим' и наоборот.


[Полноэкран](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)


## Обзор API

Существует два метода, которые используются для управления режимом отображения Gantt:

- [expand](api/method/expand.md) - разворачивает Gantt в полноэкранный режим

~~~js
gantt.expand();
~~~

- [collapse](api/method/collapse.md) - сворачивает Gantt из полноэкранного режима обратно в обычный режим

~~~js
gantt.collapse();
~~~

## Список событий

Ниже перечислены поддерживаемые события:

- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

~~~js
// перед тем как Gantt будет развёрнут в полноэкранный режим
gantt.attachEvent("onBeforeExpand",function(){
    // здесь может быть любая своя логика    
    return true;
});

// перед тем как Gantt выйдет из полноэкранного режима
gantt.attachEvent("onBeforeCollapse",function(){
    // здесь может быть любая своя логика    
    return true;
});

// когда Gantt развёрнут в полноэкранный режим
gantt.attachEvent("onExpand", function (){
    // здесь может быть любая своя логика
});

// когда Gantt вышел из полноэкранного режима
gantt.attachEvent("onCollapse", function (){
    // здесь может быть любая своя логика
});
~~~


## Fullscreen API

Существует четыре метода объекта [fullscreen](guides/fullscreen-ext.md), которые используются для управления режимом отображения Gantt вместе с дополнительными элементами:

- **expand()** - разворачивает Gantt в полноэкранный режим

~~~js
gantt.ext.fullscreen.expand();
~~~

- **collapse()** - сворачивает Gantt из полноэкранного режима обратно в обычный режим

~~~js
gantt.ext.fullscreen.collapse();
~~~

- **toggle()** - вызывает метод **collapse()**, если Gantt развёрнут в полноэкранном режиме, и метод **expand()** в противном случае

~~~js
gantt.ext.fullscreen.toggle();
~~~

- **getFullscreenElement()** - возвращает DOM-элемент, который будет развёрнут в полноэкранный режим методом **expand()**.

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

По умолчанию метод **getFullscreenElement()** возвращает HTML-контейнер диаграммы Gantt. Вы можете переопределить этот метод [для расширения Gantt дополнительными элементами в полноэкранном режиме](guides/fullscreen-mode.md#gantt-with-the-headertoolbar-in-the-fullscreen).

## Gantt с заголовком/панелью инструментов в полноэкранном режиме

API Gantt предоставляет возможность расширить Gantt до полноэкранного режима через метод **getFullscreenElement()** объекта *fullscreen*:

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

:::note
По умолчанию этот метод возвращает HTML-контейнер диаграммы Gantt. Это означает, что в полноэкранный режим будет развёрнута только диаграмма Gantt.
:::

В случае если вы хотите отображать Gantt с дополнительными элементами (такими как заголовок или панель инструментов) в полноэкранном режиме, вам нужно добавить на страницу свой контейнер, как в примере:

~~~html
<div id="myCover">
    <div class="gantt_control">
        <button id="toggle_fullscreen" 
                onclick="gantt.ext.fullscreen.toggle();">toggle fullscreen</button>
    </div>
        <div id="gantt_here"></div>
</div>
~~~


После этого нужно переопределить метод **getFullscreenElement()** так, чтобы он возвращал корневой узел, который будет развёрнут в полноэкранный режим:

~~~js
gantt.ext.fullscreen.getFullscreenElement = function() {
    return document.getElementById("myCover");
}
gantt.init("gantt_here");
~~~


[Полноэкран с дополнительными элементами](https://docs.dhtmlx.com/gantt/samples/02_extensions/26_full_screen_with_additional_elements.html)


## Почему режим полного экрана не работает?

Расширение полноэкранного режима может работать только в том случае, если вы не запрещаете Gantt разворачиваться в полноэкранный режим.

В случаях, когда Gantt размещён во фрейме, где:

- отсутствуют свойство **allowfullscreen** или значение **allow="fullscreen"**
- или не указано значение **fullscreen** для свойства **allow**

Gantt не сможет развернуться в полноэкранный режим (попробуйте это в нашем инструменте сниппетов ([Пример 1](https://snippet.dhtmlx.com/k72wjyzl), [Пример 2](https://snippet.dhtmlx.com/7jdrk6q5))).

### Режим полноэкранного экрана в Salesforce

Расширение Fullscreen не работает в Salesforce-приложениях, которые используют Locker Service, поскольку Locker блокирует возможность перевода элемента в полноэкранный режим.

Более точно, расширение Fullscreen не будет работать с фреймворками **Lightning Aura** и **Lightning Web Components**, но может работать с фреймворком **Visualforce**.

Вы можете проверить доступность полноэкранного режима в вашем приложении, добавив следующий фрагмент кода в конфигурационный код:

~~~js
console.log("document.body.requestFullscreen", document.body.requestFullscreen)
~~~

Если в выводе вы видите значение `undefined`, это означает, что функция отключена и расширить Gantt нельзя.


:::note
Если вы активируете [полноэкранную поддержку](guides/extensions-list.md#fullscreen) в окружении, которое не поддерживает эту функциональность, могут возникнуть ошибки, но Gantt продолжит работу.
:::