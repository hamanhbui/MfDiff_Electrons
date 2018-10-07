/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import single = require("../../MfDiff/SingleInterface")
import * as $ from "./"

export function renderRequestHandling(diff: Diff.IRequestHandlingDiff | Diff.IBasicDiff<single.IRequestHandling> | undefined, revNos: number[], showCommonInfo: boolean) {
    if (!diff || (!diff.isDiff && !showCommonInfo)) return undefined;
    if (diff.typeName === "SimpleRequestHandlingDiff") {
        return <div>
            <$.SingleItem name={undefined} value="Simple expressions for each request parameter" />
            {$.renderArrayItem("", (diff as Diff.ISimpleRequestHandlingDiff).paramterMappings, revNos, showCommonInfo, new $.DisplayArrayItemOption(
                $.ArrayType.Parameter, ["Name", "Type", "Argument"]
            ))}
        </div>
    }
    if (diff.typeName === "CustomRequestHandlingDiff") {
        return <div>
            <$.SingleItem name={undefined} value="Custom request template" />
            {$.renderTemplate((diff as Diff.ICustomRequestHandlingDiff).template, revNos, showCommonInfo)}
        </div>
    }
    if (diff.typeName === "AdvancedRequestHandlingDiff") {
        return <div>
            <$.SingleItem name={undefined} value="Export mappings for each request parameter" />
            {$.renderArrayItem("", (diff as Diff.IAdvancedRequestHandlingDiff).parameterMappings, revNos, showCommonInfo, new $.DisplayArrayItemOption(
                $.ArrayType.Parameter, ["Name", "Type", "Argument"]
            ))}
        </div>
    }
    if (diff.typeName === "MappingRequestHandlingDiff") {
        return <div>
            <$.SingleItem name={undefined} value="Export mapping for the entire request" />
            {$.renderDiffContainer("Export mapping", <div>
                {$.renderPairItem("Mapping", (diff as Diff.IMappingRequestHandlingDiff).mappingName, revNos, showCommonInfo)}
                {$.renderPairItem("Parameter", (diff as Diff.IMappingRequestHandlingDiff).parameterName, revNos, showCommonInfo)}
            </div>)}
        </div>
    }
    if (diff.typeName === "BinaryRequestHandling") {
        return <div>
            <$.SingleItem name={undefined} value="Binary for the entire request" />
            {$.renderPairItem("Content", (diff as Diff.IBinaryRequestHandlingDiff).expression, revNos, showCommonInfo)}
        </div>
    }
    return <$.PairContainer>
        {renderSingleRequestHandling((diff as Diff.IBasicDiff<single.IRequestHandling>).member1, showCommonInfo)}
        {renderSingleRequestHandling((diff as Diff.IBasicDiff<single.IRequestHandling>).member2, showCommonInfo)}
    </$.PairContainer>
}

export function renderSingleRequestHandling(value: single.IRequestHandling | undefined, showCommonInfo: boolean, ) {
    if (!value) return;
    if (value.typeName === "SimpleRequestHandling") {
        return <div>
            <$.SingleItem name={undefined} value="Simple expressions for each request parameter" />
            {$.renderArrayItem("", (value as single.ISimpleRequestHandling).paramterMappings, [], showCommonInfo, new $.DisplayArrayItemOption(
                $.ArrayType.Parameter, ["Name", "Type", "Argument"]
            ))}
        </div>
    }
    if (value.typeName === "CustomRequestHandling") {
        return <div>
            <$.SingleItem name={undefined} value="Custom request template" />
            {$.renderSingleTemplate((value as single.ICustomRequestHandling).template)}
        </div>
    }
    if (value.typeName === "AdvancedRequestHandling") {
        return <div>
            <$.SingleItem name={undefined} value="Export mappings for each request parameter" />
            {$.renderArrayItem("", (value as single.IAdvancedRequestHandling).parameterMappings, [], showCommonInfo, new $.DisplayArrayItemOption(
                $.ArrayType.Parameter, ["Name", "Type", "Argument"]
            ))}
        </div>
    }
    if (value.typeName === "MappingRequestHandling") {
        return <div>
            <$.SingleItem name={undefined} value="Export mapping for the entire request" />
            {$.renderDiffContainer("Export mapping", <div>
                <$.SingleItem name="Mapping" value={(value as single.IMappingRequestHandling).mappingName} />
                <$.SingleItem name="Parameter" value={(value as single.IMappingRequestHandling).parameterName} />
            </div>)}
        </div>
    }
    if (value.typeName === "BinaryRequestHandling") {
        return <div>
            <$.SingleItem name={undefined} value="Binary for the entire request" />
            <$.SingleItem name="Content" value={(value as single.IBinaryRequestHandling).expression} />
        </div>
    }
}