import { microflows as mfs } from "mendixmodelsdk"
import { ISequenceFlow, ElementType } from "../SingleInterface"

export function getCaseValue(caseValue: mfs.CaseValue): string {
    if (!caseValue || caseValue instanceof mfs.NoCase) return ""
    if (caseValue instanceof mfs.InheritanceCase) return caseValue.valueQualifiedName
    return (caseValue as mfs.EnumerationCase).value
}

export function loadSequenceFlow(object: mfs.SequenceFlow): ISequenceFlow {
    return {
        isSingle: true,
        typeName: ElementType.SequenceFlow,
        caseValue: getCaseValue(object.caseValue)
    }
}