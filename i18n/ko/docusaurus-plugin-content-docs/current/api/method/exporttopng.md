---
sidebar_label: exportToPNG
title: exportToPNG method
description: "Gantt 차트를 PNG 이미지로 내보냅니다."
---

# exportToPNG

### Description

@short: Gantt 차트를 PNG 이미지로 내보냅니다.

@signature: exportToPNG: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - 선택 사항, 내보내기 옵션을 포함하는 객체 (아래 세부 정보 참조)

### Example

~~~jsx
gantt.exportToPNG();

//또는
gantt.exportToPNG({
  name: "mygantt.png"
});

//또는
gantt.exportToPNG({
    name:"mygantt.png",
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    locale:"en",
    start:"01-04-2013",
    end:"11-04-2013",
    skin:'terrace',
    data:{ },
    server:"https://myapp.com/myexport/gantt",
    raw:true,
    callback: function(res){
        alert(res.url);
    }
});
~~~

### Details

:::note
이 메서드는 **export** 확장의 일부이므로, [export_api](guides/extensions-list.md#exportservice) 플러그인이 활성화되어 있는지 확인하세요. 자세한 내용은 [Export to PDF and PNG](guides/export.md) 문서를 참고하시기 바랍니다. 
:::

:::note
Gantt 버전이 8.0 미만인 경우, 온라인 내보내기 서비스를 사용하려면 페이지에 **https://export.dhtmlx.com/gantt/api.js** 스크립트를 포함해야 합니다. 예:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

[exportToPNG](api/method/exporttopng.md) 메서드는 여러 선택적 속성을 포함하는 객체를 파라미터로 받습니다:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 내보낸 PNG 파일의 이름</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>skin</b></td>
  <td>(<i>'terrace', 'skyblue', 'meadow', 'broadway'</i>) 내보낸 Gantt 차트의 시각적 테마</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>locale</b></td>
  <td>(<i>string</i>) 내보낸 Gantt 차트의 언어 설정</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>start</b></td>
  <td>(<i>string</i>) 내보낸 차트에 표시할 데이터 범위의 시작 날짜. 날짜 형식은 [date_format](api/config/date_format.md) 설정을 따릅니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end</b></td>
  <td>(<i>string</i>) 내보낸 차트에 표시할 데이터 범위의 종료 날짜. 날짜 형식은 [date_format](api/config/date_format.md) 설정을 따릅니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>data</b></td>
  <td>(<i>object</i>) 내보내기에 사용할 커스텀 데이터 소스</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) 내보낸 PNG에 추가할 헤더 HTML 콘텐츠</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) 내보낸 PNG에 추가할 푸터 HTML 콘텐츠</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 내보내기 요청에 사용할 API 엔드포인트 URL. 로컬 내보내기 서비스를 사용하는 경우 유용합니다. 기본값은 <strong>https://export.dhtmlx.com/gantt</strong>입니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>raw</b></td>
  <td>(<i>boolean</i>) true로 설정하면 커스텀 요소를 포함하여 Gantt 마크업을 그대로 내보냅니다. 기본값은 <em>false</em>입니다. [자세한 내용](guides/export.md#exportingcustommarkupandstyles)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>callback</b></td>
  <td>(<i>function</i>) 생성된 PNG를 다운로드할 수 있는 URL이 포함된 JSON 객체를 받는 콜백 함수</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) 추가 설정, 포함 항목:
  <ul><li><b>width</b> - (<i>number|string</i>) 출력 페이지의 너비</li><li><b>height</b> - (<i>number|string</i>) 출력 페이지의 높이</li><b>width</b>와 <b>height</b>는 <b>slice_archive</b>가 설정된 경우 무시됩니다.<li><b>slice_archive</b> - (<i>boolean|object</i>) 큰 차트를 조각별로 내보내고 아카이브로 패키징하는 기능. 객체인 경우 <b>width</b>와 <b>height</b> 옵션을 받습니다. true로 설정하면 기본 조각 크기는 1000×1000입니다.</li><li><b>slice_check</b> - (<i>boolean</i>) 아카이브 내에 모든 조각이 올바르게 내보내졌는지 확인하는 HTML 페이지를 추가합니다.</li></ul></td>
  </tr>
  </tbody>
</table>

## 큰 Gantt 차트를 조각별로 내보내기

최대 내보내기 크기는 10000×10000 픽셀입니다.

**additional_settings**의 **width**와 **height** 속성으로 크기를 조절할 수 있지만, 너비와 높이의 곱이 100000000 (10000×10000)을 초과하면 내보낸 PNG가 잘립니다.

더 큰 차트를 처리하려면 **additional_settings**의 **slice_archive** 옵션을 사용하여 차트를 여러 조각으로 내보내고 아카이브로 묶을 수 있습니다:

~~~js
gantt.exportToPNG({
    server: "https://export.dhtmlx.com/beta/gantt",
    additional_settings:{
        //width: 2000,
        //height: 2000,
          slice_archive: {width: 2000, height: 2000},
          slice_check: true,
    }
});
~~~

**예제:** [PNG 이미지로 내보내기](https://snippet.dhtmlx.com/2mprehlx)

**slice_archive**를 객체로 설정하여 조각 크기를 지정할 수 있습니다:

~~~js
slice_archive: {width: 2000, height: 2000}
~~~

또는 단순히 true로 설정하여 기본 조각 크기 1000×1000을 사용할 수도 있습니다:

~~~js
slice_archive: true
~~~

## 시간 제한

:::note
note 내보내기 서비스는 처리 시간 제한이 있습니다. 
:::

내보내기가 20초 이상 걸리면 취소되며 다음 오류가 표시됩니다:

~~~html
Error: Timeout trigger 20 seconds
~~~

여러 사용자가 동시에 내보내기를 수행하면 처리 시간이 늘어날 수 있으나, 각 사용자의 내보내기 시간은 별도로 추적됩니다.

:::note
note 큰 차트를 내보낼 때는 [standalone export module](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) 사용을 고려하세요. 이 모듈은 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 라이선스에 무료로 포함되어 있거나, 별도로 [여기서](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210) 구매할 수 있습니다. 
:::

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Export to PDF and PNG](guides/export.md)

