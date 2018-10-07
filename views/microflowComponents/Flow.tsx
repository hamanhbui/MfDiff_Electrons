import * as React from "react";
import _cpnInterface = require("./interfaces")
import _cpnTypeEnum = require("./interfaces/TypeEnum")
import { SequenceFlow, AnnotationFlow } from "./";
export class Flow extends React.Component<{ data: _cpnInterface.microflow.IFlow, style?: any }, {}>{
    getFlow(data) {
        switch (data.type) {
            case _cpnTypeEnum.TypeEnum.SequenceFlow: {
                return <SequenceFlow data={data} />
            }
            case _cpnTypeEnum.TypeEnum.AnnotationFLow: {
                return <AnnotationFlow data={data} />
            }
        }
    }
    render() {
        return (
            this.getFlow(this.props.data)!
        )
    }
}
