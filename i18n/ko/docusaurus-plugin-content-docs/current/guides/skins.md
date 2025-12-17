---
title: "스킨(Skins)"
sidebar_label: "스킨(Skins)"
---

스킨(Skins)
==============

dhtmlxGantt는 Gantt 차트의 전체적인 외관을 손쉽게 변경할 수 있도록 다양한 기본 스킨을 제공합니다:

1. [Terrace (기본)](guides/skins.md#terraceskin)
2. [Dark](guides/skins.md#darkskin)
3. [Material](guides/skins.md#materialskin)
4. [Contrast Black](guides/skins.md#contrastblackskin)
5. [Contrast White](guides/skins.md#contrastwhiteskin)
6. [Skyblue](guides/skins.md#skyblueskin)
7. [Meadow](guides/skins.md#meadowskin)
8. [Broadway](guides/skins.md#broadwayskin)

버전 9.0부터는 모든 스킨이 메인 **dhtmlxgantt.css** 파일에 포함되어 있습니다. 스킨을 활성화하려면 **gantt.skin** 속성을 설정하면 됩니다:

~~~js
gantt.skin = "dark";
~~~

또는 [gantt.setSkin()](api/method/setskin.md) 메서드를 사용할 수도 있습니다:

~~~js
gantt.setSkin("dark");
~~~

버전 8.0 및 이전 버전에서는 스킨이 별도의 CSS 파일로 제공됩니다.

### 폰트 사용

기본적으로 스킨은 `https://fonts.googleapis.com`에서 `Inter` 폰트를 로드합니다. Google Fonts에 대한 자세한 내용은 [여기](https://developers.google.com/fonts)에서 확인할 수 있습니다.

~~~js
@import (css) url(
'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
);
~~~

필요한 경우, **codebase/sources/less/** 폴더에 있는 **.less** 파일에서 폰트 import를 직접 제거하고, [스킨 커스터마이제이션](guides/custom-skins.md) 문서의 안내에 따라 스킨을 다시 빌드할 수 있습니다.

## 'Terrace' 스킨 {#terraceskin}
-----------------------------

기본 스킨을 사용하려면 기본 CSS 파일을 포함하세요:

- **dhtmlxgantt.css**

![gantt-default-skin](/img/gantt-default-skin.png)


[Default skin](https://docs.dhtmlx.com/gantt/samples/06_skins/01_default.html)


## 'Dark' 스킨 {#darkskin}
-----------------------------

'Dark' 스킨을 적용하려면 기본 CSS 파일을 포함하세요:

- **dhtmlxgantt.css**

그런 다음 **gantt.skin** 속성을 사용하여 스킨을 설정하세요:

~~~js
gantt.skin = "dark";
~~~

![gantt_dark_skin](/img/gantt_dark_skin.png)


[Dark skin](https://docs.dhtmlx.com/gantt/samples/06_skins/10_dark.html)


## 'Material' 스킨 {#materialskin}
--------------------

'Material' 스킨을 사용하려면 기본 CSS 파일을 포함하세요:

- **dhtmlxgantt.css**

**gantt.skin** 속성으로 스킨을 설정하세요:

~~~js
gantt.skin = "material";
~~~

![gantt_material_skin](/img/gantt_material_skin.png)


[Material theme](https://docs.dhtmlx.com/gantt/samples/06_skins/09_material.html)


버전 6.3부터 Material 스킨은 더 이상 `Roboto` 폰트를 자동으로 import하지 않습니다. 필요하다면 다음과 같이 `Roboto` 폰트를 수동으로 추가할 수 있습니다:

~~~js
<link rel="stylesheet" href="'https://fonts.googleapis.com/css?'+
    +'family="Open+Sans|Roboto:regular,medium,thin,bold"'">
~~~

## 'Contrast Black' 스킨 {#contrastblackskin}
--------------------
'Contrast Black' 스킨을 사용하려면 기본 CSS 파일을 포함하세요:

- **dhtmlxgantt.css**

그런 다음 **gantt.skin** 속성으로 스킨을 설정하세요:

~~~js
gantt.skin = "contrast-black";
~~~

![gantt_contrast_black_skin](/img/gantt_contrast_black_skin.png)

[High contrast theme - Black](https://docs.dhtmlx.com/gantt/samples/06_skins/07_high_contrast_black.html)


## 'Contrast White' 스킨 {#contrastwhiteskin}
---------------------
'Contrast White' 스킨을 적용하려면 기본 CSS 파일을 포함하세요:

- **dhtmlxgantt.css**

**gantt.skin** 속성으로 스킨을 설정하세요:

~~~js
gantt.skin = "contrast-white";
~~~

![gantt_contrast_white_skin](/img/gantt_contrast_white_skin.png)

[High contrast theme - White](https://docs.dhtmlx.com/gantt/samples/06_skins/08_high_contrast_white.html)


## 'Skyblue' 스킨 {#skyblueskin}
----------------------------------
'Skyblue' 스킨을 사용하려면 기본 CSS 파일을 포함하세요:

- **dhtmlxgantt.css**

**gantt.skin** 속성을 통해 스킨을 설정하세요:

~~~js
gantt.skin = "skyblue";
~~~

![gantt-skyblue-skin](/img/gantt-skyblue-skin.png)

['Skyblue' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/03_skyblue.html)


## 'Meadow' 스킨 {#meadowskin}
-----------------------------

'Meadow' 스킨을 적용하려면 기본 CSS 파일을 포함하세요:

- **dhtmlxgantt.css**

**gantt.skin** 속성을 사용하여 스킨을 설정하세요:

~~~js
gantt.skin = "meadow";
~~~

![gantt-meadow-skin](/img/gantt-meadow-skin.png)

['Meadow' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/04_meadow.html)


## 'Broadway' 스킨 {#broadwayskin}
-----------------------------
'Broadway' 스킨을 적용하려면 기본 CSS 파일을 포함하세요:

- **dhtmlxgantt.css**

**gantt.skin** 속성으로 스킨을 설정하세요:

~~~js
gantt.skin = "broadway";
~~~

![gantt-broadway-skin](/img/gantt-broadway-skin.png)

['Broadway' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/05_broadway.html)

