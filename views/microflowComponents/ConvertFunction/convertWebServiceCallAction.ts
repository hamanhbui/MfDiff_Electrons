import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertWebServiceCallAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, webServiceCallAction: microflows.WebServiceCallAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IWebServiceCallAction {
    let cpnWebServiceCallAction: _cpnInterface.microflow.IWebServiceCallAction = {
        geometry: convertGeometry(webServiceCallAction.containerAsActionActivity.relativeMiddlePoint, webServiceCallAction.containerAsActionActivity.size, 1 / 2),
        caption: webServiceCallAction.containerAsActionActivity.caption,
        returnType: "",
        variableName: "",
        type: _cpnTypeEnum.TypeEnum.WebServiceCallAction,
        id: webServiceCallAction.containerAsActionActivity.id,
        errorHandlingType: webServiceCallAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnWebServiceCallAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnWebServiceCallAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (webServiceCallAction.containerAsActionActivity.autoGenerateCaption === true) {
        cpnWebServiceCallAction.caption = "Call web service '" + webServiceCallAction.operationName + "'";
    }
    if (webServiceCallAction.resultHandling.storeInVariable === true) {
        cpnWebServiceCallAction.returnType = webServiceCallAction.resultHandling.variableDataType,
            cpnWebServiceCallAction.variableName = webServiceCallAction.resultHandling.outputVariableName
    }
    if (webServiceCallAction.resultHandling.variableDataType === "Unknown") {
        cpnWebServiceCallAction.returnType = "(Not set)";
    }
    if (cpnWebServiceCallAction.id) {
        objectInfo[cpnWebServiceCallAction.id] = {
            caption: cpnWebServiceCallAction.caption,
            returnName: cpnWebServiceCallAction.variableName,
            returnType: cpnWebServiceCallAction.returnType
        }
    }
    return cpnWebServiceCallAction;
}//todo