import { microflows as mfs } from "mendixmodelsdk"
import single = require("../SingleInterface");
import * as $ from "./"

/**
 * Load two ActionActivitys to IMicroflowActionActivityDiff. 
 * Loading details: positionDiff, sizeDiff, typeName and other properties
 */

export function loadActionActivity(object: mfs.ActionActivity, listMfCpnBasicInfo: single.IMfCpnBasicInfo[]): single.IActionActivity {
    let action = object.action
    if (!action) {
        return {
            typeName: single.ElementType.Undefined,
            isSingle: true,
        }
    }
    let output;
    if (action instanceof mfs.CommitAction) {
        output = $.loadCommitAction(action);
    }
    if (action instanceof mfs.CastAction) {
        output = $.loadCastAction(action);
    }
    if (action instanceof mfs.ChangeMembersAction) {
        output = $.loadChangeMembersAction(action, listMfCpnBasicInfo);
    }
    if (action instanceof mfs.DeleteAction) {
        output = $.loadDeleteAction(action)
    }
    if (action instanceof mfs.RollbackAction) {
        output = $.loadRollbackAction(action)
    }
    if (action instanceof mfs.ChangeVariableAction) {
        output = $.loadChangeVariableAction(action, listMfCpnBasicInfo);
    }
    if (action instanceof mfs.CreateVariableAction) {
        output = $.loadCreateVariableAction(action);
    }
    if (action instanceof mfs.AggregateListAction) {
        output = $.loadAggregateListAction(action);
    }
    if (action instanceof mfs.RetrieveAction) {
        output = $.loadRetrieveAction(action)
    }
    if (action instanceof mfs.CreateListAction) {
        output = $.loadCreateListAction(action)
    }
    if (action instanceof mfs.ChangeListAction) {
        output = $.loadChangeListAction(action)
    }
    if (action instanceof mfs.ListOperationAction) {
        output = $.loadListOperationAction(action)
    }
    if (action instanceof mfs.MicroflowCallAction) {
        output = $.loadMicroflowCallAction(action, listMfCpnBasicInfo)
    }
    if (action instanceof mfs.JavaActionCallAction) {
        output = $.loadJavaActionCallAction(action)
    }
    if (action instanceof mfs.CloseFormAction) {
        output = $.loadCloseAction()
    }
    if (action instanceof mfs.DownloadFileAction) {
        output = $.loadDownloadFileAction(action)
    }
    if (action instanceof mfs.ShowPageAction) {
        output = $.loadShowPageAction(action)
    }
    if (action instanceof mfs.ShowHomePageAction) {
        output = $.loadShowHomePageAction()
    }
    if (action instanceof mfs.ShowMessageAction) {
        output = $.LoadShowMessageAction(action)
    }
    if (action instanceof mfs.ValidationFeedbackAction) {
        output = $.loadValidationFeedbackAction(action, listMfCpnBasicInfo)
    }
    if (action instanceof mfs.LogMessageAction) {
        output = $.loadLogMessage(action)
    }
    if (action instanceof mfs.GenerateDocumentAction) {
        output = $.loadGenerateDocumentAction(action)
    }
    if (action instanceof mfs.ImportXmlAction) {
        output = $.loadImportXmlAction(action)
    }
    if (action instanceof mfs.ExportXmlAction) {
        output = $.loadExportXmlAction(action)
    }
    if (action instanceof mfs.WebServiceCallAction) {
        output = $.loadWebServiceCallAction(action)
    }
    if (action instanceof mfs.RestCallAction) {
        output = $.loadRestCallAction(action)
    }
    output.caption = object.caption
    return output
}