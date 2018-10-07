import * as $ from "./"
import { microflows as mfs } from "mendixmodelsdk"
import single = require("../SingleInterface")

export function convertHttpEntryToParameterMapping(object: mfs.HttpHeaderEntry): single.IAttribute {
    return {
        id: object.id,
        name: object.key,
        value: object.value
    }
}

export function loadHttpConfiguration(object: mfs.HttpConfiguration): single.IHttpConfiguration {
    return {
        authenticationPassword: object.authenticationPassword,
        customLocation: object.customLocation ? object.customLocation : "default",
        httpAuthenticationUserName: object.httpAuthenticationUserName,
        overrideLocation: object.overrideLocation,
        customLocationTemplate: $.loadStringTemplate(object.customLocationTemplate),
        useAuthentication: object.useAuthentication,
        httpMethod: object.httpMethod && object.httpMethod.name,
        headerEntries: object.headerEntries.map(element => convertHttpEntryToParameterMapping(element)),
    }
}