import diff = require("../DiffInterface");
import single = require("../SingleInterface")
import * as $ from "./"

/**
 * Load two ActionActivitys to IMicroflowActionActivityDiff. 
 * Loading details: positionDiff, sizeDiff, typeName and other properties
 */

export function loadActionActivity(object1: single.IActionActivity, object2: single.IActionActivity): diff.IActionActivityDiff {
    let output: diff.IActionActivityDiff = { typeName: single.ElementType.Undefined, isDiff: false };
    switch (object1.typeName) {
        case single.ElementType.CommitAction: output = $.loadCommitAction(object1, object2); break
        case single.ElementType.CastAction: output = $.loadCastAction(object1, object2); break;
        case single.ElementType.ChangeObjectAction:
        case single.ElementType.CreateObjectAction: output = $.loadChangeMembersAction(object1, object2); break;
        case single.ElementType.DeleteAction: output = $.loadDeleteAction(object1, object2); break
        case single.ElementType.RollbackAction: output = $.loadRollbackAction(object1, object2); break;
        case single.ElementType.ChangeVariableAction: output = $.loadChangeVariableAction(object1, object2); break;
        case single.ElementType.CreateVariableAction: output = $.loadCreateVariableAction(object1, object2); break
        case single.ElementType.AggregateListAction: output = $.loadAggregateListAction(object1, object2); break
        case single.ElementType.RetrieveAction: output = $.loadRetrieveAction(object1 as single.IRetrieveAction, object2 as single.IRetrieveAction); break;
        case single.ElementType.CreateListAction: output = $.loadCreateListAction(object1, object2); break;
        case single.ElementType.ChangeListAction: output = $.loadChangeListAction(object1, object2); break;
        case single.ElementType.ListOperationAction: output = $.loadListOperationAction(object1 as single.IListOperationAction, object2 as single.IListOperationAction); break;
        case single.ElementType.MicroflowCallAction: output = $.loadMicroflowCallAction(object1, object2); break;
        case single.ElementType.JavaActionCallAction: output = $.loadJavaActionCallAction(object1, object2); break;
        case single.ElementType.DownloadFileAction: output = $.loadDownloadFileAction(object1, object2); break;
        case single.ElementType.ShowPageAction: output = $.loadShowPageAction(object1, object2); break;
        case single.ElementType.ShowHomePageAction: output = $.loadShowHomePageAction(); break;
        case single.ElementType.ShowMessageAction: output = $.LoadShowMessageAction(object1 as single.IShowMessageAction, object2 as single.IShowMessageAction); break;
        case single.ElementType.ValidationFeedbackAction: output = $.loadValidationFeedbackAction(object1 as single.IValidationFeedbackAction, object2 as single.IValidationFeedbackAction); break;
        case single.ElementType.LogMessageAction: output = $.loadLogMessage(object1 as single.ILogMessageAction, object2 as single.ILogMessageAction); break;
        case single.ElementType.GenerateDocumentAction: output = $.loadGenerateDocumentAction(object1, object2); break;
        case single.ElementType.ImportXmlAction: output = $.loadImportXmlAction(object1 as single.IImportXmlAction, object2 as single.IImportXmlAction); break;
        case single.ElementType.ExportXmlAction: output = $.loadExportXmlAction(object1 as single.IExportXmlAction, object2 as single.IExportXmlAction); break;
        case single.ElementType.WebServiceCallAction: output = $.loadWebServiceCallAction(object1 as single.IWebServiceCallAction, object2 as single.IWebServiceCallAction); break;
        case single.ElementType.RestCallAction: output = $.loadRestCallAction(object1 as single.IRestCallAction, object2 as single.IRestCallAction); break
        default: output = $.loadCloseAction();
    }
    output.caption = $.loadToIBasicDiff(object1.caption, object2.caption)
    return output;
}