---
title: "Node.js에서 데이터 내보내기 및 가져오기"
sidebar_label: "Node.js에서 데이터 내보내기 및 가져오기"
---

# Node.js에서 데이터 내보내기 및 가져오기

Node.js로 구축된 DHTMLX Gantt의 데이터 내보내기 및 가져오기가 가능합니다.

:::note
기능을 체험하려면 [demo](https://files.dhtmlx.com/30d/914357ff4315af5d6bfd79e2f4e3f8fb/gantt_node_export_demo.zip)을 다운로드하십시오. 데모를 실행하려면 [gantt-node](guides/using-gantt-on-server.md#terms-of-using) 패키지를 설치해야 합니다.
:::

프로젝트의 내보내기/가져오기를 구성하려면 [plugins](api/method/plugins.md) 메서드를 통해 <b>export_api</b> 플러그인을 활성화하세요:

~~~js
gantt.plugins({
    export_api: true
});
~~~

더 자세한 내용은 아래 정보를 참조하십시오.

## 데이터 내보내기

내보내기 기능은 웹 버전에서 작동하는 방식과 동일하게 작동해야 하며, 몇 가지 예외가 있습니다:

- Excel로 내보내려면 작업이 Gantt에 로드된 경우 타임라인이 페이지에 표시되어야 합니다. 타임라인의 DOM 요소는 Node.js에서 전혀 렌더링되지 않기 때문에, Gantt가 타임라인의 작업 위치와 관련된 내부 계산을 구현할 수 없어 Excel로의 내보내기가 자체적으로 작동하지 않습니다. 해결 방법으로, 로드된 작업을 내보내기 설정의 **data** 매개변수 값으로 지정해야 합니다:

~~~js
data: gantt.serialize().data
~~~

- 내보내기를 구성할 때 출력 파일의 엔드포인트를 정의하기 위해 **callback** 매개변수를 지정해야 하며, 그렇지 않으면 파일이 콘솔에 인쇄됩니다.

## 데이터 가져오기

가져오기 기능은 추가로 *formData* 구성 요소를 설치해야 합니다:

~~~js
npm install form-data
~~~

MSP 및 PrimaveraP6 파일에서의 가져오기는 웹 버전에서 작동하는 방식과 동일하게 작동해야 합니다.

Excel 파일을 가져올 때 파일의 데이터는 JSON 형식으로 Gantt에 반환됩니다. Excel의 열 이름은 임의일 수 있으므로 Excel 문서의 열을 DHTMLX Gantt의 작업 속성에 매핑해야 합니다. 이를 위해서는 자체 솔루션을 개발해야 합니다.