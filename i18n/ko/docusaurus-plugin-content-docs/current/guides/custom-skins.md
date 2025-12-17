---
title: "스킨 커스터마이제이션"
sidebar_label: "스킨 커스터마이제이션"
---

스킨 커스터마이제이션
========================

버전 9.0부터 Gantt 스킨은 CSS 변수(CSS variables)를 사용하여, 컴포넌트를 손쉽게 커스터마이즈하고 스타일을 지정할 수 있습니다.


[Change skin dynamically](https://docs.dhtmlx.com/gantt/samples/06_skins/06_dynamic_skin.html)


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

이 모든 변수들은 패키지 내 **codebase/sources/less/src/themes/variables.less** 파일에 위치합니다.

스킨을 커스터마이즈하는 방법
-----------------

Gantt의 외관을 변경하는 가장 간단한 방법은 스타일시트에서 CSS 변수를 오버라이드(재정의)하는 것입니다. 예시:

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


[Change skin dynamically](https://docs.dhtmlx.com/gantt/samples/06_skins/06_dynamic_skin.html)


이와 같이 변수를 설정하면, 기본 스타일이 사용자 정의 스타일로 대체되어 Gantt가 원하는 외관을 사용하게 됩니다.

:::note
전체 테마에서 값 상속이 제대로 이루어지려면 :root 요소에 변수를 정의하세요.
:::

**:root** 레벨에서 스타일을 정의하면 컴포넌트 전체에 걸쳐 올바르게 상속됩니다. 이렇게 하면 다른 변수에 의존하는 변수를 변경할 경우, 관련된 모든 스타일이 함께 업데이트됩니다.

예를 들어, 변수 `--dhx-gantt-scale-color`는 메인 텍스트 색상 변수인 `--dhx-gantt-container-color`에서 상속받습니다.

- **:root** 레벨에서 `--dhx-gantt-container-color`를 재정의하면, `--dhx-gantt-scale-color`도 이 변경을 반영합니다.

~~~html
<style>
:root {
    /* --dhx-gantt-scale-color 및
  --dhx-gantt-container-color를 상속받는 다른 변수들이 영향을 받음 */
  --dhx-gantt-container-color: #222;

}
</style>
~~~

- 하지만 **.gantt_container**와 같이 DOM 내부에서 `--dhx-gantt-container-color`를 재정의하면, `--dhx-gantt-scale-color`에는 영향을 주지 않습니다.

~~~html
<style>
.gantt_container {
    /* --dhx-gantt-container-color를 직접 사용하는 요소만 영향을 받음 */
  --dhx-gantt-container-color: #222;
}
</style>
~~~

소스 코드 활용 방법
------------

dhtmlxGantt는 다양한 형식의 스타일 파일을 포함하고 있습니다:

- **codebase/dhtmlxgantt.css** - 프로덕션용으로 준비된 압축된 CSS 파일(스킨 포함)
- **codebase/sources/dhtmlxgantt.css** - 사람이 읽기 쉬운 prebuilt CSS 파일
- **codebase/sources/less/** - Gantt 스킨의 원본 less 파일

less 파일은 기존 스킨을 깊이 커스터마이즈하거나 처음부터 새로운 스킨을 만들고자 할 때 유용합니다.

시작 방법
------------

**codebase/sources/less** 폴더는 NPM 패키지처럼 사용할 수 있습니다. 이 폴더는 두 종류의 파일로 구성되어 있습니다:

- 스타일 시트 파일;
- Gantt 뷰를 세밀하게 조정하거나 새로운 스킨을 만들 때 사용하는 마이크로 변수 선언 파일.

스킨 빌드 방법
--------------------

**codebase/sources/less/** 폴더 내에서 다음 명령어를 실행하세요:

~~~
> npm install
~~~

설치가 완료되면, 다음 명령어로 CSS 파일을 다시 빌드할 수 있습니다:

~~~
> npm run build
~~~

또는, 변경 사항을 감지하여 자동으로 빌드하려면:

~~~
> npm run watch
~~~

이 스크립트들은 소스에서 CSS 파일을 컴파일하여 Gantt 패키지의 *codebase* 폴더에 저장하며, 기존 파일을 덮어씁니다.

구조
------------

버전 9.0의 **less** 폴더 구조는 다음과 같습니다(향후 버전에서 변경될 수 있음):

### 이미지

- **./src/imgs** - 모든 스킨에서 사용하는 svg 아이콘
- **./src/iconfont** - 웹폰트로 미리 빌드된 아이콘

### 스킨 정의

기본 변수는 `terrace` 스킨에서 정의되며, 다른 스킨들은 이 변수를 오버라이드하고 스타일을 추가합니다.

- **./src/themes**
  - *./src/themes/variables.less* - 모든 스킨(terrace 포함)에서 공유하는 공통 변수
  - *./src/themes/contrast_black* - contrast black 스킨 변수
  - *./src/themes/contrast_white* - contrast white 스킨 변수
  - *./src/themes/material* - material 스킨 변수
  - *./src/themes/dark* - dark 스킨 변수
  - *./src/themes/flat* - flat 스킨 변수

### 스킨 빌드 진입점

- theme.less
- package.json

커스텀 스킨 만들기
-------------------

새로운 스킨을 만들려면 **sources/less/src/themes**에서 기존 스킨 파일을 복사하여 이름을 변경하세요. 단계는 다음과 같습니다:

1) 기존 파일을 복사 및 이름 변경 예시:

~~~
-> copy:
codebase/sources/less/src/themes/material.less

-> rename to:
codebase/sources/less/src/themes/custom.less
~~~

2) **sources/less/src/themes/index.less** 파일에서 새 파일을 다음과 같이 import 하세요:

~~~
@import "./custom";
~~~

그리고 다음과 같은 내용을 추가합니다:

~~~css
:root[data-gantt-theme='custom'] {
    --dhx-gantt-theme: custom;
    --dhx-gantt-font-family: Roboto, Helvetica, Arial, sans-serif;

    --dhx-gantt-base-colors-primary: #0288D1;

}
~~~

스킨 변수는 반드시 `:root`에 `data-gantt-theme` 속성 선택자와 함께 정의해야 합니다.

모든 새로운 테마에는 반드시 **--dhx-gantt-theme** 변수가 테마 이름과 함께 포함되어야 합니다.

3) 다음 명령어로 스킨을 다시 빌드하세요:

~~~
npm run build
~~~




:::note
Gantt는 사용 중인 스킨에 따라 캘린더에 일부 프리셋 구성을 적용할 수 있습니다. 기존 스킨을 복사해 새 스킨을 만들 경우, 해당 설정을 Gantt에서 수동으로 조정해야 할 수 있습니다.
:::

JS 스타일링 설정
---------------------

Gantt의 일부 스타일은 CSS가 아니라 JavaScript 설정을 통해 제어됩니다. 예시는 다음과 같습니다:

- [link_line_width](api/config/link_line_width.md)
- [link_radius](api/config/link_radius.md)
- [link_arrow_size](api/config/link_arrow_size.md)
- [scale_height](api/config/scale_height.md)
- [row_height](api/config/row_height.md)

