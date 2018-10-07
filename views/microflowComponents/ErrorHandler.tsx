import * as React from "react";
import _cpnInterface = require("./interfaces")
import { CustomWithRollBack, CustomWithoutRollBack } from "./";
export class ErrorHandler extends React.Component<{ data: _cpnInterface.microflow.IErrorHandler }, {}>{
    getErrorHandler(data) {
        switch (data.type) {
            case _cpnInterface.microflow.ErrorHandlerCustomType.WithRollBack: {
                return <CustomWithRollBack data={data} />
            }
            case _cpnInterface.microflow.ErrorHandlerCustomType.WithoutRollBack: {
                return <CustomWithoutRollBack data={data} />
            }
        }
    }
    render() {
        return (
            this.getErrorHandler(this.props.data)!
        )
    }
} 
