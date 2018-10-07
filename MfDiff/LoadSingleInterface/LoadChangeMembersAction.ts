import single = require("../SingleInterface");
import { microflows as mfs, domainmodels as dms } from "mendixmodelsdk"

export function loadChangeMembersAction(object: mfs.ChangeMembersAction, mfBasicInfo: single.IMfCpnBasicInfo[]): single.IChangeMembersAction {
    let output: single.IChangeMembersAction;
    if (object instanceof mfs.ChangeObjectAction) {
        output = loadChangeObjectAction(object, mfBasicInfo);
    } else {
        output = loadCreateObjectAction(object as mfs.CreateObjectAction);
    }
    output.commit = object.commit.name;
    output.refreshInClient = object.refreshInClient;
    return output;
}

export function getTypeOfMemberChange(object: dms.IAttribute | dms.IAssociationBase): string {
    if (!object) return ""
    if (object.type instanceof dms.DateTimeAttributeType) {
        return "Date and time"
    }
    if (object.type instanceof dms.EnumerationAttributeType) {
        return "Enumeration " + `'${object.type.enumeration.name}'`
    }
    if (object instanceof dms.Association) {
        return object.name
    }
    let tmp = (object as dms.IAttribute).type && (object as dms.IAttribute).type.structureTypeName && (object as dms.IAttribute).type.structureTypeName.split("$")[1];
    return tmp && tmp.substring(0, tmp.length - 13);
}

export function loadMemberChange(object: mfs.MemberChange): single.IMemberChange {
    return {
        id: object.id,
        name: (object.attributeQualifiedName) ? object.attributeQualifiedName.split(".")[2] : object.associationQualifiedName,
        type: getTypeOfMemberChange(object.attributeQualifiedName ? object.attribute : object.association),
        value: object.value,
        operation: object.type && object.type.name
    }
}

/**
 * load two ChangeObjectActions to an IChangeObjectActionDiff
 */
export function loadChangeObjectAction(object: mfs.ChangeObjectAction, listMfCpnBasicInfo: single.IMfCpnBasicInfo[]): single.IChangeObjectAction {
    let typeVariable: string = "";
    listMfCpnBasicInfo.forEach(element => {
        if (element.name === object.changeVariableName) {
            typeVariable = " (" + element.type + ")";
            return;
        }
    })
    return {
        isSingle: true,
        typeName: single.ElementType.ChangeObjectAction,
        changeVariableName: object.changeVariableName + typeVariable,
        items: object.items.map(element => loadMemberChange(element)),
    }
}

/**
 * load two CreateObjectActions to an ICreateObjectActionDiff
 */
export function loadCreateObjectAction(object: mfs.CreateObjectAction): single.ICreateObjectAction {
    return {
        isSingle: true,
        typeName: single.ElementType.CreateObjectAction,
        entityName: object.entityQualifiedName,
        outputVariableName: object.outputVariableName,
        items: object.items && object.items.map(element => loadMemberChange(element)),
    }
}