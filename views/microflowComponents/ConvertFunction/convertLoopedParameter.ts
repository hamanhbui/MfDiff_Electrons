import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { IPosition } from "../interfaces/baseInterfaces";
export function convertLoopedParameter(looped: microflows.LoopedActivity, point?: IPosition | undefined): _cpnInterface.microflow.ILoopedActivity {
    let cpnLoopedParameter: _cpnInterface.microflow.ILoopedActivity = {
        geometry: convertGeometry(looped.relativeMiddlePoint, looped.size, 1 / 2),
        objectCollection: looped.objectCollection,
        type: _cpnTypeEnum.TypeEnum.LoopedParameter,
        iteratedListVariableName: looped.iteratedListVariableName,
        loopVariableName: looped.loopVariableName
    }
    if (point != undefined) {
        cpnLoopedParameter.geometry.top = point.top;
        cpnLoopedParameter.geometry.left = point.left;
    }
    return cpnLoopedParameter;
} 