import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { IPosition } from "../interfaces/baseInterfaces";
function findmiddlepoint(point1: IPosition, point2: IPosition): IPosition {
    let middlepoint: IPosition = {
        left: (point1.left + point2.left) / 2,
        top: (point1.top + point2.top) / 2
    }
    return middlepoint;
}
export function convertCaseValue(flow: microflows.SequenceFlow, originPos: _cpnInterface.microflow.IGeometry, destinationPos: _cpnInterface.microflow.IGeometry, ): _cpnInterface.microflow.IEntity {
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
    let origin: IPosition = {
        left: origin1.geometry.left,
        top: origin1.geometry.top
    }
    let destination: IPosition = {
        left: destination1.geometry.left,
        top: destination1.geometry.top
    }
    let originBenzierPoint: IPosition = {
        left: origin1.geometry.left + flow.originBezierVector.width,
        top: origin1.geometry.top + flow.originBezierVector.height,
    }
    let destinationBenzierPoint: IPosition = {
        left: destination1.geometry.left + flow.destinationBezierVector.width,
        top: destination1.geometry.top + flow.destinationBezierVector.height
    }
    let m0: IPosition = findmiddlepoint(origin, originBenzierPoint);
    let m1: IPosition = findmiddlepoint(originBenzierPoint, destinationBenzierPoint);
    let m2: IPosition = findmiddlepoint(destination, destinationBenzierPoint);
    let m3: IPosition = findmiddlepoint(m0, m1);
    let m4: IPosition = findmiddlepoint(m1, m2);
    let m5: IPosition = findmiddlepoint(m3, m4);
    let middlepoint: _cpnInterface.microflow.IGeometry = {
        top: m5.top,
        left: m5.left,
        width: 0,
        height: 0
    }
    let cpnICaseValue: _cpnInterface.microflow.IEntity = {
        id: flow.id,
        geometry: middlepoint,
        caption: flow.caseValue["valueQualifiedName"],
        type: _cpnTypeEnum.TypeEnum.CaseValue,
    }
    if (cpnICaseValue.caption === "") {
        cpnICaseValue.caption = "(empty)";
    }
    return cpnICaseValue;
}