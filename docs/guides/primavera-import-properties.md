---
title: "Properties for importing from Primavera"
sidebar_label: "Properties for importing from Primavera"
---

# Properties for importing from Primavera

This article lists the project, task, and resource properties that Gantt supports when importing Primavera P6 files (XML and XER), along with format-specific limitations and properties that require special handling.

## Project properties

The properties below are supported when importing project-level data from Primavera P6 files.

<div class="msp-properties">
| | | | |
|---|---|---|---|
| AMText | CriticalSlackLimit | GUID | PreserveMinimumFloatWhenLeveling |
| ActivityIdIncrement | CurrencyDigits | HonorConstraints | PreserveScheduledEarlyAndLateDates |
| ActivityIdIncrementBasedOnSelectedActivity | CurrencySymbol | HyperlinkBase | ProjectCodeValues |
| ActivityIdPrefix | CurrentDate | IgnoreRelationshipsToAndFromOtherProjects | ProjectExternallyEdited |
| ActivityIdSuffix | CustomProperties | InsertedProjectsLikeSummary | ProjectID |
| ActualCost | DataDateAndPlannedStartSetToProjectForecastStart | LevelAllResources | ProjectIsBaseline |
| ActualDuration | DateFormat | LevelResourcesOnlyWithinActivityTotalFloat | ProjectTitle |
| ActualFinish | DateOrder | LevelingPriorities | ProjectWebsiteUrl |
| ActualStart | DateSeparator | LimitNumberOfFloatPathsToCalculate | RelationshipLagCalendar |
| ActualWork | DaysPerMonth | MakeOpenEndedActivitiesCritical | RemoveFileProperties |
| ActualsInSync | DecimalSeparator | MaxPercentToOverallocateResources | ScheduleFrom |
| AdminProject | DefaultCalendarUniqueID | MaximumNumberOfFloatPathsToCalculate | ScheduledFinish |
| AutoAddNewResourcesAndTasks | DefaultDurationIsFixed | MicrosoftProjectServerURL | SchedulingProgressedActivities |
| AutoFilter | DefaultDurationUnits | MinutesPerDay | ShowProjectSummaryTask |
| Autolink | DefaultEndTime | MinutesPerMonth | SplitInProgressTasks |
| BarTextDateFormat | DefaultFixedCostAccrual | MinutesPerWeek | SpreadActualCost |
| BaselineCalendarName | DefaultOvertimeRate | MinutesPerYear | SpreadPercentComplete |
| BaselineCost | DefaultStandardRate | MoveCompletedEndsBack | StartDate |
| BaselineDate | DefaultStartTime | MoveCompletedEndsForward | StartVariance |
| BaselineDuration | DefaultTaskEarnedValueMethod | MoveRemainingStartsBack | StatusDate |
| BaselineFinish | DefaultTaskType | MoveRemainingStartsForward | SymbolPosition |
| BaselineForEarnedValue | DefaultWorkUnits | MultipleCriticalPaths | ThousandsSeparator |
| BaselineProjectUniqueID | DisplayFloatPathsEndingWithActivityUniqueId | MustFinishBy | TimeFormat |
| BaselineWork | Duration | Name | TimeSeparator |
| CalculateFloatBasedOnFinishDateOfEachProject | EditableActualCosts | NewTaskStartIsProjectStart | TotalSlackCalculationType |
| CalculateMultipleFloatPaths | EditingTime | NewTasksAreManual | UniqueID |
| CalculateMultipleFloatPathsUsingTotalFloat | ExportFlag | NewTasksEffortDriven | UpdatingTaskStatusUpdatesResourceStatus |
| ComputeStartToStartLagFromEarlyStart | FileApplication | NewTasksEstimated | UseExpectedFinishDates |
| ConsiderAssignmentsInOtherProjects | FileType | Notes | WbsCodeSeparator |
| ConsiderAssignmentsInOtherProjectsWithPriorityEqualHigherThan | FinishDate | NotesObject | WeekStartDay |
| Cost | FinishVariance | PMText | Work |
| CreationDate | FiscalYearStart | PercentageComplete | Work2 |
| CriticalActivityType | FiscalYearStartMonth | PlannedStart | |
</div>

### Complex properties

Some properties contain nested properties of their own. When importing files with such properties, you get objects instead of plain values:

