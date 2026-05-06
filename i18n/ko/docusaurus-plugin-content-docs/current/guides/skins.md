---
title: "스킨"  
sidebar_label: "스킨"  
---

# 스킨

dhtmlxGantt는 Gantt 차트의 전반적인 모양을 변경하는 데 사용할 수 있는 미리 정의된 여러 스킨을 제공합니다:

1. [Terrace (default)](guides/skins.md#terraceskin)  
2. [Dark](guides/skins.md#darkskin)  
3. [Material](guides/skins.md#materialskin)  
4. [Contrast Black](guides/skins.md#contrastblackskin)  
5. [Contrast White](guides/skins.md#contrastwhiteskin)  
6. [Skyblue](guides/skins.md#skyblueskin)  
7. [Meadow](guides/skins.md#meadowskin)  
8. [Broadway](guides/skins.md#broadwayskin)  

v9.0부터 모든 스킨은 메인 파일인 **dhtmlxgantt.css**에 번들로 포함됩니다. 스킨은 **gantt.skin** 속성을 설정하여 활성화할 수 있습니다:

~~~js
gantt.skin = "dark";
~~~

또는 [gantt.setSkin()](api/method/setskin.md) 메서드를 호출하여:

~~~js
gantt.setSkin("dark");
~~~

Gantt v8.0 및 이전 버전에서는 스킨이 각각의 CSS 파일로 정의되어 있습니다.

### 글꼴 사용

기본적으로 스킨은 `Inter` 글꼴을 `https://fonts.googleapis.com`에서 가져옵니다. Google Fonts에 대해 더 자세히 알아보려면 [여기](https://developers.google.com/fonts)를 참조하세요.

~~~css
@import (css) url(
'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
);
~~~

필요한 경우, **codebase/sources/less/** 폴더에 있는 **.less** 파일에서 글꼴을 직접 제거한 후, [Skins Customization](guides/custom-skins.md) 문서에 설명된 대로 스킨을 다시 빌드할 수 있습니다.

## 'Terrace' skin {#terraceskin}

기본 스킨을 적용하려면 기본 CSS 파일을 포함합니다:

- **dhtmlxgantt.css**

![gantt-default-skin](/img/gantt-default-skin.png)

[기본 스킨](https://docs.dhtmlx.com/gantt/samples/06_skins/01_default.html)

## 'Dark' skin {#darkskin}

'D​ark' 스킨을 적용하려면 기본 CSS 파일을 포함합니다:

- **dhtmlxgantt.css**

그리고 **gantt.skin** 속성으로 스킨을 설정합니다:

~~~js
gantt.skin = "dark";
~~~

![gantt_dark_skin](/img/gantt_dark_skin.png)

[Dark skin](https://docs.dhtmlx.com/gantt/samples/06_skins/10_dark.html)

## 'Material' skin {#materialskin}

'Material' 스킨을 적용하려면 기본 CSS 파일을 포함합니다:

- **dhtmlxgantt.css**

그리고 **gantt.skin** 속성으로 스킨을 설정합니다:

~~~js
gantt.skin = "material";
~~~

![gantt_material_skin](/img/gantt_material_skin.png)

[Material theme](https://docs.dhtmlx.com/gantt/samples/06_skins/09_material.html)

v6.3부터 Material 스킨에서 Roboto 글꼴의 임포트가 제거되었습니다. 필요하면 수동으로 Roboto 글꼴을 추가할 수 있습니다. 예시는 다음과 같습니다:

~~~js
<link rel="stylesheet" href="'https://fonts.googleapis.com/css?'+
    +'family="Open+Sans|Roboto:regular,medium,thin,bold"'">
~~~

## 'Contrast Black' skin {#contrastblackskin}

'Contrast Black' 스킨을 적용하려면 기본 CSS 파일을 포함합니다:

- **dhtmlxgantt.css**

그리고 **gantt.skin** 속성으로 스킨을 설정합니다:

~~~js
gantt.skin = "contrast-black";
~~~

![gantt_contrast_black_skin](/img/gantt_contrast_black_skin.png)

[High contrast theme - Black](https://docs.dhtmlx.com/gantt/samples/06_skins/07_high_contrast_black.html)

## 'Contrast White' skin {#contrastwhiteskin}

'Contrast White' 스킨을 적용하려면 기본 CSS 파일을 포함합니다:

- **dhtmlxgantt.css**

그리고 **gantt.skin** 속성으로 스킨을 설정합니다:

~~~js
gantt.skin = "contrast-white";
~~~

![gantt_contrast_white_skin](/img/gantt_contrast_white_skin.png)

[High contrast theme - White](https://docs.dhtmlx.com/gantt/samples/06_skins/08_high_contrast_white.html)

## 'Skyblue' skin {#skyblueskin}

'Skyblue' 스킨을 적용하려면 기본 CSS 파일을 포함합니다:

- **dhtmlxgantt.css**

그리고 **gantt.skin** 속성으로 스킨을 설정합니다:

~~~js
gantt.skin = "skyblue";
~~~

![gantt-skyblue-skin](/img/gantt-skyblue-skin.png)

['Skyblue' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/03_skyblue.html)

## 'Meadow' skin {#meadowskin}

'Meadow' 스킨을 적용하려면 기본 CSS 파일을 포함합니다:

- **dhtmlxgantt.css**

그리고 **gantt.skin** 속성으로 스킨을 설정합니다:

~~~js
gantt.skin = "meadow";
~~~

![gantt-meadow-skin](/img/gantt-meadow-skin.png)

['Meadow' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/04_meadow.html)

## 'Broadway' skin {#broadwayskin}

'Broadway' 스킨을 적용하려면 기본 CSS 파일을 포함합니다:

- **dhtmlxgantt.css**

그리고 **gantt.skin** 속성으로 스킨을 설정합니다:

~~~js
gantt.skin = "broadway";
~~~

![gantt-broadway-skin](/img/gantt-broadway-skin.png)

['Broadway' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/05_broadway.html)