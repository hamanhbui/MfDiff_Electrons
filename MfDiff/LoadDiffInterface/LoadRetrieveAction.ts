import diff = require("../DiffInterface");
import * as $ from "./"
import single = require("../SingleInterface")

/**
 * load two Ranges to IRangeDiff (maybe IConstantRangeDiff, ICustomRangeDiff or IBasicDiff of two IRange)
 * @param object1: first range
 * @param object2: second range
 * @return an IBasicDiff<IRange> if two ranges have different type 
 *         an IConstantRange if two ranges have the same ConstantRange type
 *         an ICustomRange if two ranges have the same CustomRange type
 */
export function loadRangeDiff(object1: single.IRange, object2: single.IRange): diff.IRangeDiff | diff.IBasicDiff<single.IRange> {
    if (object1.typeName === object2.typeName) {
        if (object1.typeName === "ConstantRange" && object2.typeName === "ConstantRange") {
            return {
                typeName: "ConstantRangeDiff",
                singleObject: $.loadToIBasicDiff((object1 as single.IConstantRange).singleObject, (object2 as single.IConstantRange).singleObject)
            } as diff.IConstantRangeDiff
        }
        if (object1.typeName === "CustomRange" && object2.typeName === "CustomRange") {
            return {
                typeName: "CustomRangeDiff",
                limitExpression: $.loadToIBasicDiff((object1 as single.ICustomRange).limitExpression, (object2 as single.ICustomRange).limitExpression),
                offsetExpression: $.loadToIBasicDiff((object1 as single.ICustomRange).offsetExpression, (object2 as single.ICustomRange).offsetExpression)
            } as diff.ICustomRangeDiff
        }
    }
    return $.loadToIBasicDiff(object1, object2)
}

/**
 * load two DatabaseRetrieveSources to an IDatabaseRetrieveSourceDiff
 */
export function loadDatabaseRetrieveSourceDiff(object1: single.IDatabaseRetrieveSource, object2: single.IDatabaseRetrieveSource): diff.IDatabaseRetrieveSourceDiff {
    return {
        typeName: "DatabaseRetrieveSourceDiff",
        entityName: $.loadToIBasicDiff(object1.entityName, object2.entityName),
        xPathConstraint: $.loadToIBasicDiff(object1.xPathConstraint, object2.xPathConstraint),
        range: loadRangeDiff(object1.range, object2.range),
        sortItemList: (object1.entityName === object2.entityName)
            ? $.loadArrayDiff(object1.sortItemList, object2.sortItemList, $.loadParameterDiff, $.compareTwoParametersById)
            : $.loadToIBasicDiff(object1.sortItemList, object2.sortItemList)
    }
}

/**
 * load two AssociationRetrieveSources to an AssociationRetrieveSourceDiff
 */
export function loadAssociationRetrieveSourceDiff(object1: single.IAssociationRetrieveSource, object2: single.IAssociationRetrieveSource): diff.IAssociationRetrieveSourceDiff {
    return {
        typeName: "AssociationRetrieveSourceDiff",
        associationName: $.loadToIBasicDiff(object1.associationName, object2.associationName)
    }
}

/**
 * load two RetrieveSources to an IRetrieveSourceDiff or an IBasicDiff of two IRetrieveSources
 * @param object1: first RetrieveSource
 * @param object2: second RetrieveSource
 * @return an IAssociationRetrieveSourceDiff if 2 RetrieveSources have the same AssociationRetrieveSource type
 *         an IDatabaseRetrieveSourceDiff if 2 RetrieveSources have the same DatabaseRetrieveSource type
 *         an IBasicDiff<IRetrieveSource> if 2 RetrieveSources have different type
 */
export function loadRetrieveSourceDiff(object1: single.IRetrieveSource, object2: single.IRetrieveSource): diff.IRetrieveSourceDiff | diff.IBasicDiff<single.IRetrieveSource> {
    if (object1.typeName === object2.typeName) {
        if (object1.typeName === "AssociationRetrieveSource") {
            return loadAssociationRetrieveSourceDiff(object1, object2)
        }
        if (object1.typeName === "DatabaseRetrieveSource") {
            return loadDatabaseRetrieveSourceDiff(object1 as single.IDatabaseRetrieveSource, object2 as single.IDatabaseRetrieveSource)
        }
    }
    return $.loadToIBasicDiff(object1, object2)

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
export function loadRetrieveAction(object1: single.IRetrieveAction, object2: single.IRetrieveAction): diff.IRetrieveActionDiff {
    return {
        typeName: single.ElementType.RetrieveAction,
        outputVariableName: $.loadToIBasicDiff(object1.outputVariableName, object2.outputVariableName),
        retrieveSource: loadRetrieveSourceDiff(object1.retrieveSource, object2.retrieveSource)
        // TODO: returnType: $.loadToIBasicDiff(getReturnTypeOfRetrieveAction(object1.retrieveSource), getReturnTypeOfRetrieveAction(object2.retrieveSource))
    }
}