- **CustomProperties** - contains all the custom properties, as well as **ProjectCodeValues**.
- **ProjectCodeValues** - includes both codes and values prepared beforehand, as well as custom ones; it can also be used for grouping tasks and projects by categories. Examples of the built-in codes: *Business Process*, *Business Segment*, *Capacity Analysis*, *Current Phase*, *Estimated Project Size*, *Financial Rating*, *IT Investment Class*, *Location*, *Priority*, *Product Line*, *Project Manager*, *Project Status*, *Project Type*, *Resource Rating*, *Risk Rating*, *Sponsor*, *Stage-Gate Gate*, *Stage-Gate Stage*, *Strategic Objective*, *Strategic Rating*, *Technology Rating*.

## Task properties

The properties below are supported when importing Activity tasks from Primavera P6 files.

<div class="msp-properties">
| | | | |
|---|---|---|---|
| Active | ConstraintType | LongestPath | RemainingEarlyFinish |
| ActivityCodeValues | ConstraintName | Milestone | RemainingEarlyStart |
| ActivityID | Cost | Name | RemainingLateFinish |
| ActivityLevelingPriority | CostVariance | Notes | RemainingLateStart |
| ActivityPercentComplete | CreateDate | NotesObject | RemainingWork |
| ActivityStatus | Critical | OutlineLevel | RemainingWorkLabor |
| ActivityType | Duration | OutlineNumber | RemainingWorkNonLabor |
| ActualCost | DurationType | OverAllocated | ResponsePending |
| ActualDuration | DurationVariance | OvertimeCost | Resume |
| ActualFinish | EarlyFinish | PercentComplete | SecondaryConstraintDate |
| ActualStart | EarlyStart | PercentCompleteType | SecondaryConstraintType |
| ActualWork | EffectiveCalendar | PercentageComplete | SequenceNumber |
| ActualWorkLabor | Expanded | PercentageWorkComplete | Start |
| ActualWorkNonlabor | ExpectedFinish | PhysicalPercentComplete | StartSlack |
| Baseline | ExpenseItems | PlannedCost | StartVariance |
| BaselineCost | Finish | PlannedDuration | Steps |
| BaselineDuration | FinishSlack | PlannedFinish | Successors |
| BaselineFinish | FinishVariance | PlannedStart | Summary |
| BaselineFixedCost | FixedCost | PlannedWork | SuspendDate |
| BaselineStart | FloatPath | PlannedWorkLabor | TaskMode |
| BaselineWork | FloatPathOrder | PlannedWorkNonlabor | TotalSlack |
| CalendarUID | FreeSlack | Predecessors | Type |
| Calendar | GUID | PrimaryConstraint | UID |
| CalendarUniqueID | HasChildTasks | PrimaryResource | UniqueID |
| CanonicalActivityID | ID | PrimaryResourceUniqueID | UpdateNeeded |
| ChildTasks | IgnoreResourceCalendar | Priority | WBS |
| CompleteThrough | LateFinish | Recurring | Work |
| Confirmed | LateStart | RemainingCost | WorkVariance |
| ConstraintDate | LevelingPriority | RemainingDuration | |
</div>

### Format-specific properties

Different Primavera file formats support different sets of properties. A property available in one format isn't guaranteed to be available in another, since this is a limitation of the file format itself. For example, *BaselineCost*, *BaselineDuration*, *BaselineFinish*, *BaselineFixedCost*, *BaselineStart*, *BaselineWork*, *CostVariance*, and *DurationVariance* are used in the XML files, but absent in the XER files. Conversely, *FloatPath*, *FloatPathOrder*, *FreeSlack*, and *LongestPath* are used in the XER files, but absent in the XML files.

### ConstraintName property

*ConstraintName* is a synthetic property - it doesn't exist in Primavera files. The property actually stored in files is *ConstraintType*. The export module accepts *ConstraintType* as either a number or a string, but on import it always returns a number, for backward compatibility. *ConstraintName* lets you import constraints using values that are understandable for humans instead: if it's set instead of *ConstraintType*, the export module recognizes it and applies the corresponding constraint type.

### Complex properties

Some properties contain nested properties of their own. When importing files with such properties, you get objects instead of plain values:

