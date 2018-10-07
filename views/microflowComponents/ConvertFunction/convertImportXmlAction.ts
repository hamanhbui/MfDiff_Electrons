import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertImportXmlAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, webImportXmlAction: microflows.ImportXmlAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IImportXmlAction {
    let cpnImportXmlAction: _cpnInterface.microflow.IWebServiceCallAction = {
        geometry: convertGeometry(webImportXmlAction.containerAsActionActivity.relativeMiddlePoint, webImportXmlAction.containerAsActionActivity.size, 1 / 2),
        caption: webImportXmlAction.containerAsActionActivity.caption,
        returnType: webImportXmlAction.resultHandling.variableDataType.split(".")[1],
        variableName: webImportXmlAction.resultHandling.outputVariableName,
        type: _cpnTypeEnum.TypeEnum.ImportXmlAction,
        id: webImportXmlAction.containerAsActionActivity.id,
        errorHandlingType: webImportXmlAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnImportXmlAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnImportXmlAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (webImportXmlAction.resultHandling.storeInVariable === false) {
        cpnImportXmlAction.returnType = "",
            cpnImportXmlAction.variableName = ""
    }
    if (webImportXmlAction.containerAsActionActivity.autoGenerateCaption === true) {
        cpnImportXmlAction.caption = "Import from XML";
    }
    if (webImportXmlAction.resultHandling.variableDataType === "Unknown") {
        cpnImportXmlAction.returnType = "(Not set)";
    }
    if (cpnImportXmlAction.id) {
        objectInfo[cpnImportXmlAction.id] = {
            caption: cpnImportXmlAction.caption,
            returnName: cpnImportXmlAction.variableName,
            returnType: cpnImportXmlAction.returnType
        }
    }
    return cpnImportXmlAction;
}//todo  