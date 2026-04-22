---
title: "스킨 커스터마이징"
sidebar_label: "스킨 커스터마이징"
---

# 스킨 커스터마이징

버전 9.0부터 Gantt 스킨은 사용자 정의 및 스타일링에 사용할 수 있는 CSS 변수들을 사용합니다.

[스킨을 동적으로 변경하기](https://docs.dhtmlx.com/gantt/samples/06_skins/06_dynamic_skin.html)

주요 CSS 변수:

~~~css
:root {
    --dhx-gantt-theme: terrace;
    --dhx-gantt-font-family: Inter, Helvetica, Arial, sans-serif;
    --dhx-gantt-font-size: 14px;


    --dhx-gantt-base-colors-white: #FFFFFF;
    --dhx-gantt-base-colors-select: #EFF3FF;
    --dhx-gantt-base-colors-hover-color: #e0e0e0;
    --dhx-gantt-base-colors-border-light: #F0F0F0;
    --dhx-gantt-base-colors-border: #DFE0E1;

    --dhx-gantt-base-colors-icons: #A1A4A6;
    --dhx-gantt-base-colors-disabled: #E9E9E9;
    --dhx-gantt-base-colors-select: #E0E5F3;
    --dhx-gantt-base-colors-text-light: #555D63;
    --dhx-gantt-base-colors-text-base: #23272A;
    --dhx-gantt-base-colors-text-on-fill: rgba(255, 255, 255, 0.90);
    --dhx-gantt-base-colors-background: #FFFFFF;
    --dhx-gantt-base-colors-background-alt: #F2F2F2;

    --dhx-gantt-base-colors-primary: #537CFA;
    --dhx-gantt-base-colors-warning: #FAB936;
    --dhx-gantt-base-colors-error: #E3334E;
    --dhx-gantt-base-colors-success: #1BC297;

    --dhx-gantt-container-background: var(--dhx-gantt-base-colors-background);
    --dhx-gantt-container-color: var(--dhx-gantt-base-colors-text-base);
    --dhx-gantt-offtime-background: var(--dhx-gantt-base-colors-background-alt);

    --dhx-gantt-scale-background: var(--dhx-gantt-container-background);
    --dhx-gantt-scale-border-vertical: 1px solid var(--dhx-gantt-base-colors-border-light);
    --dhx-gantt-scale-border-horizontal: 1px solid var(--dhx-gantt-base-colors-border);

    --dhx-gantt-scale-color: var(--dhx-gantt-base-colors-text-light);

    --dhx-gantt-grid-body-background: transparent;
    --dhx-gantt-grid-scale-background: var(--dhx-gantt-scale-background);
    --dhx-gantt-grid-scale-color: var(--dhx-gantt-scale-color);
    --dhx-gantt-grid-scale-border-vertical: var(--dhx-gantt-scale-border-vertical);
    --dhx-gantt-timeline-scale-background: var(--dhx-gantt-scale-background);
    --dhx-gantt-timeline-scale-color: var(--dhx-gantt-scale-color);
    --dhx-gantt-timeline-scale-border-vertical:  var(--dhx-gantt-scale-border-vertical);

    /* tasks */


    --dhx-gantt-task-blue: linear-gradient(180deg, #527CFF 0%, #9751FC 100%);
    --dhx-gantt-task-green: linear-gradient(180deg, #12D979 0%, #1ECDEB 100%);
    --dhx-gantt-task-violet: linear-gradient(180deg, #D071EF 0%, #EE71D5 100%);
    --dhx-gantt-task-yellow: linear-gradient(180deg, #FFB725 0%, #FFBB25 31.25%, #FAEA27 100%);

    --dhx-gantt-task-background: var(--dhx-gantt-task-blue);
    --dhx-gantt-task-border: none;
    --dhx-gantt-task-color: var(--dhx-gantt-base-colors-text-on-fill);
    --dhx-gantt-project-color: var(--dhx-gantt-task-color);
    --dhx-gantt-task-line-text: var(--dhx-gantt-container-color);

    --dhx-gantt-task-row-border: 1px solid var(--dhx-gantt-base-colors-border);
    --dhx-gantt-task-row-background: var(--dhx-gantt-container-background);
    --dhx-gantt-task-row-background--odd: var(--dhx-gantt-container-background);

    --dhx-gantt-project-background: var(--dhx-gantt-task-green);
    --dhx-gantt-milestone-background: var(--dhx-gantt-task-violet);

    --dhx-gantt-task-marker-color: var(--dhx-gantt-task-background);

    --dhx-gantt-popup-background: var(--dhx-gantt-container-background);
    --dhx-gantt-popup-color: var(--dhx-gantt-container-color);

    --dhx-gantt-tooltip-background: var(--dhx-gantt-base-colors-text-base);
    --dhx-gantt-tooltip-color: var(--dhx-gantt-container-background);

    --dhx-gantt-link-background: var(--dhx-gantt-base-colors-icons);
    --dhx-gantt-link-background-hover: var(--dhx-gantt-base-colors-icons-hover);
    --dhx-gantt-link-critical-background: var(--dhx-gantt-base-colors-error);

}
~~~

모든 변수는 패키지의 **codebase/sources/less/src/themes/variables.less** 파일에서 확인할 수 있습니다.

## 스킨 커스터마이징 방법

가장 쉬운 방법은 스타일시트에서 관련 CSS 변수들을 재정의하는 것입니다. 아래는 예시입니다:

~~~html
<style>
:root {
 /* scales */
  --dhx-gantt-scale-background: #8E8E8E;
  --dhx-gantt-base-colors-border-light: #C5C5C5;
  --dhx-gantt-base-colors-border: #DFE0E1;
  --dhx-gantt-scale-color: #FFF;
  --dhx-gantt-base-colors-icons: #00000099;
  
  /* tasks */
  --dhx-gantt-task-background: #3db9d3;
  --dhx-gantt-task-color: #FFFFFF;
  --dhx-gantt-project-background: #6AA84F;
  --dhx-gantt-project-color: #FFFFFF;

  /* links */
  --dhx-gantt-link-background: #ffa011;
  --dhx-gantt-link-background-hover: #ffa011;

}
</style>
~~~

[스킨을 동적으로 변경하기](https://docs.dhtmlx.com/gantt/samples/06_skins/06_dynamic_skin.html)

스킨에 따라 기본 스타일이 재정의되면 커스텀 스타일이 Gantt에 적용됩니다.

:::note
For correct inheritance of values across the entire theme, define variables at the :root element.
::: 

전체 테마에서 값의 올바른 상속을 보장하려면 :root 요소에서 변수를 정의하십시오. 이 접근 방식은 다른 변수에서 사용하는 변수가 재정의될 때 관련 스타일에 올바르게 영향을 주도록 보장합니다.

예를 들어, 변수 `--dhx-gantt-scale-color`는 기본 텍스트 색상 변수인 `--dhx-gantt-container-color`에서 상속됩니다.

- If you redefine `--dhx-gantt-container-color` at the **:root** level, you ensure that `--dhx-gantt-scale-color` reflects this change. 

~~~html
<style>
:root {
    /* --dhx-gantt-scale-color and other
  variables that inherit `--dhx-gantt-container-color`
  will be affected
  */
  --dhx-gantt-container-color: #222;

}
</style>
~~~

- If you redefine `--dhx-gantt-container-color` at a lower level in the DOM tree, such as within **.gantt_container**, it won't affect the `--dhx-gantt-scale-color` variable.

~~~html
<style>
.gantt_container {
    /* only elements that directly 
  use --dhx-gantt-container-color will be affected
  */
  --dhx-gantt-container-color: #222;
}
</style>
~~~

## How to use source codes

dhtmlxGantt는 다음 형태의 스타일 파일과 함께 제공됩니다:

- **codebase/dhtmlxgantt.css** - 스킨용으로 미리 만들어진 압축 CSS 파일이며, 프로덕션에 사용할 수 있습니다;
- **codebase/sources/dhtmlxgantt.css** - 미리 빌드된 읽기 가능한 CSS 파일들;
- **codebase/sources/less/** - Gantt 스킨의 소스 less 파일들.

후자는 기존 스킨의 깊은 커스터마이징이나 새로운 스킨을 만드는 데 사용할 수 있습니다.

## 시작 방법

**codebase/sources/less**를 NPM 패키지로 초기화할 수 있습니다.  
소스는 두 가지 유형의 파일을 포함합니다:

- 스타일 시트;
- Gantt 뷰를 미세 조정하거나 새로운 스킨을 만드는 데 사용할 수 있는 미세 변수 선언이 포함된 파일들.

## 스킨 빌드 방법

In **codebase/sources/less/**에서 실행합니다:

~~~
> npm install
~~~

설치가 완료되면 아래 명령어를 사용하여 CSS 파일을 재빌드할 수 있습니다:

~~~
> npm run build
~~~

또는

~~~
> npm run watch
~~~

스크립트는 소스에서 CSS 파일을 재빌드하고 gantt 패키지의 *codebase* 폴더에 기존 파일을 대체합니다.

## 구조

버전 9.0의 **less** 폴더 구조는 아래와 같습니다(향후 버전에서 변경될 수 있음):

### 이미지

- **./src/imgs** - 모든 스킨에서 사용되는 SVG 아이콘
- **./src/iconfont** - 웹 폰트에 미리 빌드된 아이콘

### 스킨 정의

기본 변수 세트는 `terrace` 스킨에 정의되어 있고, 다른 스킨은 해당 변수를 재정의하고 스타일을 추가합니다.

- **./src/themes**
  - *./src/themes/variables.less* - 모든 스킨에서 공통으로 사용되는 변수, `terrace` 스킨
  - *./src/themes/contrast_black* - 대비 블랙 스킨 변수
  - *./src/themes/contrast_white* - 대비 화이트 스킨 변수
  - *./src/themes/material* - material 스킨 변수
  - *./src/themes/dark* - 다크 스킨 변수
  - *./src/themes/flat* - 플랫 스킨 변수

### 스킨 빌드를 위한 진입점

- theme.less
- package.json


## 커스텀 스킨 만들기

새 스킨을 만들려면 **sources/less/src/themes** 폴더의 기존 스킨 중 하나를 복사하고 이름을 바꿀 수 있습니다. 아래 단계를 따라주세요:

1) **sources/less/src/themes** 폴더의 기존 파일 중 하나를 복사하고 이름을 바꿉니다. 예를 들면:

~~~
-> copy:
codebase/sources/less/src/themes/material.less

-> rename to:
codebase/sources/less/src/themes/custom.less
~~~

2) 새 파일을 **sources/less/src/themes/index.less**에 가져와 다음과 같이 추가합니다:

~~~
@import "./custom";
~~~

그리고 아래 내용처럼 추가합니다:

~~~css
:root[data-gantt-theme='custom'] {
    --dhx-gantt-theme: custom;
    --dhx-gantt-font-family: Roboto, Helvetica, Arial, sans-serif;

    --dhx-gantt-base-colors-primary: #0288D1;

}
~~~

스킨 변수는 `:root` 요소 아래에서 정의되어야 하며, `data-gantt-there` 선택자를 사용합니다.

새로운 테마에는 이름이 있는 **--dhx-gantt-theme** 변수가 포함되어야 합니다.

3) 아래 명령을 실행하여 스킨을 재빌드합니다:

~~~
npm run build
~~~

:::note
Note that Gantt may apply some predefined settings to the calendar based on the applied skin.
When you create a new skin by copying an existing one, you may need to apply the corresponding settings to the Gantt manually.
:::

## JS 스타일링 설정

Gantt 스타일링의 모든 측면이 CSS에서 제어되는 것은 아니며, 일부 매개변수는 JavaScript 구성에서 정의됩니다. 예를 들어 다음 속성들:

- [link_line_width](api/config/link_line_width.md)
- [link_radius](api/config/link_radius.md)
- [link_arrow_size](api/config/link_arrow_size.md)
- [scale_height](api/config/scale_height.md)
- [row_height](api/config/row_height.md)