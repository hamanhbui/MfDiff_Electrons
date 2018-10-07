import diff = require("../DiffInterface");
import { IList } from "mendixmodelsdk"
import { SearchingList } from "../SearchingList"

export function loadArrayDiff<T>(array1: IList<T> | T[] | undefined, array2: IList<T> | T[] | undefined, loadElementDiff: (element1, element2) => diff.IParameterMappingDiff, compareTwoElements): diff.IParameterMappingDiff[] | undefined {
    if (!array1) {
        if (!array2) {
            return undefined
        } else {
            return array2.map(element => loadElementDiff(undefined, element))
        }
    } else {
        if (!array2) {
            return array1.map(element => loadElementDiff(element, undefined))
        }
    }
    let combinedArray = SearchingList.combine(new SearchingList(array1.map(element => element), compareTwoElements),
        new SearchingList(array2.map(element => element), compareTwoElements));
    return combinedArray.map(element => loadElementDiff(element.member1, element.member2));
}