---
title: "접근성"
sidebar_label: "접근성"
---

# 접근성

[접근성](https://www.w3.org/WAI/fundamentals/accessibility-intro/) 은 현대 웹 애플리케이션에서 중요한 필요 표준입니다. 
여러 가지 기술 세트가 있어 애플리케이션이나 웹사이트를 더 편리하게 사용할 수 있도록 해줍니다.  

장애가 있는 사람들을 위한 DHTMLX Gantt의 접근성과 상호작용을 쉽게 만들기 위해 컴포넌트에는 다음과 같은 접근성 기능이 포함되어 있습니다:

- WAI-ARIA 속성
- 키보드 탐색
- 고대비 테마

## WAI-ARIA 속성

DHTMLXGantt는 컴포넌트의 마크업에서 특수 속성의 사용을 수반하는 WAI-ARIA 지원을 제공합니다.
이는 화면 읽기 기기가 컴포넌트를 인식하는 데 도움을 주는 추가 속성들입니다. 

WAI-ARIA의 공식 명세에서 더 자세한 정보를 확인할 수 있습니다.

WAI-ARIA 속성은 Gantt에서 기본적으로 활성화되어 있으며, 이를 비활성화하려면 *wai_aria_attributes* 속성에 *false* 값을 사용할 수 있습니다:

~~~js
gantt.config.wai_aria_attributes = true;
~~~

## 키보드 탐색

이 기술은 마우스 포인터로 애플리케이션을 탐색하는 대신 해당 키와 키 조합을 통해 애플리케이션의 모든 기능에 접근할 수 있도록 하는 것을 의미합니다. 

자세한 정보는 [키보드 탐색] 문서(guides/keyboard-navigation.md)에서 확인할 수 있습니다.

## 고대비 테마 {#highcontrastthemes}

DHTMLXGantt는 인터페이스를 더 뚜렷하고 보기 쉽게 만드는 대비 색상을 사용하는 테마를 지원합니다.
고대비 테마는 특정 시각적 요구가 있는 사람들에게 도움이 됩니다.

사용 가능한 대비 테마에는 두 가지 변형이 있습니다: 

- 대비 블랙 스킨

![contrast_black_skin](/img/contrast_black_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxgantt_contrast_black.css" 
    type="text/css" media="screen" title="no title" charset="utf-8">
~~~

[고대비 테마 - 블랙](https://docs.dhtmlx.com/gantt/samples/06_skins/07_high_contrast_black.html)


- 대비 화이트 스킨

![contrast_white_skin](/img/contrast_white_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxgantt_contrast_white.css" 
    type="text/css" media="screen" title="no title" charset="utf-8">
~~~

[고대비 테마 - 화이트](https://docs.dhtmlx.com/gantt/samples/06_skins/08_high_contrast_white.html)