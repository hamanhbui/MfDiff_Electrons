import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertDownloadFileAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, downloadFileAction: microflows.DownloadFileAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IDownloadFileAction {
    let cpnDownloadFileAction: _cpnInterface.microflow.IDownloadFileAction = {
        geometry: convertGeometry(downloadFileAction.containerAsActionActivity.relativeMiddlePoint, downloadFileAction.containerAsActionActivity.size, 1 / 2),
        caption: downloadFileAction.containerAsActionActivity.caption,
        type: _cpnTypeEnum.TypeEnum.DownloadFileAction,
        id: downloadFileAction.containerAsActionActivity.id,
        errorHandlingType: downloadFileAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnDownloadFileAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnDownloadFileAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (downloadFileAction.containerAsActionActivity.autoGenerateCaption === true) {
        cpnDownloadFileAction.caption = "Download file " + downloadFileAction.fileDocumentVariableName
    }
    if (cpnDownloadFileAction.id) {
        objectInfo[cpnDownloadFileAction.id] = {
            caption: cpnDownloadFileAction.caption,
        }
    }
    return cpnDownloadFileAction;
}