- **ActivityCodeValues** - includes both codes and values prepared beforehand, as well as custom ones.
- **Baseline** - Primavera handles baselines differently from Gantt and MS Project: a task itself has no baseline. Instead, Primavera keeps a full snapshot of the project, and its values serve as the baseline. On import, all available baselines are taken from this snapshot and added to the project. This works only in the XML files, as only files of this format contain projects' snapshots.
- **ExpenseItems** - a complex object with many properties, including two nested objects: **Account** and **Category**. Its full property list: *Account*, *AccountUniqueID*, *AccrueType*, *ActualCost*, *ActualUnits*, *AtCompletionCost*, *AutoComputeActuals*, *Category*, *CategoryUniqueID*, *Description*, *DocumentNumber*, *Name*, *PlannedCost*, *PlannedUnits*, *PricePerUnit*, *RemainingCost*, *RemainingUnits*, *UniqueID*, *UnitOfMeasure*, *Vendor*.

  - The **Account** object contains the following properties: *ID*, *Name*, *Notes*, *NotesObject*, *Parent*, *ParentUniqueID*, *SequenceNumber*, *UniqueID*.

  - The **Category** object contains the following properties: *Name*, *SequenceNumber*, *UniqueID*.

- **NotesObject** - an array with note objects. Each object has the following properties: *Notes*, *NotesTopic*, *TopicID*, *UniqueID*.
- **Steps** - represents the stages of a task's execution, an enumeration used later for calculations. It's an array of objects, each containing the following properties: *Complete*, *Description*, *Name*, *PercentComplete*, *SequenceNumber*, *UniqueID*, *Weight*.

### WBS-tasks

Primavera P6 also has WBS-tasks (**projects** in Gantt, **Summary Tasks** in MS Project), with their own set of properties, separate from those of usual Activity tasks. Still, this is a Primavera behavior that Gantt supports: properties with matching names can be defined on both Activity tasks and WBS-tasks.

## Resource properties

The properties below are supported when importing resources from Primavera P6 files.

<div class="msp-properties">
| | | | |
|---|---|---|---|
| Active | CostRate | Name | ResourceID |
| ActualCost | CreationDate | Notes | RoleAssignments |
| ActualOvertimeCost | Currency | NotesObject | SequenceNumber |
| ActualOvertimeWork | CurrencyId | OverAllocated | Shift |
| ActualWork | DefaultUnits | OvertimeRate | ShiftUniqueId |
| Availability | EmailAddress | Parent | StandardRate |
| AvailableFrom | Enterprise | ParentResource | Start |
| AvailableTo | ExpensesOnly | ParentResourceUniqueID | TaskAssignments |
| CalculateCostsFromUnits | Finish | PercentWorkComplete | Type |
| Calendar | GUID | PrimaryRole | UniqueID |
| CalendarUniqueID | Generic | PrimaryRoleUniqueId | UnitOfMeasure |
| ChildResources | ID | RemainingCost | Work |
| Code | MaterialLabel | RemainingWork | |
| Cost | MaxUnits | ResourceCodeValues | |
</div>

### Complex properties

Some properties contain nested properties of their own. When importing files with such properties, you get objects instead of plain values:

- **Availability** - an array of objects with the following properties: *Start*, *End*, *Units*.
- **CostRate** - an object with the following properties: *CostPerUse*, *StandardRate*, *OvertimeRate*, *StartDate*, *EndDate*.
- **Currency** - an object representing the specified currency, with the following properties: *UniqueID*, *CurrencyId*, *Name*, *Symbol*, *ExchangeRate*, *DecimalSymbol*, *NumberOfDecimalPlaces*, *DigitGroupingSymbol*, *PositiveCurrencyFormat*, *NegativeCurrencyFormat*.
- **ResourceCodeValues** - includes both codes and values prepared beforehand, as well as custom ones. Examples of the built-in codes: *PMO_Yes*, *Location*, *Contractor*, *Classification*, *Plant*, *PMO_Deps*, *Department*.
- **RoleAssignments** - contains roles that represent personnel job titles or skills needed to execute projects. Gantt has no standalone array for roles, so all role data is stored in **RoleAssignments** on import; on export, the export module rebuilds roles from this same property. Its objects contain the following properties: *Name*, *Proficiency*, *ResourceID*, *UniqueID*, *Notes*, *SequenceNumber*.
- **Shift** - defines work hours spanning a period of time, applied to specific resources. On import, you get an object with the following properties: *Name*, *UniqueID*, *Periods*.
  - The **Periods** array includes objects that contain the following properties: *Duration*, *Start*, *UniqueID*.
- **TaskAssignments** - an array of objects representing the assigned tasks, each containing the following properties: *task_id*, *start_date*, *end_date*, *uid*, *units*.

**Related sample**: [Gantt. Import and export Primavera P6 files with additional project, task and resource properties and entities](https://snippet.dhtmlx.com/z1ewe48v)
