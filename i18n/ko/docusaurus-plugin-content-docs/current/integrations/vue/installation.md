--- 
title: Vue Gantt 설치
sidebar_label: 설치
description: "npm 또는 yarn을 통해 Vue Gantt의 평가판 또는 전문 버전을 설치하는 방법."
---

# Vue Gantt 설치

Vue Gantt는 두 가지 배포판으로 제공됩니다:

1. **평가 버전**은 npm에서 공개되며, 트라이얼 워터마크가 포함되어 있고 기술 지원에 접근할 수 있는 무료 평가 기간과 함께 사용할 수 있습니다.
2. **전문(상용) 버전**은 비공개 DHTMLX npm 저장소에서 제공되며 프로덕션 사용을 위한 용도입니다.

두 패키지는 동일한 API를 포함합니다.

## 사전 준비

- Vue 3 프로젝트(또는 Vue 3를 추가할 계획이 있는 프로젝트)
- Node.js 설치
- npm 또는 Yarn 사용 가능
- DHTMLX 비공개 npm 접근(전문 패키지에 한함)

## 평가 패키지 설치(공개 npm)

평가 빌드는 npm에서 [@dhtmlx/trial-vue-gantt](https://www.npmjs.com/package/@dhtmlx/trial-vue-gantt)로 이용 가능합니다:

- npm:

~~~bash
npm install @dhtmlx/trial-vue-gantt
~~~

- Yarn:

~~~bash
yarn add @dhtmlx/trial-vue-gantt
~~~

이 빌드는 완전하게 작동하지만 라이브러리가 평가 모드로 실행 중임을 나타내는 메시지가 표시됩니다.

### 선택 사항: 전체 평가 기간 시작(권장)

비Restrictions 없이 설치되지만, 공식 평가를 웹사이트에서 시작할 수도 있습니다
[https://dhtmlx.com/docs/products/dhtmlxGantt-for-Vuejs/download.shtml](https://dhtmlx.com/docs/products/dhtmlxGantt-for-Vuejs/download.shtml).

공식 평가를 시작하면 평가 기간 동안 무료 기술 지원을 받게 됩니다.

**오프라인 예제(zip) 다운로드**

평가 양식에는 오프라인에 사용할 수 있는 예제가 포함된 ZIP 파일도 함께 제공됩니다.

추가 예제와 데모 프로젝트는 공식 GitHub의 [Vue Gantt Demos on GitHub](https://github.com/DHTMLX/?q=vue-gantt&type=all&language=&sort=)에서 확인해 볼 수 있습니다.

## 전문 패키지 설치(Private npm)

전문 버전은 프로덕션 애플리케이션에 사용되며 상용 라이선스와 기술 지원에 대한 전액 접근을 포함합니다.

상용 라이선스를 얻으면 [Client's Area](https://dhtmlx.com/clients/)에서 개인 npm 자격 증명을 생성할 수 있습니다.

로그인/비밀번호를 생성한 후, npm을 구성합니다:

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx --auth-type=legacy
~~~

그런 다음 전문 패키지를 설치합니다:

- npm:

~~~bash
npm install @dhx/vue-gantt
~~~

- Yarn:

~~~bash
yarn add @dhx/vue-gantt
~~~

## 일치하는 Import 사용하기

설치한 패키지와 일치하는 import를 사용하세요.

| 패키지 | 컴포넌트 임포트 | CSS 임포트 |
| --- | --- | --- |
| `@dhtmlx/trial-vue-gantt` | `import VueGantt from "@dhtmlx/trial-vue-gantt";` | `import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";` |
| `@dhx/vue-gantt` | `import VueGantt from "@dhx/vue-gantt";` | `import "@dhx/vue-gantt/dist/vue-gantt.css";` |

## 버전 요구사항 확인

래퍼 피어 의존성:

- `vue >= 3.2.25`

## 평가 패키지에서 상용 패키지로 이동

대부분의 프로젝트는 평가 패키지로 시작해서 나중에 전환합니다. 두 패키지는 동일한 API를 공유하므로 이동은 주로 기계적입니다: 패키지 이름을 바꾸고, CSS 임포트를 바꾸고, 다시 설치합니다.

위에 제시된 비공개 레지스트리를 구성한 후 코드의 모든 import를 업데이트하십시오:

~~~ts
// before
import VueGantt from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

// after
import VueGantt from "@dhx/vue-gantt";
import "@dhx/vue-gantt/dist/vue-gantt.css";
~~~

프로젝트에서 남아 있는 `@dhtmlx/trial-vue-gantt`의 모든 언급( CSS 임포트 경로 포함)을 검색하십시오 - 가장 잊기 쉬운 항목입니다. `package.json`의 의존성을 교체한 후 `npm install`을 실행하고 앱을 실행하십시오. 워터마크가 사라지고 UI의 나머지 부분이 동일하게 동작하면 교체가 완료된 것입니다.

### CI나 공유 빌드 환경에서 레지스트리 사용

`npm login`은 개발자 머신에서 잘 작동하지만 CI 러너 및 기타 공유 빌드 환경에서는 일반적으로 대화형 로그인을 실행할 수 없습니다. 이러한 경우에는 로그인된 머신에서 비대화식 액세스 토큰을 생성합니다:

~~~bash
npm token create --registry=https://npm.dhtmlx.com
~~~

토큰은 터미널 출력에 한 번만 표시되므로 세션을 종료하기 전에 복사해 두십시오. 이후 빌드가 읽을 수 있도록 `.npmrc` 파일에 토큰을 노출시키십시오:

~~~ini
@dhx:registry=https://npm.dhtmlx.com
//npm.dhtmlx.com/:_authToken=${DHTMLX_NPM_TOKEN}
~~~

CI 제공자(GitHub Actions, GitLab 등)에서 토큰이 커밋되지 않도록 `DHTMLX_NPM_TOKEN`을 시크릿으로 설정하십시오. 도커 빌드에도 동일한 패턴이 작동합니다 - 이미지를 빌드하는 시점에 토큰을 주입하고 이미지를 빌드에 포함시키지 마십시오.

만약 `npm install`이 CI에서 `npm.dhtmlx.com`에 대해 401 또는 403를 발생시키면 시크릿이 누락되었거나 만료되었거나 `.npmrc` 파일이 npm이 기대하는 위치에 없기 때문일 수 있습니다(프로젝트 루트가 가장 안전한 위치입니다).

## 다음 읽을 거리

- [Vue Gantt 빠른 시작](integrations/vue/quick-start.md)
- [Vue Gantt 개요](integrations/vue/overview.md)
- [구성 참조](integrations/vue/configuration-props.md)