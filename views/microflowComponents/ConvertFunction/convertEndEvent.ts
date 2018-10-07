import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertEndEvent(objectInfo: _cpnInterface.microflow.IObjectDict, endEvent: microflows.EndEvent, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IEndEvent {
    let cpnEndEvent: _cpnInterface.microflow.IEndEvent = {
        geometry: convertGeometry(endEvent.relativeMiddlePoint, endEvent.size, 1 / 2),
        returnValue: endEvent.returnValue,
        returnType: endEvent.containerAsMicroflowObjectCollection.containerAsMicroflowBase.returnType,
        type: _cpnTypeEnum.TypeEnum.End,
        id: endEvent.id
    }
    if (point && size) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnEndEvent.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnEndEvent.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (endEvent.containerAsMicroflowObjectCollection.containerAsMicroflowBase.returnType === "Void") {
        cpnEndEvent.returnType = "";
        cpnEndEvent.returnValue = "";
    }
    else if (endEvent.containerAsMicroflowObjectCollection.containerAsMicroflowBase.returnType.includes(".")
        && !endEvent.containerAsMicroflowObjectCollection.containerAsMicroflowBase.returnType.includes("#")
        && !endEvent.containerAsMicroflowObjectCollection.containerAsMicroflowBase.returnType.includes("[")) {
        cpnEndEvent.returnType = endEvent.containerAsMicroflowObjectCollection.containerAsMicroflowBase.returnType.split(".")[1];
    }
    else if (endEvent.containerAsMicroflowObjectCollection.containerAsMicroflowBase.returnType === "DateTime") {
        cpnEndEvent.returnValue = "Expression"
    }
    else if (endEvent.containerAsMicroflowObjectCollection.containerAsMicroflowBase.returnType.includes("#")) {
        cpnEndEvent.returnValue = endEvent.returnValue.split(".")[2]
        cpnEndEvent.returnType = "Enumeration " + endEvent.containerAsMicroflowObjectCollection.containerAsMicroflowBase.returnType.split(".")[1];
    }
    else if (endEvent.containerAsMicroflowObjectCollection.containerAsMicroflowBase.returnType.includes("[")) {
        cpnEndEvent.returnType = "List of " + endEvent.containerAsMicroflowObjectCollection.containerAsMicroflowBase.returnType.split(".")[1];
        cpnEndEvent.returnType = cpnEndEvent.returnType.slice(0, cpnEndEvent.returnType.length - 1)
    }
    if (cpnEndEvent.id) {
        objectInfo[cpnEndEvent.id] = {
            returnName: cpnEndEvent.returnValue,
            returnType: cpnEndEvent.returnType
        }
    }
    return cpnEndEvent;
}