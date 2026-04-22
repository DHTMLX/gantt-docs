--- 
title: React Gantt 설치
sidebar_label: 설치
description: "npm을 통해 평가판 또는 상용 버전의 React Gantt를 설치하는 방법."
---

# React Gantt 설치

React Gantt는 두 가지 배포판으로 제공됩니다: 

1. **평가 버전**은 npm에서 공개적으로 제공되며, 체험 워터마크가 포함되고, 기술 지원에 접근할 수 있는 무료 평가 기간과 함께 사용할 수 있습니다.
2. **전문(상용) 버전**은 비공개 DHTMLX npm 저장소에서 이용 가능하며, 프로덕션 용도로 설계되었습니다.

두 패키지 모두 동일한 API를 포함합니다.

## 평가 버전 설치(공개 npm)

평가 빌드는 [@dhtmlx/trial-react-gantt](https://www.npmjs.com/package/@dhtmlx/trial-react-gantt)로 npm에서 이용 가능합니다:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

또는 Yarn으로:

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

이 빌드는 완전히 작동하지만, 라이브러리가 평가 모드로 실행 중임을 나타내는 메시지가 표시됩니다.

### 선택 사항: 전체 평가 기간 시작(권장)

체험 패키지는 제한 없이 설치되지만, 공식 평가를 웹사이트에서도 시작할 수 있습니다
[https://dhtmlx.com/docs/products/dhtmlxGantt-for-React/download.shtml](https://dhtmlx.com/docs/products/dhtmlxGantt-for-React/download.shtml).

정식 평가를 시작하면 체험 기간 동안 무료 기술 지원을 받을 수 있습니다.

**오프라인 예제(zip) 다운로드**

평가 양식에는 오프라인에서 사용할 수 있는 예제가 포함된 ZIP 파일도 함께 제공됩니다.

또한 공식 GitHub에서 추가 예제와 데모 프로젝트를 확인할 수 있습니다: [GitHub의 React Gantt 데모](https://github.com/DHTMLX/?q=react-gantt&type=all&language=&sort=).

## Professional Version (private npm)

전문 버전은 프로덕션 애플리케이션에 사용되며, 상용 라이선스 및 전체 기술 지원 이용 권한을 포함합니다.

상용 라이선스를 얻으면 [고객 영역](https://dhtmlx.com/clients/)에서 private npm 자격 증명을 생성할 수 있습니다.

로그인/암호를 생성한 후, npm을 구성합니다:

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

## 다음 단계

설치 후 계속 아래와 같이 진행합니다:

- [](integrations/react/quick-start.md)
- [](integrations/react/overview.md)
- [](integrations/react/state/state-management-basics.md)
- [프레임워크 가이드](/category/framework-integrations/)