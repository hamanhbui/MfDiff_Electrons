import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
export function convertSequenceFlow(flow: microflows.SequenceFlow, originPos: _cpnInterface.microflow.IGeometry, destinationPos: _cpnInterface.microflow.IGeometry, ): _cpnInterface.microflow.ISequenceFlow {
    var origin1: _cpnInterface.microflow.IMicroflowObject = {
        geometry: {
            top: originPos.top,
            left: originPos.left,
            width: originPos.width,
            height: originPos.height,
        },
    }
    if (flow.originConnectionIndex === 0) {
        origin1.geometry.left += (1 / 2) * originPos.width
    }
    else if (flow.originConnectionIndex === 1) {
        origin1.geometry.left += originPos.width;
        origin1.geometry.top += (1 / 2) * originPos.height;
    }
    else if (flow.originConnectionIndex === 2) {
        origin1.geometry.left += (1 / 2) * originPos.width
        origin1.geometry.top += originPos.height;
    }
    else {
        origin1.geometry.top += (1 / 2) * originPos.height;
    }
    var destination1: _cpnInterface.microflow.IMicroflowObject = {
        geometry: {
            top: destinationPos.top,
            left: destinationPos.left,
            width: destinationPos.width,
            height: destinationPos.height
        }
    }
    if (flow.destinationConnectionIndex === 0) {
        destination1.geometry.left += (1 / 2) * destinationPos.width
    }
    else if (flow.destinationConnectionIndex === 1) {
        destination1.geometry.left += destinationPos.width;
        destination1.geometry.top += (1 / 2) * destinationPos.height;
    }
    else if (flow.destinationConnectionIndex === 2) {
        destination1.geometry.left += (1 / 2) * destinationPos.width;
        destination1.geometry.top += destinationPos.height;
    }
    else {
        destination1.geometry.top += (1 / 2) * destinationPos.height;
    }
    let cpnIFlow: _cpnInterface.microflow.ISequenceFlow = {
        id: flow.id,
        origin: origin1,
        destination: destination1,
        originConnectionIndex: flow.originConnectionIndex,
        originBezierVector: flow.originBezierVector,
        destinationBezierVector: flow.destinationBezierVector,
        destinationConnectionIndex: flow.destinationConnectionIndex,
        type: _cpnTypeEnum.TypeEnum.SequenceFlow,
        isErrorHandler: flow.isErrorHandler
    }
    return cpnIFlow;
}//todo