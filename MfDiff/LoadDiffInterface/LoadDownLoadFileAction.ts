import diff = require("../DiffInterface");
import * as $ from "./"
import single = require("../SingleInterface")

export function loadDownloadFileAction(object1: single.IDownloadFileAction, object2: single.IDownloadFileAction): diff.IDownloadFileActionDiff {
    return {
        typeName: single.ElementType.DownloadFileAction,
        fileDocumentVariableName: $.loadToIBasicDiff(object1.fileDocumentVariableName, object2.fileDocumentVariableName),
        showFileInBrowser: $.loadToIBasicDiff(object1.showFileInBrowser, object2.showFileInBrowser)
    }
}