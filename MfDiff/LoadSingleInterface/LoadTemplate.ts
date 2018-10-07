import * as $ from "./"
import { microflows as mfs } from "mendixmodelsdk"
import single = require("../SingleInterface")

export function convertTemplateToParameterMapping(number: number, object: mfs.TemplateArgument): $.IParameterMapping {
    return {
        id: object.id,
        name: `{${number}}`,
        value: object.expression
    }
}

export function loadTextTemplate(object: mfs.TextTemplate): single.ITemplate {
    return {
        text: object && object.text.translations[0].text,
        parameters: object && object.arguments.map((element, index) => convertTemplateToParameterMapping(index + 1, element))
    }
}

export function loadStringTemplate(object: mfs.StringTemplate): single.ITemplate {
    return {
        text: (object === null) ? undefined : object.text,
        parameters: object && $.loadParameterList(object.arguments.map((element, index) => convertTemplateToParameterMapping(index + 1, element)))
    }
}