---
title: Angular Gantt 설치
sidebar_label: 설치
description: "Angular Gantt의 평가판이나 전문 버전을 설치하고 Angular 프로젝트에 가져오기를 연결하는 방법."
---

# Angular Gantt 설치

Angular Gantt는 두 가지 배포판으로 제공됩니다:

1. **평가 버전** 공개적으로 npm에서 제공되며, 평가 워터마크가 포함되고 기술 지원에 접근할 수 있는 무료 평가 기간과 함께 사용할 수 있습니다.
2. **전문(상용) 버전** 비공개 DHTMLX npm 저장소에서 이용 가능하며 프로덕션 용도로 의도되었습니다.

두 패키지는 동일한 API를 포함합니다.

## 평가 패키지 설치(공개 npm)

평가 빌드는 npm에서 [@dhtmlx/trial-angular-gantt](https://www.npmjs.com/package/@dhtmlx/trial-angular-gantt)로 이용 가능합니다:

- npm:

~~~bash
npm install @dhtmlx/trial-angular-gantt
~~~

- Yarn:

~~~bash
yarn add @dhtmlx/trial-angular-gantt
~~~

이 빌드는 완전한 기능을 제공하지만, 라이브러리가 평가 모드로 실행되고 있음을 알리는 메시지가 표시됩니다.

### 선택 사항: 전체 평가 기간 시작(권장)

평가 패키지는 제한 없이 설치되지만, 공식 평가를 웹사이트에서 시작할 수도 있습니다. 링크는 다음과 같습니다:
[https://dhtmlx.com/docs/products/dhtmlxGantt-for-Angular/download.shtml](https://dhtmlx.com/docs/products/dhtmlxGantt-for-Angular/download.shtml)

정식 평가를 시작하면 평가 기간 동안 무료 기술 지원을 받게 됩니다.

**오프라인 예제 다운로드(zip)**

평가 양식에는 오프라인으로 사용할 수 있는 예제가 들어 있는 ZIP 파일도 포함되어 있습니다.

또한 공식 GitHub에서 추가 예제 및 데모 프로젝트를 확인할 수 있습니다. [Angular Gantt Demos on GitHub](https://github.com/DHTMLX/?q=angular-gantt&type=all&language=&sort=)를 확인하세요.

## 전문 패키지 설치(Private npm)

전문 버전은 프로덕션 애플리케이션에 사용되며 상용 라이선스 및 기술 지원에 대한 전체 액세스를 포함합니다.

상용 라이선스를 얻으면 [Client's Area](https://dhtmlx.com/clients/)에서 개인 npm 자격 증명을 생성할 수 있습니다.

로그인/비밀번호를 생성한 후 npm 구성을 설정합니다:

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx --auth-type=legacy
~~~

그런 다음 Professional 패키지를 설치합니다:

- npm:

~~~bash
npm install @dhx/angular-gantt
~~~

- Yarn:

~~~bash
yarn add @dhx/angular-gantt
~~~

## Angular 프로젝트 요구사항

Wrapper 피어 의존성은 현재 다음을 필요로 합니다:

- `@angular/common >= 19.0.0`
- `@angular/core >= 19.0.0`
- `rxjs >= 6.0.0`

## Import Matrix

설치한 패키지 채널에 맞는 import를 사용하세요.

| 패키지 | Wrapper import | CSS import |
| --- | --- | --- |
| `@dhtmlx/trial-angular-gantt` | `import { DhxGanttComponent } from "@dhtmlx/trial-angular-gantt";` | `@import "@dhtmlx/trial-angular-gantt/dist/angular-gantt.css";` |
| `@dhx/angular-gantt` | `import { DhxGanttComponent } from "@dhx/angular-gantt";` | `@import "@dhx/angular-gantt/dist/angular-gantt.css";` |

전역 Angular 스타일에 CSS 임포트를 추가합니다(예: `src/styles.css`).

이는 Angular 앱의 기본 설정으로 권장됩니다. 왜냐하면 Gantt 스타일은 라이브러리 전체의 스타일이므로 Angular 컴포넌트 범위 지정이 필요하지 않기 때문입니다.

## Global vs Component CSS Import

- **전역 임포트:** 위의 매트릭스에서 래퍼 CSS 경로를 `src/styles.css`에 임포트하거나 `angular.json`의 `styles`에 등록합니다. 특별한 컴포넌트 캡슐화 설정이 필요하지 않습니다.
- **컴포넌트 스타일시트 임포트:** 같은 CSS를 컴포넌트의 `styleUrls`에 임포트할 수 있지만, 그 경우 Angular의 기본 `ViewEncapsulation.Emulated`가 선택자를 스코프화하여 Gantt 내부의 `.dhx-*` 스타일/오버라이드를 의도대로 적용되지 않게 할 수 있습니다.

다음과 같이 설정할 수 있습니다:

~~~ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  // ...
  encapsulation: ViewEncapsulation.None,
})
export class GanttPageComponent {}
~~~

컴포넌트 임포트 패턴은 주로 자체 포함된 데모/예제에 사용합니다. 프로덕션 앱의 경우 전역 임포트를 선호하십시오.

## Standalone vs NgModule 프로젝트

래퍼는 Angular의 두 가지 스타일을 모두 지원합니다:

- **Standalone 컴포넌트:** 컴포넌트의 `imports` 배열에 `DhxGanttComponent`를 임포트합니다.
- **NgModule 기반 앱:** Angular 모듈에서 `DhxGanttModule`을 임포트합니다.

Standalone 예제:

~~~ts
import { Component } from '@angular/core';
import { DhxGanttComponent } from '@dhtmlx/trial-angular-gantt';

@Component({
  standalone: true,
  imports: [DhxGanttComponent],
  template: `<dhx-gantt [tasks]="tasks" [links]="links"></dhx-gantt>`,
})
export class GanttPageComponent {
  tasks = [];
  links = [];
}
~~~

NgModule 예제:

~~~ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DhxGanttModule } from '@dhtmlx/trial-angular-gantt';

@NgModule({
  imports: [BrowserModule, DhxGanttModule],
})
export class AppModule {}
~~~

## 평가 패키지에서 상용 패키지로 이동

대부분의 프로젝트는 평가 패키지로 시작한 후, 프로토타입이 승인되고 상용 라이선스가 확보되면 이후에 전환합니다. 두 패키지는 동일한 API를 공유하므로 전환은 주로 기계적 작업입니다: 패키지 이름을 바꾸고 CSS 임포트를 바꾸고 재설치합니다.

비공개 레지스트리 설정을 위의 안내대로 구성한 후 코드의 모든 import를 업데이트합니다:

~~~ts
// before
import { DhxGanttComponent } from "@dhtmlx/trial-angular-gantt";

// after
import { DhxGanttComponent } from "@dhx/angular-gantt";
~~~

그리고 `src/styles.css`의 CSS 임포트를 업데이트합니다:

~~~css
/* before */
@import "@dhtmlx/trial-angular-gantt/dist/angular-gantt.css";

/* after */
@import "@dhx/angular-gantt/dist/angular-gantt.css";
~~~

프로젝트에서 남아 있는 `@dhtmlx/trial-angular-gantt`의 모든 언급( CSS 임포트 경로 포함)을 검색하세요. 그 중 CSS 경로가 가장 잊기 쉽습니다. 의존성을 `package.json`에서 교체한 다음 `npm install`을 실행하고 앱을 실행합니다. 워터마크가 사라지고 UI의 나머지 부분이 동일하게 동작하면 교환이 완료된 것입니다.

### CI나 공유 빌드 환경에서 레지스트리 사용

`npm login`은 개발자 머신에서 잘 작동하지만, CI 러너 및 기타 공유 빌드 환경에서는 대화식 로그인 실행이 보통 불가능합니다. 이를 위해 로그인된 머신에서 비대화형 액세스 토큰을 생성하세요:

~~~bash
npm token create --registry=https://npm.dhtmlx.com
~~~

토큰은 터미널 출력에 한 번만 표시됩니다. 세션을 닫기 전에 복사해 두십시오. 이후에는 토큰을 다시 가져올 수 없으니 빌드가 읽을 수 있는 `.npmrc` 파일에 노출하십시오:

~~~ini
@dhx:registry=https://npm.dhtmlx.com
//npm.dhtmlx.com/:_authToken=${DHTMLX_NPM_TOKEN}
~~~

CI 공급자(GitHub Actions, GitLab 등)에서 토큰이 절대 커밋되지 않도록 `DHTMLX_NPM_TOKEN`을 시크릿으로 설정하십시오. Docker 빌드에도 동일한 패턴이 작동합니다. 이미지를 빌드 시 토큰을 주입하고 이미지에 포함하지 않도록 하십시오.

CI에서 `npm install`이 `npm.dhtmlx.com`에 대해 401이나 403로 실패하는 경우, 시크릿이 없거나 만료되었거나 `.npmrc` 파일이 npm이 기대하는 위치에 없기 때문일 수 있습니다(프로젝트 루트가 가장 안전한 위치입니다).

## 다음 읽을 내용

- [Angular Gantt 빠른 시작](integrations/angular/quick-start.md)
- [Angular Gantt 개요](integrations/angular/overview.md)
- [구성 참조](integrations/angular/configuration-props.md)