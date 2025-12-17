---
title: "Node.js에서 데이터 내보내기 및 가져오기"
sidebar_label: "Node.js에서 데이터 내보내기 및 가져오기"
---

Node.js에서 데이터 내보내기 및 가져오기
=============================

Node.js를 사용할 때 DHTMLX Gantt에서 데이터를 내보내고 가져올 수 있습니다.

:::note
이 기능을 살펴보려면 [demo](https://files.dhtmlx.com/30d/914357ff4315af5d6bfd79e2f4e3f8fb/gantt_node_export_demo.zip)를 다운로드할 수 있습니다. 데모를 실행하려면 [gantt-node](guides/using-gantt-on-server.md#termsofusing) 패키지를 설치해야 합니다.
:::

프로젝트에서 내보내기/가져오기를 설정하려면, [plugins](api/method/plugins.md) 가이드에 설명된 대로 <b>export_api</b> 플러그인을 활성화하세요:

~~~js
gantt.plugins({
      export_api: true
});
~~~
자세한 내용은 아래를 참고하세요.

데이터 내보내기
----------------

내보내기는 웹 버전과 유사하게 동작하지만 몇 가지 차이점이 있습니다:

- Excel로 내보내려면, gantt에 작업이 로드된 경우 타임라인이 페이지에 표시되어야 합니다. Node.js에서는 타임라인의 DOM 요소가 렌더링되지 않으므로, 기본적으로 Excel 내보내기가 제대로 동작하지 않습니다. gantt가 타임라인에서 작업 위치 계산을 내부적으로 수행할 수 없기 때문입니다. 이를 해결하려면, 내보내기 설정에서 **data** 파라미터로 로드된 작업을 전달해야 합니다:

~~~js
data: gantt.serialize().data
~~~

- 내보내기 설정 시, 출력 파일을 어디로 보낼지 정의하는 **callback** 파라미터를 반드시 지정해야 합니다. 이를 지정하지 않으면 파일이 콘솔로 출력됩니다.

데이터 가져오기
----------------

가져오기를 위해서는 *formData* 패키지를 설치해야 합니다:

~~~js
npm install form-data
~~~



MSP 및 PrimaveraP6 파일에서 가져오는 방식은 웹 버전과 동일하게 동작합니다.

Excel 파일을 가져올 때, 데이터는 Gantt로 JSON 형식으로 반환됩니다. Excel 열 이름은 임의로 지정될 수 있으므로, Excel 열을 DHTMLX Gantt의 작업 속성에 매핑하는 작업을 직접 구현해야 합니다.

