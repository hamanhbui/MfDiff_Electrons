import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
export function convertErrorHandler(flow: microflows.SequenceFlow, microflowOrigin: _cpnInterface.microflow.IMicroflowObject): _cpnInterface.microflow.IErrorHandler {
    var origin1: _cpnInterface.microflow.IMicroflowObject = {
        geometry: {
            top: microflowOrigin.geometry.top,
            left: microflowOrigin.geometry.left,
            width: microflowOrigin.geometry.width,
            height: microflowOrigin.geometry.height,
        },
    }
    if (flow.originConnectionIndex === 0) {
        origin1.geometry.left += (1 / 2) * microflowOrigin.geometry.width
    }
    else if (flow.originConnectionIndex === 1) {
        origin1.geometry.left += microflowOrigin.geometry.width;
        origin1.geometry.top += (1 / 2) * microflowOrigin.geometry.height;
    }
    else if (flow.originConnectionIndex === 2) {
        origin1.geometry.left += (1 / 2) * microflowOrigin.geometry.width
        origin1.geometry.top += microflowOrigin.geometry.height;
    }
    else {
        origin1.geometry.top += (1 / 2) * microflowOrigin.geometry.height;
    }
    let errorHandler: _cpnInterface.microflow.IErrorHandler = {
        top: origin1.geometry.top,
        left: origin1.geometry.left,
        type: _cpnInterface.microflow.ErrorHandlerCustomType.WithoutRollBack,
    };
    if (microflowOrigin.errorHandlingType === "Custom") {
        errorHandler.type = _cpnInterface.microflow.ErrorHandlerCustomType.WithRollBack
    }
    return errorHandler;
}