---
title: React Gantt 설치
sidebar_label: 설치
description: "npm를 통해 React Gantt의 평가 버전 또는 상용 버전을 설치하는 방법."
---

# React Gantt 설치

React Gantt는 두 가지 배포판으로 제공됩니다:

1. **평가 버전**은 공개 npm에 공개되어 있으며, 평가 워터마크가 포함되며 기술 지원에 접근할 수 있는 무료 평가 기간과 함께 사용할 수 있습니다.
2. **전문 버전(상용 버전)**은 비공개 DHTMLX npm 저장소에서 제공되며 프로덕션 사용을 위한 것입니다.

두 패키지는 동일한 API를 포함합니다.

## 공개 npm에서 평가 버전 설치(평가판)

평가 빌드는 npm에서 [@dhtmlx/trial-react-gantt](https://www.npmjs.com/package/@dhtmlx/trial-react-gantt)로 사용 가능합니다:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

또는 Yarn으로:

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

이 빌드는 완전하게 작동하지만 라이브러리가 평가 모드로 실행 중임을 알리는 메시지가 표시됩니다.

### 선택 사항: 전체 평가 기간 시작(권장)

트라이얼 패키지는 제한 없이 설치되지만, 아래 웹사이트에서 공식 평가를 시작할 수도 있습니다
[https://dhtmlx.com/docs/products/dhtmlxGantt-for-React/download.shtml](https://dhtmlx.com/docs/products/dhtmlxGantt-for-React/download.shtml).

공식 평가를 시작하면 평가 기간 동안 무료 기술 지원을 받을 수 있습니다.

**오프라인 예제(zip) 다운로드**

평가 양식에는 오프라인에서 사용할 예제가 포함된 ZIP 파일도 함께 제공됩니다.

또한 공식 GitHub에서 추가 예제 및 데모 프로젝트를 확인할 수 있습니다. [React Gantt Demos on GitHub](https://github.com/DHTMLX/?q=react-gantt&type=all&language=&sort=).

## 전문 버전(비공개 npm)

전문 버전은 프로덕션 애플리케이션에 사용되며 상용 라이선스와 전체 기술 지원에 대한 접근 권한을 제공합니다.

상용 라이선스를 얻으면 [클라이언트 영역](https://dhtmlx.com/clients/)에서 개인 npm 자격 증명을 생성할 수 있습니다.

로그인/비밀번호를 생성한 후, npm 구성을 설정합니다:

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx
~~~

그런 다음 Professional 패키지를 설치합니다:

~~~bash
npm install @dhx/react-gantt
~~~

또는 Yarn으로:

~~~bash
yarn add @dhx/react-gantt
~~~

## 평가 패키지에서 상용 패키지로의 전환 {#moving-from-the-trial-package-to-the-commercial-one}

대부분의 프로젝트는 트라이얼 패키지에서 시작하여 프로토타입이 승인되고 상용 라이선스가 준비되면 나중에 전환합니다. 두 패키지는 동일한 API를 공유하므로 전환은 대개 기계적입니다: 패키지 이름을 바꾸고 CSS import를 바꾼 다음 재설치를 수행합니다.

위에 표시된 대로 프라이빗 레지스트리를 구성한 후에는 코드의 모든 import를 업데이트합니다:

~~~ts
// before
import Gantt from "@dhtmlx/trial-react-gantt";
import "@dhtmlx/trial-react-gantt/dist/react-gantt.css";

// after
import Gantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";
~~~

프로젝트에서 남아 있는 `@dhtmlx/trial-react-gantt`의 언급을 모두 검색하고, CSS import 경로까지 확인합니다. 이 종속성을 `package.json`에서 교체한 후 `npm install`을 실행하고 앱을 실행합니다. 워터마크가 없어지고 UI의 나머지 부분이 동일하게 작동하면 교환이 완료된 것입니다.

### CI 또는 공유 빌드 환경에서 레지스트리 사용

개발자 머신에서 `npm login`은 문제가 없지만 CI 러너나 기타 공유 빌드 환경은 대화형 로그인을 일반적으로 사용할 수 없습니다. 이를 위해 로그인 상태의 머신에서 대화형이 아닌 접근 토큰을 생성합니다:

~~~bash
npm token create --registry=https://npm.dhtmlx.com
~~~

토큰은 터미널 출력에 한 번만 표시되므로 세션을 종료하기 전에 복사해 두세요. 그런 다음 빌드가 읽을 수 있도록 `.npmrc` 파일에 토큰을 노출시킵니다:

~~~ini
@dhx:registry=https://npm.dhtmlx.com
//npm.dhtmlx.com/:_authToken=${DHTMLX_NPM_TOKEN}
~~~

CI 공급자(GitHub Actions, GitLab 등)에서 토큰이 커밋되지 않도록 `DHTMLX_NPM_TOKEN`을 비밀로 설정합니다. 이 패턴은 Docker 빌드에서도 작동합니다 - 이미지를 빌드 시간에 토큰을 주입하고 이미지에 포함하지 마세요.

CI에서 `npm install`이 `npm.dhtmlx.com`에 대해 401 또는 403로 실패하는 경우 비밀이 누락되었거나 만료되었거나 `.npmrc` 파일이 npm이 기대하는 위치에 없기 때문입니다(프로젝트 루트가 가장 안전한 위치입니다).

### AI 앱 빌더(Lovable 등) 관련

Lovable과 같은 AI 앱 빌더는 자체 빌드 환경을 실행하며, `@dhx/react-gantt`로 전환하면 그들이 실행하는 모든 `npm install`은 `https://npm.dhtmlx.com`에 대해 인증이 필요합니다.

패키지 교환 이후 두 가지 경로가 합리적입니다:

- **Lovable에서 계속 빌드하기.** Lovable의 빌드 환경에 DHTMLX 레지스트리 자격 증명을 연결합니다. 보통 설치 시간에 같은 `${DHTMLX_NPM_TOKEN}` 패턴을 사용해 `.npmrc`에 기록되는 비밀로 처리합니다. 빌드 비밀 저장에 대한 정확한 메커니즘은 Lovable 플랫폼에 의존하며 시간이 지나 변경될 수 있습니다 – 이를 설정할 때 현재 Lovable 문서를 확인하십시오.
- **빌드를 자체 CI로 옮기기.** 많은 팀이 Lovable을 프로토타이핑에 사용하고 Vercel, Netlify, GitHub Actions 등에서 프로덕션 빌드를 실행합니다. 이들 플랫폼은 비밀로 npm 토큰을 첨부하는 것을 지원합니다. 그런 설정에서 트라이얼-투-커머셜 전환은 배포 파이프라인을 구성하는 과정에서 일반적으로 이루어지며 Lovable은 더 이상 설치를 수행하지 않으므로 자격 증명이 필요하지 않습니다.

Lovable 빌드가 `npm.dhtmlx.com`에 대해 40x로 실패하고 비밀을 깔끔하게 확보하지 못하면 CI로의 전환이 신뢰할 수 있는 대안이 됩니다.

## Next Steps(다음 단계)

설치 후 다음으로 계속 진행합니다:

- [](integrations/react/quick-start.md)
- [](integrations/react/overview.md)
- [](integrations/react/state/state-management-basics.md)
- [프레임워크 가이드](/category/framework-integrations/)