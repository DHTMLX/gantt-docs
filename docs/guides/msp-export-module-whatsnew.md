---
title: "What's new in MSP Project Export Module"
sidebar_label: "What's new in MSP Project Export Module"
---

# What's new in MSP Project Export Module

## 2.2.1.0

• Fixed specifying 24-hour value as the working time config (for example, `gantt.setWorkTime({ hours: ["00:00-24:00"] })`)

• Fixed the returned Project calendar when specifying the `CalendarUID` property in the `projectProperties` parameter in the import functions

## 2.2.0.0

* Updated MPXJ library to the 12.0.0 version

* Correct import of the `Start` and `Finish` properties specified in the `taskProperties` parameter

* Fixed import when specifying duplicate values in the `taskProperties` parameter

* Fixed import when specifying the `CalendarUID` property in the `taskProperties` parameter and a task doesn't have the calendar

* Fixed export when `gantt.config.worktimes` has an empty array

* Fixed export when specifying working time settings in the old format

## 2.1.1.0

* Renamed the property that contains calendars from `worktimes` to `calendars`

* Added a property that contains the ID of the global calendar

* Restored the `worktime` property that contains the global calendars settings for backward compatibility

## 2.1.0.0

* Added support for custom calendars for the imported and exported MSP and Primavera files (including resource calendars)

* Added support for getting resource assignment values from units when importing files

* Added support for specifying custom values for the resource assignment units when exporting files

* Added the **RemainingDuration** property for Primavera export to get the same end date for tasks without additional configuration

## 2.0.2.0

* Updated MPXJ library to the 11.5.4 version

* Added support for custom properties of Summary (WBS) tasks for Primavera import and export.
It works even when properties have the same name. To make it work for the Summary tasks when you export the data, you need to return *true* for the **Summary** property.

* Fixed the bug when Baseline 0 wasn't imported

## 2.0.0.1

* Various internal optimizations and imported Dockerfile

## 2.0.0.0

* Migrated from ASP.NET MVC to ASP.NET core. So, now it is possible to run the MSP export module on Linux and inside the Docker image
