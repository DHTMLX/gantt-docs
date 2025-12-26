---
title: "Доступность"
sidebar_label: "Доступность"
---

# Доступность

[Доступность](https://www.w3.org/WAI/fundamentals/accessibility-intro/) является ключевым стандартом для современных веб-приложений.
Существует множество техник, предназначенных для упрощения использования и повышения доступности приложения или сайта.

Для улучшения доступа и взаимодействия с DHTMLX Gantt для пользователей с ограниченными возможностями компонент включает в себя несколько функций доступности:

- Атрибуты WAI-ARIA
- Навигация с клавиатуры
- Тема с высоким контрастом

## Атрибуты WAI-ARIA

DHTMLXGantt поддерживает WAI-ARIA, внедряя специальные атрибуты в разметку компонента.
Эти дополнительные атрибуты помогают экранным читалкам корректно интерпретировать компонент.

Подробнее можно узнать в [официальной спецификации](https://www.w3.org/WAI/standards-guidelines/aria/) WAI-ARIA.

Атрибуты WAI-ARIA включены по умолчанию в Gantt. Чтобы отключить их, установите свойство *wai_aria_attributes* в *false*:

~~~js
gantt.config.wai_aria_attributes = true;
~~~

## Навигация с клавиатуры

Этот метод гарантирует, что все функции приложения могут быть доступны с помощью клавиш и их комбинаций,
без необходимости использования мыши.

Дополнительная информация доступна в статье [Навигация с клавиатуры](guides/keyboard-navigation.md).

## Темы с высоким контрастом

DHTMLXGantt предлагает тему с контрастными цветами, которые делают интерфейс более четким и удобным для просмотра.
Такая тема особенно полезна для пользователей с особыми визуальными требованиями.

Предоставляются два варианта контрастных тем:

- contrast black skin

![contrast_black_skin](/img/contrast_black_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxgantt_contrast_black.css" 
    type="text/css" media="screen" title="no title" charset="utf-8">
~~~


[High contrast theme - Black](https://docs.dhtmlx.com/gantt/samples/06_skins/07_high_contrast_black.html)


- contrast white skin

![contrast_white_skin](/img/contrast_white_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxgantt_contrast_white.css" 
    type="text/css" media="screen" title="no title" charset="utf-8">
~~~


[High contrast theme - White](https://docs.dhtmlx.com/gantt/samples/06_skins/08_high_contrast_white.html)
