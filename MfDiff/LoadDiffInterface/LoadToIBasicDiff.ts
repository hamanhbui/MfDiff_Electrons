import diff = require("../DiffInterface")
import single = require("../SingleInterface")

export function loadToIBasicDiff<T>(memberValue1?: T, memberValue2?: T): diff.IBasicDiff<T> {
    if (memberValue1 instanceof Array && memberValue2 instanceof Array) {
        if (memberValue1.length != memberValue2.length) {
            return {
                member1: memberValue1,
                member2: memberValue2,
                typeName: single.ElementType.IBasicDiff,
                isDiff: true
            }
        }
        for (let i = 0; i < memberValue1.length; i++) {
            if (memberValue1[i] && memberValue2[i] && memberValue1[i] != memberValue2[i]) {
                return {
                    member1: memberValue1,
                    member2: memberValue2,
                    typeName: single.ElementType.IBasicDiff,
                    isDiff: true
                }
            }
        }
        return {
            member1: memberValue1,
            member2: memberValue2,
            typeName: single.ElementType.IBasicDiff,
            isDiff: false
        }
    }
    return {
        member1: memberValue1,
        member2: memberValue2,
        typeName: single.ElementType.IBasicDiff,
        isDiff: memberValue1 !== memberValue2
    }
}