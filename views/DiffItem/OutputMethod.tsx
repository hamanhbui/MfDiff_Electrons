/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import single = require("../../MfDiff/SingleInterface")
import * as $ from "./"

export function getTypeOfOutput(diff: Diff.IOutputMethodDiff | Diff.IBasicDiff<single.IOutputMethod> | undefined): Diff.IBasicDiff<string> {
    if (!diff) return "";
    if (diff.typeName === "FileDocumentExportDiff") {
        return {
            isDiff: false,
            member1: "FileDocument",
            member2: "FileDocument"
        }
    } else if (diff.typeName === "VariableExportDiff") {
        return {
            isDiff: false,
            member1: "String Variable",
            member2: "String Variable"
        }
    }
    return {
        isDiff: true,
        member1: ((diff as Diff.IBasicDiff<single.IOutputMethod>).member1 as single.IOutputMethod).typeName === "FileDocumentExport" ? "FileDocument" : "String Variable",
        member2: ((diff as Diff.IBasicDiff<single.IOutputMethod>).member2 as single.IOutputMethod).typeName === "FileDocumentExport" ? "FileDocument" : "String Variable"
    }
}

export function renderOutputMethod(diff: Diff.IOutputMethodDiff | Diff.IBasicDiff<single.IOutputMethod> | undefined, revNos: number[], showCommonInfo: boolean) {
    if (!diff || (!diff.isDiff && !showCommonInfo)) return undefined;
    if (diff.typeName === "FileDocumentExportDiff") {
        return $.renderDiffContainer("Output", <div>
            <$.EnumItem name="Store in" checkedValue="FileDocument" values={["FileDocument", "String Variable"]} />
            {$.renderPairItem("Name", (diff as Diff.IFileDocumentExportDiff).targetDocumentVariableName, revNos, showCommonInfo)}
        </div>)
    }
    if (diff.typeName === "VariableExportDiff") {
        return $.renderDiffContainer("Output", <div>
            <$.EnumItem name="Store in" checkedValue="String Variable" values={["FileDocument", "String Variable"]} />
            {$.renderPairItem("Variable", (diff as Diff.IVariableExportDiff).outputVariableName, revNos, showCommonInfo)}
        </div>)
    }
    return <$.PairContainer>
        {renderSingleOutputMethod((diff as Diff.IBasicDiff<single.IOutputMethod>).member1)}
        {renderSingleOutputMethod((diff as Diff.IBasicDiff<single.IOutputMethod>).member2)}
    </$.PairContainer>
}

export function renderSingleOutputMethod(value: single.IOutputMethod | undefined) {
    if (!value) return undefined
    if (value.typeName === "FileDocumentExport") {
        return $.renderDiffContainer("Output", <div>
            <$.EnumItem name="Store in" checkedValue="FileDocument" values={["FileDocument", "String Variable"]} />
            <$.SingleItem name="Name" value={(value as single.IFileDocumentExport).targetDocumentVariableName} />
        </div>)
    }
    if (value.typeName === "VariableExport") {
        return $.renderDiffContainer("Output", <div>
            <$.EnumItem name="Store in" checkedValue="String Variable" values={["FileDocument", "String Variable"]} />
            <$.SingleItem name="Type" value="String" />
            <$.SingleItem name="Name" value={(value as single.IVariableExport).outputVariableName} />
        </div>)
    }
}