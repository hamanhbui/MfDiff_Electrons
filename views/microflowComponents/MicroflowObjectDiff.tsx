import * as React from "react";
import _cpnInterface = require("./interfaces")
import _cpnTypeEnum = require("./interfaces/TypeEnum")
import MfComponent = require("./index");
function mapMfObjectToHlComponent(data: _cpnInterface.microflow.IMicroflowObject, highlightStyle: any) {
    switch (data.type) {
        case _cpnTypeEnum.TypeEnum.Start:
        case _cpnTypeEnum.TypeEnum.End:
        case _cpnTypeEnum.TypeEnum.ContinueEvent:
        case _cpnTypeEnum.TypeEnum.BreakEvent:
        case _cpnTypeEnum.TypeEnum.ErrorEvent: {
            return <MfComponent.HighlightEvent data={data.geometry} style={highlightStyle} />
        }
        case _cpnTypeEnum.TypeEnum.ExclusiveSplit:
        case _cpnTypeEnum.TypeEnum.InheritanceSplit:
        case _cpnTypeEnum.TypeEnum.ExclusiveMerge: {
            return <MfComponent.HighlightSplit data={data.geometry} style={highlightStyle} />
        }
        case _cpnTypeEnum.TypeEnum.Parameter: {
            return <MfComponent.HighlightParameter data={data.geometry} style={highlightStyle} />
        }
        case _cpnTypeEnum.TypeEnum.Annotation: {
            return <MfComponent.HighlightAnnotation data={data.geometry} style={highlightStyle} />
        }
        case _cpnTypeEnum.TypeEnum.LoopedAcivity: {
            return <div />
        }
        default: {
            return <MfComponent.HighlightAction data={data.geometry} style={highlightStyle} />
        }
    }
}
export const MicroflowObjectDiff = ((props: { data: _cpnInterface.microflow.IMicroflowObject, hightlightStyle: any }) => (
    mapMfObjectToHlComponent(props.data, props.hightlightStyle)
))