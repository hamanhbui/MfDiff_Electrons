import { microflows as mfs } from "mendixmodelsdk"
import * as $ from "./"
import single = require("../SingleInterface")

export function loadFlow(object: mfs.Flow): single.IFlow {
    let output: single.IFlow
    output = $.loadSequenceFlow(object as mfs.SequenceFlow)
    output.originConnectionIndex = object.originConnectionIndex
    output.destinationConnectionIndex = object.destinationConnectionIndex
    return output
}