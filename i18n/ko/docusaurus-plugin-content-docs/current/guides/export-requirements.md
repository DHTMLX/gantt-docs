---
title: "Export Service - 독립 설치를 위한 시스템 요구사항"
sidebar_label: "Export Service - 독립 설치를 위한 시스템 요구사항"
---

# Export Service - 독립 설치를 위한 시스템 요구사항

dhtmlxGantt 라이브러리는 온라인 서비스로 내보내기(export as online service)를 사용하여 간트 차트의 데이터를 내보내고 가져올 수 있는 기능을 제공합니다.

또한 컴퓨터에 [내보내기 서비스](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) 를 설치하여 로컬에서 Gantt를 내보낼 수도 있습니다. 내보내기 모듈을 사용하려면 시스템이 시스템 요구사항을 충족하는지 확인해야 합니다:

- PNG/PDF/Excel [내보내기 요건](guides/export-requirements.md#pdfpngexcel-service)
- MS Project/Primavera P6 [가져오기 및 내보내기 요건](guides/export-requirements.md#import-and-export-from-ms-project-and-primavera-p6)

## PDF/PNG/Excel 서비스

### 개요

PDF/PNG/Excel로의 내보내기는 자바스크립트로 구축된 크로스 플랫폼 Node.js 애플리케이션입니다. 

소스 코드 형태와 Docker 이미지 형태로 배포됩니다.

### 시스템 요구사항

<table class="dp_table">
  <tr>
  <th><b>하드웨어</b></th><th><b>운영 체제</b></th><th><b>런타임</b></th>
  </tr>
  <tr>
  <td>- 1 CPU 코어(공유 가상 코어 가능) - 최소 500MB RAM</td>
  <td>- Linux - Windows - macOS</td>
  <td>- Node.js v12.03 이상, 권장: v18 또는 v20, 또는 Docker</td>
  </tr>
</table>


## MS Project 및 Primavera P6에서의 가져오기 및 내보내기

### 개요

MS Project로의 내보내기는 C#으로 작성된 .NET Core Framework 애플리케이션이며 Windows, macOS, Linux에서 실행됩니다.

자체 서버나 어떤 클라우드 공급자에 배포할 수 있는 소스 코드를 제공해 드릴 수 있습니다.
소스 프로젝트는 MS Visual Studio 2022+와 호환됩니다.

### 시스템 요구사항

<table class="dp_table">
  <tr>
  <th><b>하드웨어</b></th><th><b>운영 체제</b></th><th><b>런타임</b></th>
  </tr>
  <tr>
  <td>- 1 CPU 코어(공유 가상 코어도 가능) - 최소 1000MB RAM</td>
  <td>- Windows - macOS - Linux</td>
  <td>- .NET Core 7.0+</td>
  </tr>
</table>