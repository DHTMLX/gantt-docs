---
title: "구독 만료 후 패키지 사용하기"
sidebar_label: "구독 만료 후"
description: "구독이 종료된 후에도 유료 DHTMLX @dhx Gantt npm 패키지를 백업하고 계속 사용하는 방법."
---

# 구독 만료 후 패키지 사용하기

유료 Gantt 패키지들 - 상용 JavaScript 라이브러리 (`@dhx/gantt`) 및 프레임워크 래퍼들 (`@dhx/react-gantt`, `@dhx/angular-gantt`, `@dhx/vue-gantt`) - 은 `https://npm.dhtmlx.com`의 비공개 레지스트리에 호스팅됩니다. 해당 레지스트리에 대한 접근은 구독과 연결되어 있으며, 구독이 만료되면 npm에서 이 패키지들을 더 이상 설치하거나 재설치할 수 없습니다.

라이선스 하에 귀하가 받을 수 있는 버전은 계속 사용할 수 있습니다. 구독이 끝난 후에도 설치를 계속하려면 구독이 만료되기 **전에** 로컬 백업을 만들어 두십시오.

:::tip
구독이 아직 활성 상태일 때 이 작업을 수행하십시오 - `npm.dhtmlx.com`에 대한 접근이 사라지면 더 이상 패키지를 내려받을 수 없습니다.
::: 

:::note
이 내용은 유료 `@dhx` 패키지에만 해당됩니다. 공개 저장소의 `dhtmlx-gantt`(Community) 및 `@dhtmlx/trial-*`(평가판) 패키지는 공개 npm 레지스트리에 있으며 영향받지 않습니다.
:::

## 패키지 백업하기

### 1. 패키지를 임시 프로젝트에 설치

~~~bash
mkdir dhtmlx-backup
cd dhtmlx-backup
npm init -y
npm install <your-dhtmlx-packages>   # 예: npm install @dhx/gantt @dhx/react-gantt
~~~

### 2. 각 라이브러리 패키징하기

설치된 라이브러리는 `node_modules/@dhx`에 있습니다. 보관하고 싶은 각 패키지에 대해 `npm pack`을 실행합니다:

~~~bash
cd node_modules/@dhx/<package-name>
npm pack
~~~

이 명령은 현재 디렉터리에 `.tgz` 파일(예: `dhx-gantt-9.0.10.tgz`)을 생성합니다. 생성된 `.tgz` 파일을 프로젝트의 안전한 위치에 복사합니다. 예를 들어 프로젝트의 `./lib/` 폴더에 보관합니다.

## 백업한 패키지 사용하기

레지스트리 대신 로컬의 `.tgz` 파일을 프로젝트의 `package.json`에서 참조하도록 변경합니다:

~~~json
"dependencies": {
  "@dhx/gantt": "file:./lib/dhx-gantt-9.0.10.tgz"
}
~~~

그런 다음 평소대로 `npm install`을 실행합니다. npm이 로컬 파일에서 의존성을 해결하므로 레지스트리에 접근할 필요가 없습니다.

## 나만의 비공개 레지스트리에 게시하기

직접 관리하는 npm 레지스트리가 있다면 로컬 파일을 참조하는 대신 백업한 패키지를 거기에 재게시할 수 있습니다. 패키지를 새로운 폴더로 추출합니다(또는 `node_modules/@dhx/<package-name>`에서 복사). 그 패키지의 `package.json`을 열고 `publishConfig`를 레지스트리로 지정합니다:

~~~json
"publishConfig": {
  "registry": "https://your.registry.example.com"
}
~~~

그다음 게시합니다:

~~~bash
npm publish
~~~

## 백업 창을 놓친 경우

구독이 만료되기 전에 백업을 완료하지 못했다면, [info@dhtmlx.com](mailto:info@dhtmlx.com)으로 이메일을 보내주시면 귀하가 받을 수 있는 최신 버전을 보내드립니다.