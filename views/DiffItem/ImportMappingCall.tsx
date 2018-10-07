/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"
import { IImportMappingCall } from "../../MfDiff/SingleInterface"

export function renderImportMappingCallItem(diff: Diff.IImportMappingCallDiff | undefined, revNos: number[], showCommonInfo: boolean) {
    if (!diff) return undefined
    return <div>
        {$.renderDiffContainer("Import mapping", <div>
            {$.renderPairItem("Mapping", diff.mappingName, revNos, showCommonInfo)}
            {$.renderPairItem("Parameter", diff.mappingArgumentVariableName, revNos, showCommonInfo)}
            {$.renderRangeItem(diff.range, revNos, showCommonInfo)}
        </div>)}
    </div>
}

export function renderSingleImportMappingCallItem(value: IImportMappingCall | undefined) {
    if (!value) return undefined
    return <div>
        {$.renderDiffContainer("Import mapping", <div>
            <$.SingleItem name="Mapping" value={value.mappingName} />
            <$.SingleItem name="Parameter" value={value.mappingArgumentVariableName} />
            <$.SingleRangeItem value={value.range} />
        </div>)}
    </div>
}