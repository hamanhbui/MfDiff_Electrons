import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertMicroflowParameter(objectInfo: _cpnInterface.microflow.IObjectDict, microflowParameter: microflows.MicroflowParameterObject, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IMicroflowParameter {
    let cpnMicroflowParameter: _cpnInterface.microflow.IMicroflowParameter = {
        geometry: convertGeometry(microflowParameter.relativeMiddlePoint, microflowParameter.size, 1 / 2),
        Name: microflowParameter.name,
        typeName: microflowParameter.type,
        id: microflowParameter.id,
        type: _cpnTypeEnum.TypeEnum.Parameter
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnMicroflowParameter.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnMicroflowParameter.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (microflowParameter.type.endsWith("]") && microflowParameter.type.startsWith("[")) {
        let result = microflowParameter.type.slice(0, microflowParameter.type.length - 1);
        cpnMicroflowParameter.typeName = "List of " + result.split(".")[1];
    }
    else if (microflowParameter.type.startsWith("#")) {
        let result = microflowParameter.type;
        cpnMicroflowParameter.typeName = "Enumeration " + result.split(".")[1];
    }
    else if (microflowParameter.type.includes(".")) {
        cpnMicroflowParameter.typeName = microflowParameter.type.split(".")[1];

    }
    else if (microflowParameter.type === "DateTime") {
        cpnMicroflowParameter.typeName = "Data and Time";
    }
    else if (microflowParameter.type === "Integer") {
        cpnMicroflowParameter.typeName = "Integer/Long";
    }
    if (cpnMicroflowParameter.id) {
        objectInfo[cpnMicroflowParameter.id] = {
            returnName: cpnMicroflowParameter.Name,
            returnType: cpnMicroflowParameter.typeName
        }
    }
    return cpnMicroflowParameter;
}