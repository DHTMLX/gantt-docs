Export Service - System Requirements for a standalone install
=============================================

dhtmlxGantt library provides you with the possibility of exporting and importing data from the Gantt chart using export as online service.

You can also export Gantt locally by installing [export services](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) on your computer. You need to ensure your system meets the system requirements in order to use export modules:

- PNG/PDF/Excel [export requirements](desktop/export_requirements.md#pdfpngexcelservice)
- MS Project/Primavera P6 [import and export requirements](desktop/export_requirements.md#importandexportfrommsprojectandprimaverap6) 

## PDF/PNG/Excel Service

### Overview

Export to PDF/PNG/Excel is a cross-platform Node.js application built on JS. <br>
It is distributed in the form of source code and as a Docker image.

### System requirements

<table class="dp_table">
	<tr>
    	<th><b>Hardware</b></th><th><b>OS</b></th><th><b>Runtime</b></th>
    </tr>
	<tr>
    	<td>- 1 CPU core (shared virtual core will do)<br>- at least 500MB RAM</td>
		<td>- Linux<br>- Windows<br>- MacOS</td>
        <td>- Node.js v10.0.0 or newer<br>or<br>- Docker</td>
	</tr>
</table>


## Import and Export from MS Project and Primavera P6


### Overview

Export to MS Project is an ASP.NET MVC application written in C# and runs on Windows and IIS server.
<br>The app works in .NET Framework, there is no build for .NET Core Framework.

We can provide you with the source code (Visual Studio solution) that can be deployed on your own server or any cloud provider.
The source project is compatible with MS VisualStudio 2013-2019.

### System requirements

<table class="dp_table">
	<tr>
    	<th><b>Hardware</b></th><th><b>OS</b></th><th><b>Runtime</b></th>
    </tr>
	<tr>
    	<td>- 1 CPU core (shared virtual core will do)<br>- at least 1000MB RAM</td>
		<td>- Windows Server 2008 R2 or newer<br>- Windows 7 or newer</td>
        <td>- .NET Framework 4.7.2+<br>- IIS 7.5+</td>
	</tr>
</table>


