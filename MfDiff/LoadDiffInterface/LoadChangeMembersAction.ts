import diff = require("../DiffInterface");
import single = require("../SingleInterface")
import * as $ from "./"

/**
 * Load two MemberChanges to IMemberChangeDiff (typeDiff, nameDiff, valueDiff, operationDiff)
 */
export function loadMemberChangeDiff(object1: single.IMemberChange, object2: single.IMemberChange): diff.IMemberChangeDiff {
    return $.loadToIBasicDiff(object1, object2)
}

export function loadChangeMembersAction(object1: single.IChangeMembersAction, object2: single.IChangeMembersAction): diff.IChangeMembersActionDiff {
    let output: diff.IChangeMembersActionDiff;
    if (object1.typeName === single.ElementType.ChangeObjectAction) {
        output = loadChangeObjectAction(object1, object2);
    } else {
        output = loadCreateObjectAction(object1, object2);
    }
    output.commit = $.loadToIBasicDiff(object1.commit, object2.commit);
    output.refreshInClient = $.loadToIBasicDiff(object1.refreshInClient, object2.refreshInClient);
    return output;
}

/**
 * load two ChangeObjectActions to an IChangeObjectActionDiff
 */
export function loadChangeObjectAction(object1: single.IChangeObjectAction, object2: single.IChangeObjectAction): diff.IChangeObjectActionDiff {
    return {
        isDiff: true,
        typeName: single.ElementType.ChangeObjectAction,
        changeVariableName: $.loadToIBasicDiff(object1.changeVariableName, object2.changeVariableName),
        items: (object1.changeVariableName !== object2.changeVariableName) ?
            $.loadToIBasicDiff(object1.items, object2.items) :
            $.loadArrayDiff(object1.items, object2.items, loadMemberChangeDiff, $.compareTwoParametersById)
    }
}

/**
 * load two CreateObjectActions to an ICreateObjectActionDiff
 */
export function loadCreateObjectAction(object1: single.ICreateObjectAction, object2: single.ICreateObjectAction): diff.ICreateObjectActionDiff {
    return {
        isDiff: true,
        typeName: single.ElementType.CreateObjectAction,
        entityName: $.loadToIBasicDiff(object1.entityName, object2.entityName),
        outputVarialeName: $.loadToIBasicDiff(object1.outputVariableName, object2.outputVariableName),
        items: (object1.entityName !== object2.entityName) ?
            $.loadToIBasicDiff(object1.items, object2.items) :
            $.loadArrayDiff(
                object1.items, object2.items,
                loadMemberChangeDiff, $.compareTwoParametersById
            )
    }
}