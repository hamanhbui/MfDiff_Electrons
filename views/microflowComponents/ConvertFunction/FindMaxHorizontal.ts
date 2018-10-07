import { microflows } from "mendixmodelsdk";
export function findMaxHorizontal(mf: microflows.Microflow): number {
    // var min=mf.objectCollection.objects[0].relativeMiddlePoint.x;
    var xs: number[] = mf.objectCollection.objects.map(obj => obj).map(obj => obj.relativeMiddlePoint.x);
    let maxX = Math.max(...xs);
    let minX = Math.min(...xs);
    mf.objectCollection.objects.forEach(mfObj => {
        if (mfObj.relativeMiddlePoint.x === maxX && maxX < 0) {
            maxX -= mfObj.size.width;
        }
        if (mfObj.relativeMiddlePoint.x === maxX && maxX > 0) {
            maxX += mfObj.size.width;
        }
    })
    if (minX > 0 && minX != Infinity) return maxX + minX + 50;
    else if (minX < 0 && maxX > 0 && minX != -Infinity && maxX != Infinity) {
        return maxX + 50;
    }
    else return 0;
} 