---
title: "Доступность"
sidebar_label: "Доступность"
---

# Доступность

[Доступность](https://www.w3.org/WAI/fundamentals/accessibility-intro/) — важный и необходимый стандарт для современных веб-приложений. 
Существует набор различных техник, которые позволяют сделать приложение или сайт более удобными в использовании или работе. 

Чтобы обеспечить более легкий доступ и взаимодействие с DHTMLX Gantt для людей с ограниченными возможностями, компонент включает набор функций доступности:

- Атрибуты WAI-ARIA
- Клавиатурная навигация
- Темы с высоким контрастом

## Атрибуты WAI-ARIA

DHTMLX Gantt предоставляет поддержку WAI-ARIA, которая предусматривает использование специальных атрибутов в разметке компонента.
Это дополнительные атрибуты, которые делают компонент узнаваемым для скринридеров. 

Вы можете найти дополнительную информацию в [официальной спецификации WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/).

Атрибуты WAI-ARIA в Gantt включены по умолчанию; чтобы отключить их, используйте свойство *wai_aria_attributes* со значением *false*:

~~~js
gantt.config.wai_aria_attributes = true;
~~~

## Клавиатурная навигация

Эта техника предполагает доступ ко всем функциям приложения через соответствующие клавиши и сочетания клавиш, вместо навигации по приложению с помощью указателя мыши. 

Вы найдете подробную информацию в статье [Управление клавиатурой](guides/keyboard-navigation.md).

## Темы с высоким контрастом {#highcontrastthemes}

DHTMLX Gantt поддерживает тему, которая использует контрастные цвета, делающие интерфейс приложения более различимым и удобным для восприятия.
Доступны две версии темы с высоким контрастом:

Предоставляются два варианта контрастных тем:

- contrast black skin

![contrast_black_skin](/img/contrast_black_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxgantt_contrast_black.css" 
    type="text/css" media="screen" title="no title" charset="utf-8">
~~~


[Высококонтрастная тема - Черная](https://docs.dhtmlx.com/gantt/samples/06_skins/07_high_contrast_black.html)


- contrast white skin

![contrast_white_skin](/img/contrast_white_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxgantt_contrast_white.css" 
    type="text/css" media="screen" title="no title" charset="utf-8">
~~~


[Высококонтрастная тема - Белая](https://docs.dhtmlx.com/gantt/samples/06_skins/08_high_contrast_white.html)