import single = require("../SingleInterface");
import { microflows as mfs } from "mendixmodelsdk"

export function convertSortItemToParamterMapping(object: mfs.SortItem): single.IParameterMapping {
    return {
        id: object.id,
        name: object.attributePath.split(".")[2],
        value: object.sortOrder.name
    }
}

export function loadRange(object: mfs.Range): single.IRange {
    if (object instanceof mfs.ConstantRange) {
        return {
            typeName: "ConstantRange",
            singleObject: object.singleObject,
        } as single.IConstantRange
    }
    return {
        typeName: "CustomRange",
        limitExpression: (object as mfs.CustomRange).limitExpression,
        offsetExpression: (object as mfs.CustomRange).offsetExpression,
    } as single.ICustomRange
}

export function loadRetrieveSource(object: mfs.RetrieveSource): single.IRetrieveSource {
    if (object instanceof mfs.AssociationRetrieveSource) {
        return {
            typeName: "AssociationRetrieveSource",
            associationName: "$" + (object as mfs.AssociationRetrieveSource).startVariableName + "/" + (object as mfs.AssociationRetrieveSource).associationQualifiedName.split(".")[1]
            //Ha associationName: (object as mfs.AssociationRetrieveSource).associationQualifiedName
        } as single.IAssociationRetrieveSource
    } else {
        return {
            typeName: "DatabaseRetrieveSource",
            entityName: (<mfs.DatabaseRetrieveSource>object).entityQualifiedName,
            range: loadRange((<mfs.DatabaseRetrieveSource>object).range),
            xPathConstraint: (<mfs.DatabaseRetrieveSource>object).xPathConstraint,
            sortItemList: ((object as mfs.DatabaseRetrieveSource).sortItemList) ?
                (<mfs.DatabaseRetrieveSource>object).sortItemList.items.map(element => convertSortItemToParamterMapping(element)) : null
        } as single.IDatabaseRetrieveSource
    }
}


// export function getReturnTypeOfRetrieveAction(retrieveSource: mfs.RetrieveSource): string {
//     if (retrieveSource instanceof mfs.DatabaseRetrieveSource) {
//         if (retrieveSource.range instanceof mfs.CustomRange) {
//             return "List of " + retrieveSource.entity && retrieveSource.entity.name
//         } else if (retrieveSource.range instanceof mfs.ConstantRange) {
//             if (retrieveSource.range.singleObject) {
//                 return retrieveSource.entity && retrieveSource.entity.name
//             } else {
//                 return "List of " + retrieveSource.entity && retrieveSource.entity.name
//             }
//         }
//     } else if (retrieveSource instanceof mfs.AssociationRetrieveSource) {
//         if (retrieveSource.association.owner.name === "Both") {
//             if (retrieveSource.association.type === dms.AssociationType.Reference) {
//                 return "1"
//             } else {
//                 return "M"
//             }
//         } else {
//             if (retrieveSource.association.type === dms.AssociationType.Reference) {
//                 if (retrieveSource.association.parent.id === retrieveSource.)
//             }
//         }
//     }
//     return "";
// }

/**
 * load 2 RetrieveAction to an IRetrieveActionDiff
 */
export function loadRetrieveAction(object: mfs.RetrieveAction): single.IRetrieveAction {
    return {
        isSingle: true,
        typeName: single.ElementType.RetrieveAction,
        outputVariableName: object.outputVariableName,
        retrieveSource: loadRetrieveSource(object.retrieveSource),
        // TODO: returnType: $.loadToIBasicDiff(getReturnTypeOfRetrieveAction(object1.retrieveSource), getReturnTypeOfRetrieveAction(object2.retrieveSource))
    }
}