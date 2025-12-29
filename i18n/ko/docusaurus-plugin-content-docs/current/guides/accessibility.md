---
title: "접근성"
sidebar_label: "접근성"
---

# 접근성

[접근성](https://www.w3.org/WAI/fundamentals/accessibility-intro/)은 현대 웹 애플리케이션의 핵심 표준입니다. 
애플리케이션이나 웹사이트를 더 쉽게 사용하고 접근할 수 있도록 다양한 기술이 설계되어 있습니다.

장애가 있는 사용자의 DHTMLX Gantt 접근성과 상호작용을 향상시키기 위해, 컴포넌트는 다음과 같은 접근성 기능을 포함하고 있습니다:

- WAI-ARIA 속성
- 키보드 내비게이션
- 고대비 테마

## WAI-ARIA 속성

DHTMLXGantt는 컴포넌트의 마크업에 특수 속성을 추가하여 WAI-ARIA를 지원합니다.  
이러한 추가 속성은 스크린 리더가 컴포넌트를 올바르게 해석하는 데 도움을 줍니다.

WAI-ARIA에 대한 자세한 내용은 [공식 명세](https://www.w3.org/WAI/standards-guidelines/aria/)에서 확인할 수 있습니다.

Gantt에서는 WAI-ARIA 속성이 기본적으로 활성화되어 있습니다. 비활성화하려면 *wai_aria_attributes* 속성을 *false*로 설정하세요:

~~~js
gantt.config.wai_aria_attributes = true;
~~~

## 키보드 내비게이션

이 방법은 모든 애플리케이션 기능을 키와 키 조합만으로 접근할 수 있도록 하여, 마우스 내비게이션이 필요하지 않게 해줍니다.

자세한 정보는 [키보드 내비게이션](guides/keyboard-navigation.md) 문서에서 확인하실 수 있습니다.

## 고대비 테마

DHTMLXGantt는 인터페이스를 더 명확하고 보기 쉽게 해주는 대비가 강한 색상의 테마를 제공합니다.  
이 고대비 테마는 시각적 요구가 있는 사용자에게 특히 유용합니다.

두 가지 고대비 테마 옵션이 제공됩니다:

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
