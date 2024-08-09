What's new in MSP Project Export Module
===========================================

## 2.1.0.0

• Added support for custom calendars for the imported and exported MSP and Primavera files (including resource calendars)

• Added support for getting resource assignment values from units when importing files

• Added support for specifying custom values for the resource assignment units when exporting files

• Added the **RemainingDuration** property for Primavera export to get the same end date for tasks without additional configuration

## 2.0.2.0

• Updated MPXJ library to the 11.5.4 version

• Added support for custom properties of Summary (WBS) tasks for Primavera import and export.
It works even when properties have the same name. To make it work for the Summary tasks when you export the data, you need to return *true* for the **Summary** property.

• Fixed the bug when Baseline 0 wasn't imported

## 2.0.0.1

• Various internal optimizations and imported Dockerfile

## 2.0.0.0

• Migrated from ASP.NET MVC to ASP.NET core. So, now it is possible to run the MSP export module on Linux and inside the Docker image
