---
title: "iCal로 내보내기"
sidebar_label: "iCal"
---

# iCal로 내보내기

dhtmlxGantt 라이브러리는 Gantt 차트의 데이터를 iCal 형식으로 내보내는 기능을 제공합니다. 내보내기는 내보내기 서비스를 통해 이루어지며, 온라인 내보내기 서비스 또는 PDF/PNG/Excel [내보내기 모듈](guides/export-modules.md)을 사용할 수 있습니다.

Gantt 차트의 데이터를 iCal 문자열로 내보내려면 아래와 같이 수행합니다:

- 온라인 내보내기 서비스를 사용하려면 [plugins](api/method/plugins.md) 메서드를 통해 <b>export_api</b> 플러그인을 활성화합니다:

~~~js
gantt.plugins({
    export_api: true
});
~~~

- Gantt 차트의 데이터를 iCal로 내보내려면 [exportToICal](api/method/exporttoical.md) 메서드를 호출합니다: 

~~~html
<input value="Export to iCal" type="button" onclick='gantt.exportToICal()'>

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


**관련 샘플**: [Export data: MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


**관련 샘플**: [Export data: store online](https://docs.dhtmlx.com/gantt/samples/08_api/09_export_store.html)


## Parameters of the export method

[exportToICal()](api/method/exporttoical.md) 메서드는 선택적으로 아래 속성을 가진 객체를 매개변수로 받습니다:

- **server** - (*string*) 요청의 API 엔드포인트를 설정합니다. 로컬 설치의 내보내기 서비스와 함께 사용할 수 있습니다. 기본값은 `https://export.dhtmlx.com/gantt`;
- **name** - (*string*) 파일의 사용자 정의 이름과 확장자를 지정할 수 있지만, 파일은 여전히 iCal 형식으로 내보내집니다.
  
~~~jsx title="선택적 속성으로 exportToICal 메서드 호출"
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});
~~~
