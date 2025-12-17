---
title: "Export Service - 독립형 설치를 위한 시스템 요구 사항"
sidebar_label: "Export Service - 독립형 설치를 위한 시스템 요구 사항"
---

Export Service - 독립형 설치를 위한 시스템 요구 사항
=============================================

dhtmlxGantt 라이브러리는 온라인 내보내기 서비스를 통해 Gantt 차트의 데이터를 내보내고 가져올 수 있습니다.

또한, [export services](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)를 컴퓨터에 직접 설치하여 Gantt 차트 내보내기를 로컬에서 수행할 수도 있습니다. 내보내기 모듈을 원활하게 사용하려면 시스템이 다음 요구 사항을 충족하는지 확인하십시오:

- PNG/PDF/Excel [내보내기 요구 사항](guides/export-requirements.md#pdfpngexcelservice)
- MS Project/Primavera P6 [가져오기 및 내보내기 요구 사항](guides/export-requirements.md#importandexportfrommsprojectandprimaverap6)

## PDF/PNG/Excel 서비스

### 개요

PDF/PNG/Excel로 내보내기는 JavaScript로 개발된 크로스 플랫폼 Node.js 애플리케이션입니다.


소스 코드와 Docker 이미지 형태로 모두 제공됩니다.

### 시스템 요구 사항

<table class="dp_table">
    <tr>
        <th><b>하드웨어</b></th><th><b>운영체제</b></th><th><b>런타임</b></th>
    </tr>
    <tr>
        <td>- 1 CPU 코어(공유 가상 코어도 충분함) - 최소 500MB RAM</td>
        <td>- Linux - Windows - MacOS</td>
        <td>- Node.js v12.03 이상, v18 또는 v20 권장 또는 - Docker</td>
    </tr>
</table>


## MS Project 및 Primavera P6에서 가져오기 및 내보내기

### 개요

MS Project로 내보내기는 C#으로 작성된 .Net Core Framework 애플리케이션으로 Windows, MacOS, Linux에서 실행됩니다.

소스 코드는 자체 서버 또는 클라우드 공급자에 배포할 수 있습니다.
이 프로젝트는 MS VisualStudio 2022 및 이후 버전과 호환됩니다.

### 시스템 요구 사항

<table class="dp_table">
    <tr>
        <th><b>하드웨어</b></th><th><b>운영체제</b></th><th><b>런타임</b></th>
    </tr>
    <tr>
        <td>- 1 CPU 코어(공유 가상 코어도 사용 가능) - 최소 1000MB RAM</td>
        <td>- Windows - MacOS - Linux</td>
        <td>- .NET Core 7.0 이상</td>
    </tr>
</table>
