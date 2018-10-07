/// <reference path="../typings/index.d.ts" />
import { microflows as mfs } from "mendixmodelsdk";
export function loadListMfCpnBasicInfo(object, listMfCpnBasicInfo) {
    if (object instanceof mfs.EndEvent) {
        let endEvent = object;
        let basicInfo = {
            name: endEvent.returnValue,
            type: endEvent.containerAsMicroflowObjectCollection.containerAsMicroflowBase.returnType
        };
        listMfCpnBasicInfo.push(basicInfo);
    }
    else if (object instanceof mfs.MicroflowParameterObject) {
        let microflowParameter = object;
        let basicInfo = {
            name: microflowParameter.name,
            type: microflowParameter.type
        };
        listMfCpnBasicInfo.push(basicInfo);
    }
    else if (object instanceof mfs.ActionActivity && object.action instanceof mfs.MicroflowCallAction) {
        let microflowCallAction = object.action;
        if (microflowCallAction.microflowCall.microflow && microflowCallAction.microflowCall.microflow.returnType != "Void") {
            let basicInfo = {
                name: microflowCallAction.outputVariableName,
                type: (microflowCallAction.microflowCall.microflow) ? microflowCallAction.microflowCall.microflow.returnType : "",
            };
            listMfCpnBasicInfo.push(basicInfo);
        }
    }
    else if (object instanceof mfs.ActionActivity && object.action instanceof mfs.CreateListAction) {
        let createListAction = object.action;
        let basicInfo = {
            name: createListAction.outputVariableName,
            type: createListAction.entityQualifiedName
        };
        listMfCpnBasicInfo.push(basicInfo);
    }
    else if (object instanceof mfs.ActionActivity && object.action instanceof mfs.RetrieveAction) {
        let retrieveAction = object.action;
        let basicInfo = {
            name: retrieveAction.outputVariableName,
            type: ""
        };
        if (retrieveAction.retrieveSource instanceof mfs.DatabaseRetrieveSource) {
            basicInfo.type = retrieveAction.retrieveSource.entityQualifiedName;
        }
        else if (retrieveAction.retrieveSource instanceof mfs.AssociationRetrieveSource) {
            basicInfo.type = retrieveAction.retrieveSource.associationQualifiedName;
        }
        listMfCpnBasicInfo.push(basicInfo);
    }
    else if (object instanceof mfs.ActionActivity && object.action instanceof mfs.CreateObjectAction) {
        let createObjectAction = object.action;
        let basicInfo = {
            name: createObjectAction.outputVariableName,
            type: createObjectAction.entityQualifiedName
        };
        listMfCpnBasicInfo.push(basicInfo);
    }
    else if (object instanceof mfs.ActionActivity && object.action instanceof mfs.CreateVariableAction) {
        let createVariableAction = object.action;
        let basicInfo = {
            name: createVariableAction.variableName,
            type: createVariableAction.variableDataType
        };
        listMfCpnBasicInfo.push(basicInfo);
    }
}
