/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"
import single = require("../../MfDiff/SingleInterface")

export function renderResponse(diff: Diff.IResultHandlingDiff | Diff.IBasicDiff<single.IResultHandling> | undefined, revNos: number[], showCommonInfo: boolean) {
    if (!diff || (!diff.isDiff && !showCommonInfo)) return;
    if (diff.typeName === single.ElementType.IBasicDiff) {
        return <$.PairContainer>
            {renderSingleResponse((diff as Diff.IBasicDiff<single.IResultHandling>).member1)}
            {renderSingleResponse((diff as Diff.IBasicDiff<single.IResultHandling>).member2)}
        </$.PairContainer>
    }
    return <div>
        {(diff as Diff.IResultHandlingDiff).importMappingCall ? <div>
            {$.renderImportMappingCallItem((diff as Diff.IResultHandlingDiff).importMappingCall, revNos, showCommonInfo)}
        </div> : undefined}
        {$.renderDiffContainer("Output", <div>
            {$.renderPairBooleanItem("Store in variable", (diff as Diff.IResultHandlingDiff).storeInVariable, revNos, showCommonInfo)}
            {$.renderPairItem("Type", (diff as Diff.IResultHandlingDiff).variableDataType, revNos, showCommonInfo)}
            {$.renderPairItem("Variable", (diff as Diff.IResultHandlingDiff).outputVariableName, revNos, showCommonInfo)}
        </div>)}
    </div>

}

function getTypeOfResponse(typeName: string): string {
    switch (typeName) {
        case "FileDocument": return "Store the response in a file document"
        case "Mapping": return "Import mapping for the entire response"
        case "String": return "Store the response in a string variable"
        case "None": return "Ignore Response"
        default: return "HTTP Response"
    }
}


export function renderSingleResponse(value: single.IResultHandling | undefined) {
    if (!value) return <span />
    return <div>
        <$.SingleItem name="" value={getTypeOfResponse(value.typeName)} />
        {value.importMappingCall ? <div>
            {$.renderSingleImportMappingCallItem(value.importMappingCall)}
        </div> : undefined}
        {$.renderDiffContainer("Output", <div>
            <$.SingleBooleanItem name="Store in variable" value={value.storeInVariable as boolean} />
            <$.SingleItem name="Type" value={value.variableDataType} />
            <$.SingleItem name="Variable" value={value.outputVariableName} />
        </div>)}
    </div>
}