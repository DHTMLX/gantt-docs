---
sidebar_label: exportToPNG
title: exportToPNG 메서드
description: "PNG 형식으로 간트 차트를 내보냅니다"
---

# exportToPNG

### Description

@short: PNG 형식으로 간트 차트를 내보냅니다

@signature: exportToPNG: (_export_?: any) => void

### Parameters

- `export` - object - optional, an object with export settings (see the details)

- `export` - 객체 - 선택적, 내보내기 설정이 담긴 객체(세부 내용 참조)

### Example

~~~jsx
gantt.exportToPNG();

//또는
gantt.exportToPNG({
  name: "mygantt.png"
});

//또는
gantt.exportToPNG({
    name: "mygantt.png",
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>",
    locale: "en",
    start: "01-04-2026",
    end: "11-04-2026",
    skin: "terrace",
    data: { },
    server: "https://myapp.com/myexport/gantt",
    raw: true,
    callback: (res) => {
        alert(res.url);
    }
});
~~~

### Details

:::note
이 메서드는 export 확장에 정의되어 있으므로 export_api 플러그인을 활성화해야 합니다. 자세한 내용은 [](guides/export.md) 문서를 참조하십시오.
:::

:::note
Gantt 버전이 8.0 미만인 경우 온라인 내보내기 서비스를 활성화하려면 페이지에 `https://export.dhtmlx.com/gantt/api.js`를 포함해야 합니다. 예:

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
			<td>(<i>string</i>) 출력 파일의 이름</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>skin</b></td>
			<td>(<i>'terrace', 'skyblue', 'meadow', 'broadway'</i>) 출력 Gantt 차트의 스킨</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>locale</b></td>
			<td>(<i>string</i>) 출력 Gantt 차트에서 사용할 언어를 설정합니다</td>
		</tr> 
  <tr>
			<td class="webixdoc_links0"><b>start</b></td>
			<td>(<i>string</i>) 출력 Gantt 차트에 표시될 데이터 범위의 시작 날짜를 설정합니다. 날짜 형식은 [](api/config/date_format.md) 구성에서 정의됩니다</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>end</b></td>
			<td>(<i>string</i>) 출력 Gantt 차트에 표시될 데이터 범위의 종료 날짜를 설정합니다. 날짜 형식은 [](api/config/date_format.md) 구성에서 정의됩니다</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>data</b></td>
			<td>(<i>object</i>) 출력 Gantt 차트에 표시될 사용자 정의 데이터 소스를 설정합니다</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>header</b></td>
			<td>(<i>string</i>) 출력 PNG 이미지에 추가될 헤더를 지정합니다. 주의: HTML을 사용할 수 있습니다</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>footer</b></td>
			<td>(<i>string</i>) 출력 PNG 이미지에 추가될 푸터를 지정합니다. 주의: HTML을 사용할 수 있습니다</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>server</b></td>
			<td>(<i>string</i>) 요청의 API 엔드포인트를 설정합니다. 로컬 설치의 export 서비스와 함께 사용할 수 있습니다. 기본값은 <strong>https://export.dhtmlx.com/gantt</strong></td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>raw</b></td>
			<td>(<i>boolean</i>) 모든 Gantt 마크업을 그대로, 모든 커스텀 요소와 함께 내보낼지 여부를 정의합니다. 기본값은 <em>false</em>입니다. [자세한 내용](guides/export.md#exportingcustommarkupandstyles) </td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>callback</b></td>
			<td>(<i>function</i>) 생성된 PNG 파일의 다운로드 URL을 받으려면 callback 속성을 사용할 수 있습니다. 이 콜백은 url 속성을 가진 JSON 객체를 수신합니다</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>additional_settings</b></td>
			<td>(<i>object</i>) 추가 설정이 담긴 객체입니다. 이 객체에는 다음 속성들이 포함될 수 있습니다:
			<ul><li><b>width</b> - (<i>number|string</i>) 출력 페이지의 너비</li><li><b>height</b> - (<i>number|string</i>) 출력 페이지의 높이</li><li>width와 height 매개변수는 <b>slice_archive</b>가 지정되면 무시됩니다.</li><li><b>slice_archive</b> - (<i>boolean|object</i>) 조각으로 큰 차트를 저장하고 아카이브에서 얻을 수 있도록 합니다. 객체로 사용할 때는 <b>width</b>와 <b>height</b> 옵션을 취합니다. 조각 크기가 정의되지 않은 경우(예: <i>slice_archive: true</i>) 기본 크기는 1000×1000입니다.</li><li><b>slice_check</b> - (<i>boolean</i>) 아카이브에 HTML 페이지를 추가합니다. 이 페이지를 통해 모든 조각이 올바르게 내보내졌는지 확인할 수 있습니다.</li></ul></td>
		</tr>
  </tbody>
</table>

## 큰 Gantt 차트를 조각별로 내보내기

대용량 파일의 최대 크기는 10000х10000입니다.

한 쪽의 크기를 키우고 다른 한 쪽을 이에 맞춰 줄일 수 있지만, width와 height의 곱이 100000000(10000×10000)을 넘으면 출력 PNG 이미지가 잘립니다.

또한 additional_settings의 slice_archive 속성을 사용하여 조각으로 Gantt를 내보내고 아카이브로 얻는 기능이 있습니다:

~~~js
gantt.exportToPNG({
    server: "https://export.dhtmlx.com/beta/gantt",
    additional_settings: {
        //width: 2000,
        //height: 2000,
        slice_archive: { width: 2000, height: 2000 },
        slice_check: true,
    }
});
~~~

**예제:** [PNG 이미지로 내보내기](https://snippet.dhtmlx.com/2mprehlx)

You can either define the sizes of the output PNG images via setting the attribute as an object with the *width* and *height* options:

~~~js
slice_archive: { width: 2000, height: 2000 }
~~~

or you can set the attribute to *true*. In this case, the exported pieces of the gantt will have default sizes: 1000×1000.

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

